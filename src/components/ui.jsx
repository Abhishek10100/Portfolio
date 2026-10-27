import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'

/* Motion system — one reveal recipe used everywhere, per the animation pack:
   opacity 0→1, y 24→0, scale .98→1, 0.5–0.8s, children staggered 0.05–0.12s. */
export const EASE = [0.22, 0.8, 0.28, 1]

const revealVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
}

const staggerParent = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/** Reveals its children once, when scrolled into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[Tag] ?? motion.div

  if (reduced) return <Tag className={className} {...rest}>{children}</Tag>

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: revealVariants.hidden,
        show: {
          ...revealVariants.show,
          transition: { ...revealVariants.show.transition, delay },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Parent that staggers `RevealItem` children into view. */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  as: Tag = 'div',
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[Tag] ?? motion.div

  if (reduced) return <Tag className={className} {...rest}>{children}</Tag>

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerParent(stagger, delay)}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({ children, className = '', as: Tag = 'div', ...rest }) {
  const reduced = useReducedMotion()
  const MotionTag = motion[Tag] ?? motion.div

  if (reduced) return <Tag className={className} {...rest}>{children}</Tag>

  return (
    <MotionTag className={className} variants={revealVariants} {...rest}>
      {children}
    </MotionTag>
  )
}

/**
 * Counts from 0 to `value` when scrolled into view, once.
 * The number stays real HTML text so it renders crisp and is selectable.
 */
export function Counter({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref}>
      {shown.toLocaleString()}
      {suffix}
    </span>
  )
}

/**
 * Ambient (looping) motion should only run while its element is on screen:
 * off-screen loops keep the main thread busy and make scrolling janky on
 * slower devices. Returns [ref, on]; `on` is false when off-screen or when the
 * visitor prefers reduced motion. Attach `ref` to the animated element.
 */
export function useAmbient(margin = '160px') {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const visible = useInView(ref, { margin })
  return [ref, visible && !reduced]
}

/** Small violet-dot eyebrow used above every section heading. */
const labelTones = {
  violet: { text: 'text-violet-text', dot: 'bg-violet' },
  brand: { text: 'text-brand-text', dot: 'bg-brand' },
}

/** `tone` follows the layout: violet eyebrows for most sections, periwinkle for the stack/journey cards. */
export function SectionLabel({ children, className = '', tone = 'violet' }) {
  const t = labelTones[tone] ?? labelTones.violet
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] ${t.text} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${t.dot}`} />
      {children}
    </div>
  )
}

/** Handwritten marginal note (Caveat), like the mockup's script annotations. */
export function ScriptNote({ children, className = '' }) {
  return (
    <span
      className={`font-hand text-brand/70 leading-[1.15] select-none ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

