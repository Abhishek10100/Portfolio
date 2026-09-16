import { motion, useReducedMotion } from 'framer-motion'
import { about, whatIDo, profile } from '../data/site'
import {
  Icon,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionLabel,
  ScriptNote,
} from './ui'

const tones = {
  brand: 'bg-brand-wash text-brand',
  violet: 'bg-violet/10 text-violet',
  sky: 'bg-sky-500/10 text-sky-500',
  amber: 'bg-amber-500/10 text-amber-500',
  indigo: 'bg-indigo-500/10 text-indigo-500',
  teal: 'bg-teal-500/10 text-teal-500',
}

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* ---------------- about ---------------- */}
        <Reveal className="theme-tx relative overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-card md:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--glow-a), transparent 70%)',
            }}
          />

          <div className="relative">
            <SectionLabel>{about.eyebrow}</SectionLabel>

            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.4rem)] font-extrabold leading-[1.1] text-ink">
              {about.title[0]}
              <br />
              {about.title[1]}
            </h2>

            <p className="mt-5 max-w-[32rem] text-[15px] leading-[1.75] text-ink-2">
              {about.body}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="theme-tx group mt-7 inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface-2 px-5 py-3 text-[13.5px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              {about.cta}
              <Icon
                name="arrowUpRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* portrait + pull quote */}
            <div className="mt-8 flex flex-wrap items-end gap-5">
              <motion.div
                className="relative shrink-0"
                animate={reduced ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-2 bottom-2 top-6 rounded-full blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, var(--glow-b), transparent 70%)',
                  }}
                />
                <img
                  src="/images/character.webp"
                  alt="Stylised 3D portrait of Abhishek Tripathi"
                  width="560"
                  height="560"
                  loading="lazy"
                  className="relative size-32 rounded-2xl object-cover object-top md:size-36"
                />
                <ScriptNote className="absolute -top-7 left-1/2 hidden w-40 -translate-x-1/2 -rotate-6 text-center text-[15px] sm:block">
                  Continuous Learning Always!
                </ScriptNote>
              </motion.div>

              <blockquote className="theme-tx max-w-[15rem] rounded-2xl border border-line bg-surface-3 p-4">
                <span className="text-2xl leading-none text-brand/50">“</span>
                <p className="mt-1 text-[13.5px] leading-snug text-ink-2">
                  {about.quote}
                </p>
              </blockquote>
            </div>
          </div>
        </Reveal>

        {/* ---------------- what I do ---------------- */}
        <div className="theme-tx rounded-3xl border border-line bg-surface p-7 shadow-card md:p-9">
          <Reveal>
            <SectionLabel>{whatIDo.eyebrow}</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold text-ink">
              {whatIDo.title}
            </h2>
            <p className="mt-2 text-[14.5px] text-ink-2">{whatIDo.subtitle}</p>
          </Reveal>

          <RevealGroup
            className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            stagger={0.07}
          >
            {whatIDo.items.map((item) => (
              <RevealItem key={item.title}>
                <motion.article
                  whileHover={reduced ? {} : { y: -5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="theme-tx h-full rounded-2xl border border-line bg-surface-2 p-5 hover:border-brand/35 hover:shadow-card"
                >
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${
                      tones[item.tone] ?? tones.brand
                    }`}
                  >
                    <Icon name={item.icon} className="size-[19px]" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-ink-2">
                    {item.body}
                  </p>
                </motion.article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
