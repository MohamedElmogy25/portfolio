import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi'
import { SiTensorflow, SiPython, SiScikitlearn } from 'react-icons/si'
import { useApp } from '../context/AppContext'
import { translations } from '../translations'

const floatingBadges = [
    { icon: SiTensorflow, label: 'TensorFlow', x: '8%', y: '30%', delay: 0 },
    { icon: SiPython, label: 'Python', x: '88%', y: '25%', delay: 0.5 },
    { icon: SiScikitlearn, label: 'Scikit-learn', x: '85%', y: '65%', delay: 1 },
]

const codeLines = [
    '>>> import medical_ai as mai',
    '>>> model = mai.DiagnoLink()',
    '>>> prediction = model.diagnose(x_ray)',
    '>>> print(prediction.disease)',
    'Pneumonia | 94.2% confidence',
]

function Typewriter({ roles }) {
    const [roleIdx, setRoleIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        setDisplayed('')
        setDeleting(false)
        setRoleIdx(0)
    }, [roles])

    useEffect(() => {
        const full = roles[roleIdx]
        let timeout
        if (!deleting && displayed.length < full.length) {
            timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70)
        } else if (!deleting && displayed.length === full.length) {
            timeout = setTimeout(() => setDeleting(true), 2200)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setRoleIdx(i => (i + 1) % roles.length)
        }
        return () => clearTimeout(timeout)
    }, [displayed, deleting, roleIdx, roles])

    return (
        <span className="text-lg font-light flex items-center gap-1 mb-3" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--primary)' }}>{displayed}</span>
            <span className="typewriter-cursor" />
        </span>
    )
}

function Counter({ target, suffix = '', duration = 1800 }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!inView) return
        const isFloat = target % 1 !== 0
        const steps = 60
        const interval = duration / steps
        let step = 0
        const timer = setInterval(() => {
            step++
            const val = (target * step) / steps
            setCount(isFloat ? parseFloat(val.toFixed(1)) : Math.floor(val))
            if (step >= steps) { setCount(target); clearInterval(timer) }
        }, interval)
        return () => clearInterval(timer)
    }, [inView, target, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
    const { lang } = useApp()
    const t = translations[lang].hero

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <div className="absolute inset-0 grid-dot-bg opacity-40" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
                style={{ background: 'rgba(var(--primary-rgb),0.05)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
                style={{ background: 'rgba(var(--secondary-rgb),0.05)', animationDelay: '2s' }} />

            {/* Floating badges */}
            {floatingBadges.map((badge, i) => (
                <motion.div key={i}
                    className="absolute hidden lg:flex items-center gap-2 glass-card px-3 py-2 rounded-xl border-animated"
                    style={{ left: badge.x, top: badge.y }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 1 + badge.delay },
                        scale: { duration: 0.5, delay: 1 + badge.delay },
                        y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
                    }}
                >
                    <badge.icon size={16} style={{ color: 'var(--primary)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{badge.label}</span>
                </motion.div>
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                            style={{ borderColor: 'rgba(var(--primary-rgb),0.2)', background: 'rgba(var(--primary-rgb),0.05)' }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--primary)' }}>
                                {t.available}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
                        >
                            <span style={{ color: 'var(--text)' }}>Mohamed</span>
                            <br />
                            <span className="gradient-text-animated" style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                                Elmogy
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Typewriter roles={t.roles} />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-sm font-mono mb-8 tracking-wider"
                            style={{ color: 'rgba(var(--primary-rgb),0.7)' }}
                        >
                            {t.tagline}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4 mb-10"
                        >
                            <motion.a href="#projects" className="btn-primary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                {t.viewProjects} <FiArrowDown size={14} />
                            </motion.a>
                            <motion.a href="/CV.pdf" download="Mohamed_Elmogy_CV.pdf"
                                className="btn-outline flex items-center gap-2"
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                <FiDownload size={14} /> {t.downloadCV}
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-center gap-4"
                        >
                            {[
                                { href: 'https://github.com/MohamedElmogy25', icon: FiGithub },
                                { href: 'https://linkedin.com/in/mooogyyy', icon: FiLinkedin },
                            ].map(({ href, icon: Icon }) => (
                                <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }}
                                    className="p-3 rounded-xl border transition-all duration-300"
                                    style={{ borderColor: 'rgba(var(--primary-rgb),0.2)', color: 'var(--text-muted)' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.4)' }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.2)' }}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                            <span className="text-sm font-mono ml-2" style={{ color: 'var(--text-faint)' }}>@MohamedElmogy25</span>
                        </motion.div>
                    </div>

                    {/* Right: Terminal + counters */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="rounded-2xl overflow-hidden border"
                            style={{ background: 'rgba(5,10,5,0.95)', borderColor: 'rgba(var(--primary-rgb),0.15)' }}>
                            <div className="flex items-center gap-2 px-4 py-3 border-b"
                                style={{ background: 'rgba(var(--primary-rgb),0.04)', borderColor: 'rgba(var(--primary-rgb),0.1)' }}>
                                <div className="flex gap-1.5">
                                    {['bg-red-500/70', 'bg-yellow-500/70', 'bg-green-500/70'].map(c => (
                                        <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                                    ))}
                                </div>
                                <span className="text-slate-500 text-xs font-mono ml-2">diagnolink_demo.py</span>
                                <div className="ml-auto flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                                    <span className="text-[10px] font-mono" style={{ color: 'var(--primary)' }}>running</span>
                                </div>
                            </div>
                            <div className="p-6 font-mono text-sm space-y-2">
                                {codeLines.map((line, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.25, duration: 0.4 }}
                                        style={{ color: i === codeLines.length - 1 ? 'var(--primary)' : line.startsWith('>>>') ? '#e2e8f0' : 'var(--secondary)' }}
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
                                    transition={{ delay: 2.2, duration: 1, repeat: Infinity }}
                                    className="inline-block w-2 h-4" style={{ background: 'var(--primary)' }}
                                />
                            </div>
                        </div>

                        {/* Stat counters */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                                { target: 94.2, suffix: '%', labelIdx: 0 },
                                { target: 3, suffix: '+', labelIdx: 1 },
                                { target: 8, suffix: '+', labelIdx: 2 },
                            ].map((stat) => (
                                <motion.div key={stat.labelIdx}
                                    className="glass-card rounded-xl p-3 text-center border-animated"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                                        <Counter target={stat.target} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
                                        {t.stats[stat.labelIdx].label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-faint)' }}>scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8"
                    style={{ background: `linear-gradient(to bottom, var(--primary), transparent)` }}
                />
            </motion.div>
        </section>
    )
}
