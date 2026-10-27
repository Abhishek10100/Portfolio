import { useEffect, useState } from 'react'

/**
 * Theme lives on <html class="dark">. A tiny inline script in every HTML entry
 * applies the stored (or system) choice before first paint, so there is no
 * flash. A stored choice wins; with none stored we follow the system setting.
 */
const KEY = 'theme'
const COLORS = { light: '#f6f6fb', dark: '#090912' }

const read = () => {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

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
    // Follow the OS only while the visitor hasn't chosen explicitly.
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystem = (e) => {
      if (!read()) setTheme(e.matches ? 'dark' : 'light', { persist: false })
    }
    window.addEventListener('themechange', sync)
    mq.addEventListener('change', onSystem)
    return () => {
      window.removeEventListener('themechange', sync)
      mq.removeEventListener('change', onSystem)
    }
  }, [])

  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}
