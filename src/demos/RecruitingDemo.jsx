import { useMemo, useState } from 'react'
import { SKILLS, SAMPLE_JD, CANDIDATES, questionFor } from './data/recruiting'
import { buildIndex, search } from './lib/search'

const esc = (s) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

// Longest aliases claim their text first and remove it, so "Azure OpenAI" is
// one requirement rather than also counting as "Azure" and "OpenAI".
const BY_SPECIFICITY = [...SKILLS].sort(
  (a, b) => Math.max(...b.aliases.map((x) => x.length)) - Math.max(...a.aliases.map((x) => x.length)),
)

function extractSkills(jd) {
  let rest = jd.toLowerCase()
  const found = new Set()
  for (const s of BY_SPECIFICITY) {
    for (const a of [...s.aliases].sort((x, y) => y.length - x.length)) {
      const re = new RegExp(`(^|[^a-z0-9])${esc(a)}(?=[^a-z0-9]|$)`, 'i')
      if (re.test(rest)) {
        found.add(s.name)
        rest = rest.replace(new RegExp(`(^|[^a-z0-9])${esc(a)}(?=[^a-z0-9]|$)`, 'gi'), '$1 ')
        break
      }
    }
  }
  return SKILLS.filter((s) => found.has(s.name)).map((s) => s.name)
}

function extractYears(jd) {
  const m = jd.match(/(\d+)\s*\+?\s*(?:years|yrs)/i)
  return m ? Number(m[1]) : 3
}

function rank(jd) {
  const required = extractSkills(jd)
  const minYears = extractYears(jd)
  const index = buildIndex(CANDIDATES, (c) => `${c.title} ${c.summary} ${c.skills.join(' ')}`)
  const rel = new Map(search(index, jd, CANDIDATES.length).map((r) => [r.doc.id, r.score]))
  const maxRel = Math.max(0.0001, ...rel.values())

  const rows = CANDIDATES.map((c) => {
    const matched = required.filter((s) => c.skills.includes(s))
    const missing = required.filter((s) => !c.skills.includes(s))
    const coverage = required.length ? matched.length / required.length : 0
    const exp = Math.min(1, c.years / minYears)
    const relevance = (rel.get(c.id) ?? 0) / maxRel
    const score = 0.7 * coverage + 0.2 * exp + 0.1 * relevance
    return { c, matched, missing, coverage, exp, relevance, score }
  }).sort((a, b) => b.score - a.score)
  return { required, minYears, rows }
}

function scoreAnswer(question, answer) {
  const lower = answer.toLowerCase()
  const concepts = question.rubric.map(([label, keys]) => ({
    label,
    hit: keys.some((k) => lower.includes(k)),
  }))
  return { concepts, value: concepts.filter((c) => c.hit).length / concepts.length }
}

