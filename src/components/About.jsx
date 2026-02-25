import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiZap, FiHeart, FiDatabase, FiCode } from 'react-icons/fi'

const traits = [
    { icon: FiHeart, label: 'Medical AI Passion', color: '#acbac4' },
    { icon: FiDatabase, label: 'Data Analyst', color: '#e1d9bc' },
    { icon: FiCode, label: 'ML Engineer', color: '#acbac4' },
    { icon: FiZap, label: 'Bioinformatics', color: '#e1d9bc' },
]

const highlights = [
    {
        number: '01',
        title: 'AI-Powered Diagnosis',
        desc: 'Built DiagnoLink, a TensorFlow-based system achieving 94%+ accuracy on chest X-ray disease detection using the NIH ChestX-ray14 dataset.',
        color: '#acbac4',
    },
    {
        number: '02',
        title: 'Google Data Analytics',
        desc: 'Completed the Google Data Analysis Specialization through the Digital Egypt Pioneers Initiative (DEPI), mastering end-to-end analytics workflows.',
        color: '#e1d9bc',
    },
    {
        number: '03',
        title: 'Bioinformatics Research',
        desc: 'Hands-on experience with Biopython, FASTA, and BLAST for biological sequence analysis, bridging the gap between biology and computation.',
        color: '#acbac4',
    },
]

function FadeIn({ children, delay = 0, direction = 'up' }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
            x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        },
        visible: { opacity: 1, y: 0, x: 0 },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}

export { FadeIn }

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="about" className="py-28 relative overflow-hidden">
            {/* Left ambient glow */}
            <div className="absolute -left-40 top-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/20" />
                        <span className="text-xs text-blue-500 font-mono tracking-widest uppercase">
                            001 / About
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/20" />
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Bio text */}
                    <div>
                        <FadeIn delay={0.1}>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-white">
                                Where Biology Meets{' '}
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #acbac4, #e1d9bc)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Intelligence
                                </span>
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
                                I'm a <strong className="text-blue-400 font-semibold">Junior AI Engineer and Data Analyst</strong> with a
                                specialized focus on Medical AI and Bioinformatics. As a recent graduate from{' '}
                                <strong className="text-white">Delta University for Science and Technology</strong>, I hold a Bachelor's
                                Degree in <strong className="text-violet-400">Artificial Intelligence &amp; Bioinformatics</strong>.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.25}>
                            <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
                                My mission is fueled by a passion for <strong className="text-blue-400">medical imaging</strong>,
                                disease diagnosis, and <strong className="text-blue-400">healthcare AI applications</strong>. I believe that
                                data holds the key to transforming patient outcomes — and I'm dedicated to building the models that unlock
                                those actionable insights.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="text-slate-400 leading-relaxed mb-8 text-[15px]">
                                With expertise in <strong className="text-violet-400">end-to-end machine learning pipelines</strong> and
                                preprocessing complex biological and medical datasets, I bridge the gap between raw biological signals
                                and intelligent clinical decision-support systems.
                            </p>
                        </FadeIn>

                        {/* Trait chips */}
                        <FadeIn delay={0.4}>
                            <div className="flex flex-wrap gap-2">
                                {traits.map((t) => (
                                    <div
                                        key={t.label}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 hover:scale-105"
                                        style={{
                                            borderColor: `${t.color}30`,
                                            background: `${t.color}08`,
                                            color: t.color,
                                        }}
                                    >
                                        <t.icon size={12} />
                                        {t.label}
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right: Highlights */}
                    <div ref={ref} className="space-y-5">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.number}
                                initial={{ opacity: 0, x: 40 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="glass-card rounded-2xl p-6 group cursor-default"
                            >
                                <div className="flex gap-4">
                                    <div
                                        className="text-4xl font-black shrink-0 opacity-15 group-hover:opacity-30 transition-opacity font-mono"
                                        style={{ color: h.color }}
                                    >
                                        {h.number}
                                    </div>
                                    <div>
                                        <h3
                                            className="font-bold mb-2 text-[15px]"
                                            style={{ color: h.color }}
                                        >
                                            {h.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{h.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Education card */}
                        <FadeIn delay={0.5} direction="left">
                            <div className="glass-card-violet rounded-2xl p-5 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #acbac4, #e1d9bc)' }}>
                                    <span className="text-[#30364f] font-bold text-xs">BSc</span>
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">
                                        B.Sc. Artificial Intelligence &amp; Bioinformatics
                                    </div>
                                    <div className="text-slate-500 text-xs mt-0.5">
                                        Delta University for Science & Technology &nbsp;·&nbsp; Class of 2024
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}
