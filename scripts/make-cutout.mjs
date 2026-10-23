/**
 * Cuts the studio render in docs/source-assets/character.png out of its
 * near-white backdrop and writes public/images/character-cutout.webp.
 *
 *   node scripts/make-cutout.mjs [--preview <dir>]
 *
 * Only background connected to the image border is removed (a flood fill, not
 * a colour key), so light skin highlights and shirt pattern stay opaque. Edge
 * pixels get a soft alpha measured from how far they sit between the local
 * foreground and the backdrop, and their colour is pulled from the interior so
 * no white halo survives on a tinted panel. The bottom row is left untouched:
 * the shirt ends in a straight cut so the bust can sit flush on a panel edge.
 *
 * --preview writes composites on lavender, white and saturated blue (halo
 * check) plus a hair close-up, for eyeballing the matte.
 */
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SRC = path.join(root, 'docs/source-assets/character.png')
const OUT = path.join(root, 'public/images/character-cutout.webp')
const WIDTH = 720

const FLOOD_TOL = 16 // max per-channel distance from the backdrop to count as backdrop
const BAND = 5 // px inside the flood boundary whose alpha is measured, not assumed
const ZONE = 6 // px around the boundary that get decontaminated colour
const FEATHER_SIGMA = 1.0 // source px; ~1.3px visible feather after the downscale
const SAMPLE_R = 5 // radius of the foreground colour search
const MIN_CONTRAST = 30 // below this |F - B| the projection is too unstable to trust

const previewDir = (() => {
  const i = process.argv.indexOf('--preview')
  return i > -1 ? process.argv[i + 1] : null
})()

const { data, info } = await sharp(SRC)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
const { width: w, height: h } = info
const N = w * h

/* ---------------------------- backdrop colour ---------------------------- */
const border = []
for (let x = 0; x < w; x++) border.push(x, (h - 1) * w + x)
for (let y = 0; y < h; y++) border.push(y * w, y * w + w - 1)

const median = (arr) => arr.sort((a, b) => a - b)[arr.length >> 1]
const bg = [0, 1, 2].map((k) =>
  median(
    border
      .filter((i) => Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) > 235)
      .map((i) => data[i * 3 + k]),
  ),
)

const dist = new Uint8Array(N) // Chebyshev distance of each pixel from the backdrop
for (let i = 0; i < N; i++) {
  dist[i] = Math.max(
    Math.abs(data[i * 3] - bg[0]),
    Math.abs(data[i * 3 + 1] - bg[1]),
    Math.abs(data[i * 3 + 2] - bg[2]),
  )
}

/* ------------------------------ flood fill ------------------------------ */
const isBg = new Uint8Array(N)
const stack = new Int32Array(N)
let sp = 0
for (const i of border) {
  if (!isBg[i] && dist[i] <= FLOOD_TOL) {
    isBg[i] = 1
    stack[sp++] = i
  }
}
while (sp) {
  const i = stack[--sp]
  const x = i % w
  const y = (i - x) / w
  if (x > 0 && !isBg[i - 1] && dist[i - 1] <= FLOOD_TOL) (isBg[i - 1] = 1), (stack[sp++] = i - 1)
  if (x < w - 1 && !isBg[i + 1] && dist[i + 1] <= FLOOD_TOL) (isBg[i + 1] = 1), (stack[sp++] = i + 1)
  if (y > 0 && !isBg[i - w] && dist[i - w] <= FLOOD_TOL) (isBg[i - w] = 1), (stack[sp++] = i - w)
  if (y < h - 1 && !isBg[i + w] && dist[i + w] <= FLOOD_TOL) (isBg[i + w] = 1), (stack[sp++] = i + w)
}

/* Chebyshev layers across the boundary. layer[i] = how many steps the pixel
   is from the other side: 1..BAND for foreground pixels near backdrop, 1..ZONE
   for backdrop pixels near foreground, 0 elsewhere. */
