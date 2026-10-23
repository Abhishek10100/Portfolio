import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const SAMPLES = {
  clean: {
    label: 'Clean invoice',
    number: 'INV-2026-0417',
    issued: '2026å¹´4æœˆ17æ—¥',
    due: '2026å¹´5æœˆ31æ—¥',
    buyer: 'æ ªå¼ä¼šç¤¾ã‚µãƒ³ãƒ—ãƒ«å•†äº‹',
    seller: 'ã‚¢ãƒ«ãƒ•ã‚¡ãƒ»ãƒ‡ãƒ¼ã‚¿æ ªå¼ä¼šç¤¾',
    items: [
      ['ã‚¯ãƒ©ã‚¦ãƒ‰åˆ©ç”¨æ–™ï¼ˆ4æœˆåˆ†ï¼‰', '1', 'Â¥120,000', 'Â¥120,000'],
      ['ä¿å®ˆã‚µãƒãƒ¼ãƒˆè²»ç”¨', '2', 'Â¥45,000', 'Â¥90,000'],
      ['ãƒ‡ãƒ¼ã‚¿ç§»è¡Œä½œæ¥­', '3', 'Â¥30,000', 'Â¥90,000'],
    ],
    subtotal: 'Â¥300,000',
    tax: 'Â¥30,000',
    total: 'Â¥330,000',
  },
  error: {
    label: 'Invoice with a totals error',
    number: 'INV-2026-0418',
    issued: '2026å¹´4æœˆ18æ—¥',
    due: '2026å¹´5æœˆ31æ—¥',
    buyer: 'æ±æ—¥æœ¬ãƒ­ã‚¸ã‚¹ãƒ†ã‚£ã‚¯ã‚¹æ ªå¼ä¼šç¤¾',
    seller: 'ã‚¢ãƒ«ãƒ•ã‚¡ãƒ»ãƒ‡ãƒ¼ã‚¿æ ªå¼ä¼šç¤¾',
    items: [
      ['APIåˆ©ç”¨æ–™', '1', 'Â¥80,000', 'Â¥80,000'],
      ['é‹ç”¨ç›£è¦–ã‚µãƒ¼ãƒ“ã‚¹', '2', 'Â¥60,000', 'Â¥120,000'],
    ],
    subtotal: 'Â¥200,000',
    tax: 'Â¥20,000',
    total: 'Â¥240,000',
  },
}

const STEPS = ['Scan', 'OCR', 'Extract', 'Validate']
const num = (t) => Number(String(t).replace(/[^\d]/g, ''))
const yen = (n) => `Â¥${n.toLocaleString('en-US')}`
const confidence = (text) => {
  let h = 0
  for (const ch of text) h = (h * 31 + ch.codePointAt(0)) % 97
  return (0.93 + (h % 7) / 100).toFixed(2)
}

function isoDate(jp) {
  const m = jp.match(/(\d{4})å¹´(\d{1,2})æœˆ(\d{1,2})æ—¥/)
  return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : null
}

function extract(lines) {
  const get = (k) => lines.find((l) => l.key === k)?.text ?? ''
  const items = []
  for (let i = 0; lines.some((l) => l.key === `item-${i}-desc`); i += 1) {
    items.push({
      description: get(`item-${i}-desc`),
      quantity: num(get(`item-${i}-qty`)),
      unit_price: num(get(`item-${i}-unit`)),
      amount: num(get(`item-${i}-amount`)),
    })
  }
  return {
    document_type: 'invoice',
    invoice_number: get('number'),
    issue_date: isoDate(get('issued')),
    due_date: isoDate(get('due')),
    buyer: get('buyer'),
    seller: get('seller'),
    currency: 'JPY',
    line_items: items,
    subtotal: num(get('subtotal')),
    tax: { rate: 0.1, amount: num(get('tax')) },
    total: num(get('total')),
  }
}

function validate(d) {
  const sum = d.line_items.reduce((a, i) => a + i.amount, 0)
  const checks = []
  d.line_items.forEach((i, n) =>
    checks.push({
      label: `Line ${n + 1}: quantity Ã— unit price`,
      ok: i.quantity * i.unit_price === i.amount,
      detail: `${i.quantity} Ã— ${yen(i.unit_price)} = ${yen(i.quantity * i.unit_price)}, found ${yen(i.amount)}`,
    }),
  )
  checks.push({
    label: 'Subtotal equals the sum of line amounts',
    ok: sum === d.subtotal,
    detail: `expected ${yen(sum)}, found ${yen(d.subtotal)}`,
  })
  const tax = Math.round(d.subtotal * d.tax.rate)
  checks.push({
    label: 'Consumption tax is 10% of the subtotal',
    ok: tax === d.tax.amount,
    detail: `expected ${yen(tax)}, found ${yen(d.tax.amount)}`,
  })
  const total = d.subtotal + d.tax.amount
  checks.push({
    label: 'Total equals subtotal plus tax',
    ok: total === d.total,
    detail: `expected ${yen(total)}, found ${yen(d.total)}`,
  })
  checks.push({
    label: 'Invoice number format',
    ok: /^INV-\d{4}-\d{4}$/.test(d.invoice_number),
    detail: d.invoice_number,
  })
  checks.push({
    label: 'Dates valid and due on or after issue',
    ok: Boolean(d.issue_date && d.due_date && d.due_date >= d.issue_date),
    detail: `${d.issue_date} â†’ ${d.due_date}`,
  })
  return checks
}

