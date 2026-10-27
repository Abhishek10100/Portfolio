import { motion, useReducedMotion } from 'framer-motion'
import { contact, profile, navLinks } from '../data/site'
import { LogoMark } from './Logo'
import {
  EASE,
  Icon,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionLabel,
  ScriptNote,
  useAmbient,
} from './ui'

const channels = [
  { label: 'Email Me', icon: 'mail', href: `mailto:${profile.email}`, solid: true },
  { label: 'LinkedIn', icon: 'linkedin', href: profile.linkedin, tint: 'text-[#0A66C2]' },
  { label: 'GitHub', icon: 'github', href: profile.github, tint: 'text-ink' },
]

const panelBg = {
  background:
    'linear-gradient(150deg, color-mix(in srgb, var(--brand) 8%, var(--card)), var(--surface) 52%, color-mix(in srgb, var(--violet) 6%, var(--card)))',
}

const discBg = {
  background:
    'radial-gradient(circle at 50% 36%, color-mix(in srgb, var(--card) 85%, transparent), color-mix(in srgb, var(--brand) 14%, transparent) 64%, color-mix(in srgb, var(--violet) 8%, transparent) 100%)',
}

const viewport = { once: true, margin: '-60px' }

export function Contact() {
  const reduced = useReducedMotion()
  const [discRef, discOn] = useAmbient()
  const [bustRef, bustOn] = useAmbient()

  return (
    <section id="contact" className="scroll-mt-24 py-12 md:py-16">
      <div className="shell">
        <Reveal
          className="relative isolate overflow-hidden rounded-3xl border border-line shadow-card lg:flex lg:min-h-[22rem] lg:items-center"
          style={panelBg}
        >
          {/* ---------------- copy + actions ---------------- */}
          <div className="relative z-10 p-7 md:p-10 lg:w-[62%] lg:px-12 lg:py-12">
            <SectionLabel>{contact.eyebrow}</SectionLabel>

            <h2 className="mt-4 text-[clamp(1.55rem,2.5vw,1.9rem)] font-extrabold leading-[1.12] text-ink">
              {contact.title}
            </h2>
            <p className="mt-2.5 max-w-[38rem] text-[15px] leading-relaxed text-ink-2">
              {contact.subtitle}
            </p>

            <RevealGroup className="mt-7 flex flex-wrap gap-3" stagger={0.09} delay={0.15}>
              {channels.map((c) => (
                <RevealItem key={c.label}>
                  <motion.a
                    href={c.href}
                    target={c.solid ? undefined : '_blank'}
                    rel={c.solid ? undefined : 'noopener noreferrer'}
                    whileHover={reduced ? undefined : { y: -3, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-shadow ${
                      c.solid
                        ? 'bg-ink text-page shadow-[0_16px_28px_-14px_rgba(2,2,26,0.6)] hover:shadow-[0_22px_34px_-14px_rgba(2,2,26,0.7)]'
                        : 'border border-card bg-card text-ink shadow-[0_10px_26px_-14px_rgba(46,45,174,0.35)] ring-1 ring-line/70 hover:shadow-[0_18px_32px_-14px_rgba(46,45,174,0.45)]'
                    }`}
                  >
                    <Icon name={c.icon} className={`size-[18px] ${c.tint ?? ''}`} />
                    {c.label}
                  </motion.a>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-6 text-[13px] text-ink-2">
              <a
                href={`tel:${profile.phone}`}
                className="inline-block py-3 underline-offset-2 transition-colors hover:text-ink hover:underline"
              >
                {profile.phone}
              </a>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              {profile.location}
            </p>
          </div>

          {/* ---------------- portrait ---------------- */}
          <div className="relative px-7 pt-14 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:w-[46%] lg:p-0">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[4%] aspect-square w-[min(24rem,96%)] -translate-x-1/2 rounded-full border border-card/70 shadow-[inset_0_0_70px_rgba(96,121,251,0.12)] lg:left-auto lg:right-[2%] lg:top-1/2 lg:h-[132%] lg:w-auto lg:translate-x-0 lg:-translate-y-[46%]"
              ref={discRef}
              style={discBg}
              animate={discOn ? { scale: [1, 1.025, 1] } : { scale: 1 }}
              transition={discOn ? { duration: 9, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
            />

            <div className="relative mx-auto w-[min(78%,19rem)] lg:mx-0 lg:h-full lg:w-full lg:max-w-none">
              <motion.div
                className="absolute left-1/2 top-[-2.6rem] w-[15rem] -translate-x-1/2 lg:left-[2%] lg:top-[16%] lg:w-[9.5rem] lg:translate-x-0"
                initial={reduced ? false : { opacity: 0, rotate: -9 }}
                whileInView={reduced ? undefined : { opacity: 1, rotate: -5 }}
                viewport={viewport}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                style={{ rotate: reduced ? -5 : undefined }}
              >
                <ScriptNote className="block text-center text-[1.35rem] font-semibold text-brand-ink/85! lg:text-[clamp(1.3rem,1.9vw,1.6rem)]">
                  {contact.note}
                </ScriptNote>
              </motion.div>

              {/* Anchored bottom-centre so the idle breathing never lifts the
                  bust off the panel edge. */}
              <motion.div
                className="lg:absolute lg:bottom-0 lg:right-[6%] lg:h-[93%]"
                initial={reduced ? false : { opacity: 0, y: 36 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
              >
                <motion.img
                  src="/images/character-cutout.webp"
                  alt=""
                  width="720"
                  height="702"
                  loading="lazy"
                  decoding="async"
                  className="block w-full select-none drop-shadow-[0_16px_24px_rgba(46,45,174,0.16)] lg:h-full lg:w-auto"
                  ref={bustRef}
                  style={{ originY: 1 }}
                  animate={bustOn ? { scaleY: [1, 1.012, 1] } : { scaleY: 1 }}
                  transition={bustOn ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-linear-to-b from-transparent to-brand/[0.05] py-9">
      <div className="shell grid grid-cols-1 items-center gap-7 md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#home"
          className="flex items-center gap-3 justify-self-center md:justify-self-start"
        >
          <LogoMark className="size-11 shrink-0 drop-shadow-[0_6px_14px_rgba(79,107,245,0.35)]" />
          <span className="leading-tight">
            <span className="block text-[14px] font-bold text-ink">
              {profile.name}
            </span>
            <span className="block text-[12px] text-ink-2">{profile.role}</span>
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-block py-2.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-3 md:items-end md:justify-self-end">
          <div className="flex gap-2.5">
            {[
              { icon: 'linkedin', href: profile.linkedin, label: 'LinkedIn' },
              { icon: 'github', href: profile.github, label: 'GitHub' },
              { icon: 'mail', href: `mailto:${profile.email}`, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.icon === 'mail' ? undefined : '_blank'}
                rel={s.icon === 'mail' ? undefined : 'noopener noreferrer'}
                className="grid size-10 place-items-center rounded-full border border-card bg-card text-ink shadow-[0_8px_20px_-10px_rgba(46,45,174,0.4)] ring-1 ring-line/70 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_24px_-10px_rgba(46,45,174,0.5)]"
              >
                <Icon name={s.icon} className="size-[18px]" />
              </a>
            ))}
          </div>
          <p className="text-center text-[12px] leading-relaxed text-ink-2 md:text-right">
            © {new Date().getFullYear()} {profile.name}
            <br />
            Built with React, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
