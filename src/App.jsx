import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import AnimatedBackground from './components/ui/AnimatedBackground'
import CursorGlow from './components/ui/CursorGlow'
import ScrollProgress from './components/ui/ScrollProgress'
import { useLocale } from './hooks/useLocale'

function App() {
  const { content, language } = useLocale()

  return (
    <>
      <a className="skip-link" href="#main-content">
        {content.ui.skipToContent}
      </a>
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero key={language} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
