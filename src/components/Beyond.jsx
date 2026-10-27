import { motion, useReducedMotion } from 'framer-motion'
import { beyond } from '../data/site'
import { Icon, Reveal, RevealGroup, RevealItem, SectionLabel } from './ui'

const tones = {
  brand: 'from-brand/30 to-brand/10 text-brand',
  teal: 'from-teal-400/30 to-teal-400/10 text-teal-500',
  violet: 'from-violet/30 to-violet/10 text-violet',
  amber: 'from-amber-400/35 to-amber-400/10 text-amber-500',
}

/* Two marks the shared icon set doesn't have. */
const Mountain = () => (
  <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 19.5 9 8l3.6 6.2L15 11l6.5 8.5Z" />
    <path d="M7.6 10.6 9 8l1.4 2.4" />
  </svg>
)
const Aperture = () => (
  <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="m14.3 8.4-4.6.1M9.7 8.5l-2.4 4M7.3 12.5l2.3 4M9.6 16.5l4.7-.1M14.3 16.4l2.4-4M16.7 12.4l-2.4-4" />
  </svg>
)

function Glyph({ name }) {
  if (name === 'mountain') return <Mountain />
  if (name === 'aperture') return <Aperture />
  return <Icon name={name} className="size-[22px]" />
}

export default function Beyond() {
  const reduced = useReducedMotion()

  return (
    <section id="beyond" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell">
        <Reveal className="max-w-[40rem]">
          <SectionLabel>{beyond.eyebrow}</SectionLabel>
          <h2 className="mt-4 text-[clamp(1.75rem,3.8vw,2.5rem)] font-extrabold text-ink">{beyond.title}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{beyond.subtitle}</p>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
          {beyond.items.map((it) => (
            <RevealItem key={it.title}>
              <motion.article
                whileHover={reduced ? undefined : { y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="h-full rounded-2xl border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-float"
              >
                <span className={`grid size-12 place-items-center rounded-2xl bg-linear-to-br ${tones[it.tone] ?? tones.brand}`}>
                  <Glyph name={it.icon} />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink">{it.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-ink-2">{it.body}</p>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
