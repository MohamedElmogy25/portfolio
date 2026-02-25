import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiDownload, FiSun, FiMoon } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { translations } from '../translations'

export default function Navbar() {
    const { lang, theme, toggleLang, toggleTheme } = useApp()
    const t = translations[lang].nav
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeId, setActiveId] = useState('')

    const navLinks = [
        { href: '#about', label: t.about, id: 'about' },
        { href: '#skills', label: t.skills, id: 'skills' },
        { href: '#experience', label: t.experience, id: 'experience' },
        { href: '#projects', label: t.projects, id: 'projects' },
        { href: '#contact', label: t.contact, id: 'contact' },
    ]

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
    }, [lang])

    const isLight = theme === 'light'

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'backdrop-blur-xl border-b'
                    : 'bg-transparent'
                }`}
            style={scrolled ? {
                backgroundColor: isLight ? 'rgba(240,249,255,0.9)' : 'rgba(5,5,5,0.9)',
                borderColor: 'rgba(var(--primary-rgb),0.1)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            } : {}}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                            <span className="text-white font-bold text-sm font-mono">M</span>
                        </div>
                        <span className="font-bold text-base tracking-tight hidden sm:block"
                            style={{ color: 'var(--text)' }}>
                            Mohamed<span className="gradient-text-animated ml-1">Elmogy</span>
                        </span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeId === link.id
                            return (
                                <a key={link.href} href={link.href}
                                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}
                                >
                                    {isActive && (
                                        <motion.span layoutId="nav-pill"
                                            className="absolute inset-0 rounded-lg"
                                            style={{ background: 'rgba(var(--primary-rgb),0.08)', border: '1px solid rgba(var(--primary-rgb),0.2)' }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </a>
                            )
                        })}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg transition-all duration-200"
                            style={{
                                color: 'var(--text-muted)',
                                border: '1px solid rgba(var(--primary-rgb),0.2)',
                                background: 'rgba(var(--primary-rgb),0.05)',
                            }}
                            title={isLight ? 'Switch to dark' : 'Switch to light'}
                        >
                            {isLight ? <FiMoon size={15} /> : <FiSun size={15} />}
                        </motion.button>

                        {/* Language toggle */}
                        <motion.button
                            onClick={toggleLang}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                            style={{
                                color: 'var(--primary)',
                                border: '1px solid rgba(var(--primary-rgb),0.3)',
                                background: 'rgba(var(--primary-rgb),0.06)',
                                fontFamily: lang === 'en' ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                            }}
                        >
                            {lang === 'en' ? 'ع' : 'EN'}
                        </motion.button>

                        {/* Resume */}
                        <motion.a
                            href="/CV.pdf" download="Mohamed_Elmogy_CV.pdf"
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="hidden md:inline-flex items-center gap-1.5 btn-primary text-xs py-2 px-4"
                        >
                            <FiDownload size={12} />
                            {t.resume}
                        </motion.a>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg transition-all"
                            style={{ color: 'var(--text-muted)' }}
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
                        className="md:hidden border-t backdrop-blur-xl"
                        style={{
                            backgroundColor: isLight ? 'rgba(240,249,255,0.98)' : 'rgba(5,5,5,0.98)',
                            borderColor: 'rgba(var(--primary-rgb),0.1)',
                        }}
                    >
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a key={link.href} href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-4 py-3 rounded-lg text-sm font-medium transition-all"
                                    style={{ color: activeId === link.id ? 'var(--primary)' : 'var(--text-muted)' }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="flex gap-2 mt-2">
                                <button onClick={toggleLang}
                                    className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
                                    style={{
                                        color: 'var(--primary)',
                                        border: '1px solid rgba(var(--primary-rgb),0.3)',
                                        fontFamily: lang === 'en' ? 'Cairo' : 'Inter',
                                    }}>
                                    {lang === 'en' ? 'العربية' : 'English'}
                                </button>
                                <motion.a href="/CV.pdf" download="Mohamed_Elmogy_CV.pdf"
                                    className="flex-1 btn-primary text-center text-sm flex items-center justify-center gap-2">
                                    <FiDownload size={13} /> {t.resume}
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
