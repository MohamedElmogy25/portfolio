import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-emerald-500/10'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
                            <span className="text-[#050505] font-bold text-sm font-mono">M</span>
                        </div>
                        <span className="font-bold text-white text-base tracking-tight hidden sm:block">
                            Mohamed<span className="text-emerald-400 ml-1">Elmogy</span>
                        </span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-200 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA + Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#contact"
                            className="hidden md:inline-flex btn-primary text-xs py-2 px-4"
                        >
                            Hire Me
                        </a>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                        >
                            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-emerald-500/10 bg-[#050505]/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a href="#contact" className="btn-primary mt-2 text-center text-sm">
                                Hire Me
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