/* ------------------------------ icons ------------------------------ */
const paths = {
  sparkles:
    'M12 3l1.8 4.6L18.5 9.4 13.8 11.2 12 15.8 10.2 11.2 5.5 9.4 10.2 7.6 12 3zM18 15l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z',
  search:
    'M11 4a7 7 0 105.2 11.7l3.5 3.6a1 1 0 001.4-1.4l-3.5-3.6A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z',
  agent:
    'M12 2a1 1 0 011 1v1.6a6 6 0 015.4 5.4H20a1 1 0 110 2h-1.6A6 6 0 0113 17.4V19a1 1 0 11-2 0v-1.6A6 6 0 015.6 12H4a1 1 0 110-2h1.6A6 6 0 0111 4.6V3a1 1 0 011-1zm0 4.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2.5a2 2 0 110 4 2 2 0 010-4z',
  chart:
    'M4 20a1 1 0 01-1-1V5a1 1 0 112 0v13h14a1 1 0 110 2H4zm4-4a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1zm4 0a1 1 0 01-1-1V8a1 1 0 112 0v7a1 1 0 01-1 1zm4 0a1 1 0 01-1-1v-5a1 1 0 112 0v5a1 1 0 01-1 1z',
  eye: 'M12 5c-4.6 0-8.3 3.3-9.8 6.6a1 1 0 000 .8C3.7 15.7 7.4 19 12 19s8.3-3.3 9.8-6.6a1 1 0 000-.8C20.3 8.3 16.6 5 12 5zm0 2c3.5 0 6.5 2.4 7.8 5-1.3 2.6-4.3 5-7.8 5s-6.5-2.4-7.8-5C5.5 9.4 8.5 7 12 7zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z',
  bars: 'M5 21a1 1 0 01-1-1V10a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1H5zm6 0a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 011 1v16a1 1 0 01-1 1h-2zm6 0a1 1 0 01-1-1v-6a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2z',
  target:
    'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zm0 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z',
  grid: 'M4 3h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 0h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V4a1 1 0 011-1zM4 13h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6a1 1 0 011-1zm10 0h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1v-6a1 1 0 011-1z',
  wrench:
    'M14.7 3a6 6 0 00-5.6 8.1L3.4 16.8a2 2 0 102.8 2.8l5.7-5.7A6 6 0 0020.6 7l-3 3-2.6-2.6 3-3A6 6 0 0014.7 3z',
  rocket:
    'M14 3c3.3 0 6 2.7 6 6 0 3.6-2.6 7-6.4 9.6a1 1 0 01-1.2 0C8.6 16 6 12.6 6 9c0-3.3 2.7-6 6-6h2zm-1 4.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM7 19c0 1.7-1 3-3 3 0-2 1.3-3 3-3z',
  gauge:
    'M12 4a9 9 0 018.1 12.9 1 1 0 01-.9.6H4.8a1 1 0 01-.9-.6A9 9 0 0112 4zm0 2a7 7 0 00-6.2 9.5h12.4A7 7 0 0012 6zm3.6 2.9a1 1 0 01.2 1.4l-2.6 3.4a1.6 1.6 0 11-1.6-1.2l2.6-3.4a1 1 0 011.4-.2z',
  arrow: 'M5 12h12.2l-4.9-4.9a1 1 0 011.4-1.4l6.6 6.6a1 1 0 010 1.4l-6.6 6.6a1 1 0 01-1.4-1.4l4.9-4.9H5a1 1 0 110-2z',
  arrowUpRight: 'M8 6h9a1 1 0 011 1v9a1 1 0 11-2 0V9.4l-9.3 9.3a1 1 0 01-1.4-1.4L14.6 8H8a1 1 0 110-2z',
  download:
    'M12 3a1 1 0 011 1v9.6l3.3-3.3a1 1 0 011.4 1.4l-5 5a1 1 0 01-1.4 0l-5-5a1 1 0 011.4-1.4l3.3 3.3V4a1 1 0 011-1zM5 18a1 1 0 011 1v1h12v-1a1 1 0 112 0v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z',
  mail: 'M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2.6 0l6.4 4.8L18.4 6H5.6zM19 8.2l-6.4 4.8a1 1 0 01-1.2 0L5 8.2V18h14V8.2z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9V9z',
  github:
    'M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.84.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0012 2z',
  book: 'M4 4.5A2.5 2.5 0 016.5 2H19a1 1 0 011 1v15a1 1 0 01-1 1H6.5a.5.5 0 000 1H19a1 1 0 110 2H6.5A2.5 2.5 0 014 19.5v-15zm2.5-.5a.5.5 0 00-.5.5V17h12V4H6.5z',
  award:
    'M12 2a6 6 0 013.3 11l1.6 7.2a1 1 0 01-1.5 1.1L12 19.2 8.6 21.3a1 1 0 01-1.5-1.1L8.7 13A6 6 0 0112 2zm0 2a4 4 0 100 8 4 4 0 000-8z',
  play: 'M8 5.1a1 1 0 011.5-.9l9 6.9a1 1 0 010 1.8l-9 6.9A1 1 0 018 19V5.1z',
}

export function Icon({ name, className = 'size-5', ...rest }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d={d} />
    </svg>
  )
}
