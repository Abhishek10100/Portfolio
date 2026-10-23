import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { process, techStack } from '../data/site'
import {
  EASE,
  Icon,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionLabel,
} from './ui'
import BrandMark, { hasBrand } from './BrandMark'

const card =
  'rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7 md:p-8'

const heading =
  'mt-4 text-[clamp(1.5rem,2.8vw,1.9rem)] font-extrabold text-ink'

/* Each step gets its own hue, so the rail reads as a sequence rather than
   six identical badges. */
const stepTones = {
  rose: 'from-rose-100 to-rose-50 text-rose-600 shadow-[0_10px_22px_-10px_rgba(244,63,94,0.55),inset_0_1px_0_#fff]',
  sky: 'from-sky-100 to-sky-50 text-sky-600 shadow-[0_10px_22px_-10px_rgba(14,165,233,0.55),inset_0_1px_0_#fff]',
  teal: 'from-teal-100 to-teal-50 text-teal-600 shadow-[0_10px_22px_-10px_rgba(20,184,166,0.55),inset_0_1px_0_#fff]',
  indigo:
    'from-indigo-100 to-indigo-50 text-indigo-600 shadow-[0_10px_22px_-10px_rgba(99,102,241,0.55),inset_0_1px_0_#fff]',
  violet:
    'from-violet-100 to-violet-50 text-violet-600 shadow-[0_10px_22px_-10px_rgba(139,92,246,0.55),inset_0_1px_0_#fff]',
  fuchsia:
    'from-fuchsia-100 to-fuchsia-50 text-fuchsia-600 shadow-[0_10px_22px_-10px_rgba(217,70,239,0.55),inset_0_1px_0_#fff]',
}

/* Light line plus a small chevron, centred in the gap between two badges.
   Position and length derive from --b (badge size) set on the rail. */
function Connector() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-[calc(50%+var(--b)/2)] top-[calc(var(--b)/2)] hidden w-[calc(100%-var(--b))] -translate-y-1/2 justify-center text-ink-3 sm:flex"
    >
      <span className="flex w-[calc(100%-1rem)] max-w-12 items-center">
        <span className="h-px flex-1 bg-current opacity-35" />
        <svg
          viewBox="0 0 8 12"
          className="-ml-px h-2.5 w-[7px] shrink-0 opacity-80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1.5 1.5 6 6l-4.5 4.5" />
        </svg>
      </span>
    </span>
  )
}

