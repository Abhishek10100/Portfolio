import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { process, techStack } from '../data/site'
import { Icon, Reveal, RevealGroup, RevealItem, SectionLabel } from './ui'
import BrandMark, { hasBrand } from './BrandMark'

/* Each step gets its own hue, so the rail reads as a sequence rather than
   six identical badges. */
const stepTones = {
  rose: 'border-rose-400/40 bg-rose-500/10 text-rose-500',
  sky: 'border-sky-400/40 bg-sky-500/10 text-sky-500',
  teal: 'border-teal-400/40 bg-teal-500/10 text-teal-500',
  indigo: 'border-indigo-400/40 bg-indigo-500/10 text-indigo-500',
  violet: 'border-violet-400/40 bg-violet-500/10 text-violet-500',
  fuchsia: 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-500',
}

function ProcessRail() {
  const reduced = useReducedMotion()

  return (
    <div className="theme-tx flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-card md:p-9">
      <Reveal>
        <SectionLabel>{process.eyebrow}</SectionLabel>
        <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold text-ink">
          {process.title}
        </h2>
        <p className="mt-2 text-[14.5px] text-ink-2">{process.subtitle}</p>
      </Reveal>

      {/* Centred in whatever height the taller stack panel sets. */}
      <RevealGroup
        className="my-auto grid grid-cols-3 gap-y-7 pt-10 sm:grid-cols-6"
        stagger={0.09}
      >
        {process.steps.map((step, i) => (
          <RevealItem
            key={step.n}
            className="relative flex flex-col items-center text-center"
          >
            {/* connector into the next step */}
            {i < process.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-6 hidden w-full items-center pl-7 pr-1 sm:flex"
              >
                <span className="h-px flex-1 bg-line-2" />
                <Icon name="arrow" className="size-3 shrink-0 text-ink-3/60" />
              </span>
            )}

            <motion.span
              whileHover={reduced ? {} : { y: -4, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              className={`theme-tx relative z-10 grid size-12 place-items-center rounded-full border ${
                stepTones[step.tone] ?? stepTones.indigo
              }`}
            >
              <Icon name={step.icon} className="size-5" />
            </motion.span>

            <span className="mt-3 text-[11px] font-bold tracking-wider text-ink-3">
              {step.n}
            </span>
            <span className="mt-0.5 text-[13px] font-semibold leading-tight text-ink">
              {step.title}
            </span>
            <span className="text-[13px] leading-tight text-ink-2">
              {step.sub}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}

function StackPanel() {
  const [tab, setTab] = useState('All')
  const reduced = useReducedMotion()

  const shown =
    tab === 'All'
      ? techStack.items
      : techStack.items.filter((t) => t.group === tab)

  const tiles = shown.filter((t) => hasBrand(t.name))
  const chips = shown.filter((t) => !hasBrand(t.name))

  return (
    <div className="theme-tx rounded-3xl border border-line bg-surface p-7 shadow-card md:p-9">
      <Reveal>
        <SectionLabel>{techStack.eyebrow}</SectionLabel>
        <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold text-ink">
          {techStack.title}
        </h2>
      </Reveal>

      <Reveal delay={0.06} className="mt-6 flex flex-wrap gap-1.5">
        {techStack.groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setTab(g)}
            aria-pressed={tab === g}
            className={`relative rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
              tab === g ? 'text-brand-ink' : 'text-ink-2 hover:text-ink'
            }`}
          >
            {tab === g && (
              <motion.span
                layoutId="stack-tab"
                className="absolute inset-0 -z-10 rounded-full bg-brand-wash"
                transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              />
            )}
            {g}
          </button>
        ))}
      </Reveal>

      {/* Products get logo tiles; capabilities (RAG, NLP, forecasting…) are
          skills rather than brands, so they read as chips instead of tiles. */}
      <motion.ul
        layout={!reduced}
        className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4"
      >
        {tiles.map((t) => (
          <motion.li
            key={t.name}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            whileHover={reduced ? {} : { y: -4 }}
            className="theme-tx flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface-2 px-2 py-3.5 text-center hover:border-brand/35 hover:shadow-card"
          >
            <BrandMark name={t.name} className="size-7" />
            <span className="text-[11px] font-medium leading-tight text-ink-2">
              {t.name}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {chips.length > 0 && (
        <motion.ul layout={!reduced} className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((t) => (
            <motion.li
              key={t.name}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="theme-tx rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[11.5px] font-medium text-ink-2"
            >
              {t.name}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}

export default function Process() {
  return (
    <section className="py-16 md:py-20">
      <div className="shell grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <ProcessRail />
        <StackPanel />
      </div>
    </section>
  )
}
