/**
 * Small, dependency-free retrieval toolkit shared by the demos: tokenizer,
 * BM25 ranking and reciprocal rank fusion. It is real retrieval (the same
 * family of ranking functions used for keyword search in production RAG
 * stacks); only the corpora are synthetic.
 */

const STOP = new Set(
  'a an and are as at be but by for from has have how i if in into is it its me my of on or our so that the their them then there these they this to us was we what when where which who why will with you your can do does get give need want should would could about any all per each also more most over than too very just'.split(
    ' ',
  ),
)

/** Light suffix stripper. Not Porter, but consistent for matching inflections. */
export function stem(word) {
  let w = word
  if (w.length <= 3) return w
  if (w.endsWith('ies')) return `${w.slice(0, -3)}y`
  if (/(ss|us)$/.test(w)) return w
  if (w.endsWith('ing') && w.length > 5) w = w.slice(0, -3)
  else if (w.endsWith('ed') && w.length > 4) w = w.slice(0, -2)
  else if (/(s|x|z|ch|sh)es$/.test(w)) w = w.slice(0, -2)
  else if (w.endsWith('s')) w = w.slice(0, -1)
  if (w.endsWith('e') && w.length > 4) w = w.slice(0, -1)
  return w
}

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem)
}

export function buildIndex(docs, textOf) {
  const entries = docs.map((doc) => {
    const tokens = tokenize(textOf(doc))
    const tf = new Map()
    for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1)
    return { doc, tf, len: tokens.length }
  })
  const df = new Map()
  for (const e of entries) for (const t of e.tf.keys()) df.set(t, (df.get(t) || 0) + 1)
  const avgLen = entries.reduce((a, e) => a + e.len, 0) / Math.max(1, entries.length)
  return { entries, df, avgLen, N: entries.length, vocab: df.size }
}

/** BM25. Returns docs with score > 0, best first, with the query terms each matched. */
export function search(index, query, k = 5) {
  const terms = [...new Set(tokenize(query))]
  const { N, df, avgLen } = index
  const k1 = 1.4
  const b = 0.75
  return index.entries
    .map((e) => {
      let score = 0
      const matched = []
      for (const t of terms) {
        const f = e.tf.get(t)
        if (!f) continue
        const n = df.get(t)
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5))
        score += (idf * (f * (k1 + 1))) / (f + k1 * (1 - b + (b * e.len) / avgLen))
        matched.push(t)
      }
      return { doc: e.doc, score, matched }
    })
    .filter((r) => r.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k)
}

/** Reciprocal rank fusion across several ranked lists. */
export function fuse(lists, idOf, k = 60) {
  const merged = new Map()
  for (const list of lists) {
    list.forEach((r, i) => {
      const id = idOf(r.doc)
      const cur = merged.get(id) || { doc: r.doc, score: 0, hits: 0, matched: new Set() }
      cur.score += 1 / (k + i + 1)
      cur.hits += 1
      r.matched.forEach((t) => cur.matched.add(t))
      merged.set(id, cur)
    })
  }
  return [...merged.values()]
    .sort((a, b) => b.score - a.score)
    .map((x) => ({ ...x, matched: [...x.matched] }))
}

/** Splits text into runs so matched query terms can be highlighted. */
export function markTerms(text, terms) {
  const set = new Set(terms)
  return text
    .split(/(\s+)/)
    .map((part) => ({
      text: part,
      hit: part.trim() !== '' && set.has(stem(part.toLowerCase().replace(/[^a-z0-9-]/g, ''))),
    }))
}