function ProcessRail() {
  const reduced = useReducedMotion()

  return (
    <div className={`flex flex-col ${card}`}>
      <Reveal>
        <SectionLabel>{process.eyebrow}</SectionLabel>
        <h2 className={heading}>{process.title}</h2>
        <p className="mt-2 text-[14.5px] text-ink-2">{process.subtitle}</p>
      </Reveal>

      <RevealGroup
        className="mt-10 grid grid-cols-3 gap-y-8 pb-1 [--b:3rem] sm:grid-cols-6 lg:max-xl:[--b:3.5rem]"
        stagger={0.09}
      >
        {process.steps.map((step, i) => (
          <RevealItem
            key={step.n}
            className={`relative flex flex-col items-center px-1 text-center ${
              i > 0
                ? 'sm:before:absolute sm:before:bottom-0 sm:before:left-0 sm:before:top-[calc(var(--b)+0.5rem)] sm:before:w-px sm:before:bg-line'
                : ''
            }`}
          >
            {i < process.steps.length - 1 && <Connector />}

            <motion.span
              whileHover={reduced ? {} : { y: -4, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              className={`relative z-10 grid size-(--b) place-items-center rounded-full border border-white bg-linear-to-br ${
                stepTones[step.tone] ?? stepTones.indigo
              }`}
            >
              <Icon name={step.icon} className="size-[42%]" />
            </motion.span>

            <span className="mt-4 text-[12px] font-semibold tabular-nums tracking-wider text-ink-3">
              {step.n}
            </span>
            <span className="mt-0.5 text-[13.5px] font-bold leading-tight text-ink">
              {step.title}
            </span>
            <span className="mt-0.5 text-[12.5px] leading-tight text-ink-2">
              {step.sub}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}

/* The brands that best represent the work lead every tab they appear in;
   everything else keeps its order from site.js. */
const spotlight = [
  'OpenAI',
  'Azure OpenAI',
  'LangChain',
  'LangGraph',
  'AWS',
  'Gemini',
  'ChromaDB',
  'Pinecone',
  'Docker',
  'Streamlit',
]
const rank = (name) => {
  const i = spotlight.indexOf(name)
  return i === -1 ? spotlight.length : i
}
const ordered = [...techStack.items].sort((a, b) => rank(a.name) - rank(b.name))

/* Products get logo tiles; capabilities (RAG, NLP, forecasting...) are skills
   rather than brands, so they read as chips instead of tiles. */
const views = Object.fromEntries(
  techStack.groups.map((g) => {
    const items = g === 'All' ? ordered : ordered.filter((t) => t.group === g)
    return [
      g,
      {
        tiles: items.filter((t) => hasBrand(t.name)),
        chips: items.filter((t) => !hasBrand(t.name)),
      },
    ]
  }),
)

const TILE_LIMIT = 10
const cta = { more: 'View Full Stack', less: 'Show less' }

/* Shared enter/exit recipe: fade + scale .96 -> 1 over .25s. */
const pop = (reduced, delay = 0) => ({
  initial: { opacity: 0, scale: reduced ? 1 : 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: reduced ? 0.01 : 0.25,
      ease: EASE,
      delay: reduced ? 0 : delay,
    },
  },
  exit: {
    opacity: 0,
    scale: reduced ? 1 : 0.96,
    transition: { duration: reduced ? 0.01 : 0.15 },
  },
})

function Tile({ item, ...motionProps }) {
  return (
    <motion.li
      {...motionProps}
      className="flex h-[5.25rem] flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white px-1.5 text-center shadow-[0_1px_2px_rgba(20,20,43,0.04)] transition-[translate,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-1 hover:border-brand/35 hover:shadow-card"
    >
      <span aria-hidden="true" className="flex">
        <BrandMark name={item.name} className="size-7" />
      </span>
      <span className="text-[11px] font-medium leading-tight text-ink-2">
        {item.name}
      </span>
    </motion.li>
  )
}

function StackPanel() {
  const reduced = useReducedMotion()
  const uid = useId()
  const panelId = `${uid}-panel`
  // The layout opens on GenAI, the most representative tab.
  const [tab, setTab] = useState(
    techStack.groups.includes('GenAI') ? 'GenAI' : techStack.groups[0],
  )
  const [expanded, setExpanded] = useState(false)
  const tabRefs = useRef([])

  const { tiles, chips } = views[tab]
  // Only tabs with more than ten logos have anything to expand; the rest
  // already show every item, chips included.
  const truncated = tiles.length > TILE_LIMIT
  const showAll = !truncated || expanded
  const extraTiles = expanded ? tiles.slice(TILE_LIMIT) : []

  const select = (group) => {
    setTab(group)
    setExpanded(false)
  }

  const onKeyDown = (e, i) => {
    const last = techStack.groups.length - 1
    let next
    if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1
    else if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    select(techStack.groups[next])
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={card}>
      <Reveal>
        <SectionLabel tone="brand">{techStack.eyebrow}</SectionLabel>
        <h2 className={heading}>{techStack.title}</h2>
      </Reveal>

      <Reveal delay={0.06} className="mt-6">
        <div
          role="tablist"
          aria-label={techStack.title}
          className="flex max-w-full gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {techStack.groups.map((g, i) => {
            const active = tab === g
            return (
              <button
                key={g}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`${uid}-tab-${g}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => select(g)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[12.5px] font-semibold transition-colors focus-visible:outline-offset-2 ${
                  active
                    ? 'text-white'
                    : 'bg-brand-wash/70 text-ink-2 hover:bg-brand-wash hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="stack-tab"
                    className="absolute inset-0 rounded-full bg-brand-text shadow-[0_8px_18px_-8px_rgba(68,87,216,0.75)]"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative">{g}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-5">
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${tab}`}
          className="relative min-[480px]:min-h-[11.125rem]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={tab} className="origin-top" {...pop(reduced)}>
              <ul className="grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-5">
                {tiles.slice(0, TILE_LIMIT).map((t) => (
                  <Tile key={t.name} item={t} />
                ))}
                <AnimatePresence initial={false}>
                  {extraTiles.map((t, i) => (
                    <Tile
                      key={t.name}
                      item={t}
                      {...pop(reduced, Math.min(i * 0.025, 0.3))}
                    />
                  ))}
                </AnimatePresence>
              </ul>

              <AnimatePresence initial={false}>
                {showAll && chips.length > 0 && (
                  <motion.ul
                    key="chips"
                    className="mt-3 flex flex-wrap gap-2"
                    {...pop(reduced)}
                  >
                    {chips.map((t) => (
                      <li
                        key={t.name}
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink-2"
                      >
                        {t.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      {/* Reserved even when empty, so switching tabs never moves the card edge. */}
      <div className="mt-4 flex h-9 items-center justify-end">
        {truncated && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((v) => !v)}
            className="group inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-brand-ink"
          >
            {expanded ? cta.less : cta.more}
            <Icon
              name="arrow"
              className={`size-3.5 transition-transform ${
                expanded ? '-rotate-90' : 'group-hover:translate-x-0.5'
              }`}
            />
          </button>
        )}
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section className="py-16 md:py-20">
      <div className="shell grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ProcessRail />
        <StackPanel />
      </div>
    </section>
  )
}
