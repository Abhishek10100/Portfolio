import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects, profile } from '../data/site'
import { Icon, Reveal, RevealGroup, RevealItem, SectionLabel } from './ui'
import ProjectArt from './ProjectArt'

// Long text metrics ("Multi-source") need a smaller face than short numbers ("70%").
const metricSize = (value) => (value.length > 7 ? 'text-[15px] font-bold' : 'text-[20px] font-extrabold')

function ProjectCard({ item }) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-3 shadow-card transition-shadow duration-300 hover:shadow-float"
    >
      <div className="relative isolate aspect-video overflow-hidden rounded-xl bg-brand-wash ring-1 ring-inset ring-brand-ink/5">
        <div className="size-full origin-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
          <ProjectArt kind={item.art} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="text-[17px] font-bold leading-tight text-ink">
          {item.title}
        </h3>
        <p className="mt-1 text-[13px] text-ink-3">{item.subtitle}</p>
        <p className="sr-only">{item.body}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-brand-wash px-3 py-1 text-[11.5px] font-medium text-brand-ink"
            >
              {t}
            </li>
          ))}
        </ul>

        <dl className="mt-auto grid grid-cols-2 pt-6">
          {item.metrics.map((m, i) => (
            <div key={m.label} className={i > 0 ? 'border-l border-line-2 pl-4' : 'pr-3'}>
              <dt className={`leading-tight tracking-tight text-ink ${metricSize(m.value)}`}>
                {m.value}
              </dt>
              <dd className="mt-1 text-[12px] leading-snug text-ink-3">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 border-t border-line pt-4">
          {item.demo ? (
            <a
              href={item.demo.href}
              className="group/cta inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-brand-text"
            >
              {item.demo.label}
              <span className="sr-only">: {item.title}</span>
              <Icon
                name="arrow"
                className="size-3.5 transition-transform group-hover/cta:translate-x-1"
              />
            </a>
          ) : (
            <span className="text-[13px] font-medium text-ink-3">
              Client prototype · no public demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const railRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  // At lg+ all four cards fit, so there is nothing to scroll and no arrows to show.
  const [overflowing, setOverflowing] = useState(false)

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    setOverflowing(el.scrollWidth > el.clientWidth + 4)
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
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.4rem)] font-extrabold leading-[1.1] text-ink">
              {projects.title}
            </h2>
            <p className="mt-2 text-[15px] text-ink-2">{projects.subtitle}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[13px] font-semibold text-ink shadow-card transition-shadow hover:shadow-float"
            >
              View All Projects
              <span className="sr-only">(opens GitHub in a new tab)</span>
              <Icon
                name="arrowUpRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <div className={`hidden gap-2 ${overflowing ? 'md:flex' : ''}`}>
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
                  className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-card transition-[opacity,box-shadow] enabled:hover:shadow-float disabled:opacity-40"
                >
                  <Icon name="arrow" className={`size-4 ${b.rot}`} />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Top and bottom padding keep the hover lift and the deeper shadow
            from being clipped by the scroll container. */}
        <div className="-mx-5 -mb-6 mt-5 md:-mx-8">
          <RevealGroup
            ref={railRef}
            role="region"
            aria-label="Featured projects"
            tabIndex={0}
            stagger={0.1}
            className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-10 pt-4 md:scroll-px-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.items.map((item) => (
              <RevealItem
                key={item.title}
                data-card
                className="w-[min(85vw,20rem)] shrink-0 snap-start lg:w-[calc((100%-3rem)/4)]"
              >
                <ProjectCard item={item} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
