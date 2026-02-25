import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi'
import { SiTensorflow, SiPython, SiScikitlearn } from 'react-icons/si'

const floatingBadges = [
    { icon: SiTensorflow, label: 'TensorFlow', color: '#acbac4', x: '8%', y: '30%', delay: 0 },
    { icon: SiPython, label: 'Python', color: '#e1d9bc', x: '88%', y: '25%', delay: 0.5 },
    { icon: SiScikitlearn, label: 'Scikit-learn', color: '#acbac4', x: '85%', y: '65%', delay: 1 },
]

const codeLines = [
    '>>> import medical_ai as mai',
    '>>> model = mai.DiagnoLink()',
    '>>> prediction = model.diagnose(x_ray)',
    '>>> print(prediction.disease)',
    'Pneumonia | 94.2% confidence',
]

// ── Typewriter ────────────────────────────────────────────────
const ROLES = [
    'Junior AI Engineer',
    'Data Analyst',
    'Medical AI Specialist',
    'Bioinformatics Engineer',
]

function Typewriter() {
    const [roleIdx, setRoleIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const full = ROLES[roleIdx]
        let timeout

        if (!deleting && displayed.length < full.length) {
            timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70)
        } else if (!deleting && displayed.length === full.length) {
            timeout = setTimeout(() => setDeleting(true), 2200)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setRoleIdx((i) => (i + 1) % ROLES.length)
        }
        return () => clearTimeout(timeout)
    }, [displayed, deleting, roleIdx])

    return (
        <span className="text-lg text-slate-400 font-light flex items-center gap-1 mb-3">
            <span className="text-blue-400 font-semibold">{displayed}</span>
            <span className="typewriter-cursor" />
        </span>
    )
}

// ── Animated counter ──────────────────────────────────────────
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
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background */}
            <div className="absolute inset-0 grid-dot-bg opacity-40" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

            {/* Floating badges */}
            {floatingBadges.map((badge, i) => (
                <motion.div
                    key={i}
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
                    <badge.icon size={16} style={{ color: badge.color }} />
                    <span className="text-xs text-slate-400 font-medium">{badge.label}</span>
                </motion.div>
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <div>
                        {/* Available badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
                        >
                            <span className="text-white">Mohamed</span>
                            <br />
                            <span
                                className="gradient-text-animated"
                                style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                            >
                                Elmogy
                            </span>
                        </motion.h1>

                        {/* Typewriter role */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Typewriter />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-sm font-mono text-blue-500/70 mb-8 tracking-wider"
                        >
                            • Medical AI &nbsp;|&nbsp; • Bioinformatics &nbsp;|&nbsp; • Healthcare Intelligence
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                className="btn-primary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View Projects
                                <FiArrowDown size={14} />
                            </motion.a>
                            <motion.a
                                href="/CV.pdf"
                                download="Mohamed_Elmogy_CV.pdf"
                                className="btn-outline flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FiDownload size={14} />
                                Download CV
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-center gap-4"
                        >
                            {[
                                { href: 'https://github.com/MohamedElmogy25', icon: FiGithub, hoverColor: 'hover:text-blue-400', hoverBorder: 'hover:border-blue-500/40', hoverBg: 'hover:bg-blue-500/5' },
                                { href: 'https://linkedin.com/in/mooogyyy', icon: FiLinkedin, hoverColor: 'hover:text-violet-400', hoverBorder: 'hover:border-violet-500/40', hoverBg: 'hover:bg-violet-500/5' },
                            ].map(({ href, icon: Icon, hoverColor, hoverBorder, hoverBg }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 rounded-xl border border-slate-800 ${hoverBorder} ${hoverBg} text-slate-500 ${hoverColor} transition-all duration-300`}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                            <span className="text-slate-700 text-sm font-mono ml-2">@MohamedElmogy25</span>
                        </motion.div>
                    </div>

                    {/* Right: Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="rounded-2xl overflow-hidden border border-blue-500/15"
                            style={{ background: 'rgba(48,54,79,0.95)' }}>
                            {/* Title bar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-500/10"
                                style={{ background: 'rgba(172,186,196,0.04)' }}>
                                <div className="flex gap-1.5">
                                    {['bg-red-500/70', 'bg-yellow-500/70', 'bg-blue-500/70'].map(c => (
                                        <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                                    ))}
                                </div>
                                <span className="text-slate-500 text-xs font-mono ml-2">diagnolink_demo.py</span>
                                <div className="ml-auto flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-blue-600 text-[10px] font-mono">running</span>
                                </div>
                            </div>
                            {/* Code */}
                            <div className="p-6 font-mono text-sm space-y-2">
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.25, duration: 0.4 }}
                                        className={line.startsWith('>>>') ? 'text-slate-300' :
                                            i === codeLines.length - 1 ? 'text-blue-400 font-semibold' : 'text-violet-400'}
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ delay: 2.2, duration: 1, repeat: Infinity }}
                                    className="inline-block w-2 h-4 bg-blue-400"
                                />
                            </div>
                        </div>

                        {/* Animated stat counters */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                                { target: 94.2, suffix: '%', label: 'Model Accuracy' },
                                { target: 3, suffix: '+', label: 'Projects' },
                                { target: 8, suffix: '+', label: 'Certificates' },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    className="glass-card rounded-xl p-3 text-center border-animated"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-xl font-bold text-blue-400">
                                        <Counter target={stat.target} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-slate-600 text-xs font-mono tracking-widest">scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent"
                />
            </motion.div>
        </section>
    )
}
