import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE } from './ui'

/**
 * Brief branded hold while fonts and the hero image settle.
 * Dots converge into the monogram, then the whole thing lifts away.
 */
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const ms = reduced ? 220 : 1500
    const t = setTimeout(() => {
      setShow(false)
      onDone?.()
    }, ms)
    return () => clearTimeout(t)
  }, [reduced, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-page"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
        >
          <div className="relative grid place-items-center">
            {/* Ambient glow */}
            <motion.div
              className="absolute size-64 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, var(--glow-a), transparent 70%)',
              }}
              animate={reduced ? {} : { scale: [0.9, 1.08, 0.9], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbiting dots that settle inward */}
            {!reduced &&
              [0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="absolute size-2 rounded-full bg-brand"
                  initial={{
                    x: Math.cos((i / 4) * Math.PI * 2) * 74,
                    y: Math.sin((i / 4) * Math.PI * 2) * 74,
                    opacity: 0,
                  }}
                  animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.3,
                    delay: i * 0.1,
                    ease: EASE,
                  }}
                />
              ))}

            <motion.div
              className="relative grid size-16 place-items-center rounded-2xl bg-ink text-lg font-extrabold tracking-tight text-page"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              AT
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-16 h-px w-40 overflow-hidden rounded-full bg-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-brand"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: reduced ? 0.2 : 1.4, ease: EASE }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
