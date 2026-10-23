/**
 * Builds public/images/hero.webp from the 1672x941 render in docs/source-assets.
 *
 *   node scripts/make-hero.mjs
 *
 * The render is a wide studio scene with the character in the right third. The
 * hero shows him large and bleeding off the right edge of the viewport, so the
 * empty left wall and the blurred foreground leaf are cropped away here instead
 * of shipping as dead pixels. The output is 1800px wide: roughly 2x the width it
 * is displayed at on a 1440 screen, so it stays sharp on high-density displays.
 *
 * The render has a warm white wall while the page is cool lavender, so the
 * grade below nudges the channels toward the page colour. The edges themselves
 * are feathered in CSS (see the mask on the <img> in Hero.jsx).
 */
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(root, 'docs/source-assets/hero.png')
const OUT = resolve(root, 'public/images/hero.webp')

const CROP = { left: 620, top: 40, width: 1052, height: 820 }
const OUT_WIDTH = 1800
const QUALITY = 82

mkdirSync(dirname(OUT), { recursive: true })

const info = await sharp(SRC)
  .extract(CROP)
  .recomb([
    [0.986, 0, 0],
    [0, 0.995, 0],
    [0, 0, 1.024],
  ])
  .resize({ width: OUT_WIDTH, kernel: 'lanczos3' })
  .sharpen({ sigma: 0.7, m1: 0.6, m2: 1.2 })
  .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
  .toFile(OUT)

console.log(
  `hero.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB  (aspect ${(info.width / info.height).toFixed(4)})`,
)
