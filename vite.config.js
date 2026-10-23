import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const page = (p) => new URL(p, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

// Each demo is its own static HTML page. Vercel's clean URLs serve
// demo/<slug>.html at /demo/<slug>, the same mechanism that already serves
// /demos/*.html, so nothing depends on a server-side rewrite.
const DEMOS = ['algocreator', 'surveillance-chatbot', 'ai-recruiting', 'enterprise-rag', 'japanese-docs']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets/build',
    rollupOptions: {
      input: {
        main: page('./index.html'),
        ...Object.fromEntries(DEMOS.map((d) => [d, page(`./demo/${d}.html`)])),
      },
      output: {
        // Vendor code changes far less often than the app, so it gets its own
        // long-cached chunks instead of invalidating with every content edit.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
})
