import { useMemo, useState, useEffect } from 'react'
import { slides, KIND_ORDER, examples } from './data/slides'
import { buildIndex, search, fuse, stem } from './lib/search'

const THEMES = {
  Indigo: { a: '#5b5bd6', b: '#a855f7' },
  Emerald: { a: '#0f9d74', b: '#34c38f' },
  Ember: { a: '#d9601e', b: '#ffb23d' },
}

const DEFAULT_PROMPT = 'Quarterly sales review with revenue, pipeline and win rate'

function expandQueries(prompt, index) {
  const clean = prompt.trim()
  const clauses = clean
    .split(/,|;|\band\b|\bwith\b|\bcovering\b|\+|&/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
  const words = [...new Set(clean.toLowerCase().match(/[a-z0-9]+/g) || [])]
  const rare = words
    .map((w) => ({ w, idf: Math.log(1 + index.N / ((index.df.get(stem(w)) || 0) + 0.5)) }))
    .sort((a, b) => b.idf - a.idf)
    .slice(0, 4)
    .map((x) => x.w)
  const out = [clean]
  for (const c of clauses) if (c.toLowerCase() !== clean.toLowerCase()) out.push(c)
  if (rare.length >= 2) out.push(rare.join(' '))
  return [...new Set(out)].slice(0, 5)
}

function generate(prompt, count, index) {
  const t0 = performance.now()
  const queries = expandQueries(prompt, index)
  const lists = queries.map((q) => search(index, q, 6))
  const fused = fuse(lists, (d) => d.id)

  // At most one agenda slide, placed first; the rest fill by fused score.
  const picked = []
  let agenda = null
  for (const r of fused) {
    if (r.doc.kind === 'agenda') {
      agenda ??= r
      continue
    }
    if (picked.length < count - 1) picked.push(r)
  }
  const chosen = [...(agenda ? [agenda] : []), ...picked].slice(0, count)
  chosen.sort(
    (a, b) =>
      KIND_ORDER.indexOf(a.doc.kind) - KIND_ORDER.indexOf(b.doc.kind) || b.score - a.score,
  )
  return {
    queries,
    perQuery: lists.map((l) => l.length),
    fused: fused.slice(0, 8),
    deck: chosen,
    ms: Math.max(1, Math.round(performance.now() - t0)),
  }
}

function SlideView({ slide, theme, n, total, title }) {
  const t = THEMES[theme]
  if (slide.type === 'title') {
    return (
      <div
        className="relative flex aspect-video flex-col justify-end overflow-hidden rounded-xl p-[6%] text-white"
        style={{ background: `linear-gradient(135deg, ${t.a}, ${t.b})` }}
      >
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/15" />
        <p className="text-[clamp(10px,1.2vw,13px)] font-semibold tracking-[0.16em] opacity-80">
          GENERATED DECK
        </p>
        <h3 className="mt-1 text-[clamp(18px,3vw,34px)] font-extrabold leading-tight">{title}</h3>
        <p className="mt-2 text-[clamp(10px,1.1vw,13px)] opacity-80">
          {total - 1} slides retrieved from the library
        </p>
      </div>
    )
  }
  return (
    <div className="relative flex aspect-video flex-col overflow-hidden rounded-xl border border-line bg-white p-[5%]">
      <div className="absolute inset-y-0 left-0 w-[1.6%]" style={{ background: t.a }} />
      <p className="text-[clamp(9px,1vw,11px)] font-bold tracking-[0.14em]" style={{ color: t.a }}>
        {slide.deck.toUpperCase()}
      </p>
      <h3 className="mt-1 text-[clamp(14px,2.2vw,26px)] font-extrabold leading-tight text-ink">
        {slide.title}
      </h3>
      <ul className="mt-[3%] grid gap-[2%] text-[clamp(10px,1.35vw,16px)] leading-snug text-ink-2">
        {slide.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full" style={{ background: t.b }} />
            {b}
          </li>
        ))}
      </ul>
      <p className="mt-auto text-[clamp(8px,0.9vw,10px)] font-medium text-ink-3">
        Slide {n} of {total}
      </p>
    </div>
  )
}

