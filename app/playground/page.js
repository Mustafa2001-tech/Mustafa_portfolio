import Layout from '../../components/Layout'
import GateSimulator from '../../components/GateSimulator'
import GitSimulator from '../../components/GitSimulator'

export const metadata = { title: 'Portfolio | Playground' }

export default function Playground() {
  return (
    <Layout>
      <div className="page-wrap">
        <div className="section-label" style={{ marginBottom: 14 }}>// PLAYGROUND</div>
        <h1 className="page-h1 fade-up">Playground</h1>
        <p className="fade-up-1" style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 8, fontFamily: "'Space Mono',monospace" }}>
          Interactive simulations demonstrating engineering and software concepts.
        </p>

        <div className="fade-up-2" style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Logic Gate Simulator */}
          <div className="gc" style={{ padding: '24px 16px', maxWidth: 720 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 12 }}>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(1rem,4vw,1.3rem)', color: 'var(--txt)' }}>
                  Logic Gate Simulator
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt2)', fontFamily: "'Space Mono',monospace", marginTop: 3 }}>
                  Toggle inputs — observe real-time CMOS gate output.
                </div>
              </div>
              <span style={{ padding: '4px 10px', border: '1px solid rgba(0,255,178,0.4)', borderRadius: 100, fontSize: 9, color: 'var(--acc)', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.1em', flexShrink: 0 }}>
                LIVE
              </span>
            </div>
            <div style={{ width: '100%', height: 1, background: 'var(--bdr)', marginBottom: 18 }} />
            <GateSimulator />
          </div>

          {/* Git Command Simulator */}
          <div className="gc" style={{ padding: '24px 16px', maxWidth: 720 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 12 }}>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(1rem,4vw,1.3rem)', color: 'var(--txt)' }}>
                  Git Command Simulator
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt2)', fontFamily: "'Space Mono',monospace", marginTop: 3 }}>
                  Practice real Git commands in a safe, interactive terminal. Complete all 6 challenges.
                </div>
              </div>
              <span style={{ padding: '4px 10px', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 100, fontSize: 9, color: 'var(--acc2)', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.1em', flexShrink: 0 }}>
                INTERACTIVE
              </span>
            </div>
            <div style={{ width: '100%', height: 1, background: 'var(--bdr)', marginBottom: 18 }} />
            <GitSimulator />
          </div>

        </div>
      </div>
    </Layout>
  )
}
