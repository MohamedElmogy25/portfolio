import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi'
import { FadeIn } from './About'

const timelineData = [
    {
        year: '2020–2024',
        title: 'B.Sc. Artificial Intelligence & Bioinformatics',
        company: 'Delta University for Science and Technology',
        type: 'Education',
        location: 'Mansoura, Egypt',
        color: '#acbac4',
        tags: ['Machine Learning', 'Genomics', 'Neural Networks', 'Statistics'],
        description:
            'Studied at the intersection of computer science and life sciences, building a strong foundation in AI algorithms, biological data analysis, and computational biology. GPA: 2.904 / 4.00.',
        icon: '🎓',
    },
    {
        year: '2023',
        title: 'Bioinformatics Trainee',
        company: 'Research Lab — Delta University',
        type: 'Internship',
        location: 'Mansoura, Egypt',
        color: '#e1d9bc',
        tags: ['Biopython', 'BLAST', 'FASTA', 'Sequence Analysis'],
        description:
            'Performed biological sequence analysis using BLAST and Biopython, processing FASTA files and conducting comparative genomic studies on pathogen datasets.',
        icon: '🧬',
    },
    {
        year: 'Jan – Mar 2025',
        title: 'Data Analyst — Supermarket Sales Project',
        company: 'Data Analytics Project',
        type: 'Project',
        location: 'Remote, Egypt',
        color: '#acbac4',
        tags: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Power BI'],
        description:
            'Cleaned and preprocessed supermarket sales data to extract business insights. Created a comprehensive data wrangling report and business insights presentation using Python (Pandas, NumPy, Seaborn).',
        icon: '📊',
    },
    {
        year: '2024–2025',
        title: 'Google Data Analysis Specialist',
        company: 'Digital Egypt Pioneers Initiative (DEPI)',
        type: 'Certification',
        location: 'Online — Egypt',
        color: '#e1d9bc',
        tags: ['Google Analytics', 'Spreadsheets', 'R', 'Tableau'],
        description:
            'Completed the prestigious DEPI Google Data Analysis Specialization, mastering the full analytics workflow from data cleaning and visualization to stakeholder storytelling.',
        icon: '🏆',
    },
]

function TimelineItem({ item, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    const isLeft = index % 2 === 0

    return (
        <div ref={ref} className={`flex gap-4 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
            {/* Content card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full md:w-5/12 glass-card rounded-2xl p-5 group"
                style={{ borderColor: `${item.color}20` }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}40`
                    e.currentTarget.style.boxShadow = `0 0 25px ${item.color}15`
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}20`
                    e.currentTarget.style.boxShadow = ''
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <span
                            className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                            style={{ background: `${item.color}15`, color: item.color }}
                        >
                            {item.type}
                        </span>
                        <h3 className="text-white font-bold text-[15px] leading-snug">{item.title}</h3>
                    </div>
                    <span className="text-2xl ml-2 shrink-0">{item.icon}</span>
                </div>

                <p className="font-semibold text-sm mb-1" style={{ color: item.color }}>
                    {item.company}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                        <FiCalendar size={10} />
                        {item.year}
                    </span>
                    <span className="flex items-center gap-1">
                        <FiMapPin size={10} />
                        {item.location}
                    </span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-xs font-medium"
                            style={{ background: `${item.color}10`, color: `${item.color}cc` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Center dot */}
            <div className="hidden md:flex w-2/12 flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="w-5 h-5 rounded-full border-2 z-10 mt-6 shrink-0"
                    style={{
                        borderColor: item.color,
                        background: `${item.color}30`,
                        boxShadow: `0 0 12px ${item.color}50`,
                    }}
                />
            </div>

            {/* Empty spacer */}
            <div className="hidden md:block w-5/12" />
        </div>
    )
}

export default function Timeline() {
    return (
        <section id="experience" className="py-28 relative">
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="absolute -left-40 bottom-1/4 w-80 h-80 rounded-full bg-blue-500/4 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/20" />
                        <span className="text-xs text-blue-500 font-mono tracking-widest uppercase">
                            003 / Experience
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/20" />
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="text-center mb-16">
                        <h2 className="section-title inline-block mb-3">My Journey</h2>
                        <p className="section-subtitle mx-auto text-center">
                            From biological research labs to AI development — a trajectory built on curiosity and precision.
                        </p>
                    </div>
                </FadeIn>

                <div className="relative space-y-8 md:space-y-12">
                    {timelineData.map((item, i) => (
                        <TimelineItem key={i} item={item} index={i} />
                    ))}
                </div>

                {/* DEPI badge */}
                <FadeIn delay={0.4}>
                    <div className="mt-16 flex justify-center">
                        <div className="glass-card-violet rounded-2xl px-6 py-4 flex items-center gap-4 border-violet-500/20">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #acbac4, #e1d9bc)' }}>
                                <FiAward size={18} className="text-[#30364f]" />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Google Data Analytics Professional Certificate</div>
                                <div className="text-slate-500 text-xs mt-0.5">Digital Egypt Pioneers Initiative (DEPI) · 2024–2025</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
