'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const NAV = [
  { label: 'Home',       href: '/',           short: 'H' },
  { label: 'Skill Tree', href: '/skilltree',   short: 'T' },
  { label: 'Experience', href: '/experience',  short: 'E' },
  { label: 'Projects',   href: '/projects',    short: 'P' },
  { label: 'Library',    href: '/library',     short: 'L' },
  { label: 'Playground', href: '/playground',  short: '⚙' },
  { label: 'Contact',    href: '/contact',     short: '✉' },
]

// Single tooltip-aware button — works for both links and actions
function OrbItem({ label, short, active, onClick, href }) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 30, height: 30, borderRadius: 7,
        background: active ? 'rgba(0,255,178,0.12)' : 'transparent',
        color: active ? 'var(--acc)' : 'var(--txt2)',
        fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
    >
      {short}

      {/* Tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg2)',
          border: '1px solid rgba(0,255,178,0.3)',
          borderRadius: 7,
          padding: '5px 10px',
          fontSize: 11,
          color: 'var(--txt)',
          whiteSpace: 'nowrap',
          fontFamily: "'JetBrains Mono',monospace",
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          letterSpacing: '0.04em',
        }}>
          {label}
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid rgba(0,255,178,0.3)',
          }} />
        </div>
      )}
    </div>
  )

  if (href) return <Link href={href} style={{ textDecoration: 'none' }}>{inner}</Link>
  return inner
}

const Divider = () => (
  <div style={{ width: 1, height: 18, background: 'var(--bdr)', margin: '0 4px', flexShrink: 0 }} />
)

export default function NavOrb() {
  const pathname  = usePathname()
  const { dark, toggle } = useTheme()
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    const handler = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o) }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* ── Nav Orb ─────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        bottom: 20, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'var(--glass)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        border: '1px solid var(--glass-b)',
        borderRadius: 100,
        padding: '6px 14px',
        display: 'flex', alignItems: 'center', gap: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 30px rgba(0,255,178,0.12)',
        maxWidth: 'calc(100vw - 24px)',
        overflow: 'visible',         /* tooltips need to escape the orb */
      }}>

        {/* Theme toggle */}
        <OrbItem
          label={dark ? 'Light Mode' : 'Dark Mode'}
          short={dark ? '☀' : '◑'}
          active={false}
          onClick={toggle}
        />

        <Divider />

        {/* Nav links */}
        {NAV.map(n => (
          <OrbItem
            key={n.href}
            label={n.label}
            short={n.short}
            href={n.href}
            active={pathname === n.href}
          />
        ))}

        <Divider />

        {/* Cmd+K hint */}
        <button onClick={() => setCmdOpen(true)} style={{
          fontSize: 10, color: 'var(--txt3)',
          fontFamily: "'JetBrains Mono',monospace",
          border: '1px solid var(--bdr)', padding: '2px 6px',
          borderRadius: 5, background: 'transparent', cursor: 'pointer',
          transition: 'all 0.2s', flexShrink: 0,
        }}>⌘K</button>

      </nav>

      {/* ── Command Palette ──────────────────────────────────── */}
      {cmdOpen && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setCmdOpen(false) }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000, display: 'flex',
            alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: '14vh',
          }}
        >
          <div style={{
            width: 'min(580px, 90vw)',
            background: 'var(--bg2)',
            border: '1px solid var(--bdr)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}>
            {/* Search bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--bdr)' }}>
              <span style={{ color: 'var(--acc)', fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>⌘</span>
              <input
                autoFocus
                placeholder="Type a command or search..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--txt)', fontFamily: "'Space Mono',monospace", fontSize: 15 }}
              />
              <span style={{ fontSize: 10, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace", border: '1px solid var(--bdr)', padding: '2px 6px', borderRadius: 4 }}>ESC</span>
            </div>

            {/* Items */}
            <div style={{ padding: 8 }}>
              {NAV.map(n => (
                <Link key={n.href} href={n.href} onClick={() => setCmdOpen(false)} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, fontSize: 13, color: 'var(--txt)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--glass-h)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ width: 22, textAlign: 'center', fontFamily: "'JetBrains Mono',monospace" }}>{n.short}</span>
                    Navigate → {n.label}
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace", border: '1px solid var(--bdr)', padding: '2px 5px', borderRadius: 4 }}>↵</span>
                  </div>
                </Link>
              ))}

              {/* Toggle theme item */}
              <div
                onClick={() => { toggle(); setCmdOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, fontSize: 13, color: 'var(--txt)', transition: 'background 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--glass-h)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 22, textAlign: 'center' }}>◑</span>
                Toggle Theme — switch to {dark ? 'Light' : 'Dark'} Mode
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '10px 18px', borderTop: '1px solid var(--bdr)', display: 'flex', gap: 16 }}>
              {['↑↓ navigate', '↵ open', 'ESC close'].map(h => (
                <span key={h} style={{ fontSize: 10, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace" }}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
