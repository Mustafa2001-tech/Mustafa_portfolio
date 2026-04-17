'use client'
import { useState } from 'react'

const GATES = ['AND','OR','NAND','NOR','XOR','XNOR','NOT','BUFFER']
const DESCS = {
  AND:    'Output is HIGH only when ALL inputs are HIGH.',
  OR:     'Output is HIGH when ANY input is HIGH.',
  NAND:   'Output is LOW only when ALL inputs are HIGH.',
  NOR:    'Output is HIGH only when ALL inputs are LOW.',
  XOR:    'Output is HIGH when inputs DIFFER.',
  XNOR:  'Output is HIGH when inputs are SAME.',
  NOT:    'Output is the complement of input A (B ignored).',
  BUFFER: 'Output follows input A exactly (B ignored).',
}

function compute(gate, a, b) {
  if (gate==='AND')    return a && b
  if (gate==='OR')     return a || b
  if (gate==='NAND')   return !(a && b)
  if (gate==='NOR')    return !(a || b)
  if (gate==='XOR')    return a !== b
  if (gate==='XNOR')   return a === b
  if (gate==='NOT')    return !a
  if (gate==='BUFFER') return a
  return false
}

function IOBox({ label, value, onClick, disabled }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ fontSize:10, color:'var(--txt3)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.1em' }}>{label}</div>
      <button onClick={onClick} disabled={disabled} style={{
        width:70, height:70, borderRadius:12, fontSize:26, fontWeight:700,
        fontFamily:"'JetBrains Mono',monospace",
        border: value ? '2px solid var(--acc)' : '2px solid var(--bdr)',
        background: value ? 'rgba(0,255,178,0.12)' : 'var(--glass)',
        color: value ? 'var(--acc)' : 'var(--txt3)',
        boxShadow: value ? '0 0 20px rgba(0,255,178,0.3)' : 'none',
        transition:'all 0.2s', cursor:'none',
        opacity: disabled ? 0.3 : 1,
      }}>{value ? '1' : '0'}</button>
    </div>
  )
}

function OutputBox({ value }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ fontSize:10, color:'var(--txt3)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.1em' }}>OUTPUT Q</div>
      <div style={{
        width:70, height:70, borderRadius:12, fontSize:26, fontWeight:700,
        fontFamily:"'JetBrains Mono',monospace", display:'flex', alignItems:'center', justifyContent:'center',
        border: value ? '2px solid var(--acc)' : '2px solid var(--bdr)',
        background: value ? 'rgba(0,255,178,0.08)' : 'var(--glass)',
        color: value ? 'var(--acc)' : 'var(--txt3)',
        boxShadow: value ? '0 0 28px rgba(0,255,178,0.4)' : 'none',
        transition:'all 0.2s',
      }}>{value ? '1' : '0'}</div>
      <div style={{ fontSize:9, color: value ? 'var(--acc)' : 'var(--txt3)', fontFamily:"'JetBrains Mono',monospace" }}>
        {value ? 'HIGH (1)' : 'LOW (0)'}
      </div>
    </div>
  )
}

