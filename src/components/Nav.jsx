import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks, profile } from '../data/site'
import { Icon, EASE } from './ui'

/** Highlights whichever section currently owns the viewport. */
function useActiveSection() {
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-tx relative grid size-9 place-items-center rounded-full border border-line bg-surface text-ink-2 hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="grid place-items-center"
        >
          <Icon name={dark ? 'moon' : 'sun'} className="size-[18px]" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Nav({ dark, onToggleTheme }) {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Condense on scroll down, reveal fully on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 320 && !menuOpen)
  })

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: hidden ? -100 : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="shell pt-3 md:pt-4">
        <nav
          className={`theme-tx flex items-center justify-between gap-4 rounded-2xl border px-4 md:px-5 ${
            scrolled
              ? 'border-line bg-surface/80 py-2.5 shadow-card backdrop-blur-xl'
              : 'border-transparent bg-transparent py-3.5'
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-ink text-[13px] font-extrabold tracking-tight text-page">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13.5px] font-bold text-ink">
                {profile.name}
              </span>
              <span className="block text-[11px] text-ink-3">{profile.role}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative inline-block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
                      isActive ? 'text-brand-ink' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-wash"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />

            <a
              href={`mailto:${profile.email}`}
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-page transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Let's Talk
              <Icon
                name="arrowUpRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-full border border-line bg-surface lg:hidden"
            >
              <span className="grid gap-[5px]">
                <span
                  className={`block h-[1.5px] w-4 bg-ink transition-transform ${
                    menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-ink transition-opacity ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-ink transition-transform ${
                    menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="mt-2 grid gap-1 rounded-2xl border border-line bg-surface/95 p-2 shadow-card backdrop-blur-xl">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-2 hover:bg-surface-3 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={() => setMenuOpen(false)}
                    className="mt-1 block rounded-xl bg-ink px-3 py-2.5 text-center text-sm font-semibold text-page"
                  >
                    Let's Talk
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
