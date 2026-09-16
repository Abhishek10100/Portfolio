import { motion, useReducedMotion } from 'framer-motion'
import { experience, research, education, profile } from '../data/site'
import { Icon, Reveal, RevealGroup, RevealItem, SectionLabel } from './ui'
import BrandMark, { hasBrand } from './BrandMark'

function Experience() {
  return (
    <section
      id="experience"
      className="theme-tx scroll-mt-24 rounded-3xl border border-line bg-surface p-7 shadow-card md:p-8"
    >
      <Reveal>
        <SectionLabel>{experience.eyebrow}</SectionLabel>
        <h2 className="mt-4 text-[clamp(1.5rem,2.8vw,1.9rem)] font-extrabold text-ink">
          {experience.title}
        </h2>
      </Reveal>

      <RevealGroup className="relative mt-7 grid gap-7" stagger={0.1}>
        {/* timeline spine */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[5px] top-2 w-px bg-line-2"
        />

        {experience.roles.map((role) => (
          <RevealItem key={role.period} className="relative pl-7">
            <span
              className={`absolute left-0 top-1.5 size-[11px] rounded-full border-2 ${
                role.current
                  ? 'border-brand bg-brand'
                  : 'border-line-2 bg-surface'
              }`}
            />
            {role.current && (
              <span className="absolute left-0 top-1.5 size-[11px] animate-ping rounded-full bg-brand/40" />
            )}

            <p className="text-[11.5px] font-semibold tracking-wide text-brand">
              {role.period}
            </p>
            <h3 className="mt-1.5 text-[15.5px] font-bold text-ink">
              {role.title}
            </h3>
            <p className="mt-0.5 text-[12.5px] text-ink-3">{role.org}</p>

            <ul className="mt-3 grid gap-2">
              {role.bullets.map((b) => (
                <li
                  key={b}
                  className="relative pl-4 text-[12.5px] leading-[1.6] text-ink-2"
                >
                  <span className="absolute left-0 top-[9px] size-1 rounded-full bg-ink-3" />
                  {b}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <a
          href={profile.resume}
          download
          className="theme-tx group mt-7 inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface-2 px-4 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          {experience.cta}
          <Icon
            name="arrow"
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </Reveal>
    </section>
  )
}

function Research() {
  const reduced = useReducedMotion()

  return (
    <section
      id="research"
      className="theme-tx scroll-mt-24 rounded-3xl border border-line bg-surface p-7 shadow-card md:p-8"
    >
      <Reveal>
        <SectionLabel>{research.eyebrow}</SectionLabel>
        <h2 className="mt-4 text-[clamp(1.5rem,2.8vw,1.9rem)] font-extrabold text-ink">
          {research.title}
        </h2>
      </Reveal>

      <Reveal delay={0.06} className="theme-tx mt-6 rounded-2xl border border-line bg-surface-2 p-5">
        <p className="text-[13.5px] font-semibold leading-[1.5] text-ink">
          {research.paper}
        </p>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-3">
          {research.cite}
          <br />
          DOI: {research.doi}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
          {research.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-[22px] font-extrabold leading-none text-brand">
                {m.value}
              </dt>
              <dd className="mt-1 text-[11px] text-ink-3">{m.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Detection-confidence motif, echoing the paper's subject. */}
      <Reveal delay={0.1} className="relative mt-5 overflow-hidden rounded-2xl border border-line bg-surface-3">
        <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="Plant disease detection bounding box illustration">
          <rect width="300" height="120" fill="var(--surface-3)" />
          {[...Array(7)].map((_, i) => (
            <ellipse
              key={i}
              cx={40 + i * 38}
              cy={60 + (i % 3) * 14}
              rx="26"
              ry="17"
              fill="var(--brand)"
              opacity={0.08 + (i % 3) * 0.04}
              transform={`rotate(${-20 + i * 7} ${40 + i * 38} ${60 + (i % 3) * 14})`}
            />
          ))}
          <motion.g
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <rect
              x="108"
              y="36"
              width="84"
              height="58"
              rx="4"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
            />
            <rect x="108" y="24" width="86" height="14" rx="3" fill="var(--brand)" />
            <text
              x="114"
              y="34.5"
              fontSize="9"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fill="#fff"
            >
              Disease 0.92
            </text>
          </motion.g>
        </svg>
      </Reveal>

      <Reveal delay={0.12}>
        <a
          href={research.url}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-tx group mt-5 inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface-2 px-4 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          {research.cta}
          <Icon
            name="arrowUpRight"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>
    </section>
  )
}

function Education() {
  return (
    <section className="theme-tx rounded-3xl border border-line bg-surface p-7 shadow-card md:p-8">
      <Reveal>
        <SectionLabel>{education.eyebrow}</SectionLabel>
        <h2 className="mt-4 text-[clamp(1.5rem,2.8vw,1.9rem)] font-extrabold text-ink">
          {education.title}
        </h2>
      </Reveal>

      <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.08}>
        {education.degrees.map((d) => (
          <RevealItem
            key={d.title}
            className="theme-tx rounded-2xl border border-line bg-surface-2 p-4"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-brand-wash text-brand">
              <Icon name="book" className="size-[17px]" />
            </span>
            <h3 className="mt-3 text-[13.5px] font-bold leading-tight text-ink">
              {d.title}
            </h3>
            <p className="mt-1 text-[12px] text-ink-2">{d.org}</p>
            <p className="mt-2 text-[11px] text-ink-3">
              {d.detail}
              <br />
              {d.period}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.08}>
        <p className="mt-7 text-[12px] font-semibold tracking-wide text-ink-3">
          Certifications
        </p>
      </Reveal>

      <RevealGroup className="mt-3 grid gap-2" stagger={0.05}>
        {education.certifications.map((c) => (
          <RevealItem
            key={c.name}
            className="theme-tx flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5"
          >
            <span className="grid size-6 shrink-0 place-items-center">
              {hasBrand(c.issuer) ? (
                <BrandMark name={c.issuer} className="size-5" />
              ) : (
                <span className="grid size-6 place-items-center rounded-full bg-brand-wash text-brand">
                  <Icon name="check" className="size-3.5" />
                </span>
              )}
            </span>
            <span className="min-w-0 text-[12.5px] leading-tight text-ink">
              {c.name}
              <span className="text-ink-3"> — {c.issuer}</span>
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}

export default function Journey() {
  return (
    <div className="shell grid gap-5 py-4 lg:grid-cols-3">
      <Experience />
      <Research />
      <Education />
    </div>
  )
}
