import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
    return (
        <div className="min-h-screen bg-[#050505] bio-mesh">
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
    )
}

export default App
