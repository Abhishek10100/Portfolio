import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE, Icon } from '../components/ui'
import { LogoMark } from '../components/Logo'
import { TOUR, STARTERS, reply } from './engine'

const isMobile = () => window.matchMedia('(max-width: 639px)').matches
const safe = (fn, fallback) => {
  try {
    return fn()
  } catch {
    return fallback
  }
}

function spotlight(id, reduced) {
  const section = document.getElementById(id)
  if (!section) return false
  const heading = section.querySelector('h1, h2') ?? section
  section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  heading.classList.remove('guide-spotlight')
  // Restart the animation even if the same heading is targeted twice in a row.
  void heading.offsetWidth
  if (!reduced) {
    heading.classList.add('guide-spotlight')
    setTimeout(() => heading.classList.remove('guide-spotlight'), 2700)
  }
  return true
}

function Actions({ actions, onScroll }) {
  if (!actions?.length) return null
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {actions.map((a) =>
        a.scrollTo ? (
          <button
            key={a.label}
            type="button"
            onClick={() => onScroll(a.scrollTo)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand-text px-3.5 py-1.5 text-[12.5px] font-semibold text-white"
          >
            {a.label}
            <Icon name="arrow" className="size-3" />
          </button>
        ) : (
          <a
            key={a.label}
            href={a.href}
            target={/^https?:/.test(a.href) ? '_blank' : undefined}
            rel={/^https?:/.test(a.href) ? 'noopener noreferrer' : undefined}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-2 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink"
          >
            {a.label}
            <Icon name="arrowUpRight" className="size-3" />
          </a>
        ),
      )}
    </div>
  )
}

