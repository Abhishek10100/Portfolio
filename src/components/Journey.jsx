import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { experience, research, education } from '../data/site'
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
  'flex scroll-mt-24 flex-col rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-6'

const heading =
  'mt-3.5 text-2xl font-extrabold leading-[1.15] text-ink min-[1100px]:text-[clamp(1.35rem,1.9vw,1.55rem)]'

const pill =
  'group inline-flex items-center gap-3 rounded-full border border-line bg-white px-5 py-3 text-[13px] font-semibold text-ink shadow-card transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-float'

/** In-place expand/collapse. The wrapper stays mounted so aria-controls always resolves. */
function Collapse({ open, id, children }) {
  const reduced = useReducedMotion()

  return (
    <div id={id}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------------------------- experience ---------------------------- */

function Experience() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const panelIds = experience.roles.map((_, i) => `experience-details-${i}`)

  return (
    <section id="experience" className={card}>
      <Reveal>
        <SectionLabel tone="brand">{experience.eyebrow}</SectionLabel>
        <h2 className={heading}>{experience.title}</h2>
      </Reveal>

      <RevealGroup className="relative mt-6 grid gap-6" stagger={0.1}>
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-1 top-3 w-px bg-gradient-to-b from-brand/35 via-brand/20 to-brand/10"
        />

        {experience.roles.map((role, i) => (
          <RevealItem key={role.period} className="relative pl-7">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[15px] size-[9px] rounded-full bg-brand ring-[3px] ring-brand/15"
            />
            {role.current && !reduced && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-[15px] size-[9px] animate-ping rounded-full bg-brand/50"
              />
            )}

            <p className="text-[12px] font-medium tracking-wide text-brand-text">
              {role.period}
            </p>
            <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink">
              {role.title}
            </h3>
            <p className="mt-0.5 text-[12.5px] text-ink-3">{role.org}</p>

            <Collapse open={open} id={panelIds[i]}>
              <ul className="grid gap-2 pt-3">
                {role.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-4 text-[12.5px] leading-[1.6] text-ink-2"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[9px] size-1 rounded-full bg-brand/60"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </Collapse>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-auto pt-6">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelIds.join(' ')}
          onClick={() => setOpen((v) => !v)}
          className={pill}
        >
          {open ? 'Show less' : experience.cta}
          <Icon
            name="arrow"
            className={`size-3.5 transition-transform duration-300 ${
              open ? '-rotate-90' : 'group-hover:translate-x-0.5'
            }`}
          />
        </button>
      </Reveal>
    </section>
  )
}

/* ----------------------------- research ----------------------------- */

/** Counts up to a value like "95.93%", keeping its decimals. Real text, once, in view. */
function Metric({ value, label }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const parsed = value.match(/^([\d.]+)(.*)$/)
  const target = parsed ? parseFloat(parsed[1]) : NaN
  const decimals = parsed ? (parsed[1].split('.')[1] ?? '').length : 0
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView || reduced || Number.isNaN(target)) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: setShown,
    })
    return () => controls.stop()
  }, [inView, reduced, target])

  const text = Number.isNaN(target)
    ? value
    : `${(reduced ? target : shown).toFixed(decimals)}${parsed[2]}`

  return (
    <div ref={ref} className="flex flex-col-reverse gap-1 first:pr-4 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-line-2 [&:not(:first-child)]:pl-4">
      <dt className="text-[11.5px] text-ink-3">{label}</dt>
      <dd className="m-0 text-[1.5rem] font-extrabold leading-none tracking-tight text-brand tabular-nums @min-[330px]:text-[clamp(1rem,calc((100cqw_-_215px)_/_7.6),1.9rem)]">
        <span aria-hidden="true">{text}</span>
        <span className="sr-only">{value}</span>
      </dd>
    </div>
  )
}

/* Lens-shaped leaf outline in its own coordinates: tip at +x, base at -x. */
const lens = (len, wid) =>
  `M${-len} 0Q0 ${-2 * wid} ${len} 0Q0 ${2 * wid} ${-len} 0Z`

const MAIN_LEAF = 'M-100 0C-62 -56 30 -60 100 0C30 60 -62 56 -100 0Z'

