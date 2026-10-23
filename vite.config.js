import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets/build',
    rollupOptions: {
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
