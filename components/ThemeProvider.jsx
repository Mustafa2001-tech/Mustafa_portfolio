'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  // Start with null so we don't flash wrong theme before we read storage
  const [dark, setDark] = useState(null)

  useEffect(() => {
    // 1. Check if user has a saved preference
    const saved = localStorage.getItem('portfolio-theme')

    if (saved !== null) {
      // User previously chose a theme — honour it
      setDark(saved === 'dark')
    } else {
      // No saved preference — follow the device/OS setting
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    if (dark === null) return // not ready yet
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'paper')
  }, [dark])

  const toggle = () => {
    setDark(prev => {
      const next = !prev
      // Save the user's choice so it persists across pages and revisits
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'paper')
      return next
    })
  }

  return (
    <ThemeCtx.Provider value={{ dark: dark ?? true, toggle }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
