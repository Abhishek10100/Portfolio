import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/site'
import { Icon, Reveal, SectionLabel } from './ui'
import ProjectArt from './ProjectArt'

function ProjectCard({ item }) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      whileHover={reduced ? {} : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="theme-tx group flex h-full snap-start flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm hover:border-brand/35 hover:shadow-float"
    >
      <div className="relative aspect-[320/170] overflow-hidden border-b border-line bg-surface-3">
        <div className="size-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectArt kind={item.art} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16.5px] font-bold leading-tight text-ink">
          {item.title}
        </h3>
        <p className="mt-1 text-[12.5px] font-medium text-ink-3">
          {item.subtitle}
        </p>

        <p className="mt-3 text-[13px] leading-[1.6] text-ink-2">{item.body}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <li
              key={t}
              className="theme-tx rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-2"
            >
              {t}
            </li>
          ))}
        </ul>

        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4 [margin-block-start:1.25rem]">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-[15px] font-extrabold leading-tight text-ink">
                {m.value}
              </dt>
              <dd className="mt-0.5 text-[11px] leading-tight text-ink-3">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const railRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const nudge = (dir) => {
    const el = railRef.current
    if (!el) return
    // Scroll by one card plus its gap.
    const card = el.querySelector('[data-card]')
    const step = card ? card.clientWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <SectionLabel>{projects.eyebrow}</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,3.8vw,2.5rem)] font-extrabold text-ink">
              {projects.title}
            </h2>
            <p className="mt-2 text-[15px] text-ink-2">{projects.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#experience"
              className="theme-tx group inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-surface px-4 py-2.5 text-[13px] font-semibold text-ink"
            >
              View All Projects
              <Icon
                name="arrowUpRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <div className="hidden gap-1.5 md:flex">
              {[
                { dir: -1, disabled: atStart, label: 'Previous projects', rot: 'rotate-180' },
                { dir: 1, disabled: atEnd, label: 'Next projects', rot: '' },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => nudge(b.dir)}
                  disabled={b.disabled}
                  aria-label={b.label}
                  className="theme-tx grid size-10 place-items-center rounded-full border border-line-2 bg-surface text-ink transition-opacity disabled:opacity-35"
                >
                  <Icon name="arrow" className={`size-4 ${b.rot}`} />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className="-mx-5 mt-8 md:-mx-8"
        >
          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.items.map((item) => (
              <div
                key={item.title}
                data-card
                className="w-[min(85vw,20rem)] shrink-0 lg:w-[calc((100%-3rem)/4)]"
              >
                <ProjectCard item={item} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
