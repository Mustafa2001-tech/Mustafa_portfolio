'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import experience from '../../data/experience.json'

const TABS = [
  { id: 'internships', label: 'Internships & Work', icon: '💼', color: '#00FFB2', data: experience.internships },
  { id: 'volunteer',   label: 'Volunteer Work',     icon: '🤝', color: '#A855F7', data: experience.volunteer   },
  { id: 'research',    label: 'Research Projects',  icon: '🔬', color: '#4285F4', data: experience.research    },
]

const STATUS_STYLE = {
  active:    { color: '#00FFB2', border: 'rgba(0,255,178,0.3)',   label: 'ACTIVE'     },
  completed: { color: '#8A8A9A', border: 'rgba(138,138,154,0.3)', label: 'COMPLETED'  },
  ongoing:   { color: '#FFD700', border: 'rgba(255,215,0,0.3)',   label: 'ONGOING'    },
}

function ExperienceCard({ item, color }) {
  const [expanded, setExpanded] = useState(false)
  const status = STATUS_STYLE[item.status] || STATUS_STYLE.completed

  return (
    <div className="gc" style={{ padding: 24, transition: 'all 0.3s ease' }}>

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: 'var(--txt)', marginBottom: 4 }}>
            {item.title}
          </div>
          <div style={{ fontSize: 12, color: color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>
            {item.company}
          </div>
        </div>
        <span style={{
          fontSize: 9, padding: '3px 10px', flexShrink: 0,
          border: `1px solid ${status.border}`,
          borderRadius: 100, color: status.color,
          fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.1em',
        }}>
          {status.label}
        </span>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace", display: 'flex', alignItems: 'center', gap: 5 }}>
          📍 {item.location}
        </span>
        <span style={{ fontSize: 11, color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace", display: 'flex', alignItems: 'center', gap: 5 }}>
          🗓 {item.start} — {item.end}
        </span>
        <span style={{ fontSize: 9, padding: '2px 8px', border: `1px solid ${color}33`, borderRadius: 4, color: color, fontFamily: "'JetBrains Mono',monospace" }}>
          {item.type}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 12, color: 'var(--txt2)', lineHeight: 1.7,
        fontFamily: "'Space Mono',monospace",
        display: expanded ? 'block' : '-webkit-box',
        WebkitLineClamp: expanded ? 'unset' : 3,
        WebkitBoxOrient: 'vertical',
        overflow: expanded ? 'visible' : 'hidden',
        marginBottom: 14,
      }}>
        {item.description}
      </p>

      {/* Expand toggle if description is long */}
      {item.description.length > 180 && (
        <button onClick={() => setExpanded(e => !e)} style={{
          background: 'transparent', border: 'none',
          color: color, fontSize: 11,
          fontFamily: "'JetBrains Mono',monospace",
          cursor: 'pointer', marginBottom: 12, padding: 0,
        }}>
          {expanded ? '↑ Show less' : '↓ Read more'}
        </button>
      )}

      {/* Skills */}
      {item.skills?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {item.skills.map(s => (
            <span key={s} style={{
              fontSize: 9, padding: '3px 8px',
              border: `1px solid ${color}33`,
              borderRadius: 4, color: color,
              fontFamily: "'JetBrains Mono',monospace",
            }}>{s}</span>
          ))}
        </div>
      )}

    </div>
  )
}

function EmptyState({ label, icon }) {
  return (
    <div style={{
      gridColumn: '1 / -1',
      padding: '60px 24px', textAlign: 'center',
      border: '1px dashed var(--bdr)', borderRadius: 12,
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--txt)', marginBottom: 6 }}>
        No {label} yet
      </div>
      <div style={{ fontSize: 12, color: 'var(--txt3)', fontFamily: "'Space Mono',monospace" }}>
        Add entries to <span style={{ color: 'var(--acc)' }}>data/experience.json</span> to display them here.
      </div>
    </div>
  )
}

export default function ExperienceClient() {
  const [activeTab, setActiveTab] = useState('internships')
  const current = TABS.find(t => t.id === activeTab)

  return (
    <Layout>
      <div className="page-wrap">
        <div className="section-label" style={{ marginBottom: 14 }}>// EXPERIENCE</div>
        <h1 className="page-h1 fade-up">Experience</h1>
        <p className="fade-up-1" style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 8, fontFamily: "'Space Mono',monospace" }}>
          Work, research, and community contributions.
        </p>

        {/* Tabs */}
        <div className="fade-up-2" style={{
          display: 'flex', gap: 8, marginTop: 32, marginBottom: 28,
          flexWrap: 'wrap',
        }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 10, cursor: 'pointer',
              fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 700,
              transition: 'all 0.25s ease',
              background: activeTab === tab.id ? `${tab.color}15` : 'var(--glass)',
              border: activeTab === tab.id ? `1px solid ${tab.color}55` : '1px solid var(--bdr)',
              color: activeTab === tab.id ? tab.color : 'var(--txt2)',
              boxShadow: activeTab === tab.id ? `0 0 20px ${tab.color}15` : 'none',
            }}>
              <span style={{ fontSize: 14 }}>{tab.icon}</span>
              {tab.label}
              <span style={{
                fontSize: 9, padding: '2px 6px',
                borderRadius: 100,
                background: activeTab === tab.id ? `${tab.color}25` : 'var(--glass-h)',
                color: activeTab === tab.id ? tab.color : 'var(--txt3)',
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {tab.data.length}
              </span>
            </button>
          ))}
        </div>

        {/* Divider with active tab label */}
        <div className="fade-up-2" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: current.color }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: current.color, letterSpacing: '.1em' }}>
            // {current.label.toUpperCase()}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--bdr)' }} />
        </div>

        {/* Cards grid */}
        <div className="fade-up-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {current.data.length > 0
            ? current.data.map(item => (
                <ExperienceCard key={item.id} item={item} color={current.color} />
              ))
            : <EmptyState label={current.label} icon={current.icon} />
          }
        </div>

      </div>
    </Layout>
  )
}
