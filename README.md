# Abhishek Tripathi — Portfolio

GenAI Engineer & Data Scientist portfolio. Built from the design in
`docs/complete-layout.png` with React, Tailwind CSS and Framer Motion, bundled
by Vite and deployed as static output on Vercel. The site is light-only; there
is no dark theme or theme toggle.

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

Vite serves on <http://localhost:5173> by default (the Claude Code preview in
`.claude/launch.json` pins port 5177 instead). `npm run build` writes production
output to `dist/`, and `npm run preview` serves that build locally.

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                                  |
| `npm run build`     | Production build into `dist/`                             |
| `npm run preview`   | Serve the production build locally                        |
| `npm run brands`    | Regenerate `src/data/brands.js` (see Brand logos below)   |

## Project structure

```
.
├── index.html                  # Vite entry; <head>, fonts, color-scheme meta
├── package.json                # scripts and dependencies
├── vite.config.js              # React + Tailwind plugins; bundles go to dist/assets/build
├── vercel.json                 # build command, security headers, cache rules
├── .vercelignore               # keeps docs and demo-apps out of the upload. Never add src: Vercel builds from it
├── CLAUDE.md                   # short orientation notes for Claude Code
├── LICENSE
├── src/
│   ├── main.jsx                # React root; routes /demo/<slug> to the lazy-loaded demos
│   ├── App.jsx                 # section order + preloader hand-off
│   ├── demos/                  # the five interactive GenAI demos (code-split, browser-only)
│   │   ├── DemoRoute.jsx       # slug -> demo registry, with each demo's real-vs-production notes
│   │   ├── DemoShell.jsx       # shared demo page chrome
│   │   ├── AlgoCreatorDemo.jsx, SurveillanceDemo.jsx, RecruitingDemo.jsx,
│   │   │   EnterpriseRagDemo.jsx, JapaneseDocsDemo.jsx
│   │   ├── lib/                # search.js (BM25, rank fusion) and rag.js (chunk + cited answers)
│   │   └── data/               # synthetic corpora: slides, agents, candidates, policies
│   ├── index.css               # design tokens (light only), base layer, motion prefs
│   ├── data/
│   │   ├── site.js             # ALL page copy — edit content here, not in components
│   │   └── brands.js           # GENERATED logo marks — do not edit by hand
│   └── components/
│       ├── ui.jsx              # Reveal/RevealGroup/RevealItem, Counter, SectionLabel, ScriptNote, Icon
│       ├── BrandMark.jsx       # renders a logo from data/brands.js (per-instance SVG ids)
│       ├── Logo.jsx            # the AT monogram (LogoMark) used in nav, footer, preloader, demos
│   ├── guide/                  # the portfolio guide chatbot
│   │   ├── engine.js           # tour steps + answers, all built from data/site.js (no LLM, no API)
│   │   └── GuideWidget.jsx     # floating button, chat panel, scroll-and-spotlight tour
│       ├── Preloader.jsx       # branded hold, hands off to the hero entrance
│       ├── Nav.jsx             # sticky nav, scroll-spy, mobile menu
│       ├── Hero.jsx            # hero, stat counters, trusted technologies
│       ├── About.jsx           # about panel + "What I Do" grid
│       ├── Projects.jsx        # featured projects carousel
│       ├── ProjectArt.jsx      # maps a project's `art` key to its illustration
│       ├── art/                # one inline-SVG illustration per project
│       │   ├── AlgoCreatorArt.jsx
│       │   ├── RecruitingArt.jsx
│       │   ├── EnterpriseRagArt.jsx
│       │   ├── JapaneseOcrArt.jsx
│       │   ├── SurveillanceArt.jsx
│       │   ├── PlantLiveArt.jsx
│       │   └── shared.jsx      # palette, idle-float helper and Sparkle used by the above
│       ├── Process.jsx         # build process rail + filterable tech stack
│       ├── Journey.jsx         # experience / research / education band
│       ├── DemoLab.jsx         # "Live demos" section, plus a collapsed list of earlier work
│       └── Contact.jsx         # contact panel + footer
├── scripts/                    # Node scripts that generate committed assets
│   ├── build-brands.mjs        # simple-icons / devicon -> src/data/brands.js
│   ├── make-icons.mjs          # AT monogram -> public/favicon.svg, touch icon, PWA icons, manifest
│   ├── make-hero.mjs           # docs/source-assets/hero.png -> public/images/hero.webp
│   └── make-cutout.mjs         # docs/source-assets/character.png -> public/images/character-cutout.webp
├── public/                     # copied to the deploy root verbatim
│   ├── demos/                  # 10 older standalone demo pages (plain HTML); 3 are still linked
│   ├── assets/demos/           # images + manifests those demo pages load
│   ├── images/                 # hero.webp, character-cutout.webp, character-sm.webp
│   └── resume.pdf              # served at /resume.pdf
├── docs/                       # design reference — not part of the build output
│   ├── complete-layout.png     # the layout this design implements
│   ├── source-assets/          # full-resolution source PNGs (hero, character, preloader)
│   └── GenAI_Portfolio_*.md    # image + animation prompt packs
├── demo-apps/                  # Python source behind one demo (not deployed)
└── legacy-notebook-site.html   # the previous notebook-themed site, kept for reference
```