export default function AlgoCreatorDemo() {
  const index = useMemo(() => buildIndex(slides, (s) => `${s.title} ${s.deck} ${s.bullets.join(' ')}`), [])
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [count, setCount] = useState(5)
  const [theme, setTheme] = useState('Indigo')
  const [result, setResult] = useState(null)
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const run = (p = prompt, c = count) => {
    setResult(generate(p, c, index))
    setActive(0)
  }

  useEffect(() => {
    setResult(generate(DEFAULT_PROMPT, 5, index))
  }, [index])

  const deckSlides = useMemo(() => {
    if (!result || result.deck.length === 0) return []
    const title = prompt.trim().replace(/^./, (c) => c.toUpperCase())
    return [{ type: 'title', title }, ...result.deck.map((r) => ({ type: 'slide', ...r.doc }))]
  }, [result, prompt])

  const chosenIds = new Set(result?.deck.map((r) => r.doc.id))
  const maxScore = result?.fused[0]?.score || 1

  const copyOutline = async () => {
    const md = [
      `# ${deckSlides[0].title}`,
      ...deckSlides.slice(1).map((s) => `\n## ${s.title}\n${s.bullets.map((b) => `- ${b}`).join('\n')}\n_Source: ${s.deck}_`),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(md)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: nothing to do */
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
        <label htmlFor="brief" className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
          YOUR BRIEF
        </label>
        <textarea
          id="brief"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="mt-2 w-full resize-none rounded-2xl border border-line-2 bg-white p-4 text-[15px] leading-relaxed text-ink outline-none focus:border-brand"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setPrompt(ex)
                run(ex)
              }}
              className="rounded-full bg-brand-wash px-3 py-1.5 text-[12px] font-medium text-brand-ink hover:bg-brand-wash/70"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Slides in deck</legend>
            <span className="text-[12.5px] font-semibold text-ink-2">Slides</span>
            {[4, 5, 6, 7].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={count === n}
                onClick={() => {
                  setCount(n)
                  run(prompt, n)
                }}
                className={`size-8 rounded-full text-[13px] font-semibold ${
                  count === n ? 'bg-brand-text text-white' : 'bg-brand-wash text-ink-2'
                }`}
              >
                {n}
              </button>
            ))}
          </fieldset>
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Brand theme</legend>
            <span className="text-[12.5px] font-semibold text-ink-2">Brand</span>
            {Object.entries(THEMES).map(([name, t]) => (
              <button
                key={name}
                type="button"
                aria-pressed={theme === name}
                onClick={() => setTheme(name)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold ${
                  theme === name ? 'border-ink bg-white text-ink' : 'border-line bg-white text-ink-2'
                }`}
              >
                <span className="size-3 rounded-full" style={{ background: `linear-gradient(135deg, ${t.a}, ${t.b})` }} />
                {name}
              </button>
            ))}
          </fieldset>
          <button
            type="button"
            onClick={() => run()}
            className="ml-auto rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white"
          >
            Generate deck
          </button>
        </div>
      </section>

      {result && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <section aria-live="polite" className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
            <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
              1 Â· MULTI-QUERY EXPANSION
            </h2>
            <ul className="mt-3 grid gap-2">
              {result.queries.map((q, i) => (
                <li key={q} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-[13px] ring-1 ring-line">
                  <span className="text-ink">
                    <span className="mr-2 font-bold text-ink-3">{i === 0 ? 'full' : `sub ${i}`}</span>
                    {q}
                  </span>
                  <span className="shrink-0 text-[11.5px] font-semibold text-ink-3">
                    {result.perQuery[i]} hits
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-[12px] font-bold tracking-[0.14em] text-violet-text">
              2 Â· RANK FUSION ({slides.length} slides searched in {result.ms} ms)
            </h2>
            {result.fused.length === 0 ? (
              <p className="mt-3 rounded-xl bg-white p-4 text-[13.5px] text-ink-2 ring-1 ring-line">
                No slide matched. Try words like sales, roadmap, onboarding, security, AI, cost or market.
              </p>
            ) : (
              <ol className="mt-3 grid gap-2">
                {result.fused.map((r, i) => (
                  <li key={r.doc.id} className="rounded-xl bg-white p-3 ring-1 ring-line">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold text-ink">
                        <span className="mr-1.5 text-ink-3">{i + 1}.</span>
                        {r.doc.title}
                      </p>
                      {chosenIds.has(r.doc.id) && (
                        <span className="shrink-0 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
                          IN DECK
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-ink-3">
                      {r.doc.deck} Â· found by {r.hits} of {result.queries.length} queries
                    </p>
                    <div className="mt-2 h-1.5 rounded-full bg-brand-wash">
                      <div
                        className="h-full rounded-full bg-brand-text"
                        style={{ width: `${Math.max(6, (r.score / maxScore) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
                3 Â· GENERATED OUTLINE
              </h2>
              {deckSlides.length > 0 && (
                <button
                  type="button"
                  onClick={copyOutline}
                  className="rounded-full border border-line-2 bg-white px-4 py-2 text-[12.5px] font-semibold"
                >
                  {copied ? 'Copied' : 'Copy as Markdown'}
                </button>
              )}
            </div>

            {deckSlides.length === 0 ? (
              <p className="mt-4 text-[14px] text-ink-2">Nothing to assemble yet.</p>
            ) : (
              <>
                <div className="mt-4">
                  <SlideView
                    slide={deckSlides[active]}
                    theme={theme}
                    n={active + 1}
                    total={deckSlides.length}
                    title={deckSlides[0].title}
                  />
                </div>
                <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7">
                  {deckSlides.map((s, i) => (
                    <li key={s.id ?? 'title'}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Show slide ${i + 1}: ${s.title}`}
                        aria-current={active === i}
                        className={`w-full rounded-lg p-1 text-left text-[9px] font-bold leading-tight ring-2 ${
                          active === i ? 'ring-brand-text' : 'ring-transparent hover:ring-line-2'
                        }`}
                      >
                        <span
                          className="flex aspect-video items-center justify-center rounded-md p-1 text-center text-white"
                          style={{ background: s.type === 'title' ? `linear-gradient(135deg, ${THEMES[theme].a}, ${THEMES[theme].b})` : '#8f94b6' }}
                        >
                          {i + 1}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