const MAIN_VEINS = (() => {
  const [p0, p1, p2, p3] = [
    [-100, 0],
    [-62, -56],
    [30, -60],
    [100, 0],
  ]
  const edge = Array.from({ length: 81 }, (_, i) => {
    const t = i / 80
    const u = 1 - t
    return [
      u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
      u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1],
    ]
  })
  const halfWidth = (x) =>
    Math.abs(
      edge.reduce((best, p) =>
        Math.abs(p[0] - x) < Math.abs(best[0] - x) ? p : best,
      )[1],
    )
  const n = (v) => +v.toFixed(1)

  return [-74, -58, -42, -26, -10, 6, 22, 38, 54]
    .map((x0) => {
      const x1 = Math.min(x0 + 34, 88)
      const h = halfWidth(x1) * 0.88
      return (
        `M${x0} 0Q${n(x0 + 16)} ${n(-h * 0.55)} ${n(x1)} ${n(-h)}` +
        `M${x0} 0Q${n(x0 + 16)} ${n(h * 0.55)} ${n(x1)} ${n(h)}`
      )
    })
    .join('')
})()

// Offsets from the leaf centre (66, 122): x, y, radius.
const SPOTS = [
  [-8, -6, 5.4],
  [6, -18, 3.6],
  [-2, 8, 4.6],
  [14, -2, 3],
  [-16, 6, 3.2],
  [8, 16, 4],
  [-6, -24, 2.6],
  [20, -14, 2.4],
  [-20, -8, 2.2],
  [2, -8, 2],
  [12, 10, 2.2],
]

function BackLeaf({ x, y, rot, len, wid, fill = 'url(#leaf-back)' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={lens(len, wid)} fill={fill} />
      <path
        d={`M${-len} 0Q0 -2 ${len} 0`}
        fill="none"
        stroke="#c8e58a"
        strokeOpacity=".3"
        strokeLinecap="round"
      />
    </g>
  )
}

