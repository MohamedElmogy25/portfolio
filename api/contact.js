import { neon } from '@neondatabase/serverless'
import { Redis } from '@upstash/redis'

const sql = neon(process.env.DATABASE_URL)
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

async function initDB() {
    await sql`
        CREATE TABLE IF NOT EXISTS messages (
            id          SERIAL PRIMARY KEY,
            first_name  TEXT NOT NULL,
            last_name   TEXT NOT NULL,
            email       TEXT NOT NULL,
            subject     TEXT NOT NULL,
            message     TEXT NOT NULL,
            ip          TEXT,
            created_at  TIMESTAMPTZ DEFAULT NOW()
        )
    `
}

function validate({ firstName, lastName, email, subject, message }) {
    if (!firstName?.trim()) return 'First name is required'
    if (!lastName?.trim()) return 'Last name is required'
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return 'A valid email is required'
    if (!subject?.trim()) return 'Subject is required'
    if (!message?.trim() || message.trim().length < 10)
        return 'Message must be at least 10 characters'
    return null
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    try {
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown'

        // Rate limit — max 5 per IP per hour
        const key = `contact_rl:${ip}`
        const count = await redis.incr(key)
        if (count === 1) await redis.expire(key, 3600)
        if (count > 5) {
            return res.status(429).json({
                error: 'Too many requests. Please wait an hour before trying again.',
            })
        }

        // Validate
        const { firstName, lastName, email, subject, message } = req.body
        const validationError = validate({ firstName, lastName, email, subject, message })
        if (validationError) return res.status(400).json({ error: validationError })

        // Ensure table exists & save
        await initDB()
        await sql`
            INSERT INTO messages (first_name, last_name, email, subject, message, ip)
            VALUES (
                ${firstName.trim()},
                ${lastName.trim()},
                ${email.trim().toLowerCase()},
                ${subject.trim()},
                ${message.trim()},
                ${ip}
            )
        `

        return res.status(200).json({ success: true, message: 'Message received!' })
    } catch (err) {
        console.error('Contact handler error:', err)
        return res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
}
