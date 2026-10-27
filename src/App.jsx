import { useCallback, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import GuideWidget from './guide/GuideWidget'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Process from './components/Process'
import Journey from './components/Journey'
import DemoLab from './components/DemoLab'
import Beyond from './components/Beyond'
import { Contact, Footer } from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  // Stable identity: the preloader restarts its timer if this changes.
  const handleDone = useCallback(() => setReady(true), [])

  // Hold the page still until the preloader hands over.
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  return (
    <>
      <Preloader onDone={handleDone} />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-page"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Process />
        <Journey />
        <DemoLab />
        <Beyond />
        <Contact />
      </main>

      <Footer />
      <GuideWidget ready={ready} />
    </>
  )
}
