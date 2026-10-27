import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks, profile } from '../data/site'
import { Icon, EASE } from './ui'
import { LogoMark } from './Logo'

/**
 * Highlights the last nav section whose top has passed the reading line.
 * Sections that share a top edge (Experience and Research sit side by side)
 * tie to the first in nav order, so the highlight never flickers between them.
 */
function useActiveSection() {
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean)

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = els[0]
      let best = -Infinity
      for (const el of els) {
        const top = el.getBoundingClientRect().top
        if (top <= line && top > best + 8) {
          best = top
          current = el
        }
      }
      if (current) setActive(`#${current.id}`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return active
}

export default function Nav() {
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

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: hidden ? -100 : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      // Tabbing into a bar that has slid away would leave focus on nothing visible.
      onFocusCapture={() => setHidden(false)}
    >
      <div className="shell pt-3 md:pt-4">
        {/* The bar is wider than the page content by its own padding, so the
            logo lines up with the hero copy. */}
        <nav
          aria-label="Primary"
          className={`-mx-2 flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/85 px-3 py-3 backdrop-blur-xl transition-shadow duration-300 md:-mx-5 md:px-5 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
            scrolled
              ? 'shadow-[0_12px_34px_-14px_rgba(20,20,43,0.24)]'
              : 'shadow-card'
          }`}
        >
          <a
            href="#home"
            aria-label={`${profile.name}, back to top`}
            className="flex items-center gap-3 justify-self-start"
          >
            <LogoMark className="size-10 shrink-0 drop-shadow-[0_6px_14px_rgba(79,107,245,0.35)]" />
            <span className="hidden leading-tight sm:block">
              <span className="block text-[14.5px] font-bold text-ink">
                {profile.name}
              </span>
              <span className="block text-[11.5px] text-ink-3">{profile.role}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative inline-block rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
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

          <div className="flex items-center justify-end gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(2,2,26,0.6)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Let's Talk
              <Icon
                name="arrowUpRight"
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-line bg-white lg:hidden"
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
            <motion.nav
              id="mobile-menu"
              aria-label="Primary mobile"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="-mx-2 overflow-hidden pb-3 md:-mx-5 lg:hidden"
            >
              <ul className="mt-2 grid gap-1 rounded-2xl border border-line bg-white/95 p-2 shadow-card backdrop-blur-xl">
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
                    className="mt-1 block rounded-xl bg-ink px-3 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Let's Talk
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
