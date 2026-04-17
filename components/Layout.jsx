'use client'
import { ThemeProvider } from './ThemeProvider'
import Cursor from './Cursor'
import NavOrb from './NavOrb'

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Cursor />
      <main style={{ minHeight: '100vh', paddingBottom: 100 }}>
        {children}
      </main>
      <NavOrb />
    </ThemeProvider>
  )
}
