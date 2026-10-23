import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { demoLab } from '../data/site'
import { EASE, Icon, Reveal, RevealGroup, RevealItem, SectionLabel } from './ui'

export default function DemoLab() {
  const reduced = useReducedMotion()
  const [showEarlier, setShowEarlier] = useState(false)
  const { earlier } = demoLab

  return (
    <section id="demos" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[44rem]">
            <SectionLabel>{demoLab.eyebrow}</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,3.8vw,2.5rem)] font-extrabold text-ink">
              {demoLab.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
              {demoLab.subtitle}
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2 text-[11.5px] font-bold tracking-wide text-emerald-700">
            <span className="relative flex size-1.5">
              {!reduced && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
              )}
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {demoLab.items.length} LIVE · NO SERVER
          </span>
        </Reveal>

        <RevealGroup
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          stagger={0.06}
        >
          {demoLab.items.map((d) => (
            <RevealItem key={d.href}>
              <motion.a
                href={d.href}
                whileHover={reduced ? {} : { y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] hover:border-brand/35 hover:shadow-float"
              >
                <h3 className="text-[16px] font-bold leading-tight text-ink">{d.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-ink-2">{d.body}</p>
                <p className="mt-3 rounded-lg bg-brand-wash/60 px-3 py-2 text-[11.5px] leading-snug text-ink-2">
                  <span className="font-bold text-brand-ink">Real: </span>
                  {d.real}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-brand-text">
                  Try it
                  <Icon
                    name="play"
                    className="size-3 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8">
          <button
            type="button"
            onClick={() => setShowEarlier((v) => !v)}
            aria-expanded={showEarlier}
            aria-controls="earlier-work"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink-2 hover:text-ink"
          >
            {earlier.label}
            <Icon
              name="arrow"
              className={`size-3.5 transition-transform ${showEarlier ? 'rotate-90' : ''}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {showEarlier && (
              <motion.div
                id="earlier-work"
                initial={reduced ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={reduced ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-[13px] text-ink-3">{earlier.note}</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {earlier.items.map((d) => (
                    <li key={d.href}>
                      <a
                        href={d.href}
                        className="block h-full rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/35"
                      >
                        <span className="text-[14px] font-bold text-ink">{d.name}</span>
                        <span className="mt-1 block text-[12.5px] leading-snug text-ink-2">{d.body}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
