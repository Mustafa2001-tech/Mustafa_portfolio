'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    // Apply to <html> so CSS vars cascade everywhere
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'paper')
  }, [dark])

  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
