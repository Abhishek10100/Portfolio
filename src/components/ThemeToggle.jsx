import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../theme'
import { EASE } from './ui'

const Sun = () => (
  <svg viewBox="0 0 24 24" className="size-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
  </svg>
)
const Moon = () => (
  <svg viewBox="0 0 24 24" className="size-[19px]" fill="currentColor" aria-hidden="true">
    <path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a.8.8 0 0 0-1.1-.9 9.6 9.6 0 1 0 12.8 12.8.8.8 0 0 0-.9-1.1Z" />
  </svg>
)

/** Light/dark switch. The icon shows the theme you'd switch TO. */
export default function ThemeToggle({ className = '' }) {
  const [theme, toggle] = useTheme()
  const reduced = useReducedMotion()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      title={dark ? 'Light theme' : 'Dark theme'}
      className={`grid size-10 shrink-0 place-items-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:text-ink ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={reduced ? false : { opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="grid place-items-center"
        >
          {dark ? <Sun /> : <Moon />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
