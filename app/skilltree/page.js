import Layout from '../../components/Layout'
import SkillTree from '../../components/SkillTree'

export const metadata = { title: 'Portfolio | Skill Tree' }

export default function SkillTreePage() {
  return (
    <Layout>
      <div className="page-wrap">
        <div className="section-label" style={{ marginBottom:14 }}>// SKILL TREE</div>
        <h1 className="page-h1 fade-up">Experience Graph</h1>
        <p className="fade-up-1" style={{ fontSize:13, color:'var(--txt2)', marginTop:8, fontFamily:"'Space Mono',monospace" }}>
          Tap any node to explore a milestone in detail.
        </p>
        <div className="fade-up-2">
          <SkillTree />
        </div>
      </div>
    </Layout>
  )
}
