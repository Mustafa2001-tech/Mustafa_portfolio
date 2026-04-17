'use client'
import { useState } from 'react'

const NODES = [
  { id:'kau',       icon:'🎓', year:'2023–2027', color:'#00FFB2', cx:450, cy:52,
    title:'King Abdulaziz University', sub:'B.Sc. Computer Engineering',
    desc:"Pursuing a Bachelor's in Computer Engineering. Focus: digital design, VLSI, embedded systems, algorithms.",
    skills:['Digital Logic','Embedded Systems','Algorithms','Signal Processing'] },
  { id:'meta',      icon:'📜', year:'2026',      color:'#4285F4', cx:180, cy:210,
    title:'Meta Back-End Developer', sub:'Professional Certificate',
    desc:"Meta's Back-End Developer certificate covering Django, REST APIs, and database architecture.",
    skills:['Python','Django','REST APIs','MySQL','Linux'] },
  { id:'google',    icon:'📜', year:'2026',      color:'#4285F4', cx:720, cy:210,
    title:'Google Advanced Data Analytics', sub:'Professional Certificate',
    desc:'Advanced analytics by Google — statistical analysis, machine learning, and data storytelling.',
    skills:['Python','Pandas','ML','Tableau','R','BigQuery'] },
  { id:'vlsi',      icon:'⚡', year:'2025',      color:'#FF6B35', cx:315, cy:350,
    title:'VLSI Design Project', sub:'CMOS ALU on 45nm',
    desc:'4-bit CMOS ALU at transistor level using Cadence Virtuoso on 45nm. Monte Carlo yield analysis.',
    skills:['Cadence Virtuoso','SPICE','CMOS','Layout','DRC/LVS'] },
  { id:'fullstack', icon:'⚙', year:'2024',      color:'#A855F7', cx:585, cy:350,
    title:'Full-Stack Engineering', sub:'Python · Next.js · FastAPI',
    desc:'Full-stack apps combining Python backends with modern frontends and cloud deployments.',
    skills:['Next.js','FastAPI','PostgreSQL','Docker','Vercel'] },
  { id:'capstone',  icon:'★', year:'2025',      color:'#FFD700', cx:450, cy:480,
    title:'Capstone: Edge AI System', sub:'FPGA + TensorFlow Lite',
    desc:'Final year project: pruned neural network on FPGA for real-time gesture recognition at <10ms.',
    skills:['FPGA','Verilog','TFLite','HLS','Embedded C'] },
]

const EDGES = [
  ['kau','meta'],['kau','google'],
  ['meta','vlsi'],['google','vlsi'],
  ['meta','fullstack'],['google','fullstack'],
  ['vlsi','capstone'],['fullstack','capstone'],
]

const EDGE_COLORS = [
  ['#00FFB2','#4285F4'],['#00FFB2','#4285F4'],
  ['#4285F4','#FF6B35'],['#4285F4','#FF6B35'],
  ['#4285F4','#A855F7'],['#4285F4','#A855F7'],
  ['#FF6B35','#FFD700'],['#A855F7','#FFD700'],
]

function getNode(id) { return NODES.find(n => n.id === id) }

function cubicBezier(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2
  return `M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}`
}