export default function JapaneseDocsDemo() {
  const [sampleKey, setSampleKey] = useState('clean')
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [lines, setLines] = useState([])
  const [copied, setCopied] = useState(false)
  const paperRef = useRef(null)
  const timer = useRef(null)
  const sample = SAMPLES[sampleKey]

  const measure = useCallback(() => {
    const paper = paperRef.current
    if (!paper) return
    const base = paper.getBoundingClientRect()
    const found = [...paper.querySelectorAll('[data-ocr]')].map((el) => {
      const r = el.getBoundingClientRect()
      const text = el.textContent.trim()
      return {
        key: el.dataset.ocr,
        text,
        x: r.left - base.left - 3,
        y: r.top - base.top - 2,
        w: r.width + 6,
        h: r.height + 4,
        conf: confidence(text),
      }
    })
    setLines(found)
    setBoxes(found)
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (paperRef.current) ro.observe(paperRef.current)
    return () => ro.disconnect()
  }, [measure, sampleKey])

  useEffect(() => () => clearTimeout(timer.current), [])

  const advance = () => {
    if (busy || step >= STEPS.length) return
    setBusy(true)
    timer.current = setTimeout(() => {
      setStep((s) => s + 1)
      setBusy(false)
    }, 900)
  }

  const runAll = () => {
    clearTimeout(timer.current)
    setBusy(false)
    setStep(STEPS.length)
  }

  const reset = (key = sampleKey) => {
    clearTimeout(timer.current)
    setBusy(false)
    setStep(0)
    setSampleKey(key)
  }

  const data = step >= 3 ? extract(lines) : null
  const checks = data && step >= 4 ? validate(data) : null
  const failed = checks?.filter((c) => !c.ok).length ?? 0
  const json = data ? JSON.stringify(data, null, 2) : ''

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked */
    }
  }

  const jp = "'Noto Sans JP','Yu Gothic','Hiragino Sans','Meiryo',sans-serif"

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">DOCUMENT</h2>
          <div className="flex gap-2" role="group" aria-label="Sample document">
            {Object.entries(SAMPLES).map(([k, s]) => (
              <button
                key={k}
                type="button"
                aria-pressed={sampleKey === k}
                onClick={() => reset(k)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${
                  sampleKey === k ? 'bg-brand-text text-white' : 'bg-brand-wash text-ink-2'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div
            ref={paperRef}
            className="relative mx-auto w-full min-w-[19rem] max-w-[34rem] rounded-md border border-line-2 bg-[#fffefa] p-6 shadow-[0_14px_30px_-18px_rgba(40,40,100,0.5)]"
            style={{ fontFamily: jp, transform: step >= 1 ? 'rotate(-0.5deg)' : undefined, transition: 'transform .5s' }}
          >
            <h3 className="text-center text-[22px] font-bold tracking-[0.5em] text-ink" data-ocr="title">
              è«‹æ±‚æ›¸
            </h3>
            <dl className="mt-5 grid gap-1.5 text-[12.5px] text-ink">
              <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-3">è«‹æ±‚ç•ªå·</dt><dd data-ocr="number">{sample.number}</dd></div>
              <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-3">ç™ºè¡Œæ—¥</dt><dd data-ocr="issued">{sample.issued}</dd></div>
              <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-3">æ”¯æ‰•æœŸé™</dt><dd data-ocr="due">{sample.due}</dd></div>
              <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-3">è«‹æ±‚å…ˆ</dt><dd><span data-ocr="buyer">{sample.buyer}</span> å¾¡ä¸­</dd></div>
              <div className="flex gap-2"><dt className="w-20 shrink-0 text-ink-3">ç™ºè¡Œå…ƒ</dt><dd data-ocr="seller">{sample.seller}</dd></div>
            </dl>

            <table className="mt-5 w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-ink/40 text-left text-ink-3">
                  <th className="py-1.5 font-medium">å“å</th>
                  <th className="py-1.5 text-right font-medium">æ•°é‡</th>
                  <th className="py-1.5 text-right font-medium">å˜ä¾¡</th>
                  <th className="py-1.5 text-right font-medium">é‡‘é¡</th>
                </tr>
              </thead>
              <tbody>
                {sample.items.map((it, i) => (
                  <tr key={it[0]} className="border-b border-line">
                    <td className="py-1.5"><span data-ocr={`item-${i}-desc`}>{it[0]}</span></td>
                    <td className="py-1.5 text-right"><span data-ocr={`item-${i}-qty`}>{it[1]}</span></td>
                    <td className="py-1.5 text-right"><span data-ocr={`item-${i}-unit`}>{it[2]}</span></td>
                    <td className="py-1.5 text-right"><span data-ocr={`item-${i}-amount`}>{it[3]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="ml-auto mt-4 grid w-52 gap-1 text-[12.5px]">
              <div className="flex justify-between"><dt className="text-ink-3">å°è¨ˆ</dt><dd data-ocr="subtotal">{sample.subtotal}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-3">æ¶ˆè²»ç¨Žï¼ˆ10%ï¼‰</dt><dd data-ocr="tax">{sample.tax}</dd></div>
              <div className="flex justify-between border-t border-ink/40 pt-1 text-[14px] font-bold">
                <dt>åˆè¨ˆé‡‘é¡</dt><dd data-ocr="total">{sample.total}</dd>
              </div>
            </dl>

            {busy && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-violet/30 to-transparent"
                style={{ animation: 'jp-scan 0.9s linear' }}
              />
            )}
            {step >= 2 &&
              boxes.map((b) => (
                <span
                  key={b.key}
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-[3px] border border-brand-text/70 bg-brand-text/10"
                  style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
                >
                  {step === 2 && (
                    <span className="absolute -top-3.5 left-0 rounded bg-brand-text px-1 text-[8.5px] font-bold leading-[13px] text-white">
                      {b.conf}
                    </span>
                  )}
                </span>
              ))}
          </div>
        </div>
        <style>{'@keyframes jp-scan{from{top:-2.5rem}to{top:100%}}'}</style>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ol className="flex flex-wrap gap-2" aria-label="Pipeline progress">
            {STEPS.map((s, i) => (
              <li
                key={s}
                aria-current={step === i + 1 ? 'step' : undefined}
                className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                  step > i ? 'bg-emerald-500/12 text-emerald-700' : 'bg-brand-wash text-ink-3'
                }`}
              >
                {step > i ? 'âœ“ ' : ''}{s}
              </li>
            ))}
          </ol>
          <div className="ml-auto flex gap-2">
            <button type="button" onClick={() => reset()} className="rounded-full border border-line-2 bg-white px-4 py-2.5 text-[13px] font-semibold">
              Reset
            </button>
            <button type="button" onClick={runAll} className="rounded-full border border-line-2 bg-white px-4 py-2.5 text-[13px] font-semibold">
              Run all
            </button>
            <button
              type="button"
              onClick={advance}
              disabled={busy || step >= STEPS.length}
              className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white disabled:opacity-40"
            >
              {step >= STEPS.length ? 'Done' : `${busy ? 'Running' : 'Run'}: ${STEPS[step]}`}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-surface p-5 shadow-card md:p-7" aria-live="polite">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-violet-text">RESULT</h2>

        {step < 2 && (
          <p className="mt-4 text-[14px] leading-relaxed text-ink-2">
            Run the pipeline to see what the OCR reads, how fields are extracted into a schema, and which
            validation checks pass.
          </p>
        )}

        {step >= 2 && step < 3 && (
          <ul className="mt-4 grid max-h-96 gap-1.5 overflow-y-auto text-[12.5px]">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-1.5 ring-1 ring-line">
                <span style={{ fontFamily: jp }} className="text-ink">{l.text}</span>
                <span className="shrink-0 tabular-nums text-ink-3">{l.conf}</span>
              </li>
            ))}
          </ul>
        )}

        {data && (
          <>
            <div className="mt-4 flex items-center justify-between gap-3">
              <h3 className="text-[12px] font-bold tracking-[0.14em] text-ink-3">STRUCTURED OUTPUT</h3>
              <button type="button" onClick={copy} className="rounded-full border border-line-2 bg-white px-3.5 py-1.5 text-[12px] font-semibold">
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            </div>
            <pre className="mt-2 max-h-72 overflow-auto rounded-2xl bg-[#14142b] p-4 text-[11.5px] leading-relaxed text-[#cfd3ff]">
              {json}
            </pre>
          </>
        )}

        {checks && (
          <>
            <h3 className="mt-5 text-[12px] font-bold tracking-[0.14em] text-ink-3">
              VALIDATION Â·{' '}
              <span className={failed ? 'text-rose-700' : 'text-emerald-700'}>
                {failed ? `${failed} CHECK${failed > 1 ? 'S' : ''} FAILED, ROUTED TO REVIEW` : 'ALL CHECKS PASSED'}
              </span>
            </h3>
            <ul className="mt-2 grid gap-1.5">
              {checks.map((c) => (
                <li key={c.label} className={`rounded-lg px-3 py-2 text-[12.5px] ring-1 ${c.ok ? 'bg-white ring-line' : 'bg-rose-50 ring-rose-200'}`}>
                  <p className={`font-semibold ${c.ok ? 'text-ink' : 'text-rose-800'}`}>
                    {c.ok ? 'âœ“' : 'âœ—'} {c.label}
                  </p>
                  <p className="mt-0.5 text-ink-3">{c.detail}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  )
}
