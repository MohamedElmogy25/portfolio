import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'

const navLinks = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeId, setActiveId] = useState('')

    // Scroll state + active section via IntersectionObserver
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)

        const observers = navLinks.map(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return null
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
                { rootMargin: '-40% 0px -55% 0px' }
            )
            obs.observe(el)
            return obs
        }).filter(Boolean)

        return () => {
            window.removeEventListener('scroll', onScroll)
            observers.forEach(obs => obs.disconnect())
        }
    }, [])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #38bdf8, #e879f9)' }}>
                            <span className="text-[#050505] font-bold text-sm font-mono relative z-10">M</span>
                        </div>
                        <span className="font-bold text-white text-base tracking-tight hidden sm:block">
                            Mohamed<span className="gradient-text-animated ml-1">Elmogy</span>
                        </span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeId === link.id
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{ color: isActive ? '#38bdf8' : '#94a3b8' }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-lg"
                                            style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)' }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </a>
                            )
                        })}
                    </div>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3">
                        <motion.a
                            href="/CV.pdf"
                            download="Mohamed_Elmogy_CV.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:inline-flex items-center gap-1.5 btn-primary text-xs py-2 px-4"
                        >
                            <FiDownload size={12} />
                            Resume
                        </motion.a>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={menuOpen ? 'close' : 'open'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-blue-500/10 bg-[#050505]/98 backdrop-blur-xl"
                    >
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-4 py-3 rounded-lg text-sm font-medium transition-all"
                                    style={{ color: activeId === link.id ? '#38bdf8' : '#94a3b8' }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/CV.pdf"
                                download="Mohamed_Elmogy_CV.pdf"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="btn-primary mt-2 text-center text-sm flex items-center justify-center gap-2"
                            >
                                <FiDownload size={13} /> Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