export default function GuideWidget({ ready = true }) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [tourIdx, setTourIdx] = useState(null)
  const [hint, setHint] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const fabRef = useRef(null)
  const seeded = useRef(false)
  const timers = useRef([])

  const later = (fn, ms) => {
    const t = setTimeout(fn, reduced ? 0 : ms)
    timers.current.push(t)
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const push = useCallback((m) => setMessages((list) => [...list, { id: crypto.randomUUID(), ...m }]), [])

  const scrollTo = useCallback(
    (id, { fromTour = false } = {}) => {
      if (!spotlight(id, reduced)) {
        window.location.href = `/#${id}`
        return
      }
      // On a phone the open sheet would hide the section it just scrolled to.
      if (isMobile() && !fromTour) setOpen(false)
    },
    [reduced],
  )

  const showStep = useCallback(
    (i) => {
      const step = TOUR[i]
      setTourIdx(i)
      push({ role: 'bot', title: `${i + 1} of ${TOUR.length} · ${step.title}`, text: step.text, actions: step.actions })
      scrollTo(step.target, { fromTour: true })
    },
    [push, scrollTo],
  )

  const startTour = useCallback(() => {
    if (!document.getElementById('home')) {
      window.location.href = '/?tour=1'
      return
    }
    push({ role: 'bot', text: "Great, here's the tour. I'll scroll the page and highlight each section as we go." })
    showStep(0)
  }, [push, showStep])

  const endTour = (finished) => {
    setTourIdx(null)
    push({
      role: 'bot',
      text: finished
        ? 'That was the full tour. Ask me anything, or pick a topic:'
        : 'Tour ended. What would you like to know?',
      chips: STARTERS,
    })
  }

  const seed = useCallback(() => {
    if (seeded.current) return
    seeded.current = true
    push({
      role: 'bot',
      text: "Hi, I'm the portfolio guide. I can walk you through the site in about a minute, or answer questions about Abhishek's work. Everything I say comes from this page, nothing is made up.",
      chips: ['Start the guided tour', ...STARTERS.slice(1)],
    })
  }, [push])

  const send = (raw) => {
    const text = (raw ?? input).trim()
    if (!text) return
    setInput('')
    push({ role: 'user', text })
    if (/^(start|begin).*tour|^give me the tour$/i.test(text)) {
      setTyping(true)
      later(() => { setTyping(false); startTour() }, 350)
      return
    }
    setTyping(true)
    later(() => {
      setTyping(false)
      const r = reply(text)
      if (r.startTour) startTour()
      else push({ role: 'bot', ...r })
    }, 450)
  }

  // Open from the footer-less deep link used by demo pages.
  useEffect(() => {
    if (!ready) return
    if (safe(() => new URLSearchParams(window.location.search).get('tour') === '1', false)) {
      setOpen(true)
      seed()
      later(startTour, 900)
      window.history.replaceState({}, '', window.location.pathname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // One gentle nudge per session, never while the panel is open.
  useEffect(() => {
    if (!ready) return
    if (safe(() => sessionStorage.getItem('guide-hint'), null)) return
    const t1 = setTimeout(() => {
      setHint(true)
      safe(() => sessionStorage.setItem('guide-hint', '1'))
    }, 6000)
    const t2 = setTimeout(() => setHint(false), 15000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [ready])

  useEffect(() => {
    if (open) {
      seed()
      setHint(false)
      later(() => inputRef.current?.focus({ preventScroll: true }), 250)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [messages, typing, reduced])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        fabRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const lastBot = [...messages].reverse().find((m) => m.role === 'bot')
  const touring = tourIdx !== null
  const compact = touring && typeof window !== 'undefined' && isMobile()

  return (
    <>
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[45] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {hint && !open && (
            <motion.button
              type="button"
              initial={reduced ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={() => setOpen(true)}
              className="max-w-[16rem] rounded-2xl rounded-br-md border border-line bg-white px-4 py-3 text-left text-[13px] font-medium leading-snug text-ink shadow-float"
            >
              New here? I can give you a 1-minute tour of this portfolio.
            </motion.button>
          )}
        </AnimatePresence>

        {!open && (
          <motion.button
            ref={fabRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the portfolio guide"
            aria-haspopup="dialog"
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={reduced ? undefined : { y: -3 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="group flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-[13.5px] font-semibold text-white shadow-[0_16px_34px_-12px_rgba(2,2,26,0.6)]"
          >
            <span className="relative">
              <LogoMark className="size-8" />
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-ink" />
            </span>
            Ask my guide
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Portfolio guide"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className={`fixed inset-x-3 bottom-3 z-[60] flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_70px_-20px_rgba(20,20,60,0.45)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24.5rem] sm:max-h-[min(40rem,calc(100dvh-3rem))] ${
              compact ? 'max-h-[44dvh]' : 'max-h-[80dvh]'
            }`}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <header className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-brand-wash to-white px-4 py-3">
              <LogoMark className="size-9 shrink-0" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[14px] font-bold text-ink">Portfolio guide</p>
                <p className="text-[11.5px] text-ink-3">Answers come from this site only</p>
              </div>
              <button
                type="button"
                onClick={() => { setOpen(false); fabRef.current?.focus() }}
                aria-label="Close the guide"
                className="grid size-10 place-items-center rounded-full text-ink-2 hover:bg-surface-3"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
              {messages.map((m) =>
                m.role === 'user' ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-text px-3.5 py-2 text-[13.5px] text-white">{m.text}</p>
                  </div>
                ) : (
                  <div key={m.id} className="max-w-[94%] rounded-2xl rounded-bl-md bg-surface-3 px-3.5 py-3">
                    {m.title && <p className="mb-1 text-[11px] font-bold tracking-wide text-violet-text">{m.title.toUpperCase()}</p>}
                    <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink">{m.text}</p>
                    <Actions actions={m.actions} onScroll={scrollTo} />
                  </div>
                ),
              )}
              {typing && (
                <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-surface-3 px-4 py-3" aria-label="Guide is typing">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-1.5 animate-bounce rounded-full bg-ink-3 motion-reduce:animate-none" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-line bg-white px-4 pb-3 pt-3">
              {touring ? (
                <div className="flex items-center gap-2">
                  <button type="button" disabled={tourIdx === 0} onClick={() => showStep(tourIdx - 1)} className="min-h-10 rounded-full border border-line-2 px-4 text-[13px] font-semibold text-ink disabled:opacity-40">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => (tourIdx === TOUR.length - 1 ? endTour(true) : showStep(tourIdx + 1))}
                    className="min-h-10 flex-1 rounded-full bg-ink px-4 text-[13px] font-semibold text-white"
                  >
                    {tourIdx === TOUR.length - 1 ? 'Finish tour' : `Next: ${TOUR[tourIdx + 1].title}`}
                  </button>
                  <button type="button" onClick={() => endTour(false)} className="min-h-10 px-2 text-[12.5px] font-semibold text-ink-3">
                    End
                  </button>
                </div>
              ) : (
                <>
                  {lastBot?.chips && (
                    <ul className="-mx-1 mb-2.5 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {lastBot.chips.map((c) => (
                        <li key={c} className="shrink-0">
                          <button type="button" onClick={() => send(c)} className="min-h-9 rounded-full bg-brand-wash px-3.5 text-[12.5px] font-medium text-brand-ink">
                            {c}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex gap-2">
                    <label htmlFor="guide-input" className="sr-only">Ask the guide a question</label>
                    <input
                      id="guide-input"
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about projects, skills, experience…"
                      autoComplete="off"
                      enterKeyHint="send"
                      className="min-h-11 min-w-0 flex-1 rounded-full border border-line-2 bg-white px-4 text-[16px] outline-none focus:border-brand sm:text-[14px]"
                    />
                    <button type="submit" aria-label="Send" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white">
                      <Icon name="arrowUpRight" className="size-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
