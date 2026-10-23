import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Demos live at /demo/<slug>, each served from its own static demo/<slug>.html
// (see vite.config.js). They are code-split so the portfolio page never
// downloads them.
const DemoRoute = lazy(() => import('./demos/DemoRoute'))
const isDemo = window.location.pathname.startsWith('/demo/')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDemo ? (
      <Suspense fallback={<div className="min-h-screen bg-page" />}>
        <DemoRoute />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
