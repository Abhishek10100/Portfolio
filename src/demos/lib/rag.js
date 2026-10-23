import { buildIndex, search, tokenize, stem } from './search'

const MAX_CHUNK_WORDS = 70

/** Splits each document into paragraph chunks; paragraphs that are too long are split on sentences. */
export function chunkDocs(docs) {
  const chunks = []
  for (const doc of docs) {
    const paragraphs = doc.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    paragraphs.forEach((para, pi) => {
      const pieces = []
      if (para.split(/\s+/).length <= MAX_CHUNK_WORDS) {
        pieces.push(para)
      } else {
        let cur = ''
        for (const s of para.split(/(?<=[.!?])\s+/)) {
          if ((cur + ' ' + s).trim().split(/\s+/).length > MAX_CHUNK_WORDS && cur) {
            pieces.push(cur.trim())
            cur = s
          } else cur = `${cur} ${s}`
        }
        if (cur.trim()) pieces.push(cur.trim())
      }
      pieces.forEach((text, k) =>
        chunks.push({
          id: `${doc.code}-${pi + 1}${pieces.length > 1 ? `.${k + 1}` : ''}`,
          code: doc.code,
          docTitle: doc.title,
          section: pi + 1,
          text,
        }),
      )
    })
  }
  return chunks
}

export const buildChunkIndex = (chunks) => buildIndex(chunks, (c) => `${c.docTitle} ${c.text}`)

const sentences = (text) => text.split(/(?<=[.!?])\s+/).filter(Boolean)

/**
 * Retrieve, then answer extractively from the best sentences, with citations.
 * Refuses when too few of the question's terms appear in the best passage.
 */
export function answer(index, question) {
  const terms = [...new Set(tokenize(question))]
  const hits = search(index, question, 3)
  const top = hits[0]

  const coverage = top && terms.length ? top.matched.length / terms.length : 0
  const grounded = Boolean(top) && coverage >= 0.5 && top.score >= 1.5
  if (!grounded) {
    return { question, terms, hits, grounded: false, coverage, text: null, sources: [], confidence: 0 }
  }

  // Best sentence in each retrieved chunk, then keep only the sentences that
  // match as many question terms as the very best one (at most two).
  const candidates = hits
    .map((h) => {
      const best = sentences(h.doc.text)
        .map((s) => {
          const toks = new Set(tokenize(s))
          return { s, overlap: terms.filter((t) => toks.has(t)).length }
        })
        .sort((a, b) => b.overlap - a.overlap)[0]
      return { hit: h, ...best }
    })
    .sort((a, b) => b.overlap - a.overlap || b.hit.score - a.hit.score)
  const picks = candidates.filter((p) => p.overlap > 0 && p.overlap === candidates[0].overlap)

  const sources = []
  const parts = picks.slice(0, 2).map((p) => {
    let n = sources.findIndex((x) => x.id === p.hit.doc.id) + 1
    if (!n) {
      sources.push(p.hit.doc)
      n = sources.length
    }
    return `${p.s} [${n}]`
  })

  const confidence = Math.min(0.97, 0.35 + 0.62 * coverage * Math.min(1, top.score / 6))
  return {
    question,
    terms,
    hits,
    grounded: true,
    coverage,
    text: parts.join(' '),
    sources,
    confidence: Number(confidence.toFixed(2)),
  }
}

export { stem }
