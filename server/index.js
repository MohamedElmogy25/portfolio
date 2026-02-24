import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { neon } from '@neondatabase/serverless'
import { Redis } from '@upstash/redis'

const app = express()
const PORT = process.env.PORT || 3001

// ── Clients ─────────────────────────────────────────────────────────────────
const sql = neon(process.env.DATABASE_URL)
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    methods: ['POST', 'GET'],
}))
app.use(express.json())

// ── DB Bootstrap ─────────────────────────────────────────────────────────────
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
    console.log('✅  Neon DB ready')
}

// ── Rate Limiter ─────────────────────────────────────────────────────────────
async function rateLimit(ip) {
    const key = `contact_rl:${ip}`
    const count = await redis.incr(key)
    if (count === 1) {
        // first hit — expire after 1 hour
        await redis.expire(key, 3600)
    }
    return count
}

// ── Validation ───────────────────────────────────────────────────────────────
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

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown'

        // 1. Rate limit — max 5 submissions per IP per hour
        const hits = await rateLimit(ip)
        if (hits > 5) {
            return res.status(429).json({
                error: 'Too many requests. Please wait an hour before trying again.',
            })
        }

        // 2. Validate
        const { firstName, lastName, email, subject, message } = req.body
        const validationError = validate({ firstName, lastName, email, subject, message })
        if (validationError) {
            return res.status(400).json({ error: validationError })
        }

        // 3. Save to Neon
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
        console.error('Contact API error:', err)
        return res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
})

// ── Start ─────────────────────────────────────────────────────────────────────
initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀  API server running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Failed to init DB:', err)
        process.exit(1)
    })