function Interview({ skills, onClose }) {
  const questions = useMemo(
    () => skills.slice(0, 3).map((s) => ({ skill: s, ...questionFor(s) })),
    [skills],
  )
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(() => questions.map(() => ''))
  const done = step >= questions.length

  const results = done ? questions.map((q, i) => ({ q, ...scoreAnswer(q, answers[i]) })) : []
  const overall = done ? results.reduce((a, r) => a + r.value, 0) / results.length : 0
  const verdict =
    overall >= 0.75 ? 'Strong signal: proceed to a technical round'
    : overall >= 0.5 ? 'Promising: probe the gaps in a follow-up'
    : 'Not enough evidence yet: answers lacked specifics'

  return (
    <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
          AI INTERVIEW {done ? '· SCORECARD' : `· QUESTION ${step + 1} OF ${questions.length}`}
        </h2>
        <button type="button" onClick={onClose} className="text-[12.5px] font-semibold text-ink-3">
          Close
        </button>
      </div>

      {!done ? (
        <div className="mt-4">
          <p className="text-[12px] font-bold text-brand-text">{questions[step].skill}</p>
          <p className="mt-1 text-[17px] font-semibold leading-snug text-ink">{questions[step].q}</p>
          <label htmlFor="answer" className="sr-only">Your answer</label>
          <textarea
            id="answer"
            rows={5}
            value={answers[step]}
            onChange={(e) => setAnswers((a) => a.map((v, i) => (i === step ? e.target.value : v)))}
            placeholder="Answer as you would in an interview. Specifics and numbers score higher."
            className="mt-3 w-full resize-y rounded-2xl border border-line-2 bg-card p-4 text-[14px] leading-relaxed outline-none focus:border-brand"
          />
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="mt-3 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-page"
          >
            {step === questions.length - 1 ? 'Finish and score' : 'Next question'}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-[34px] font-extrabold tabular-nums text-ink">{Math.round(overall * 100)}%</p>
          <p className="text-[14px] font-semibold text-brand-text">{verdict}</p>
          <ul className="mt-4 grid gap-3">
            {results.map((r) => (
              <li key={r.q.skill} className="rounded-2xl bg-card p-4 ring-1 ring-line">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13.5px] font-bold text-ink">{r.q.skill}</p>
                  <p className="text-[13px] font-semibold tabular-nums text-ink-2">{Math.round(r.value * 100)}%</p>
                </div>
                <ul className="mt-2 grid gap-1 text-[12.5px]">
                  {r.concepts.map((c) => (
                    <li key={c.label} className={c.hit ? 'text-emerald-700 dark:text-emerald-300' : 'text-ink-3'}>
                      {c.hit ? '✓' : '○'} {c.label}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => { setStep(0); setAnswers(questions.map(() => '')) }}
            className="mt-4 rounded-full border border-line-2 bg-card px-5 py-2.5 text-[13px] font-semibold"
          >
            Retake
          </button>
        </div>
      )}
    </section>
  )
}

export default function RecruitingDemo() {
  const [jd, setJd] = useState(SAMPLE_JD)
  const [interview, setInterview] = useState(false)
  const result = useMemo(() => rank(jd), [jd])

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
          <label htmlFor="jd" className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
            JOB DESCRIPTION
          </label>
          <textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={11}
            className="mt-2 w-full resize-y rounded-2xl border border-line-2 bg-card p-4 text-[14px] leading-relaxed outline-none focus:border-brand"
          />
          <h2 className="mt-5 text-[12px] font-bold tracking-[0.14em] text-ink-3">EXTRACTED REQUIREMENTS</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {result.required.length === 0 && (
              <li className="text-[13px] text-ink-3">No known skills found. Mention tools like Python, RAG or Docker.</li>
            )}
            {result.required.map((s) => (
              <li key={s} className="rounded-full bg-brand-wash px-3 py-1 text-[12px] font-medium text-brand-ink">
                {s}
              </li>
            ))}
            <li className="rounded-full border border-line-2 bg-card px-3 py-1 text-[12px] font-medium text-ink-2">
              {result.minYears}+ years
            </li>
          </ul>
          <button
            type="button"
            disabled={result.required.length === 0}
            onClick={() => setInterview(true)}
            className="mt-5 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-page disabled:opacity-40"
          >
            Take the AI interview yourself
          </button>
        </section>

        <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7" aria-live="polite">
          <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">
            RANKED CANDIDATES
          </h2>
          <p className="mt-1 text-[12px] text-ink-3">
            Score = 70% skill coverage + 20% experience fit + 10% profile relevance (BM25).
          </p>
          <ol className="mt-4 grid gap-3">
            {result.rows.map(({ c, matched, missing, score }, i) => (
              <li key={c.id} className="rounded-2xl bg-card p-4 ring-1 ring-line">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-wash text-[13px] font-bold text-brand-ink">
                    {c.name.split(' ').map((p) => p[0]).join('')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold text-ink">
                      <span className="mr-1.5 text-ink-3">{i + 1}.</span>
                      {c.name}
                    </p>
                    <p className="text-[12px] text-ink-3">
                      {c.title} · {c.years} yrs
                    </p>
                  </div>
                  <p className="text-[20px] font-extrabold tabular-nums text-ink">{Math.round(score * 100)}%</p>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-brand-wash">
                  <div className="h-full rounded-full bg-brand-solid" style={{ width: `${Math.max(3, score * 100)}%` }} />
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {matched.map((s) => (
                    <li key={s} className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-[11.5px] font-semibold text-emerald-700 dark:text-emerald-300">
                      {s}
                    </li>
                  ))}
                  {missing.map((s) => (
                    <li key={s} className="rounded-full border border-dashed border-line-2 px-2.5 py-0.5 text-[11.5px] text-ink-3">
                      missing {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {interview && (
        <Interview
          key={result.required.join('|')}
          skills={result.required}
          onClose={() => setInterview(false)}
        />
      )}
    </div>
  )
}
