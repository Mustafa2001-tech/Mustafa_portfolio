import Layout from '../../components/Layout'
import SkillTree from '../../components/SkillTree'

export const metadata = { title: 'Portfolio | Skill Tree' }

export default function SkillTreePage() {
  return (
    <Layout>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'72px 24px 60px' }}>
        <div className="section-label" style={{ marginBottom:14 }}>// SKILL TREE</div>
        <h1 className="font-display fade-up" style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', color:'var(--txt)' }}>
          Experience Graph
        </h1>
        <p className="fade-up-1" style={{ fontSize:13, color:'var(--txt2)', marginTop:8, fontFamily:"'Space Mono',monospace" }}>
          Click any node to explore a milestone in detail.
        </p>
        <div className="fade-up-2">
          <SkillTree />
        </div>
      </div>
    </Layout>
  )
}