## Editing content

Every string on the page lives in [`src/data/site.js`](src/data/site.js) — copy,
metrics, nav labels, project cards, experience, certifications and contact details.
Components read from it, so content changes rarely need a component edit.

## Design tokens

The site is light-only. Page, surface, border, text and brand colours are CSS
custom properties on `:root` in [`src/index.css`](src/index.css), surfaced to
Tailwind through `@theme inline` (`bg-surface`, `text-ink`, `border-line`,
`text-brand` ...), so one token edit restyles them everywhere. The project
illustrations, brand logos and the per-step accent hues keep their own fixed
colours. `index.html` and `:root` both declare `color-scheme: light` so native
controls and scrollbars match.

## Motion

Follows `docs/GenAI_Portfolio_Animation_Prompts.md`: one shared reveal recipe
(opacity, 24px rise, 0.98→1 scale) with staggered children, spring-based hover
lifts, viewport-triggered counters, and a nav that tucks away on scroll down.
Ambient and looping motion (hero parallax and breathing, portrait float, the
project illustrations, the research leaf, status pings, the preloader) is gated
on `useReducedMotion()`, and `prefers-reduced-motion` also neutralises CSS
transitions and `animate-*` utilities in `index.css`.

## Images

Source renders live in `docs/source-assets/` (about 5 MB of PNG). The site serves
resized WebP renditions from `public/images/` instead, about 225 KB in total:

| File                    | Used by                                         | Regenerate with                |
| ----------------------- | ----------------------------------------------- | ------------------------------ |
| `hero.webp`             | hero visual, `og:image`                         | `node scripts/make-hero.mjs`   |
| `character-cutout.webp` | About and Contact portraits (transparent bust)  | `node scripts/make-cutout.mjs` |
| `character-sm.webp`     | avatar in the AI Recruiting project artwork     | no script; a 160px square resize of `character.png` |

`make-hero.mjs` and `make-cutout.mjs` use `sharp` (a dev dependency). `make-cutout.mjs` takes an optional
`--preview <dir>` flag that writes the cut-out over lavender, white and violet
grounds so the edge matte can be checked for halos. `docs/source-assets/preloader.png`
is design reference only; the preloader itself is built in code.

## Brand logos

Logos in the trusted-technologies strip, the tech stack and the certifications row
come from `src/data/brands.js`, which `scripts/build-brands.mjs` generates from
`simple-icons` and `devicon` so neither package ships in the bundle. Brands neither
package carries fall back to a monogram tile. To add or drop a logo, edit the maps
at the top of the script and run `npm run brands`.

## Demos

**GenAI demos** (`/demo/algocreator`, `/demo/surveillance-chatbot`, `/demo/ai-recruiting`,
`/demo/enterprise-rag`, `/demo/japanese-docs`) are React pages in `src/demos/`. They run
entirely in the browser on synthetic data. The retrieval, scoring, routing and validation
logic is real; there is no LLM and no API key, and each page says what the production
system adds. Each demo has its own static page, `demo/<slug>.html`, listed as a build input
in `vite.config.js`; Vercel's clean URLs serve it at `/demo/<slug>`. (An earlier version used
a `vercel.json` rewrite to `index.html`, which returned 404 in production, so don't reintroduce
it.) `main.jsx` loads the demo code on demand so the portfolio page never downloads it.
To add a demo: create the component, register it in `DemoRoute.jsx`, add `demo/<slug>.html`
(copy an existing one), add the slug to `DEMOS` in `vite.config.js`, and add a card to
`demoLab` in `site.js`.

**Encoding warning:** these files contain Japanese, Hindi and Marathi text. Never rewrite
them with Windows PowerShell 5.1 `Get-Content`/`Set-Content` (it silently turns UTF-8 into
mojibake); use an editor or a script with explicit `encoding='utf-8'`.

**Earlier work** under `public/demos/` is standalone HTML, not part of the React app. Vite
copies `public/` verbatim, so those pages keep their URLs (`/demos/resume-ats.html`). Seven
of them are no longer linked from the site but remain deployed.

## Deploy

Vercel reads `vercel.json`: build with `npm run build`, serve `dist/`. Pushes to
the connected branch auto-deploy.

```bash
npm i -g vercel
vercel --prod
```
