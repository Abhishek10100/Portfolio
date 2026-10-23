import { motion, useReducedMotion } from 'framer-motion'
import { demoLab } from '../data/site'
import { Icon, Reveal, RevealGroup, RevealItem, SectionLabel } from './ui'

export default function DemoLab() {
  const reduced = useReducedMotion()
  const liveCount = demoLab.items.filter((d) => d.live).length

  return (
    <section id="demos" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[40rem]">
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
            {liveCount} LIVE · NO SERVER
          </span>
        </Reveal>

        <RevealGroup
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          stagger={0.05}
        >
          {demoLab.items.map((d) => (
            <RevealItem key={d.href}>
              <motion.a
                href={d.href}
                whileHover={reduced ? {} : { y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] hover:border-brand/35 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[14.5px] font-bold leading-tight text-ink">
                    {d.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-wider ${
                      d.live
                        ? 'bg-emerald-500/12 text-emerald-700'
                        : 'bg-surface-3 text-ink-3'
                    }`}
                  >
                    {d.live ? 'LIVE' : 'STATIC'}
                  </span>
                </div>

                <p className="mt-2 text-[12.5px] leading-[1.6] text-ink-2">
                  {d.body}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12px] font-semibold text-brand-text">
                  {d.live ? 'Run it' : 'Open'}
                  <Icon
                    name={d.live ? 'play' : 'arrowUpRight'}
                    className="size-3 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
