# Abhishek Tripathi — Portfolio

GenAI Engineer & Data Scientist portfolio. Built from the design in
`docs/complete-layout.png` with React, Tailwind CSS and Framer Motion, bundled
by Vite and deployed as static output on Vercel.

## Stack

| Layer     | Choice                                        |
| --------- | --------------------------------------------- |
| UI        | React 19                                      |
| Styling   | Tailwind CSS 4 (CSS-first `@theme` tokens)    |
| Motion    | Framer Motion 13                              |
| Bundler   | Vite 8                                        |
| Hosting   | Vercel (static `dist/` output)                |

## Local development

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:5177>. `npm run build` writes production
output to `dist/`, and `npm run preview` serves that build locally.

## Project structure

```
.
├── index.html                  # Vite entry; <head>, fonts, pre-paint theme script
├── src/
│   ├── main.jsx                # React root
│   ├── App.jsx                 # section order + theme controller
│   ├── index.css               # design tokens (light/dark), base layer, motion prefs
│   ├── data/site.js            # ALL page copy — edit content here, not in components
│   └── components/
│       ├── ui.jsx              # Reveal/RevealGroup, Counter, SectionLabel, icons
│       ├── Preloader.jsx       # branded hold, hands off to the hero entrance
│       ├── Nav.jsx             # sticky nav, scroll-spy, theme toggle, mobile menu
│       ├── Hero.jsx            # hero + stat counters + trusted technologies
│       ├── About.jsx           # about panel + "What I Do" grid
│       ├── Projects.jsx        # featured projects carousel
│       ├── ProjectArt.jsx      # per-project inline SVG artwork
│       ├── Process.jsx         # build process rail + filterable tech stack
│       ├── Journey.jsx         # experience / research / education band
│       ├── DemoLab.jsx         # links into the standalone demo pages
│       └── Contact.jsx         # contact panel + footer
├── public/                     # copied to the deploy root verbatim
│   ├── demos/                  # 10 standalone demo pages (plain HTML, no build)
│   ├── assets/demos/           # images + manifests those demo pages load
│   ├── images/                 # optimised WebP renditions used by the site
│   └── resume.pdf              # served at /resume.pdf
├── docs/                       # design reference — excluded from the deploy
│   ├── complete-layout.png     # the layout this design implements
│   ├── source-assets/          # full-resolution source PNGs
│   └── GenAI_Portfolio_*.md    # image + animation prompt packs
├── demo-apps/                  # Python source behind one demo (not deployed)
└── legacy-notebook-site.html   # the previous notebook-themed site, kept for reference
```

## Editing content

Every string on the page lives in [`src/data/site.js`](src/data/site.js) — copy,
metrics, nav labels, project cards, experience, certifications and contact details.
Components read from it, so content changes rarely need a component edit.

## Design tokens

Colours are CSS custom properties on `:root` with a `.dark` override in
[`src/index.css`](src/index.css), surfaced to Tailwind through `@theme inline`.
That means a single token edit restyles both themes, and the theme toggle can
transition colours smoothly rather than snapping. Theme choice persists in
`localStorage` and is applied before first paint by an inline script in
`index.html`, so there's no flash of the wrong theme.

## Motion

Follows `docs/GenAI_Portfolio_Animation_Prompts.md`: one shared reveal recipe
(opacity, 24px rise, 0.98→1 scale) with staggered children, spring-based hover
lifts, viewport-triggered counters, and a condensing nav. Every component checks
`useReducedMotion()`, and `prefers-reduced-motion` also strips transitions in CSS.

## Images

Source renders live in `docs/source-assets/` (~5 MB of PNG). The site serves
resized WebP renditions from `public/images/` instead — 84 KB total. If you
replace a source image, regenerate its rendition:

```bash
npx sharp-cli -i docs/source-assets/hero.png -o public/images/hero.webp resize 1400 --format webp
```

## Demo pages

The 10 demo pages under `public/demos/` are standalone HTML and are *not* part of
the React app. Vite copies `public/` verbatim, so they keep their existing URLs
(`/demos/student-performance.html`) and their relative asset paths still resolve.

## Deploy

Vercel reads `vercel.json`: build with `npm run build`, serve `dist/`. Pushes to
the connected branch auto-deploy.

```bash
npm i -g vercel
vercel --prod
```
