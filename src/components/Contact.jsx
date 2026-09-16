import { motion, useReducedMotion } from 'framer-motion'
import { contact, profile, navLinks } from '../data/site'
import { Icon, Reveal, ScriptNote } from './ui'

const channels = [
  { label: 'Email Me', icon: 'mail', href: `mailto:${profile.email}`, solid: true },
  { label: 'LinkedIn', icon: 'linkedin', href: profile.linkedin },
  { label: 'GitHub', icon: 'github', href: profile.github },
]

export function Contact() {
  const reduced = useReducedMotion()

  return (
    <section className="py-12 md:py-16">
      <div className="shell">
        <Reveal className="theme-tx relative overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-card md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-[26rem] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--glow-a), transparent 70%)',
            }}
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-ink-3">
                <span className="size-1.5 rounded-full bg-violet" />
                {contact.eyebrow}
              </div>

              <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,4.4vw,2.9rem)] font-extrabold leading-[1.08] text-ink">
                {contact.title}
              </h2>
              <p className="mt-3 max-w-[34rem] text-[15.5px] leading-relaxed text-ink-2">
                {contact.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.solid ? undefined : '_blank'}
                    rel={c.solid ? undefined : 'noopener noreferrer'}
                    className={`group inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[13.5px] font-semibold transition-transform hover:-translate-y-0.5 ${
                      c.solid
                        ? 'bg-ink text-page'
                        : 'theme-tx border border-line-2 bg-surface-2 text-ink'
                    }`}
                  >
                    <Icon name={c.icon} className="size-4" />
                    {c.label}
                  </a>
                ))}
              </div>

              <p className="mt-6 text-[12.5px] text-ink-3">
                Or reach me at{' '}
                <a href={`tel:${profile.phone}`} className="text-ink-2 underline-offset-2 hover:underline">
                  {profile.phone}
                </a>{' '}
                · {profile.location}
              </p>
            </div>

            <div className="relative hidden justify-self-end pr-4 lg:block">
              <ScriptNote className="absolute -top-2 left-1/2 w-40 -translate-x-1/2 -rotate-3 text-center text-[17px] leading-tight">
                {contact.note}
              </ScriptNote>

              <motion.div
                className="relative mt-12"
                animate={reduced ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-2 rounded-full blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, var(--glow-b), transparent 70%)',
                  }}
                />
                <img
                  src="/images/character.webp"
                  alt=""
                  width="560"
                  height="560"
                  loading="lazy"
                  className="hero-img relative size-52 object-cover object-top"
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
    <footer className="border-t border-line py-9">
      <div className="shell flex flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-ink text-[13px] font-extrabold tracking-tight text-page">
            {profile.initials}
          </span>
          <span className="leading-tight">
            <span className="block text-[13.5px] font-bold text-ink">
              {profile.name}
            </span>
            <span className="block text-[11px] text-ink-3">{profile.role}</span>
          </span>
        </a>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] text-ink-2 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <div className="flex gap-2">
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
                className="theme-tx grid size-9 place-items-center rounded-full border border-line bg-surface text-ink-2 transition-transform hover:-translate-y-0.5 hover:text-ink"
              >
                <Icon name={s.icon} className="size-4" />
              </a>
            ))}
          </div>
          <p className="text-center text-[11.5px] text-ink-3 md:text-right">
            © {new Date().getFullYear()} {profile.name}
            <br />
            Built with React, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