export default function GateSimulator() {
  const [gate, setGate] = useState('AND')
  const [a, setA] = useState(false)
  const [b, setB] = useState(false)
  const out = compute(gate, a, b)
  const single = gate === 'NOT' || gate === 'BUFFER'

  return (
    <div style={{ width:'100%', maxWidth:680 }}>
      {/* Gate selector */}
      <div className="section-label" style={{ marginBottom:10 }}>// SELECT GATE</div>
      <div className="gate-grid">
        {GATES.map(g => (
          <button key={g} onClick={() => setGate(g)} style={{
            padding:'8px 10px', fontSize:11, fontFamily:"'JetBrains Mono',monospace", fontWeight:600,
            background: gate===g ? 'rgba(0,255,178,0.1)' : 'var(--glass)',
            border: gate===g ? '1px solid var(--acc)' : '1px solid var(--bdr)',
            borderRadius:8, color: gate===g ? 'var(--acc)' : 'var(--txt2)',
            transition:'all 0.2s', cursor:'none',
          }}>{g}</button>
        ))}
      </div>

      {/* Gate SVG */}
      <svg viewBox="0 0 340 140" style={{ width:'100%', maxWidth:400, display:'block', margin:'0 auto 8px' }}>
        <line className={`gw ${a ? 'hi' : 'lo'}`} x1="18" y1="58" x2="112" y2="58"/>
        <circle className={`gd ${a ? 'hi' : 'lo'}`} cx="18" cy="58" r="5"/>
        <text x="4" y="53" fill="#8A8A9A" fontFamily="'JetBrains Mono',monospace" fontSize="11">A</text>
        <text x="4" y="67" fill={a?'#00FFB2':'#333340'} fontFamily="'JetBrains Mono',monospace" fontSize="13" fontWeight="600">{a?'1':'0'}</text>

        <line className={`gw ${!single && b ? 'hi' : 'lo'}`} x1="18" y1="90" x2="112" y2="90" opacity={single?0.2:1}/>
        <circle className={`gd ${!single && b ? 'hi' : 'lo'}`} cx="18" cy="90" r="5" opacity={single?0.2:1}/>
        <text x="4" y="85" fill="#8A8A9A" fontFamily="'JetBrains Mono',monospace" fontSize="11" opacity={single?0.2:1}>B</text>
        <text x="4" y="99" fill={!single&&b?'#00FFB2':'#333340'} fontFamily="'JetBrains Mono',monospace" fontSize="13" fontWeight="600" opacity={single?0.2:1}>{single?'-':b?'1':'0'}</text>

        <path d="M112,42 L156,42 Q196,42 196,74 Q196,106 156,106 L112,106 Z"
          fill={out?'rgba(0,255,178,0.07)':'rgba(255,255,255,0.04)'}
          stroke={out?'#00FFB2':'#333340'} strokeWidth="1.5"
          style={{ transition:'all 0.3s' }}/>
        <text x="154" y="79" textAnchor="middle"
          fill={out?'#00FFB2':'#8A8A9A'}
          fontFamily="'Syne',sans-serif" fontWeight="800" fontSize="13"
          style={{ transition:'fill 0.3s' }}>{gate}</text>

        <line className={`gw ${out ? 'hi' : 'lo'}`} x1="196" y1="74" x2="310" y2="74"/>
        <circle className={`gd ${out ? 'hi' : 'lo'}`} cx="310" cy="74" r="5"/>
        <text x="316" y="69" fill="#8A8A9A" fontFamily="'JetBrains Mono',monospace" fontSize="11">Q</text>
        <text x="316" y="83" fill={out?'#00FFB2':'#333340'} fontFamily="'JetBrains Mono',monospace" fontSize="13" fontWeight="600">{out?'1':'0'}</text>
      </svg>

      {/* IO controls */}
      <div className="io-row">
        <IOBox label="INPUT A" value={a} onClick={() => setA(x => !x)} />
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ color:'var(--txt3)', fontSize:20 }}>→</span>
          <div style={{ padding:'10px 18px', background:'var(--glass)', border:'1px solid var(--bdr)', borderRadius:10, fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, color:'var(--txt)', minWidth:70, textAlign:'center' }}>{gate}</div>
          <span style={{ color:'var(--txt3)', fontSize:20 }}>→</span>
        </div>
        <IOBox label="INPUT B" value={b} onClick={() => setB(x => !x)} disabled={single} />
        <span style={{ color:'var(--txt3)', fontSize:20 }}>=</span>
        <OutputBox value={out} />
      </div>

      {/* Description */}
      <div style={{ fontSize:11, color:'var(--txt2)', fontFamily:"'Space Mono',monospace", padding:'10px 16px', background:'var(--glass)', border:'1px solid var(--bdr)', borderRadius:8, textAlign:'center', lineHeight:1.5 }}>
        <strong style={{ color:'var(--acc)' }}>{gate}:</strong> {DESCS[gate]}
      </div>
    </div>
  )
}
