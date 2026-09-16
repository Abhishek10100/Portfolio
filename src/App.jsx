import { useCallback, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Process from './components/Process'
import Journey from './components/Journey'
import DemoLab from './components/DemoLab'
import { Contact, Footer } from './components/Contact'

/** Theme lives on <html>; the inline script in index.html sets it pre-paint. */
function useTheme() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* private mode — fall back to session-only theming */
    }
  }, [dark])

  return [dark, useCallback(() => setDark((v) => !v), [])]
}

export default function App() {
  const [dark, toggleTheme] = useTheme()
  const [ready, setReady] = useState(false)

  // Hold the page still until the preloader hands over.
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-page"
      >
        Skip to content
      </a>

      <Nav dark={dark} onToggleTheme={toggleTheme} />

      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Process />
        <Journey />
        <DemoLab />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