function layers(seedIsBg, limit) {
  const out = new Uint8Array(N)
  let frontier = []
  for (let i = 0; i < N; i++) {
    if (!!isBg[i] !== seedIsBg) continue
    const x = i % w
    const y = (i - x) / w
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
        const j = ny * w + nx
        if (!!isBg[j] === seedIsBg || out[j]) continue
        out[j] = 1
        frontier.push(j)
      }
    }
  }
  for (let layer = 2; layer <= limit; layer++) {
    const next = []
    for (const i of frontier) {
      const x = i % w
      const y = (i - x) / w
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
          const j = ny * w + nx
          if (!!isBg[j] === seedIsBg || out[j]) continue
          out[j] = layer
          next.push(j)
        }
      }
    }
    frontier = next
  }
  return out
}
const fgLayer = layers(true, BAND) // foreground pixels hugging the backdrop
const bgLayer = layers(false, ZONE) // backdrop pixels hugging the foreground

/* ----------------- foreground colour + alpha at the edge ----------------- */
const rgb = new Float32Array(N * 3)
for (let i = 0; i < N * 3; i++) rgb[i] = data[i]
const alpha = new Float32Array(N)
for (let i = 0; i < N; i++) alpha[i] = isBg[i] ? 0 : 1

/** Foreground colour estimate for pixel (x, y): weighted by contrast with the
    backdrop, preferring pixels deeper inside the subject than this one. */
function foregroundAt(x, y, minLayer) {
  let sr = 0
  let sg = 0
  let sb = 0
  let sw = 0
  for (let dy = -SAMPLE_R; dy <= SAMPLE_R; dy++) {
    const ny = y + dy
    if (ny < 0 || ny >= h) continue
    for (let dx = -SAMPLE_R; dx <= SAMPLE_R; dx++) {
      const nx = x + dx
      if (nx < 0 || nx >= w) continue
      const j = ny * w + nx
      if (isBg[j]) continue
      const lj = fgLayer[j] || BAND + 1
      if (lj <= minLayer) continue
      const wgt = (dist[j] * dist[j] + 1) / (1 + dx * dx + dy * dy)
      sr += rgb[j * 3] * wgt
      sg += rgb[j * 3 + 1] * wgt
      sb += rgb[j * 3 + 2] * wgt
      sw += wgt
    }
  }
  return sw ? [sr / sw, sg / sw, sb / sw] : null
}

const out = new Float32Array(N * 3)
out.set(rgb)

for (let i = 0; i < N; i++) {
  const x = i % w
  const y = (i - x) / w

  if (isBg[i]) {
    if (!bgLayer[i]) continue
    // Backdrop pixels the feather will leak into: give them interior colour.
    const f = foregroundAt(x, y, 0)
    if (f) out.set(f, i * 3)
    continue
  }
  if (!fgLayer[i]) continue

  const L = fgLayer[i]
  let f = foregroundAt(x, y, L)
  if (!f) f = foregroundAt(x, y, 0)
  if (!f) continue

  const vr = f[0] - bg[0]
  const vg = f[1] - bg[1]
  const vb = f[2] - bg[2]
  const len2 = vr * vr + vg * vg + vb * vb
  if (len2 < MIN_CONTRAST * MIN_CONTRAST) continue

  const dot =
    (rgb[i * 3] - bg[0]) * vr + (rgb[i * 3 + 1] - bg[1]) * vg + (rgb[i * 3 + 2] - bg[2]) * vb
  let a = Math.min(1, Math.max(0, dot / len2))
  if (a < 0.03) a = 0
  else if (a > 0.97) a = 1
  alpha[i] = a

  // C = a*F + (1-a)*B  =>  F = (C - (1-a)*B) / a, falling back to the
  // interior estimate where the division gets noisy.
  for (let k = 0; k < 3; k++) {
    const unmixed = a > 0.05 ? (rgb[i * 3 + k] - (1 - a) * bg[k]) / a : f[k]
    const clamped = Math.min(255, Math.max(0, unmixed))
    out[i * 3 + k] = f[k] * (1 - a) + clamped * a
  }
}

