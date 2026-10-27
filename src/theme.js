import { useEffect, useState } from 'react'

/**
 * Theme lives on <html class="dark">. A tiny inline script in every HTML entry
 * applies the stored (or system) choice before first paint, so there is no
 * flash. Light is the default; dark only applies once the visitor chooses it.
 */
const KEY = 'theme'
const COLORS = { light: '#f6f6fb', dark: '#090912' }

export const currentTheme = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function setTheme(theme, { persist = true } = {}) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme])
  if (persist) {
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* private mode: the choice just won't persist */
    }
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

export function useTheme() {
  const [theme, set] = useState(currentTheme)

  useEffect(() => {
    const sync = () => set(currentTheme())
    window.addEventListener('themechange', sync)
    return () => {
      window.removeEventListener('themechange', sync)
    }
  }, [])

  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}
