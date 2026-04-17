import Layout from '../../components/Layout'
import GateSimulator from '../../components/GateSimulator'

export const metadata = { title: 'Portfolio | Playground' }

export default function Playground() {
  return (
    <Layout>
      <div className="page-wrap">
        <div className="section-label" style={{ marginBottom:14 }}>// PLAYGROUND</div>
        <h1 className="page-h1 fade-up">Playground</h1>
        <p className="fade-up-1" style={{ fontSize:13, color:'var(--txt2)', marginTop:8, fontFamily:"'Space Mono',monospace" }}>
          Interactive simulations demonstrating engineering concepts.
        </p>

        <div className="fade-up-2" style={{ marginTop:32 }}>
          <div className="gc" style={{ padding:'24px 16px', maxWidth:700 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, gap:12 }}>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(1rem,4vw,1.3rem)', color:'var(--txt)' }}>Logic Gate Simulator</div>
                <div style={{ fontSize:11, color:'var(--txt2)', fontFamily:"'Space Mono',monospace", marginTop:3 }}>Toggle inputs — observe real-time CMOS gate output.</div>
              </div>
              <span style={{ padding:'4px 10px', border:'1px solid rgba(0,255,178,0.4)', borderRadius:100, fontSize:9, color:'var(--acc)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.1em', flexShrink:0 }}>LIVE</span>
            </div>
            <div style={{ width:'100%', height:1, background:'var(--bdr)', marginBottom:18 }} />
            <GateSimulator />
          </div>

          <div className="gc" style={{ padding:24, maxWidth:700, marginTop:16, opacity:0.6 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1.1rem', color:'var(--txt)' }}>Particle Field</div>
            <div style={{ fontSize:12, color:'var(--txt2)', fontFamily:"'Space Mono',monospace", marginTop:6 }}>2D physics-based particle simulation. Coming soon.</div>
            <div style={{ fontSize:10, color:'var(--txt3)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.15em', marginTop:10 }}>COMING SOON</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
