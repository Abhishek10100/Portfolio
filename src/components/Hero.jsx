import { motion, useReducedMotion } from 'framer-motion'
import { profile, heroStats, trustedTech, trustedQuote } from '../data/site'
import { Counter, Icon, ScriptNote, EASE, Reveal } from './ui'
import BrandMark from './BrandMark'

export default function Hero({ ready }) {
  const reduced = useReducedMotion()

  // Entrance is sequenced after the preloader: text first, then visual.
  const seq = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
          transition: { duration: 0.7, ease: EASE, delay },
        }

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[680px]"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 22%, var(--glow-a), transparent 70%), radial-gradient(45% 40% at 12% 8%, var(--glow-b), transparent 72%)',
        }}
      />

      <div className="shell relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
          {/* ---------------- copy ---------------- */}
          <div className="relative z-10">
            <motion.p
              className="text-[12.5px] font-semibold tracking-[0.18em] text-brand"
              {...seq(0.05)}
            >
              {profile.greeting}
            </motion.p>

            <motion.h1
              className="mt-3 text-[clamp(2.75rem,7vw,4.5rem)] font-extrabold leading-[0.96] text-ink"
              {...seq(0.12)}
            >
              Abhishek
              <br />
              Tripathi
            </motion.h1>

            <motion.p
              className="mt-3 bg-gradient-to-r from-brand to-violet bg-clip-text text-[clamp(1.25rem,2.8vw,1.75rem)] font-bold text-transparent"
              {...seq(0.2)}
            >
              {profile.headline}
            </motion.p>

            <motion.p
              className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.65] text-ink-2"
              {...seq(0.28)}
            >
              {profile.intro}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-3" {...seq(0.36)}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-page transition-transform hover:-translate-y-0.5"
              >
                View My Work
                <Icon
                  name="arrowUpRight"
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={profile.resume}
                download
                className="theme-tx group inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Download Resume
                <Icon
                  name="download"
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>

            {/* ---------------- stats ---------------- */}
            <motion.dl
              className="theme-tx mt-9 grid max-w-[36rem] grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-sm sm:grid-cols-4"
              {...seq(0.44)}
            >
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[clamp(1.4rem,2.4vw,1.75rem)] font-extrabold tracking-tight text-ink">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-0.5 text-[11.5px] leading-tight text-ink-3">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------------- visual ---------------- */}
          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, scale: 0.97, y: 18 }}
            animate={ready || reduced ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -9, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/images/hero.webp"
                alt="Illustration of Abhishek working at a laptop beside a document-to-insight AI pipeline"
                width="1400"
                height="788"
                fetchPriority="high"
                className="hero-img w-full max-w-none object-contain dark:opacity-[0.92]"
              />
            </motion.div>

            <ScriptNote className="absolute right-4 top-14 hidden w-24 rotate-[8deg] text-center text-[19px] leading-snug xl:block">
              Same Curiosity Bigger Possibilities
            </ScriptNote>
          </motion.div>
        </div>

        {/* ---------------- trusted technologies ---------------- */}
        <Reveal className="theme-tx mt-10 mb-4 rounded-2xl border border-line bg-surface/70 px-5 py-5 backdrop-blur-sm md:mt-14 md:px-7">
          <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-3">
            TRUSTED TECHNOLOGIES
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {trustedTech.map((t) => (
                <li
                  key={t}
                  className="group flex items-center gap-2 text-[13px] font-semibold text-ink-2"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    <BrandMark name={t} className="size-[22px]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="max-w-[20rem] border-line text-[13.5px] italic leading-snug text-ink-2 lg:border-l lg:pl-8">
              “{trustedQuote}”
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
