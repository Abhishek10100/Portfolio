/**
 * Generates the favicon, touch icon and PWA icons from the AT monogram
 * (same geometry as src/components/Logo.jsx).
 *
 *   node scripts/make-icons.mjs
 */
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const DEFS = `<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f6bf5"/><stop offset="1" stop-color="#7c3aed"/></linearGradient>
<linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"/><stop offset="0.55" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>`

const LETTERS = `<g fill="none" stroke="#fff" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
<path d="M5.8 23.5 L10.9 9 L16 23.5"/><path d="M7.9 18.6 H13.9"/><path d="M17.8 9 H26.4"/><path d="M22.1 9 V23.5"/>
</g>`

const svg = (rx) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${DEFS}<rect width="32" height="32" rx="${rx}" fill="url(#g)"/><rect width="32" height="32" rx="${rx}" fill="url(#s)"/>${LETTERS}</svg>`

// Browser tab icon keeps the rounded tile; platform icons are full-bleed
// because iOS and Android apply their own masks.
writeFileSync('public/favicon.svg', svg(9))
const square = Buffer.from(svg(0))
await sharp(square).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(square).resize(192, 192).png().toFile('public/icon-192.png')
await sharp(square).resize(512, 512).png().toFile('public/icon-512.png')

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
console.log('wrote favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest')
