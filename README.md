# Abhishek Tripathi — Portfolio

A single-page, static portfolio site (anime.js hero/scroll animations, JetBrains Mono + Space Grotesk).

## What changed to make this Vercel-ready

The original export (`Portfolio.dc.html` + `support.js`) was built with a proprietary
design-preview runtime (`<x-dc>`, `sc-for` template loops, `DCLogic` components). That
runtime isn't meant for production hosting, so this repo replaces it with a single
plain, dependency-free `index.html`:

- All `sc-for` template loops (stats, jobs, projects, skills, certs) are expanded into
  static HTML.
- The `DCLogic` component class is replaced with plain vanilla JS that does the same
  three things: builds the 336-cell hero grid, runs the anime.js entrance/grid/counter
  animations, and reveals sections on scroll via `IntersectionObserver`.
- `anime.js` is still loaded from the jsDelivr CDN, exactly as in the original.
- `support.js` and the `.dc.html` files are no longer needed at runtime and are not part
  of the deployed site.
- The resume PDF now lives at the project root as `resume.pdf` and is linked from the
  nav bar and the contact section.

No build step, no `package.json`, no framework — it's one static HTML file, so Vercel's
zero-config static deployment handles it as-is.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then import the repo in Vercel (see below) — every push to `main` will auto-deploy.

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel        # first deploy / preview
vercel --prod # promote to production
```

**Option B — Git**
1. Push this folder to a GitHub/GitLab/Bitbucket repo (see above).
2. In the Vercel dashboard: **Add New… → Project → Import** the repo.
3. Framework preset: **Other** (no build command / output directory needed).
4. Deploy.

## Local preview

```bash
npm run dev
# or
python3 -m http.server 8000
```

## Project structure

```
.
├── index.html         # the entire site
├── resume.pdf          # downloadable resume, served at /resume.pdf
├── vercel.json          # static hosting config (security headers, clean URLs)
├── package.json           # metadata + local dev script (no build step, no deps)
├── LICENSE                 # MIT
├── .gitattributes           # consistent line endings / binary file handling
├── .editorconfig              # consistent editor formatting
├── .gitignore                  # git-ignored files
├── .vercelignore                 # files excluded from Vercel deployments
└── README.md
```

## Editing content

All copy (stats, experience, projects, skills, certifications, contact info) lives
directly in `index.html`. There's no templating layer — search for the section you want
to change (`<!-- EXPERIENCE -->`, `<!-- PROJECTS -->`, etc.) and edit the HTML directly.
