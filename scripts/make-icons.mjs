/**
 * Generates the logo avatar, favicon, touch icon, PWA icons and manifest from
 * docs/source-assets/avatar.png (head-and-shoulders character render).
 *
 *   node scripts/make-icons.mjs
 */
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const SRC = 'docs/source-assets/avatar.png'
// Square crop that keeps the hair, face and collar centred.
const CROP = { left: 150, top: 70, width: 1000, height: 1000 }

const face = () => sharp(SRC).extract(CROP)

// In-page logo mark (shown at up to ~64px, so 192px covers 3x density).
await face().resize(192, 192).webp({ quality: 90 }).toFile('public/images/avatar.webp')

// Icons: the platform masks corners itself, so these stay square.
await face().resize(64, 64).png().toFile('public/favicon.png')
await face().resize(180, 180).png().toFile('public/apple-touch-icon.png')
await face().resize(192, 192).png().toFile('public/icon-192.png')
await face().resize(512, 512).png().toFile('public/icon-512.png')

writeFileSync(
  'public/site.webmanifest',
  `${JSON.stringify(
    {
      name: 'Abhishek Tripathi — GenAI Engineer & Data Scientist',
      short_name: 'Abhishek T.',
      start_url: '/',
      display: 'standalone',
      background_color: '#f6f6fb',
      theme_color: '#f6f6fb',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    null,
    2,
  )}\n`,
)
console.log('wrote avatar.webp, favicon.png, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest')
