import Layout from '../../components/Layout'
import assets from '../../data/assets.json'

export const metadata = { title: 'Portfolio | Digital Library' }

export default function Library() {
  return (
    <Layout>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 60px' }}>
        <div className="section-label" style={{ marginBottom: 14 }}>// RESOURCES</div>
        <h1 className="font-display fade-up"
          style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: 'var(--txt)' }}>
          Digital Library
        </h1>
        <p className="fade-up-1"
          style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 8, fontFamily: "'Space Mono',monospace" }}>
          Tools, frameworks, and resources that power the work.
        </p>

        <div className="fade-up-2" style={{ marginTop: 36 }}>
          {assets.library.map(cat => (
            <div key={cat.id} style={{ marginBottom: 40 }}>

              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--txt)' }}>
                  {cat.label}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'var(--txt3)' }}>
                  {cat.items.length} tools
                </span>
              </div>

              {/* Items grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {cat.items.map(item => (
                  <a key={item.name} href={item.url} target="_blank" rel="noreferrer"
                    className="gc"
                    style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start', textDecoration: 'none', color: 'inherit' }}>

                    {/* Favicon — plain img with no event handler, fallback via CSS */}
                    <div style={{
                      width: 22, height: 22, borderRadius: 4,
                      background: 'var(--glass-h)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, flexShrink: 0, overflow: 'hidden',
                    }}>
                      {item.favicon
                        ? <img src={item.favicon} alt="" width={16} height={16}
                            style={{ borderRadius: 2, display: 'block' }} />
                        : '◈'}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt)', fontFamily: "'Space Mono',monospace" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--txt2)', lineHeight: 1.5, margin: '3px 0 6px', fontFamily: "'Space Mono',monospace" }}>
                        {item.desc}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {item.tags.map(t => (
                          <span key={t} style={{
                            fontSize: 9, padding: '2px 6px',
                            border: '1px solid var(--bdr)', borderRadius: 4,
                            color: 'var(--txt3)', fontFamily: "'JetBrains Mono',monospace",
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    <span style={{ fontSize: 12, color: 'var(--txt3)', flexShrink: 0 }}>↗</span>
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
