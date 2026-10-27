import { profile } from '../data/site'
import { Icon } from '../components/ui'
import { LogoMark } from '../components/Logo'
import GuideWidget from '../guide/GuideWidget'
import ThemeToggle from '../components/ThemeToggle'

/** Page chrome shared by every demo: header, intro, the demo itself, and an honest note on what is real. */
export default function DemoShell({ meta, children }) {
  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="shell pt-4">
        <nav
          aria-label="Demo"
          className="flex items-center justify-between rounded-2xl border border-line bg-card/85 px-4 py-3 shadow-card backdrop-blur-xl md:px-5"
        >
          <a href="/" aria-label={`${profile.name}, portfolio home`} className="flex items-center gap-3">
            <LogoMark className="size-10 shrink-0 drop-shadow-[0_6px_14px_rgba(79,107,245,0.35)]" />
            <span className="hidden leading-tight sm:block">
              <span className="block text-[14.5px] font-bold text-ink">{profile.name}</span>
              <span className="block text-[11.5px] text-ink-3">{profile.role}</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-line-2 bg-card px-4 py-2 text-[13px] font-semibold"
          >
            <Icon name="arrow" className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
            Back to portfolio
          </a>
          </div>
        </nav>
      </header>

      <main className="shell pb-20 pt-10 md:pt-14">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-wash px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-brand-text">
              LIVE DEMO
            </span>
            <span className="rounded-full border border-line bg-card px-3 py-1 text-[11px] font-semibold text-ink-3">
              Synthetic sample data · runs in your browser
            </span>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold leading-[1.05]">
            {meta.title}
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{meta.summary}</p>
        </div>

        <div className="mt-8">{children}</div>

        <section
          aria-labelledby="demo-notes"
          className="mt-10 grid gap-4 rounded-3xl border border-line bg-surface p-6 shadow-card md:grid-cols-2 md:p-8"
        >
          <h2 id="demo-notes" className="sr-only">
            About this demo
          </h2>
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
              WHAT RUNS FOR REAL HERE
            </h3>
            <ul className="mt-3 grid gap-2 text-[14px] leading-relaxed text-ink-2">
              {meta.real.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.14em] text-ink-3">
              WHAT THE PRODUCTION SYSTEM ADDS
            </h3>
            <ul className="mt-3 grid gap-2 text-[14px] leading-relaxed text-ink-2">
              {meta.production.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-line-2" />
                  {r}
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {meta.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-brand-wash px-3 py-1 text-[11.5px] font-medium text-brand-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[13.5px] font-semibold text-page"
          >
            Discuss a project like this
            <Icon name="arrowUpRight" className="size-4" />
          </a>
          <a href="/#demos" className="text-[13.5px] font-semibold text-brand-text">
            More demos
          </a>
        </div>
      </main>
      <GuideWidget ready />
    </div>
  )
}
