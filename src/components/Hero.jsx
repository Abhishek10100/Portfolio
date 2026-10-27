import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { profile, heroStats, trustedTech, trustedQuote } from '../data/site'
import { Counter, Icon, ScriptNote, EASE, useAmbient } from './ui'
import BrandMark from './BrandMark'

/* The render sits on a near-white studio wall, so its edges are feathered into
   the page. Smoothstep stops keep the feather from showing a start/end line. */
const EASED = [
  [0, 0],
  [0.1, 0.03],
  [0.25, 0.16],
  [0.5, 0.5],
  [0.75, 0.84],
  [0.9, 0.97],
  [1, 1],
]

const ramp = (from, to, rising = true) =>
  EASED.map(
    ([t, a]) =>
      `rgba(0,0,0,${rising ? a : +(1 - a).toFixed(2)}) ${+(from + (to - from) * t).toFixed(1)}%`,
  )

/* Left, top and bottom dissolve; the right edge stays solid because the art
   bleeds past the viewport there. */
const HERO_MASK = [
  `linear-gradient(to right, ${ramp(0, 14).join(', ')})`,
  `linear-gradient(to bottom, ${[...ramp(0, 8), ...ramp(87, 100, false)].join(', ')})`,
].join(', ')

const heroMaskStyle = {
  WebkitMaskImage: HERO_MASK,
  maskImage: HERO_MASK,
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
}

export default function Hero({ ready }) {
  const reduced = useReducedMotion()
  const [artRef, artOn] = useAmbient()

  // Entrance is sequenced after the preloader: text first, then visual.
  const seq = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
          transition: { duration: 0.7, ease: EASE, delay },
        }

  // Very subtle desktop parallax: the art drifts a few px against the cursor.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const parallax = { stiffness: 70, damping: 22, mass: 0.6 }
  const artX = useSpring(mx, parallax)
  const artY = useSpring(my, parallax)

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -16)
    my.set(((e.clientY - r.top) / r.height - 0.5) * -10)
  }
  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // Counters wait for the hand-over so the count-up is actually seen.
  const showNumbers = ready || reduced

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px]"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 22%, var(--glow-a), transparent 70%), radial-gradient(40% 50% at 84% 64%, var(--glow-b), transparent 72%), radial-gradient(45% 40% at 12% 8%, var(--glow-b), transparent 72%)',
        }}
      />

      <div className="relative pt-28 md:pt-32">
        {/* ---------------- copy ---------------- */}
        <div className="shell relative z-10">
          <div className="max-w-[37rem]">
            <motion.p
              className="text-[13px] font-semibold tracking-[0.18em] text-brand-text"
              {...seq(0.05)}
            >
              {profile.greeting}
            </motion.p>

            <motion.h1
              className="mt-3 text-[clamp(2.9rem,7vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink 2xl:text-[5.4rem]"
              {...seq(0.12)}
            >
              Abhishek
              <br />
              Tripathi
            </motion.h1>

            <motion.p
              className="mt-3 bg-gradient-to-r from-[#4fa6f8] via-brand to-violet bg-clip-text text-[clamp(1.3rem,2.9vw,1.85rem)] font-bold text-transparent"
              {...seq(0.2)}
            >
              {profile.headline}
            </motion.p>

            <motion.p
              className="mt-5 max-w-[35rem] text-[17px] leading-[1.65] text-ink-2 md:text-[17.5px] lg:max-w-[30rem] xl:max-w-[35rem]"
              {...seq(0.28)}
            >
              {profile.intro}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-3" {...seq(0.36)}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[14.5px] font-semibold text-page shadow-[0_14px_28px_-12px_rgba(2,2,26,0.6)] transition-transform hover:-translate-y-0.5"
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
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-card/90 px-7 py-4 text-[14.5px] font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
              >
                Download Resume
                <Icon
                  name="download"
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>

            <motion.p
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-emerald-800 dark:text-emerald-300"
              {...seq(0.4)}
            >
              <span className="relative flex size-2">
                {!reduced && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />}
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to remote roles across India
            </motion.p>

            {/* ---------------- stats ---------------- */}
            <motion.dl
              className="mt-6 grid grid-cols-2 gap-y-5 rounded-2xl border border-line bg-card/80 px-5 py-5 shadow-card sm:grid-cols-4"
              {...seq(0.44)}
            >
              {heroStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`min-w-0 ${i % 2 ? 'border-l pl-4' : ''} ${
                    i ? 'sm:border-l sm:pl-4' : ''
                  }`}
                >
                  <dt className="text-[clamp(1.5rem,2.4vw,1.9rem)] font-extrabold leading-none tracking-tight text-ink tabular-nums">
                    {showNumbers ? (
                      <Counter value={s.value} suffix={s.suffix} />
                    ) : (
                      `0${s.suffix}`
                    )}
                  </dt>
                  <dd className="mt-1.5 text-[11px] leading-tight text-ink-3">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* ---------------- visual ---------------- */}
        {/* In flow and full-bleed below lg. From lg it is pinned to the section
            and runs past the viewport edge so the character reads large; the
            width is capped so the cover crop never cuts the laptop off. */}
        <motion.div
          className="relative mt-8 aspect-square w-full sm:aspect-[5/4] md:aspect-[8/5] lg:absolute lg:-bottom-10 lg:-right-10 lg:top-[88px] lg:mt-0 lg:aspect-auto lg:w-[clamp(640px,calc(100vw_-_max(0px,(100vw_-_var(--shell))/2)_-_497px),var(--hero-art-max))]"
          initial={reduced ? false : { opacity: 0, scale: 0.97, y: 18 }}
          animate={ready || reduced ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        >
          <motion.div
            className="amb amb-breathe size-full origin-[75%_80%]"
            ref={artRef}
            data-on={artOn}
            style={{ x: artX, y: artY }}
          >
            <img
              src="/images/hero.webp"
              alt="Illustration of Abhishek working at a laptop beside a document-to-insight AI pipeline"
              width="1800"
              height="1403"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="hero-art-img size-full max-w-none select-none object-cover object-[100%_30%]"
              style={heroMaskStyle}
            />
          </motion.div>

          <motion.div
            className="absolute right-[15%] top-[3%] hidden md:block"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={ready || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
          >
            <ScriptNote className="block w-24 rotate-[8deg] text-center text-[22px] font-medium text-brand-ink/80!">
              Same Curiosity Bigger Possibilities
            </ScriptNote>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------------- trusted technologies ---------------- */}
      <div className="shell relative">
        <motion.div
          className="mb-4 mt-10 rounded-2xl border border-line bg-card/80 px-5 py-5 shadow-card md:px-7"
          {...seq(0.56)}
        >
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand-text">
            TRUSTED TECHNOLOGIES
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 xl:justify-between xl:gap-x-3">
              {trustedTech.map((t) => (
                <li
                  key={t}
                  className="group flex items-center gap-1.5 text-[12.5px] font-semibold text-ink"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    <BrandMark name={t} className="size-5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="max-w-[14rem] border-line text-[13px] italic leading-snug text-ink-2 lg:border-l lg:pl-8">
              “{trustedQuote}”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
