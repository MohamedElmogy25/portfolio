import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi'
import { SiTensorflow, SiPython, SiScikitlearn } from 'react-icons/si'

const floatingBadges = [
    { icon: SiTensorflow, label: 'TensorFlow', color: '#10b981', x: '8%', y: '30%', delay: 0 },
    { icon: SiPython, label: 'Python', color: '#06b6d4', x: '88%', y: '25%', delay: 0.5 },
    { icon: SiScikitlearn, label: 'Scikit-learn', color: '#10b981', x: '85%', y: '65%', delay: 1 },
]

const codeLines = [
    '>>> import medical_ai as mai',
    '>>> model = mai.DiagnoLink()',
    '>>> prediction = model.diagnose(x_ray)',
    '>>> print(prediction.disease)',
    "Pneumonia | 94.2% confidence",
]

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
            {/* Background grid */}
            <div className="absolute inset-0 grid-dot-bg opacity-40" />

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

            {/* Floating tech badges */}
            {floatingBadges.map((badge, i) => (
                <motion.div
                    key={i}
                    className="absolute hidden lg:flex items-center gap-2 glass-card px-3 py-2 rounded-xl"
                    style={{ left: badge.x, top: badge.y }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                    }}
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
                    {/* Left: Text Content */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 text-xs font-medium tracking-widest uppercase">
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
                        >
                            <span className="text-white">Mohamed</span>
                            <br />
                            <span
                                className="text-glow-emerald"
                                style={{
                                    background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Elmogy
                            </span>
                        </motion.h1>

                        {/* Role */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-400 mb-3 font-light"
                        >
                            Junior AI Engineer &amp; Data Analyst
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-sm font-mono text-emerald-500/70 mb-8 tracking-wider"
                        >
                            &#x2022; Medical AI &nbsp;|&nbsp; &#x2022; Bioinformatics &nbsp;|&nbsp; &#x2022; Healthcare Intelligence
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4 mb-10"
                        >
                            <a href="#projects" className="btn-primary flex items-center gap-2">
                                View Projects
                                <FiArrowDown size={14} />
                            </a>
                            <a href="/CV.pdf" download="Mohamed_Elmogy_CV.pdf" className="btn-outline flex items-center gap-2">
                                <FiDownload size={14} />
                                Download CV
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-center gap-4"
                        >
                            <a
                                href="https://github.com/MohamedElmogy25"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-slate-500 hover:text-emerald-400 transition-all duration-300"
                            >
                                <FiGithub size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/mooogyyy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-500/5 text-slate-500 hover:text-cyan-400 transition-all duration-300"
                            >
                                <FiLinkedin size={18} />
                            </a>
                            <span className="text-slate-700 text-sm font-mono ml-2">@MohamedElmogy25</span>
                        </motion.div>
                    </div>

                    {/* Right: Code Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        {/* Terminal window */}
                        <div className="rounded-2xl overflow-hidden border border-emerald-500/15"
                            style={{ background: 'rgba(5, 10, 5, 0.95)' }}>
                            {/* Title bar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-500/10"
                                style={{ background: 'rgba(16, 185, 129, 0.04)' }}>
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                                </div>
                                <span className="text-slate-500 text-xs font-mono ml-2">diagnolink_demo.py</span>
                            </div>
                            {/* Code */}
                            <div className="p-6 font-mono text-sm space-y-2">
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
                                        className={`${line.startsWith('>>>') ? 'text-slate-300' :
                                            i === codeLines.length - 1 ? 'text-emerald-400 font-semibold' :
                                                'text-cyan-400'
                                            }`}
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ delay: 2, duration: 1, repeat: Infinity }}
                                    className="inline-block w-2 h-4 bg-emerald-400"
                                />
                            </div>
                        </div>

                        {/* Stats row below terminal */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                                { value: '94.2%', label: 'Model Accuracy' },
                                { value: '3+', label: 'Projects' },
                                { value: 'DEPI', label: 'Certified' },
                            ].map((stat) => (
                                <div key={stat.label}
                                    className="glass-card rounded-xl p-3 text-center">
                                    <div className="text-xl font-bold text-emerald-400">{stat.value}</div>
                                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-slate-600 text-xs font-mono tracking-widest">scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent"
                />
            </motion.div>
        </section>
    )
}