/** Plant-disease detection motif, echoing the paper: a diseased leaf, a detection box and a confidence tag. */
function LeafIllustration() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref)
  const pulse = !reduced && inView

  return (
    <svg
      ref={ref}
      viewBox="0 0 144 232"
      role="img"
      aria-label="Illustration of a plant leaf with a diseased region detected at 0.92 confidence"
      className="block w-full font-sans drop-shadow-[0_12px_16px_rgba(96,121,251,0.26)]"
    >
      <defs>
        <clipPath id="leaf-clip">
          <rect x="8" y="6" width="116" height="220" rx="16" />
        </clipPath>
        <linearGradient id="leaf-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f7f35" />
          <stop offset=".55" stopColor="#235a2b" />
          <stop offset="1" stopColor="#123a24" />
        </linearGradient>
        <radialGradient id="leaf-vignette" cx=".5" cy=".5" r=".75">
          <stop offset=".55" stopColor="#08210f" stopOpacity="0" />
          <stop offset="1" stopColor="#08210f" stopOpacity=".5" />
        </radialGradient>
        <linearGradient id="leaf-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fa04a" />
          <stop offset="1" stopColor="#2f6f35" />
        </linearGradient>
        <linearGradient id="leaf-back-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f8138" />
          <stop offset="1" stopColor="#1f5129" />
        </linearGradient>
        <linearGradient
          id="leaf-body"
          gradientUnits="userSpaceOnUse"
          x1="-100"
          y1="20"
          x2="100"
          y2="-20"
        >
          <stop offset="0" stopColor="#4f9638" />
          <stop offset=".45" stopColor="#8cc752" />
          <stop offset="1" stopColor="#62a840" />
        </linearGradient>
        <radialGradient
          id="leaf-shine"
          gradientUnits="userSpaceOnUse"
          cx="-5"
          cy="-14"
          r="80"
        >
          <stop offset="0" stopColor="#e7f696" stopOpacity=".55" />
          <stop offset="1" stopColor="#e7f696" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="leaf-halo">
          <stop offset="0" stopColor="#deb03c" stopOpacity=".75" />
          <stop offset="1" stopColor="#deb03c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="leaf-spot">
          <stop offset="0" stopColor="#5e220f" />
          <stop offset=".55" stopColor="#b4521d" />
          <stop offset="1" stopColor="#d9923a" />
        </radialGradient>
      </defs>

      <g clipPath="url(#leaf-clip)">
        <rect x="8" y="6" width="116" height="220" fill="url(#leaf-bg)" />

        <BackLeaf x={26} y={46} rot={-32} len={52} wid={20} />
        <BackLeaf x={112} y={30} rot={30} len={46} wid={17} fill="url(#leaf-back-deep)" />
        <BackLeaf x={10} y={120} rot={-8} len={40} wid={15} fill="url(#leaf-back-deep)" />
        <BackLeaf x={110} y={200} rot={-40} len={54} wid={20} />
        <BackLeaf x={16} y={212} rot={24} len={50} wid={19} fill="url(#leaf-back-deep)" />

        <rect x="8" y="6" width="116" height="220" fill="url(#leaf-vignette)" />

        <g transform="translate(66 122) rotate(-58)">
          <path d={MAIN_LEAF} transform="translate(3 5)" fill="#051c0c" fillOpacity=".35" />
          <path d={MAIN_LEAF} fill="url(#leaf-body)" />
          <path d={MAIN_LEAF} fill="url(#leaf-shine)" />
          <path
            d={MAIN_VEINS}
            fill="none"
            stroke="#e1f09a"
            strokeOpacity=".7"
            strokeWidth=".9"
            strokeLinecap="round"
          />
          <path
            d="M-98 2C-40 -4 30 -3 92 0"
            fill="none"
            stroke="#eef5a8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d={MAIN_LEAF}
            fill="none"
            stroke="#1f5a26"
            strokeOpacity=".5"
            strokeWidth=".8"
          />
        </g>

        {SPOTS.map(([dx, dy, r]) => (
          <g key={`${dx}${dy}`}>
            <circle cx={66 + dx} cy={122 + dy} r={r * 2.2} fill="url(#leaf-halo)" />
            <circle
              cx={66 + dx}
              cy={122 + dy}
              r={r}
              fill="url(#leaf-spot)"
              stroke="#6b2a12"
              strokeOpacity=".5"
              strokeWidth=".6"
            />
          </g>
        ))}

        <rect
          x="22"
          y="62"
          width="88"
          height="116"
          rx="4"
          fill="#2de2c3"
          fillOpacity=".07"
          stroke="#2de2c3"
          strokeWidth="1.5"
        />
        <path
          d="M22 74V62H34M98 62H110V74M110 166V178H98M34 178H22V166"
          fill="none"
          stroke="#3df2d0"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.rect
          x="22"
          y="62"
          width="88"
          height="116"
          rx="4"
          fill="none"
          stroke="#2de2c3"
          strokeWidth="1.4"
          initial={false}
          animate={
            pulse
              ? { opacity: [0.5, 0, 0.5], scale: [1, 1.07, 1] }
              : { opacity: 0, scale: 1 }
          }
          transition={
            pulse
              ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      </g>

      <rect
        x="8.5"
        y="6.5"
        width="115"
        height="219"
        rx="15.5"
        fill="none"
        stroke="#fff"
        strokeOpacity=".4"
      />

      <motion.g
        initial={reduced ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
      >
        <path d="M46 65.5H58L50 74Z" fill="#101226" fillOpacity=".88" />
        <rect x="34" y="26" width="106" height="40" rx="11" fill="#101226" fillOpacity=".88" />
        <text x="46" y="43" fontSize="10.5" fontWeight="600" fill="#fff">
          Disease
        </text>
        <text x="46" y="57" fontSize="9.5" fontWeight="500" fill="#cdd2ff">
          Confidence: 0.92
        </text>
      </motion.g>
    </svg>
  )
}

function Research() {
  return (
    <section
      id="research"
      className={`${card} @container min-[768px]:order-last min-[768px]:col-span-2 min-[1100px]:order-none min-[1100px]:col-span-1`}
    >
      <Reveal>
        <SectionLabel tone="brand">{research.eyebrow}</SectionLabel>
        <h2 className={heading}>{research.title}</h2>
      </Reveal>

      <Reveal
        delay={0.06}
        className="mt-5 grid gap-3.5 @min-[330px]:grid-cols-[minmax(0,1fr)_auto]"
      >
        <div className="flex flex-col rounded-2xl border border-line bg-white p-4 shadow-card">
          <h3 className="text-[14px] font-bold leading-[1.45] text-ink">
            {research.paper}
          </h3>
          <p className="mt-3 text-[12px] leading-[1.7] text-ink-3">
            {research.cite}
            <br />
            DOI: {research.doi}
          </p>

          <dl className="mt-auto flex items-end pt-5">
            {research.metrics.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </dl>
        </div>

        <div className="w-[136px] self-center justify-self-center @min-[330px]:justify-self-auto">
          <LeafIllustration />
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-auto pt-5">
        <a
          href={research.url}
          target="_blank"
          rel="noopener noreferrer"
          className={pill}
        >
          {research.cta}
          <span className="sr-only"> (opens in a new tab)</span>
          <Icon
            name="arrow"
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </Reveal>
    </section>
  )
}

/* ----------------------------- education ----------------------------- */

const degreeTones = [
  { icon: 'book', tile: 'bg-rose-500/10 text-rose-500 ring-rose-400/30' },
  { icon: 'award', tile: 'bg-orange-500/10 text-orange-500 ring-orange-400/30' },
]

// Wide marks (Cisco) need more of the tile than square ones.
const markWidth = { Cisco: 'w-[76%] aspect-square' }
const defaultMarkWidth = 'w-[52%] aspect-square'

const monogram = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

function Education() {
  const [open, setOpen] = useState(false)
  const listId = 'education-certifications'

  return (
    <section id="education" className={`${card} @container scroll-mt-24`}>
      <Reveal>
        <SectionLabel tone="brand">{education.eyebrow}</SectionLabel>
        <h2 className={heading}>{education.title}</h2>
      </Reveal>

      <RevealGroup
        className="mt-5 grid gap-3 @min-[290px]:grid-cols-2"
        stagger={0.08}
      >
        {education.degrees.map((d, i) => {
          const tone = degreeTones[i % degreeTones.length]
          return (
            <RevealItem key={d.title} className="@container flex">
              <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-line bg-white p-3.5 shadow-card @min-[250px]:flex-row @min-[250px]:gap-3.5">
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ring-1 ${tone.tile}`}
                >
                  <Icon name={tone.icon} className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-bold leading-snug text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] text-ink-3">{d.org}</p>
                  <p className="mt-1.5 text-[12px] leading-snug text-ink-2">
                    {d.detail}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-3">{d.period}</p>
                </div>
              </div>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Reveal delay={0.08}>
        <h3 className="mt-6 text-[13px] font-bold text-ink">Certifications</h3>
      </Reveal>

      <RevealGroup as="ul" className="mt-3 grid grid-cols-5 gap-2" stagger={0.06}>
        {education.certifications.map((c) => {
          const label = `${c.name} — ${c.issuer}`
          return (
            <RevealItem as="li" key={c.name}>
              <span
                role="img"
                aria-label={label}
                title={label}
                className="grid aspect-square place-items-center rounded-xl border border-line bg-white shadow-card transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-float"
              >
                {hasBrand(c.issuer) ? (
                  <BrandMark
                    name={c.issuer}
                    className={markWidth[c.issuer] ?? defaultMarkWidth}
                  />
                ) : (
                  <span className="grid size-7 place-items-center rounded-full bg-brand-wash text-[11px] font-extrabold text-brand">
                    {monogram(c.issuer)}
                  </span>
                )}
              </span>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Reveal delay={0.12} className="mt-auto pt-5">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className={pill}
        >
          {open ? 'Show fewer' : education.cta}
          <Icon
            name="arrow"
            className={`size-3.5 transition-transform duration-300 ${
              open ? '-rotate-90' : 'group-hover:translate-x-0.5'
            }`}
          />
        </button>

        <Collapse open={open} id={listId}>
          <ul className="grid gap-2.5 pt-4">
            {education.certifications.map((c) => (
              <li
                key={c.name}
                className="relative pl-4 text-[12.5px] leading-snug text-ink"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[7px] size-1 rounded-full bg-brand/60"
                />
                {c.name}
                <span className="text-ink-3"> — {c.issuer}</span>
              </li>
            ))}
          </ul>
        </Collapse>
      </Reveal>
    </section>
  )
}

// Raw px breakpoints on purpose: Tailwind sorts `min-[1100px]` ahead of the
// theme `md`, which would let `md` win at desktop widths.
export default function Journey() {
  return (
    <div className="shell grid grid-cols-1 gap-5 py-4 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1.1fr)]">
      <Experience />
      <Research />
      <Education />
    </div>
  )
}
