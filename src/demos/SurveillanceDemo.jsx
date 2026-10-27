import { useRef, useState, useEffect } from 'react'
import { AGENTS, ANSWERS, EXAMPLES, LANGUAGES } from './data/agents'

const MARATHI_MARKERS = ['आहे', 'आहेत', 'काय', 'दाखवा', 'आजचा', 'मला', 'झाले', 'करा', 'च्या', 'कसे']
const HINDI_MARKERS = ['है', 'हैं', 'क्या', 'दिखाओ', 'दिखाएं', 'मुझे', 'आज', 'कौन', 'में', 'क्यों', 'कैसे']

function detectLanguage(text) {
  if (/[぀-ヿ一-鿿]/.test(text)) return 'ja'
  if (/[ऀ-ॿ]/.test(text)) {
    const mr = MARATHI_MARKERS.filter((m) => text.includes(m)).length
    const hi = HINDI_MARKERS.filter((m) => text.includes(m)).length
    return mr > hi ? 'mr' : 'hi'
  }
  return 'en'
}

const escapeRe = (s) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

function scoreAgents(text, lang) {
  const lower = text.toLowerCase()
  return AGENTS.map((agent) => {
    let score = 0
    const hits = []
    // Operators code-mix English product terms into other languages, so English keywords always count.
    const keywords = lang === 'en' ? agent.kw.en : [...agent.kw[lang], ...agent.kw.en]
    for (const k of keywords) {
      const latin = /^[a-z0-9 -]+$/i.test(k)
      const found = latin
        ? new RegExp(`\\b${escapeRe(k)}\\b`, 'i').test(lower)
        : lower.includes(k.toLowerCase())
      if (found) {
        score += 1 + Math.min(k.length, 10) / 20
        hits.push(k)
      }
    }
    return { agent, score, hits }
  }).sort((a, b) => b.score - a.score)
}

function route(text) {
  const lang = detectLanguage(text)
  const ranked = scoreAgents(text, lang)
  const total = ranked.reduce((a, r) => a + r.score, 0)
  const top = ranked[0]
  const fallback = top.score === 0
  const chosen = fallback ? ranked.find((r) => r.agent.id === 'help_guide') : top
  const confidence = fallback ? 0.2 : Math.min(0.99, top.score / Math.max(total, 1) + 0.1)
  return { text, lang, ranked, chosen, fallback, confidence: Number(confidence.toFixed(2)) }
}

export default function SurveillanceDemo() {
  const [input, setInput] = useState('')
  const [turns, setTurns] = useState([])
  const endRef = useRef(null)

  useEffect(() => {
    setTurns([{ ...route(EXAMPLES[0].text) }])
  }, [])

  const send = (value = input) => {
    const text = value.trim()
    if (!text) return
    setTurns((t) => [...t, route(text)])
    setInput('')
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [turns.length])

  const last = turns[turns.length - 1]
  const maxScore = Math.max(1, ...(last?.ranked.map((r) => r.score) ?? [1]))
  const toolCall = last && {
    tool: 'route_to_agent',
    arguments: {
      agent: last.chosen.agent.id,
      language: last.lang,
      confidence: last.confidence,
      matched: last.chosen.hits,
      ...(last.fallback ? { reason: 'no keyword match; falling back to the product guide' } : {}),
    },
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <section className="flex min-h-[28rem] flex-col rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">OPERATOR CHAT</h2>

        <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: '26rem' }}>
          {turns.map((t, i) => {
            const answer = ANSWERS[t.chosen.agent.id]()
            return (
              <div key={`${i}-${t.text}`} className="space-y-2">
                <div className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-solid px-4 py-2.5 text-[14px] text-white">
                    {t.text}
                  </p>
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-card p-4 ring-1 ring-line">
                  <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-wide text-ink-3">
                    <span className="rounded-full bg-brand-wash px-2 py-0.5 text-brand-ink">
                      {t.chosen.agent.name}
                    </span>
                    <span>{LANGUAGES[t.lang]} detected</span>
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink">{answer.text}</p>
                  <dl className="mt-3 grid gap-1.5 rounded-xl bg-surface-3 p-3 text-[12.5px]">
                    {answer.rows.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3">
                        <dt className="text-ink-2">{k}</dt>
                        <dd className="font-semibold text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[11px] text-ink-3">
                    Edge call: <code className="font-mono">{t.chosen.agent.op}</code> (read-only, illustrative data)
                  </p>
                </div>
              </div>
            )
          })}
          <div ref={endRef} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button
              key={e.text}
              type="button"
              onClick={() => send(e.text)}
              className="rounded-full bg-brand-wash px-3 py-1.5 text-[12px] font-medium text-brand-ink"
            >
              <span className="mr-1.5 font-bold uppercase">{e.lang}</span>
              {e.text}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="mt-4 flex gap-2"
        >
          <label htmlFor="sv-input" className="sr-only">
            Ask in English, Hindi, Marathi or Japanese
          </label>
          <input
            id="sv-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask in English, हिन्दी, मराठी or 日本語"
            className="min-w-0 flex-1 rounded-full border border-line-2 bg-card px-5 py-3 text-[14px] outline-none focus:border-brand"
          />
          <button type="submit" className="rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-page">
            Send
          </button>
        </form>
      </section>

      <section aria-live="polite" className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">SUPERVISOR VIEW</h2>
        {last && (
          <>
            <p className="mt-3 text-[13px] text-ink-2">
              Language: <strong className="text-ink">{LANGUAGES[last.lang]}</strong> · Routed to{' '}
              <strong className="text-ink">{last.chosen.agent.name}</strong>
              {last.fallback && ' (fallback)'}
            </p>

            <ol className="mt-4 grid gap-1.5">
              {last.ranked.map((r) => {
                const isChosen = r.agent.id === last.chosen.agent.id
                return (
                  <li key={r.agent.id} className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-2 text-[12px]">
                    <span className={`truncate ${isChosen ? 'font-bold text-ink' : 'text-ink-2'}`}>
                      {r.agent.name}
                    </span>
                    <span className="h-2 overflow-hidden rounded-full bg-brand-wash">
                      <span
                        className={`block h-full rounded-full ${isChosen ? 'bg-brand-solid' : 'bg-line-2'}`}
                        style={{ width: `${(r.score / maxScore) * 100}%` }}
                      />
                    </span>
                    <span className="text-right tabular-nums text-ink-3">{r.score.toFixed(1)}</span>
                  </li>
                )
              })}
            </ol>

            <h3 className="mt-6 text-[12px] font-bold tracking-[0.14em] text-ink-3">
              STRUCTURED TOOL CALL
            </h3>
            <pre className="mt-2 overflow-x-auto rounded-2xl bg-[#14142b] p-4 text-[12px] leading-relaxed text-[#cfd3ff]">
              {JSON.stringify(toolCall, null, 2)}
            </pre>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-3">
              The production supervisor is an LLM forced into exactly one such call. Here a keyword
              scorer stands in, so you can see the routing decision and the runners-up.
            </p>
          </>
        )}
      </section>
    </div>
  )
}
