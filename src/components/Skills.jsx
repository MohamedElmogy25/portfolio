import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiPython,
    SiTableau, SiMysql
} from 'react-icons/si'
import { FiDatabase, FiBarChart2 } from 'react-icons/fi'
import { FadeIn } from './About'

const skillCategories = [
    {
        id: 'aiml',
        label: 'AI / ML',
        gradient: 'from-blue-500/20 to-blue-500/5',
        border: 'border-blue-500/20',
        accentColor: '#3b82f6',
        icon: '🧠',
        skills: [
            { name: 'TensorFlow', icon: SiTensorflow, level: 90, color: '#FF6F00' },
            { name: 'PyTorch', icon: SiPytorch, level: 75, color: '#EE4C2C' },
            { name: 'Scikit-learn', icon: SiScikitlearn, level: 88, color: '#F7931E' },
            { name: 'Python', icon: SiPython, level: 92, color: '#3776AB' },
        ],
    },
    {
        id: 'data',
        label: 'Data',
        gradient: 'from-violet-500/20 to-violet-500/5',
        border: 'border-violet-500/20',
        accentColor: '#8b5cf6',
        icon: '📊',
        skills: [
            { name: 'SQL', icon: SiMysql, level: 85, color: '#4479A1' },
            { name: 'Pandas', icon: SiPandas, level: 90, color: '#150458' },
            { name: 'Power BI', icon: FiBarChart2, level: 80, color: '#F2C811' },
            { name: 'Tableau', icon: SiTableau, level: 75, color: '#E97627' },
        ],
    },
    {
        id: 'bio',
        label: 'Bioinformatics',
        gradient: 'from-blue-500/15 to-violet-500/10',
        border: 'border-blue-500/15',
        accentColor: '#3b82f6',
        icon: '🧬',
        skills: [
            { name: 'Biopython', icon: FiDatabase, level: 82, color: '#3b82f6' },
            { name: 'BLAST', icon: FiDatabase, level: 78, color: '#8b5cf6' },
            { name: 'FASTA', icon: FiDatabase, level: 80, color: '#3b82f6' },
            { name: 'OpenCV', icon: FiDatabase, level: 85, color: '#8b5cf6' },
        ],
    },
]

function SkillBar({ name, icon: Icon, level, color, accentColor, delay }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <div ref={ref} className="group">
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    <Icon size={14} style={{ color }} />
                    <span className="text-sm text-slate-300 font-medium">{name}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: accentColor }}>{level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1.2, delay, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }}
                />
            </div>
        </div>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="py-28 relative">
            <div className="absolute -right-40 top-1/3 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-500/20" />
                        <span className="text-xs text-violet-500 font-mono tracking-widest uppercase">
                            002 / Skills
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-500/20" />
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="text-center mb-14">
                        <h2 className="section-title inline-block mb-3">Technical Arsenal</h2>
                        <p className="section-subtitle mx-auto text-center">
                            Three pillars of expertise — AI research, data analysis, and bioinformatics — converging to solve healthcare challenges.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: catIdx * 0.15 }}
                            className={`rounded-2xl p-6 border bg-gradient-to-b ${cat.gradient} ${cat.border} backdrop-blur-sm`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                                    style={{ background: `${cat.accentColor}18`, border: `1px solid ${cat.accentColor}25` }}
                                >
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">{cat.label}</h3>
                                    <div className="text-xs font-mono mt-0.5" style={{ color: `${cat.accentColor}90` }}>
                                        {cat.skills.length} technologies
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {cat.skills.map((skill, i) => (
                                    <SkillBar
                                        key={skill.name}
                                        {...skill}
                                        accentColor={cat.accentColor}
                                        delay={catIdx * 0.15 + i * 0.1}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <FadeIn delay={0.3}>
                    <div className="mt-10 glass-card rounded-2xl p-5">
                        <p className="text-xs text-slate-600 font-mono mb-4 text-center">Also familiar with</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Jupyter Notebook', 'Google Colab', 'Kaggle Notebooks', 'Git', 'GitHub', 'NumPy', 'Matplotlib', 'Seaborn', 'FastAPI', 'NCBI Databases'].map(tool => (
                                <span key={tool}
                                    className="px-3 py-1 rounded-full border border-slate-800 text-xs text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200 cursor-default">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Soft Skills */}
                <FadeIn delay={0.4}>
                    <div className="mt-6 rounded-2xl p-6 border border-violet-500/12"
                        style={{ background: 'rgba(139,92,246,0.04)' }}>
                        <p className="text-xs text-violet-500 font-mono mb-4 tracking-widest uppercase">Soft Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Analytical & Problem-Solving', emoji: '🧠' },
                                { label: 'Critical Thinking', emoji: '🔍' },
                                { label: 'Technical Communication', emoji: '🗣️' },
                                { label: 'Team Collaboration', emoji: '🤝' },
                                { label: 'Adaptability & Continuous Learning', emoji: '🚀' },
                                { label: 'Time Management', emoji: '⏰' },
                            ].map(({ label, emoji }) => (
                                <span key={label}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs text-violet-300 hover:bg-violet-500/10 transition-all duration-200 cursor-default">
                                    <span>{emoji}</span>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Certifications */}
                <FadeIn delay={0.5}>
                    <div className="mt-6 glass-card rounded-2xl p-6">
                        <p className="text-xs text-blue-500 font-mono mb-5 tracking-widest uppercase">Certificates & Courses</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                { title: 'Fake News Detection with Machine Learning', icon: '🤖' },
                                { title: 'Introduction to Computer Vision & Image Processing', icon: '👁️' },
                                { title: 'Applied Machine Learning in Python', icon: '🐍' },
                                { title: 'Analytic Thinking, Data Science & Data Mining', icon: '📊' },
                                { title: 'Operations Research (1, 2 & 3)', icon: '📐' },
                                { title: 'Dynamic Programming & Greedy Algorithms', icon: '⚡' },
                                { title: 'Fundamentals of Network Communication', icon: '🌐' },
                                { title: 'Numerical Methods for Engineers', icon: '🔢' },
                            ].map(({ title, icon }) => (
                                <div key={title}
                                    className="flex items-start gap-3 p-3 rounded-xl border border-blue-500/10 bg-blue-500/4 hover:border-blue-500/20 transition-all duration-200">
                                    <span className="text-base shrink-0 mt-0.5">{icon}</span>
                                    <span className="text-slate-400 text-xs leading-relaxed">{title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
