import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiExternalLink, FiStar, FiCpu, FiBarChart2 } from 'react-icons/fi'
import { SiTensorflow, SiOpencv, SiPython } from 'react-icons/si'
import { FadeIn } from './About'

const projects = [
    {
        id: 'diagnolink',
        featured: true,
        icon: '🫁',
        title: 'DiagnoLink',
        subtitle: 'AI-Powered Chest Disease Diagnosis',
        description:
            'An end-to-end medical AI system using TensorFlow and OpenCV for automated chest X-ray analysis. Trained on the NIH ChestX-ray14 dataset (112,000+ images) to detect 14 thoracic pathologies with clinical-grade accuracy.',
        accuracy: '94.2%',
        dataset: 'NIH ChestX-ray14',
        images: '112,000+',
        tags: [
            { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
            { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
            { name: 'Python', icon: SiPython, color: '#3776AB' },
        ],
        techDetail: ['CNN Architecture', 'Transfer Learning', 'Image Preprocessing', 'Data Augmentation'],
        github: 'https://github.com/MohamedElmogy25',
        accent: '#38bdf8',
        glowColor: 'rgba(56,189,248,0.15)',
    },
    {
        id: 'supermarket',
        featured: false,
        icon: '📈',
        title: 'Supermarket Sales Analysis',
        subtitle: 'Data Wrangling & Business Intelligence · Jan–Mar 2025',
        description:
            'Cleaned and preprocessed supermarket sales data to extract actionable business insights. Built a comprehensive data wrangling report and interactive dashboards revealing customer behavior patterns and revenue optimization opportunities.',
        tags: [
            { name: 'Power BI', icon: FiBarChart2, color: '#F2C811' },
            { name: 'Python', icon: SiPython, color: '#3776AB' },
        ],
        techDetail: ['Data Wrangling', 'EDA', 'Dashboard Design', 'Business Intelligence'],
        github: 'https://github.com/MohamedElmogy25',
        accent: '#e879f9',
        glowColor: 'rgba(232,121,249,0.15)',
    },
]

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="projects" className="py-28 relative">
            <div className="absolute -right-40 bottom-1/3 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/20" />
                        <span className="text-xs text-blue-500 font-mono tracking-widest uppercase">
                            004 / Projects
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/20" />
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="text-center mb-14">
                        <h2 className="section-title inline-block mb-3">Featured Work</h2>
                        <p className="section-subtitle mx-auto text-center">
                            From medical AI systems to business intelligence dashboards — projects built to create real-world impact.
                        </p>
                    </div>
                </FadeIn>

                {/* Bento Grid */}
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* DiagnoLink — Featured Large Card (spans 2 columns) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-2 rounded-2xl overflow-hidden border relative group"
                        style={{
                            borderColor: 'rgba(56,189,248,0.2)',
                            background: 'rgba(5,10,5,0.95)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'
                            e.currentTarget.style.boxShadow = '0 0 40px rgba(56,189,248,0.12)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)'
                            e.currentTarget.style.boxShadow = ''
                        }}
                    >
                        {/* Top accent bar */}
                        <div className="h-1 w-full"
                            style={{ background: 'linear-gradient(90deg, #38bdf8, #e879f9)' }} />

                        {/* Featured badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)' }}>
                            <FiStar size={10} fill="#38bdf8" />
                            Featured Project
                        </div>

                        <div className="p-7">
                            {/* Project header */}
                            <div className="flex items-start gap-4 mb-5">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                                    style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                                    🫁
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-2xl">DiagnoLink</h3>
                                    <p className="text-blue-400 text-sm font-medium mt-0.5">AI-Powered Chest Disease Diagnosis</p>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                An end-to-end medical AI system using TensorFlow and OpenCV for automated chest X-ray analysis.
                                Trained on the NIH ChestX-ray14 dataset to detect <strong className="text-blue-300">14 thoracic pathologies</strong> with
                                clinical-grade accuracy. Leverages transfer learning and custom CNN architectures for robust diagnosis support.
                            </p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {[
                                    { label: 'Accuracy', value: '94.2%', icon: '🎯' },
                                    { label: 'Dataset', value: 'NIH CXR14', icon: '🗄️' },
                                    { label: 'Images', value: '112K+', icon: '🖼️' },
                                ].map((m) => (
                                    <div key={m.label}
                                        className="rounded-xl p-3 text-center"
                                        style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.1)' }}>
                                        <div className="text-lg mb-1">{m.icon}</div>
                                        <div className="text-blue-400 font-bold text-base">{m.value}</div>
                                        <div className="text-slate-600 text-xs mt-0.5">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {['TensorFlow', 'OpenCV', 'Python', 'CNN', 'Transfer Learning', 'NumPy', 'Matplotlib'].map((tag) => (
                                    <span key={tag}
                                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                        style={{ background: 'rgba(56,189,248,0.08)', color: '#86efac', border: '1px solid rgba(56,189,248,0.12)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Pipeline */}
                            <div className="rounded-xl p-4 font-mono text-xs mb-6"
                                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(56,189,248,0.08)' }}>
                                <div className="text-slate-600 mb-2"># Model Pipeline</div>
                                <div className="text-slate-400">Input X-Ray &nbsp;<span className="text-blue-500">→</span>&nbsp; Preprocessing &nbsp;<span className="text-blue-500">→</span>&nbsp; CNN</div>
                                <div className="text-slate-400 mt-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-500">→</span>&nbsp; Multi-label Classification</div>
                                <div className="text-blue-400 mt-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-500">→</span>&nbsp; Disease Report</div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <a href="https://github.com/MohamedElmogy25" target="_blank" rel="noopener noreferrer"
                                    className="btn-primary flex items-center gap-2 text-xs py-2.5">
                                    <FiGithub size={13} />
                                    View on GitHub
                                </a>
                                <a href="https://github.com/MohamedElmogy25" target="_blank" rel="noopener noreferrer"
                                    className="btn-outline flex items-center gap-2 text-xs py-2.5">
                                    <FiExternalLink size={13} />
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Supermarket Sales — Tall side card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="rounded-2xl overflow-hidden border relative group flex flex-col"
                        style={{
                            borderColor: 'rgba(232,121,249,0.15)',
                            background: 'rgba(5,8,10,0.95)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(232,121,249,0.35)'
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(232,121,249,0.10)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(232,121,249,0.15)'
                            e.currentTarget.style.boxShadow = ''
                        }}
                    >
                        <div className="h-1 w-full"
                            style={{ background: 'linear-gradient(90deg, #e879f9, #38bdf8)' }} />

                        <div className="p-6 flex flex-col flex-1">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 shrink-0"
                                style={{ background: 'rgba(232,121,249,0.1)', border: '1px solid rgba(232,121,249,0.2)' }}>
                                📈
                            </div>

                            <h3 className="text-white font-bold text-lg mb-1">Supermarket Sales Analysis</h3>
                            <p className="text-violet-400 text-xs font-medium mb-3">Data Wrangling & Business Intelligence · Jan–Mar 2025</p>

                            <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                                Cleaned and preprocessed supermarket sales data to extract actionable business insights.
                                Built a comprehensive data wrangling report and interactive Power BI & Tableau dashboards,
                                using Python (Pandas, NumPy, Seaborn) for analysis.
                            </p>

                            <div className="space-y-2 mb-5">
                                {['Data Wrangling & Cleaning', 'Exploratory Data Analysis', 'Power BI Dashboards', 'Business Insights Report'].map((feat) => (
                                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400/70 shrink-0" />
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {['Python', 'Pandas', 'Power BI', 'SQL', 'Tableau'].map((t) => (
                                    <span key={t}
                                        className="px-2 py-0.5 rounded-md text-xs"
                                        style={{ background: 'rgba(232,121,249,0.08)', color: '#67e8f9', border: '1px solid rgba(232,121,249,0.1)' }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <a href="https://github.com/MohamedElmogy25" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 px-3 py-2 rounded-lg transition-all">
                                <FiGithub size={13} />
                                View Repository
                            </a>
                        </div>
                    </motion.div>

                    {/* Small stat cards row */}
                    {[
                        { label: 'Medical AI Focus', value: '100%', icon: '🩺', accent: '#38bdf8', desc: 'Healthcare impact driven' },
                        { label: 'Open Source', value: 'GitHub', icon: '⚙️', accent: '#e879f9', desc: 'All projects public' },
                        { label: 'More Coming', value: '2025', icon: '🚀', accent: '#38bdf8', desc: 'Actively building' },
                    ].map((card, i) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                            className="rounded-2xl p-5 border flex items-start gap-4 group cursor-default"
                            style={{ borderColor: `${card.accent}15`, background: 'rgba(8,8,8,0.9)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${card.accent}30` }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${card.accent}15` }}
                        >
                            <div className="text-2xl">{card.icon}</div>
                            <div>
                                <div className="font-bold text-base" style={{ color: card.accent }}>{card.value}</div>
                                <div className="text-white text-sm font-medium">{card.label}</div>
                                <div className="text-slate-600 text-xs mt-0.5">{card.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
