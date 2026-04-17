'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const NAV = [
  { label: 'Home',       href: '/',           short: 'H' },
  { label: 'Skill Tree', href: '/skilltree',   short: 'T' },
  { label: 'Projects',   href: '/projects',    short: 'P' },
  { label: 'Library',    href: '/library',     short: 'L' },
  { label: 'Playground', href: '/playground',  short: '⚙' },
  { label: 'Contact',    href: '/contact',     short: '✉' },
]

function Tooltip({ label, children }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)',
          left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg2)', border: '1px solid var(--bdr)',
          borderRadius: 6, padding: '4px 8px',
          fontSize: 10, color: 'var(--txt2)',
          whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono',monospace",
          pointerEvents: 'none', zIndex: 9999,
        }}>{label}</div>
      )}
    </div>
  )
}

export default function NavOrb() {
  const pathname = usePathname()
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

  const btnStyle = (active) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 30, height: 30, borderRadius: 7, border: 'none',
    background: active ? 'rgba(0,255,178,0.12)' : 'transparent',
    color: active ? 'var(--acc)' : 'var(--txt2)',
    fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
    transition: 'all 0.2s', cursor: 'pointer',
  })

  return (
    <>
      {/* Nav Orb */}
      <nav className="nav-orb">
        <Tooltip label="Toggle theme">
          <button onClick={toggle} style={btnStyle(false)}>{dark ? '☀' : '◑'}</button>
        </Tooltip>

        <div style={{ width: 1, height: 18, background: 'var(--bdr)', margin: '0 4px' }} />

        {NAV.map(n => (
          <Tooltip key={n.href} label={n.label}>
            <Link href={n.href} style={{ textDecoration: 'none' }}>
              <div style={btnStyle(pathname === n.href)}>{n.short}</div>
            </Link>
          </Tooltip>
        ))}

        <div style={{ width: 1, height: 18, background: 'var(--bdr)', margin: '0 4px' }} />

        <button onClick={() => setCmdOpen(true)} style={{
          fontSize: 10, color: 'var(--txt3)',
          fontFamily: "'JetBrains Mono',monospace",
          border: '1px solid var(--bdr)', padding: '2px 6px',
          borderRadius: 5, background: 'transparent', cursor: 'none',
          transition: 'all 0.2s',
        }}>⌘K</button>
      </nav>

      {/* Command Palette */}
      {cmdOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setCmdOpen(false) }} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000, display: 'flex',
          alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: '14vh',
        }}>
          <div style={{
            width: 'min(580px, 90vw)',
            background: 'var(--bg2)',
            border: '1px solid var(--bdr)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: 'var(--shad2)',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 18px', borderBottom: '1px solid var(--bdr)',
            }}>
              <span style={{ color: 'var(--acc)', fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>⌘</span>
              <input autoFocus placeholder="Type a command or search..."
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: 'var(--txt)', fontFamily: "'Space Mono',monospace", fontSize: 15,
                  cursor: 'none',
                }} />
              <span style={{
                fontSize: 10, color: 'var(--txt3)',
                fontFamily: "'JetBrains Mono',monospace",
                border: '1px solid var(--bdr)', padding: '2px 6px', borderRadius: 4,
              }}>ESC</span>
            </div>

            {/* Items */}
            <div style={{ padding: 8 }}>
              {[...NAV, { label: 'Toggle Theme', href: null, short: '◑' }].map(n => (
                n.href
                  ? <Link key={n.href} href={n.href} onClick={() => setCmdOpen(false)}
                      style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', borderRadius: 8,
                        fontSize: 13, color: 'var(--txt)', cursor: 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--glass-h)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <span style={{ width: 22, textAlign: 'center' }}>{n.short}</span>
                        Navigate → {n.label}
                        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--txt3)',
                          fontFamily: "'JetBrains Mono',monospace",
                          border: '1px solid var(--bdr)', padding: '2px 5px', borderRadius: 4 }}>↵</span>
                      </div>
                    </Link>
                  : <div key="theme" onClick={() => { toggle(); setCmdOpen(false) }} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 8,
                      fontSize: 13, color: 'var(--txt)', cursor: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--glass-h)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span style={{ width: 22, textAlign: 'center' }}>◑</span>
                      Toggle Theme
                    </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '10px 18px', borderTop: '1px solid var(--bdr)',
              display: 'flex', gap: 16,
            }}>
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