export default function SkillTree() {
  const [selected, setSelected] = useState(null)
  const node = selected ? getNode(selected) : null

  return (
    <div style={{ width: '100%' }}>
      {/* Legend */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:16, margin:'14px 0 20px' }}>
        {[['Education','#00FFB2','🎓'],['Certification','#4285F4','📜'],['Project','#FF6B35','⚡'],['Skill','#A855F7','⚙']].map(([l,c,i]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:7, fontSize:11, color:'var(--txt2)', fontFamily:"'JetBrains Mono',monospace" }}>
            <div style={{ width:20, height:20, borderRadius:'50%', border:`1.5px solid ${c}`, background:`${c}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>{i}</div>
            {l}
          </div>
        ))}
      </div>

      <div style={{ width:'1px', background:'var(--bdr)', margin:'0 0 24px', height:1, width:'100%' }} />

      {/* SVG */}
      <div className="tree-svg-wrap"><svg viewBox="0 0 900 520">
        <defs>
          {EDGE_COLORS.map(([c1,c2],i) => (
            <linearGradient key={i} id={`eg${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={c1} stopOpacity=".6"/>
              <stop offset="100%" stopColor={c2} stopOpacity=".6"/>
            </linearGradient>
          ))}
        </defs>

        {/* Grid */}
        <g opacity=".04" stroke="#F0F0F0" strokeWidth=".5">
          {[130,260,390].map(y => <line key={y} x1="0" y1={y} x2="900" y2={y}/>)}
          {[225,450,675].map(x => <line key={x} x1={x} y1="0" x2={x} y2="520"/>)}
        </g>

        {/* Edges */}
        {EDGES.map(([from, to], i) => {
          const a = getNode(from), b = getNode(to)
          return <path key={i} className="edge"
            d={cubicBezier(a.cx, a.cy, b.cx, b.cy)}
            stroke={`url(#eg${i})`}
            style={{ animationDelay: `${-i*0.4}s` }} />
        })}

        {/* Nodes */}
        {NODES.map(n => (
          <g key={n.id} onClick={() => setSelected(s => s===n.id ? null : n.id)}
            style={{ cursor:'none' }}>
            <circle className="node-ring" cx={n.cx} cy={n.cy}
              stroke={n.color}
              style={{ animationDelay: `${-Math.random()*2}s` }} />
            <circle cx={n.cx} cy={n.cy} r={n.id==='capstone'?22:18}
              fill={`${n.color}18`} stroke={n.color} strokeWidth="1.5"
              style={{ transition:'all 0.2s', filter: selected===n.id ? `drop-shadow(0 0 10px ${n.color})` : 'none' }} />
            <text x={n.cx} y={n.cy-4} textAnchor="middle" dominantBaseline="middle" fontSize={n.id==='capstone'?16:13}>{n.icon}</text>
            <text x={n.cx} y={n.cy+7} textAnchor="middle" fontSize="7"
              fill={n.color} fontFamily="'JetBrains Mono',monospace">{n.year}</text>
            {/* Labels */}
            {n.id !== 'capstone' ? <>
              <text x={n.cx} y={n.cy + (n.id==='kau'?28:27)} textAnchor="middle"
                fontSize="11.5" fill="#F0F0F0" fontFamily="'Syne',sans-serif" fontWeight="700">{n.title}</text>
              <text x={n.cx} y={n.cy + (n.id==='kau'?42:41)} textAnchor="middle"
                fontSize="9" fill="#8A8A9A" fontFamily="'Space Mono',monospace">{n.sub}</text>
            </> : <>
              <text x={n.cx} y={n.cy-30} textAnchor="middle"
                fontSize="12" fill="#FFD700" fontFamily="'Syne',sans-serif" fontWeight="800">{n.title}</text>
              <text x={n.cx} y={n.cy+34} textAnchor="middle"
                fontSize="9" fill="#8A8A9A" fontFamily="'Space Mono',monospace">{n.sub}</text>
            </>}
          </g>
        ))}
      </svg></div>

      {/* Detail Panel */}
      {node && (
        <div className="gc fade-up" style={{ marginTop:20, padding:20, maxWidth:500 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <span style={{ fontSize:22 }}>{node.icon}</span>
            <button onClick={() => setSelected(null)} style={{
              background:'transparent', border:'none', color:'var(--txt3)', fontSize:16, cursor:'none'
            }}>✕</button>
          </div>
          <div className="section-label" style={{ margin:'6px 0 4px' }}>// {node.year}</div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1.1rem', color:'var(--txt)' }}>{node.title}</div>
          <div style={{ fontSize:11, color:'var(--txt2)', fontFamily:"'Space Mono',monospace", marginBottom:10 }}>{node.sub}</div>
          <div style={{ fontSize:12, color:'var(--txt2)', lineHeight:1.6, borderTop:'1px solid var(--bdr)', paddingTop:10, marginBottom:12, fontFamily:"'Space Mono',monospace" }}>{node.desc}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {node.skills.map(s => (
              <span key={s} style={{ fontSize:10, padding:'3px 8px', borderRadius:4, border:`1px solid ${node.color}33`, color:node.color, fontFamily:"'JetBrains Mono',monospace" }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
