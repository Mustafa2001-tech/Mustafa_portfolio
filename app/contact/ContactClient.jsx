'use client'
import Layout from '../../components/Layout'
import { useState } from 'react'
import content from '../../data/content.json'

const { profile } = content

const inputStyle = {
  background: 'var(--glass)',
  border: '1px solid var(--bdr)',
  borderRadius: 8,
  color: 'var(--txt)',
  fontFamily: "'Space Mono',monospace",
  fontSize: 12,
  padding: '10px 13px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

export default function ContactClient() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent]   = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = () => {
    setError('')
    if (!form.name.trim())
      return setError('Name is required.')
    if (!form.email.trim() || !form.email.includes('@'))
      return setError('A valid email is required.')
    if (form.message.trim().length < 10)
      return setError('Message must be at least 10 characters.')
    setSent(true)
  }

  return (
    <Layout>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 60px' }}>
        <div className="section-label" style={{ marginBottom: 14 }}>// CONTACT</div>
        <h1 className="font-display fade-up"
          style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: 'var(--txt)' }}>
          Contact
        </h1>
        <p className="fade-up-1"
          style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 8, fontFamily: "'Space Mono',monospace" }}>
          Open to collaborations, research roles, and internship opportunities.
        </p>

        <div className="contact-grid fade-up-2">

          {/* ── Form ── */}
          <div className="gc" style={{ padding: 28 }}>
            {sent ? (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '40px 0', gap: 12, textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--acc)' }}>✓</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.3rem', color: 'var(--txt)' }}>
                  Message sent!
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt2)', fontFamily: "'Space Mono',monospace" }}>
                  I'll get back to you soon.
                </div>
              </div>
            ) : (
              <>
                <div className="section-label" style={{ marginBottom: 14 }}>// SEND A MESSAGE</div>

                {error && (
                  <div style={{
                    fontSize: 11, color: 'var(--acc3)',
                    fontFamily: "'JetBrains Mono',monospace",
                    padding: '8px 12px',
                    background: 'rgba(255,107,53,0.1)',
                    border: '1px solid rgba(255,107,53,0.3)',
                    borderRadius: 6, marginBottom: 12,
                  }}>
                    {error}
                  </div>
                )}

                {/* Name + Email */}
                {[
                  ['name',  'Name',  'Your name',       'text'],
                  ['email', 'Email', 'your@email.com',  'email'],
                ].map(([k, l, ph, t]) => (
                  <div key={k} style={{ marginBottom: 14 }}>
                    <div style={{
                      fontSize: 10, color: 'var(--txt3)',
                      fontFamily: "'JetBrains Mono',monospace",
                      letterSpacing: '.1em', marginBottom: 5,
                    }}>{l.toUpperCase()}</div>
                    <input
                      type={t}
                      placeholder={ph}
                      value={form[k]}
                      onChange={set(k)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--acc)'}
                      onBlur={e  => e.target.style.borderColor = 'var(--bdr)'}
                    />
                  </div>
                ))}

                {/* Message */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{
                    fontSize: 10, color: 'var(--txt3)',
                    fontFamily: "'JetBrains Mono',monospace",
                    letterSpacing: '.1em', marginBottom: 5,
                  }}>MESSAGE</div>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={set('message')}
                    style={{ ...inputStyle, minHeight: 110, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--acc)'}
                    onBlur={e  => e.target.style.borderColor = 'var(--bdr)'}
                  />
                </div>

                <button onClick={submit} style={{
                  width: '100%', padding: '12px 0',
                  background: 'var(--acc)', color: 'var(--bg)',
                  border: 'none', borderRadius: 8,
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 13, fontWeight: 700, cursor: 'none',
                  transition: 'all 0.2s',
                }}>
                  Send Message →
                </button>
              </>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Social links */}
            <div className="gc" style={{ padding: 22 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>// FIND ME AT</div>
              {[
                ['⌥', 'GitHub',   'yourusername', profile.github],
                ['◈', 'LinkedIn', 'yourusername', profile.linkedin],
                ['✉', 'Email',    profile.email,  `mailto:${profile.email}`],
              ].map(([icon, name, sub, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', borderRadius: 8,
                    textDecoration: 'none', color: 'inherit',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--glass-h)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono',monospace" }}>{name}</div>
                    <div style={{ fontSize: 10, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace" }}>{sub}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--txt3)' }}>↗</span>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="gc" style={{ padding: 22 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>// AVAILABILITY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="pulse-dot" />
                <span style={{ fontSize: 12, color: 'var(--txt)', fontFamily: "'Space Mono',monospace" }}>
                  Open to opportunities
                </span>
              </div>
              <p style={{
                fontSize: 11, color: 'var(--txt2)',
                fontFamily: "'Space Mono',monospace",
                lineHeight: 1.6, marginTop: 10,
              }}>
                Internships, research collaborations, and part-time roles in VLSI,
                data engineering, or backend development.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
