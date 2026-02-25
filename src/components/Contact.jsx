import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend, FiPhone, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { FadeIn } from './About'

const contactLinks = [
    {
        icon: FiGithub,
        label: 'GitHub',
        handle: '@MohamedElmogy25',
        href: 'https://github.com/MohamedElmogy25',
        color: '#acbac4',
        desc: 'Source code & projects',
    },
    {
        icon: FiLinkedin,
        label: 'LinkedIn',
        handle: 'in/mooogyyy',
        href: 'https://linkedin.com/in/mooogyyy',
        color: '#e1d9bc',
        desc: 'Professional network',
    },
    {
        icon: FiMail,
        label: 'Email',
        handle: 'mohammed.elmogy7500@gmail.com',
        href: 'mailto:mohammed.elmogy7500@gmail.com',
        color: '#acbac4',
        desc: 'Direct contact',
    },
    {
        icon: FiPhone,
        label: 'Phone',
        handle: '+20 102 783 9779',
        href: 'tel:+201027839779',
        color: '#e1d9bc',
        desc: 'Call or WhatsApp',
    },
]

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('')

    const inputClass = "w-full bg-[#252a40] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder-slate-700 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_0_3px_rgba(172,186,196,0.08)] transition-all"

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')
        try {
            const apiBase = import.meta.env.VITE_API_URL ? `https://${import.meta.env.VITE_API_URL}` : ''
            const res = await fetch(`${apiBase}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (!res.ok) {
                setErrorMsg(data.error || 'Something went wrong.')
                setStatus('error')
            } else {
                setStatus('success')
                setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' })
            }
        } catch {
            setErrorMsg('Network error — please check your connection.')
            setStatus('error')
        }
    }

    return (
        <section id="contact" className="py-28 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute top-1/4 right-0 w-60 h-60 rounded-full bg-violet-500/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-500/20" />
                        <span className="text-xs text-violet-500 font-mono tracking-widest uppercase">
                            005 / Contact
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-500/20" />
                    </div>
                </FadeIn>

                {/* Main CTA block */}
                <FadeIn delay={0.1}>
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                            Let's Build the Future of{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #acbac4, #e1d9bc)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Healthcare AI
                            </span>
                        </h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-[15px] leading-relaxed">
                            Open to exciting opportunities in Medical AI, Bioinformatics research, and data-driven healthcare projects. Let's connect and create something impactful.
                        </p>
                    </div>
                </FadeIn>

                {/* Grid: form + links */}
                <div ref={ref} className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="glass-card rounded-2xl p-7"
                    >
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <FiSend size={16} className="text-blue-400" />
                            Send a Message
                        </h3>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                            >
                                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ background: 'rgba(172,186,196,0.12)', border: '1px solid rgba(172,186,196,0.3)' }}>
                                    <FiCheck size={28} className="text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg mb-1">Message Sent!</div>
                                    <div className="text-slate-500 text-sm">Thanks for reaching out. I'll get back to you soon.</div>
                                </div>
                                <button onClick={() => setStatus('idle')}
                                    className="text-xs text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg hover:bg-blue-500/5 transition-all">
                                    Send another
                                </button>
                            </motion.div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1.5 font-medium">First Name</label>
                                        <input name="firstName" type="text" placeholder="John" required
                                            value={form.firstName} onChange={handleChange}
                                            className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1.5 font-medium">Last Name</label>
                                        <input name="lastName" type="text" placeholder="Doe" required
                                            value={form.lastName} onChange={handleChange}
                                            className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1.5 font-medium">Email</label>
                                    <input name="email" type="email" placeholder="you@company.com" required
                                        value={form.email} onChange={handleChange}
                                        className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1.5 font-medium">Subject</label>
                                    <input name="subject" type="text" placeholder="Collaboration / Opportunity / Research" required
                                        value={form.subject} onChange={handleChange}
                                        className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1.5 font-medium">Message</label>
                                    <textarea name="message" rows={4} placeholder="Tell me about the opportunity..." required
                                        value={form.message} onChange={handleChange}
                                        className={`${inputClass} resize-none`} />
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                                        <FiAlertCircle size={14} className="shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}

                                <button type="submit" disabled={status === 'loading'}
                                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                                    {status === 'loading' ? (
                                        <><FiLoader size={14} className="animate-spin" /> Sending...</>
                                    ) : (
                                        <><FiSend size={14} /> Send Message</>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Links + Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-4"
                    >
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group block"
                                style={{ borderColor: `${link.color}18`, background: 'rgba(37,42,64,0.9)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = `${link.color}40`
                                    e.currentTarget.style.boxShadow = `0 0 20px ${link.color}10`
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = `${link.color}18`
                                    e.currentTarget.style.boxShadow = ''
                                }}
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                                    style={{ background: `${link.color}12`, border: `1px solid ${link.color}25` }}>
                                    <link.icon size={20} style={{ color: link.color }} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-semibold text-sm">{link.label}</div>
                                    <div className="font-mono text-xs mt-0.5" style={{ color: link.color }}>{link.handle}</div>
                                    <div className="text-slate-600 text-xs mt-0.5">{link.desc}</div>
                                </div>
                                <div className="text-slate-700 group-hover:text-blue-400 transition-colors">
                                    <FiMapPin size={14} className="rotate-45" />
                                </div>
                            </motion.a>
                        ))}

                        {/* Location + availability */}
                        <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
                            <div className="text-2xl">🌍</div>
                            <div>
                                <div className="text-white font-semibold text-sm">Mansoura, Egypt</div>
                                <div className="text-slate-500 text-xs mt-0.5">Open to remote & on-site opportunities worldwide</div>
                            </div>
                        </div>

                        <div className="rounded-2xl p-5 flex items-center gap-4"
                            style={{ background: 'rgba(172,186,196,0.06)', border: '1px solid rgba(172,186,196,0.15)' }}>
                            <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shrink-0" />
                            <div>
                                <div className="text-blue-300 font-semibold text-sm">Currently Available</div>
                                <div className="text-slate-500 text-xs mt-0.5">Actively looking for Medical AI & Data roles</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer bar */}
                <div className="mt-20 pt-8 border-t border-slate-900">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-700 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #acbac4, #e1d9bc)' }}>
                                <span className="text-[#30364f] font-bold text-[10px]">M</span>
                            </div>
                            <span>Mohamed Elmogy</span>
                            <span className="text-slate-800">·</span>
                            <span>Junior AI Engineer & Data Analyst</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/MohamedElmogy25" target="_blank" rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors">GitHub</a>
                            <a href="https://linkedin.com/in/mooogyyy" target="_blank" rel="noopener noreferrer"
                                className="hover:text-violet-400 transition-colors">LinkedIn</a>
                            <span>© 2025 Mohamed Elmogy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
