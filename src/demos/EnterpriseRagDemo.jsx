import { useMemo, useRef, useState, useEffect } from 'react'
import { DOCS, QUESTIONS } from './data/policies'
import { chunkDocs, buildChunkIndex, answer } from './lib/rag'
import { markTerms } from './lib/search'

function Passage({ hit, terms, n }) {
  return (
    <li className="rounded-xl bg-white p-3 ring-1 ring-line">
      <p className="flex flex-wrap items-center gap-2 text-[11.5px] font-bold text-ink-3">
        {n && (
          <span className="grid size-5 place-items-center rounded-full bg-brand-text text-[10.5px] text-white">
            {n}
          </span>
        )}
        <span>
          {hit.doc.code} · {hit.doc.docTitle} · §{hit.doc.section}
        </span>
        <span className="ml-auto font-semibold tabular-nums text-ink-3">score {hit.score.toFixed(1)}</span>
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
        {markTerms(hit.doc.text, terms).map((p, i) =>
          p.hit ? (
            <mark key={i} className="rounded bg-violet/20 px-0.5 text-ink">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </p>
    </li>
  )
}

export default function EnterpriseRagDemo() {
  const chunks = useMemo(() => chunkDocs(DOCS), [])
  const index = useMemo(() => buildChunkIndex(chunks), [chunks])
  const [input, setInput] = useState('')
  const [turns, setTurns] = useState([])
  const endRef = useRef(null)

  useEffect(() => {
    setTurns([answer(index, QUESTIONS[0])])
  }, [index])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [turns.length])

  const ask = (q = input) => {
    const text = q.trim()
    if (!text) return
    setTurns((t) => [...t, answer(index, text)])
    setInput('')
  }

  const stages = [
    ['Parse', `${DOCS.length} documents`],
    ['Chunk', `${chunks.length} passages`],
    ['Index', `${index.vocab} terms`],
    ['Retrieve', 'BM25, top 3'],
    ['Answer', 'cited or refused'],
  ]

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
      <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">LIVE PIPELINE</h2>
        <ol className="mt-4 grid gap-2">
          {stages.map(([name, detail], i) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-line">
              <span className="grid size-6 place-items-center rounded-full bg-brand-wash text-[11px] font-bold text-brand-ink">
                {i + 1}
              </span>
              <span className="text-[13.5px] font-semibold text-ink">{name}</span>
              <span className="ml-auto text-[12px] tabular-nums text-ink-3">{detail}</span>
            </li>
          ))}
        </ol>

        <h2 className="mt-6 text-[12px] font-bold tracking-[0.14em] text-ink-3">INDEXED LIBRARY</h2>
        <ul className="mt-3 grid gap-2 text-[13px]">
          {DOCS.map((d) => (
            <li key={d.code} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 ring-1 ring-line">
              <span className="font-medium text-ink">{d.title}</span>
              <span className="shrink-0 text-[11.5px] font-semibold text-ink-3">{d.code}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex min-h-[30rem] flex-col rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">ASK THE LIBRARY</h2>

        <div className="mt-4 flex-1 space-y-5 overflow-y-auto pr-1" style={{ maxHeight: '34rem' }} aria-live="polite">
          {turns.map((t, i) => (
            <div key={`${i}-${t.question}`} className="space-y-2">
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-text px-4 py-2.5 text-[14px] text-white">
                  {t.question}
                </p>
              </div>

              <div className="rounded-2xl rounded-bl-md bg-white p-4 ring-1 ring-line">
                {t.grounded ? (
                  <>
                    <p className="text-[14.5px] leading-relaxed text-ink">{t.text}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-[11.5px] font-bold tracking-wide text-ink-3">CONFIDENCE</span>
                      <span className="h-1.5 w-28 overflow-hidden rounded-full bg-brand-wash">
                        <span className="block h-full rounded-full bg-brand-text" style={{ width: `${t.confidence * 100}%` }} />
                      </span>
                      <span className="text-[12.5px] font-bold tabular-nums text-ink">{t.confidence.toFixed(2)}</span>
                    </div>
                    <ul className="mt-2 flex flex-wrap gap-2 text-[11.5px] text-ink-3">
                      {t.sources.map((s, k) => (
                        <li key={s.id}>
                          [{k + 1}] {s.code} · {s.docTitle}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-[14.5px] leading-relaxed text-ink">
                    <span className="mr-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                      NOT IN THE DOCUMENTS
                    </span>
                    I could not find a confident answer in the indexed policies, so I will not guess.{' '}
                    {t.hits.length === 0
                      ? 'No indexed passage contains the terms in your question.'
                      : `The best passage matched only ${Math.round(t.coverage * 100)}% of your question's terms.`}
                  </p>
                )}

                {t.hits.length > 0 && (
                  <details className="mt-3" open={i === turns.length - 1}>
                    <summary className="cursor-pointer text-[12.5px] font-semibold text-brand-text">
                      Retrieved passages ({t.hits.length})
                    </summary>
                    <ul className="mt-2 grid gap-2">
                      {t.hits.map((h) => (
                        <Passage
                          key={h.doc.id}
                          hit={h}
                          terms={t.terms}
                          n={t.grounded ? t.sources.findIndex((s) => s.id === h.doc.id) + 1 || null : null}
                        />
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="rounded-full bg-brand-wash px-3 py-1.5 text-left text-[12px] font-medium text-brand-ink"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            ask()
          }}
          className="mt-4 flex gap-2"
        >
          <label htmlFor="rag-input" className="sr-only">Ask a question about the policies</label>
          <input
            id="rag-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about leave, expenses, security, vendors…"
            className="min-w-0 flex-1 rounded-full border border-line-2 bg-white px-5 py-3 text-[14px] outline-none focus:border-brand"
          />
          <button type="submit" className="rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white">
            Ask
          </button>
        </form>
      </section>
    </div>
  )
}