/* -------------------------------- feather -------------------------------- */
// Edges are replicated, so the straight cut along the bottom (and the shoulder
// that meets the right border) stays fully opaque instead of fading.
function blurAlpha(src, sigma) {
  const r = Math.ceil(sigma * 3)
  const kernel = []
  let sum = 0
  for (let k = -r; k <= r; k++) {
    const v = Math.exp(-(k * k) / (2 * sigma * sigma))
    kernel.push(v)
    sum += v
  }
  for (let k = 0; k < kernel.length; k++) kernel[k] /= sum

  const tmp = new Float32Array(N)
  const dst = new Float32Array(N)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0
      for (let k = -r; k <= r; k++) {
        s += src[y * w + Math.min(w - 1, Math.max(0, x + k))] * kernel[k + r]
      }
      tmp[y * w + x] = s
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0
      for (let k = -r; k <= r; k++) {
        s += tmp[Math.min(h - 1, Math.max(0, y + k)) * w + x] * kernel[k + r]
      }
      dst[y * w + x] = s
    }
  }
  return dst
}
const feathered = blurAlpha(alpha, FEATHER_SIGMA)

/* ------------------------------ crop + write ------------------------------ */
let minX = w
let maxX = 0
let minY = h
for (let i = 0; i < N; i++) {
  if (feathered[i] < 0.03) continue
  const x = i % w
  const y = (i - x) / w
  if (x < minX) minX = x
  if (x > maxX) maxX = x
  if (y < minY) minY = y
}
const PAD = 4
const left = Math.max(0, minX - PAD)
const top = Math.max(0, minY - PAD)
const cropW = Math.min(w - 1, maxX + PAD) - left + 1

const rgba = Buffer.alloc(N * 4)
for (let i = 0; i < N; i++) {
  rgba[i * 4] = Math.round(out[i * 3])
  rgba[i * 4 + 1] = Math.round(out[i * 3 + 1])
  rgba[i * 4 + 2] = Math.round(out[i * 3 + 2])
  rgba[i * 4 + 3] = Math.round(feathered[i] * 255)
}

const cut = sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left, top, width: cropW, height: h - top })
  .resize({ width: WIDTH, kernel: 'lanczos3' })

const webp = await cut
  .clone()
  .webp({ quality: 92, alphaQuality: 100, effort: 6, smartSubsample: true })
  .toFile(OUT)
console.log(`wrote ${path.relative(root, OUT)}  ${webp.width}x${webp.height}  ${(webp.size / 1024).toFixed(0)} KB`)
console.log(`backdrop ${bg.join(',')}  crop x ${left}..${left + cropW - 1}, from y ${top}`)

/* -------------------------------- previews -------------------------------- */
if (previewDir) {
  mkdirSync(previewDir, { recursive: true })
  const png = await sharp(OUT).png().toBuffer()
  const { width: pw, height: ph } = webp
  const onto = async (background, name, pad = 40) => {
    await sharp({
      create: { width: pw + pad * 2, height: ph + pad, channels: 3, background },
    })
      .composite([{ input: png, left: pad, top: pad }])
      .png()
      .toFile(path.join(previewDir, `cutout-preview-${name}.png`))
  }
  await onto('#f1f1fc', 'lavender')
  await onto('#ffffff', 'white')
  await onto('#5b2fd6', 'violet')

  // 2x hair + ear close-up on a deep violet ground to expose halos and jagged strands.
  const zoom = await sharp(OUT)
    .extract({ left: 0, top: 0, width: pw, height: Math.round(ph * 0.5) })
    .resize({ width: pw * 2, kernel: 'nearest' })
    .png()
    .toBuffer()
  const zm = await sharp(zoom).metadata()
  await sharp({
    create: { width: zm.width, height: zm.height, channels: 3, background: '#3b2a8c' },
  })
    .composite([{ input: zoom }])
    .png()
    .toFile(path.join(previewDir, 'cutout-preview-hair.png'))
}
