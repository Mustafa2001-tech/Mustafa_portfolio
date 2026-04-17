import Layout from '../components/Layout'
import Link from 'next/link'
import content from '../data/content.json'

const { profile, stats } = content

export default function Home() {
  return (
    <Layout>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'80px 24px 60px' }}>

        {/* Terminal bar */}
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:28 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
          ))}
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'var(--txt3)', marginLeft:6 }}>~/portfolio$</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'var(--acc)' }}> ▋</span>
        </div>

        {/* Hero heading */}
        <h1 className="glitch font-display fade-up"
          data-text={profile.name}
          style={{ fontSize:'clamp(3rem,8vw,6.5rem)', color:'var(--txt)', lineHeight:0.9 }}>
          {profile.name}
        </h1>

        {/* Tagline */}
        <div className="fade-up-1" style={{ display:'flex', alignItems:'center', gap:12, margin:'16px 0' }}>
          <div style={{ width:36, height:1.5, background:'var(--acc)' }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.85rem', letterSpacing:'.05em', color:'var(--acc)' }}>
            {profile.tagline}
          </span>
        </div>

        {/* Chips */}
        <div className="fade-up-2" style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:14 }}>
          {['VLSI Design','Data Analytics','Back-End Eng.','KAU · 2026'].map(c => (
            <span key={c} style={{
              fontSize:10, color:'var(--txt2)', fontFamily:"'JetBrains Mono',monospace",
              padding:'4px 12px', border:'1px solid var(--bdr)', borderRadius:100,
            }}>{c}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="fade-up-3" style={{ display:'flex', gap:12, marginTop:28, flexWrap:'wrap' }}>
          <Link href="/skilltree" style={{ textDecoration:'none' }}>
            <button style={{
              padding:'11px 22px', background:'var(--acc)', color:'var(--bg)',
              border:'none', borderRadius:8, fontFamily:"'Space Mono',monospace",
              fontSize:13, fontWeight:700, cursor:'none',
              transition:'all 0.2s',
            }}>Explore Skill Tree →</button>
          </Link>
          <Link href="/projects" style={{ textDecoration:'none' }}>
            <button style={{
              padding:'11px 22px', background:'transparent', color:'var(--txt)',
              border:'1px solid var(--bdr)', borderRadius:8,
              fontFamily:"'Space Mono',monospace", fontSize:13, cursor:'none',
              transition:'all 0.2s',
            }}>View Projects</button>
          </Link>
        </div>

        {/* Section label */}
        <div style={{ marginTop:60 }}>
          <div className="section-label" style={{ marginBottom:6, display:'block' }}>// OVERVIEW</div>
          <div style={{ width:40, height:1, background:'var(--bdr)', marginBottom:24 }} />
        </div>

        {/* Bento Grid */}
        <div className="fade-up-4" style={{
          display:'grid',
          gridTemplateColumns:'repeat(12, 1fr)',
          gap:12,
        }}>
          {/* Stats */}
          <div className="gc" style={{ padding:24, gridColumn:'span 4', minHeight:160 }}>
            <div className="section-label" style={{ marginBottom:8 }}>// STATUS</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:10 }}>
              {stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.8rem', fontWeight:800, color:'var(--acc)' }}>{s.value}</div>
                  <div style={{ fontSize:9, color:'var(--txt3)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.1em', marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest cert */}
          <div className="gc" style={{ padding:24, gridColumn:'span 4', minHeight:160 }}>
            <div className="section-label" style={{ marginBottom:8 }}>// LATEST</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.05rem', fontWeight:800, color:'var(--txt)' }}>Google Advanced</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.05rem', fontWeight:800, color:'var(--acc)' }}>Data Analytics</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'var(--txt3)', marginTop:4 }}>Professional Certificate</div>
            <div style={{ marginTop:12, display:'inline-block', padding:'4px 10px', border:'1px solid var(--bdr)', borderRadius:6, fontSize:10, color:'var(--txt3)', fontFamily:"'JetBrains Mono',monospace" }}>Coursera · 2023</div>
          </div>

          {/* Featured project */}
          <div className="gc" style={{ padding:24, gridColumn:'span 4', minHeight:160 }}>
            <div className="section-label" style={{ marginBottom:8 }}>// FEATURED</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.1rem', fontWeight:800, color:'var(--txt)' }}>CMOS ALU</div>
            <div style={{ fontSize:11, color:'var(--txt2)', margin:'8px 0', lineHeight:1.55, fontFamily:"'Space Mono',monospace" }}>4-bit ALU at transistor level. Monte Carlo validated on 45nm.</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {['VLSI','Cadence','45nm'].map(t => (
                <span key={t} style={{ fontSize:9, padding:'3px 8px', border:'1px solid rgba(255,107,53,.25)', borderRadius:4, color:'var(--acc3)', fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="gc" style={{ padding:24, gridColumn:'span 8', minHeight:150 }}>
            <div className="section-label" style={{ marginBottom:8 }}>// BIO</div>
            <p style={{ fontSize:13, color:'var(--txt2)', lineHeight:1.7, fontFamily:"'Space Mono',monospace" }}>{profile.bio}</p>
            <div style={{ display:'flex', gap:16, marginTop:14 }}>
              <a href={profile.github} target="_blank" rel="noreferrer" style={{ fontSize:11, color:'var(--acc)', fontFamily:"'JetBrains Mono',monospace", textDecoration:'none' }}>GitHub →</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ fontSize:11, color:'var(--acc2)', fontFamily:"'JetBrains Mono',monospace", textDecoration:'none' }}>LinkedIn →</a>
            </div>
          </div>

          {/* Stack */}
          <div className="gc" style={{ padding:24, gridColumn:'span 4', minHeight:150 }}>
            <div className="section-label" style={{ marginBottom:8 }}>// STACK</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
              {profile.stack.map(s => (
                <span key={s} style={{ fontSize:9, padding:'4px 10px', border:'1px solid var(--bdr)', borderRadius:6, color:'var(--txt3)', fontFamily:"'JetBrains Mono',monospace" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}
