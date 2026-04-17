import Layout from '../../components/Layout'
import content from '../../data/content.json'

export const metadata = { title: 'Portfolio | Projects' }

export default function Projects() {
  const { projects } = content
  return (
    <Layout>
      <div className="page-wrap">
        <div className="section-label" style={{ marginBottom:14 }}>// WORK</div>
        <h1 className="page-h1 fade-up">Projects</h1>
        <p className="fade-up-1" style={{ fontSize:13, color:'var(--txt2)', marginTop:8, fontFamily:"'Space Mono',monospace" }}>
          Selected engineering work — hardware to cloud.
        </p>

        <div className="proj-grid fade-up-2">
          {projects.map(p => (
            <div key={p.id} className="gc" style={{ padding:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, gap:8 }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1rem', color:'var(--txt)' }}>{p.title}</div>
                <span style={{ fontSize:9, padding:'3px 10px', flexShrink:0,
                  border: p.status==='in-progress' ? '1px solid rgba(255,215,0,0.3)' : '1px solid rgba(0,255,178,0.3)',
                  borderRadius:100,
                  color: p.status==='in-progress' ? '#FFD700' : 'var(--acc)',
                  fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.1em',
                }}>{p.status==='in-progress' ? 'IN PROGRESS' : 'DONE'}</span>
              </div>
              <p style={{ fontSize:12, color:'var(--txt2)', lineHeight:1.6, margin:'10px 0', fontFamily:"'Space Mono',monospace" }}>{p.description}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontSize:9, padding:'3px 8px', border:'1px solid rgba(255,107,53,.25)', borderRadius:4, color:'var(--acc3)', fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
                ))}
              </div>
              <div style={{ display:'flex', gap:14, marginTop:14, flexWrap:'wrap' }}>
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize:11, color:'var(--acc)', fontFamily:"'JetBrains Mono',monospace", textDecoration:'none' }}>GitHub →</a>}
                {p.demo   && <a href={p.demo}   target="_blank" rel="noreferrer" style={{ fontSize:11, color:'var(--acc2)', fontFamily:"'JetBrains Mono',monospace", textDecoration:'none' }}>Live Demo ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
