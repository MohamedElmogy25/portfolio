import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Contact from './components/Contact'

function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
    return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function CursorGlow() {
    const ref = useRef(null)
    useEffect(() => {
        const move = (e) => {
            if (ref.current) {
                ref.current.style.left = e.clientX + 'px'
                ref.current.style.top = e.clientY + 'px'
            }
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])
    return <div ref={ref} className="cursor-glow" />
}

function App() {
    return (
        <AppProvider>
            <div className="min-h-screen bio-mesh" style={{ backgroundColor: 'var(--bg)' }}>
                <ScrollProgress />
                <CursorGlow />
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Timeline />
                    <Projects />
                    <Contact />
                </main>
            </div>
        </AppProvider>
    )
}

export default App
