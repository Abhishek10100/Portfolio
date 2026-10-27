import { motion, useReducedMotion } from 'framer-motion'
import { about, whatIDo } from '../data/site'
import {
  EASE,
  Icon,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionLabel,
  ScriptNote,
} from './ui'

const tones = {
  brand: 'from-brand/25 to-brand/10 text-brand',
  violet: 'from-violet/25 to-violet/10 text-violet',
  sky: 'from-sky-400/25 to-sky-400/10 text-sky-500',
  amber: 'from-amber-400/30 to-amber-400/10 text-amber-500',
  indigo: 'from-indigo-500/25 to-indigo-500/10 text-indigo-500',
  teal: 'from-teal-400/25 to-teal-400/10 text-teal-500',
}

const panelBg = {
  background:
    'linear-gradient(150deg, color-mix(in srgb, var(--brand) 8%, var(--card)), var(--surface) 52%, color-mix(in srgb, var(--violet) 6%, var(--card)))',
}

const glowBg = {
  background:
    'radial-gradient(closest-side, color-mix(in srgb, var(--brand) 24%, transparent), color-mix(in srgb, var(--violet) 10%, transparent) 62%, transparent)',
}

// The render is a short bust. Its lower edge dissolves behind the quote card
// instead of ending in a visible straight cut.
const fadeOut =
  'linear-gradient(to bottom, #000 72%, transparent 100%)'
const bustFade = { WebkitMaskImage: fadeOut, maskImage: fadeOut }

const viewport = { once: true, margin: '-60px' }

/** Hand-drawn arrow from the script note toward the character. */
function NoteArrow({ reduced }) {
  const props = {
    d: 'M4 4C18 2 40 12 48 34',
    strokeWidth: 1.7,
  }
  return (
    <svg
      viewBox="0 0 56 44"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute left-[8%] top-[2%] w-12 text-brand-ink/70 lg:w-14"
    >
      {reduced ? (
        <path {...props} />
      ) : (
        <motion.path
          {...props}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
        />
      )}
      <path d="M41.3 28L48 34L49.3 25.1" strokeWidth="1.7" />
    </svg>
  )
}

function Portrait({ reduced }) {
  return (
    <motion.div
      className="pointer-events-auto relative mx-auto w-[74%] max-w-[17rem] lg:mx-0 lg:w-full lg:max-w-none"
      style={{ originY: 1 }}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      whileHover={
        reduced
          ? undefined
          : {
              scale: 1.025,
              transition: { type: 'spring', stiffness: 260, damping: 22 },
            }
      }
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/images/character-cutout.webp"
          alt="Stylised 3D portrait of Abhishek Tripathi"
          width="720"
          height="702"
          loading="lazy"
          decoding="async"
          className="block w-full select-none drop-shadow-[0_18px_22px_rgba(46,45,174,0.14)]"
          style={bustFade}
        />
      </motion.div>

      <motion.div
        className="absolute -top-[38%] left-[10%] w-44 lg:w-[7.5rem]"
        initial={reduced ? false : { opacity: 0, rotate: -14 }}
        whileInView={reduced ? undefined : { opacity: 1, rotate: -8 }}
        viewport={viewport}
        transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
        style={{ rotate: reduced ? -8 : undefined }}
      >
        <ScriptNote className="block text-center text-[1.3rem] font-semibold text-brand-ink/85! lg:text-[1.5rem]">
          {about.note}
        </ScriptNote>
      </motion.div>
      <NoteArrow reduced={reduced} />
    </motion.div>
  )
}

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* ---------------- about ---------------- */}
        <Reveal
          className="relative isolate overflow-hidden rounded-3xl border border-line shadow-card lg:flex lg:min-h-[26rem] lg:flex-col"
          style={panelBg}
        >
          {/* The What I Do panel is usually the taller one; the button drops to
              the bottom edge so the stretched panel never looks half empty. */}
          <div className="relative z-10 flex flex-col p-7 md:p-9 lg:flex-1 lg:pr-[44%]">
            <SectionLabel>{about.eyebrow}</SectionLabel>

            <h2 className="mt-4 text-[clamp(1.55rem,2.4vw,1.8rem)] font-extrabold leading-[1.12] text-ink">
              {about.title[0]}
              <br />
              {about.title[1]}
            </h2>

            <p className="mt-4 max-w-[34rem] text-[14.5px] leading-[1.75] text-ink-2">
              {about.body}
            </p>

            <div className="mt-7 lg:mt-auto lg:pt-7">
              <motion.a
                href="#experience"
                whileHover={reduced ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="group inline-flex items-center gap-2.5 rounded-full border border-card bg-card px-5 py-3 text-[13.5px] font-semibold text-ink shadow-[0_10px_26px_-12px_rgba(46,45,174,0.35)] ring-1 ring-line/70 transition-shadow hover:shadow-[0_16px_30px_-12px_rgba(46,45,174,0.45)]"
              >
                {about.cta}
                <Icon
                  name="arrowUpRight"
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.a>
            </div>
          </div>

          {/* portrait + pull quote */}
          <div className="relative px-7 pb-8 pt-14 md:px-9 lg:pointer-events-none lg:absolute lg:bottom-0 lg:right-0 lg:w-[42%] lg:p-0 lg:pb-24">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[2%] aspect-square w-[120%] -translate-x-1/2 rounded-full lg:top-[-2%]"
              style={glowBg}
              animate={reduced ? undefined : { opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <Portrait reduced={reduced} />

            <Reveal
              as="blockquote"
              delay={0.45}
              className="relative z-10 mx-auto -mt-10 w-full max-w-[19rem] rounded-2xl border border-card/90 bg-card p-4 shadow-[0_18px_40px_-18px_rgba(46,45,174,0.38)] lg:pointer-events-auto lg:absolute lg:bottom-5 lg:right-5 lg:mx-0 lg:mt-0 lg:w-[76%] lg:max-w-none xl:w-[68%]"
            >
              <span
                aria-hidden="true"
                className="block font-serif text-[2.6rem] font-bold leading-[0.8] text-brand-ink"
              >
                “
              </span>
              <p className="mt-2 text-[13px] leading-[1.5] text-ink-2">
                {about.quote}
              </p>
            </Reveal>
          </div>
        </Reveal>

        {/* ---------------- what I do ---------------- */}
        <Reveal
          delay={0.08}
          className="rounded-3xl border border-line p-7 shadow-card md:p-9"
          style={panelBg}
        >
          <SectionLabel>{whatIDo.eyebrow}</SectionLabel>
          <h2 className="mt-3 text-[clamp(1.35rem,2vw,1.65rem)] font-extrabold leading-tight text-ink">
            {whatIDo.title}
          </h2>
          <p className="mt-1.5 text-[14px] leading-snug text-ink-2">
            {whatIDo.subtitle}
          </p>

          <RevealGroup
            className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
            stagger={0.07}
          >
            {whatIDo.items.map((item) => (
              <RevealItem key={item.title}>
                <motion.article
                  whileHover={reduced ? undefined : { y: -5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="h-full rounded-2xl border border-line/70 bg-card/90 p-4 shadow-[0_10px_30px_-20px_rgba(46,45,174,0.3)] transition-shadow hover:shadow-[0_20px_36px_-16px_rgba(46,45,174,0.4)]"
                >
                  <span
                    className={`grid size-11 place-items-center rounded-[14px] bg-linear-to-br shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),0_8px_16px_-10px_rgba(46,45,174,0.45)] ${
                      tones[item.tone] ?? tones.brand
                    }`}
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-ink-2">
                    {item.body}
                  </p>
                </motion.article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  )
}
