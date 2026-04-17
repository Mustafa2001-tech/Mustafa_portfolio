'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const onOver = e => {
      if (e.target.closest('a,button,[role=button],.gc')) {
        dot.style.transform  = 'translate(-50%,-50%) scale(2.5)'
        rng.style.opacity    = '1'
        rng.style.transform  = 'translate(-50%,-50%) scale(1.4)'
      }
    }
    const onOut = e => {
      if (e.target.closest('a,button,[role=button],.gc')) {
        dot.style.transform  = 'translate(-50%,-50%) scale(1)'
        rng.style.opacity    = '0.55'
        rng.style.transform  = 'translate(-50%,-50%) scale(1)'
      }
    }

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      rng.style.left = ring.current.x + 'px'
      rng.style.top  = ring.current.y + 'px'
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const base = {
    position: 'fixed', pointerEvents: 'none',
    borderRadius: '50%', transform: 'translate(-50%,-50%)',
    transition: 'transform 0.1s ease',
    zIndex: 99999,
  }

  return (
    <>
      <div ref={dotRef} style={{ ...base,
        width: 7, height: 7,
        background: 'var(--acc)',
        zIndex: 99999,
      }} />
      <div ref={ringRef} style={{ ...base,
        width: 30, height: 30,
        border: '1.5px solid var(--acc)',
        opacity: 0.55,
        zIndex: 99998,
        transition: 'transform 0.14s ease, opacity 0.2s ease',
      }} />
    </>
  )
}
