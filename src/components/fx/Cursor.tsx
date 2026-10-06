'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Dot + trailing ring. Enabled only for fine pointers (mouse / trackpad) and
 * when the user has not asked for reduced motion. Elements can set
 * data-cursor="Label" to turn the ring into a labelled disc.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ok =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability detection must run on the client
    setEnabled(ok)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('has-cursor')

    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0
    let visible = false

    const setState = (el: Element | null) => {
      const r = root.current
      if (!r) return
      const labelled = el?.closest<HTMLElement>('[data-cursor]')
      const interactive = el?.closest('a, button, summary, [role="button"], input, textarea, label')
      if (labelled?.dataset.cursor) {
        if (label.current) label.current.textContent = labelled.dataset.cursor
        r.dataset.state = 'label'
      } else if (interactive) {
        r.dataset.state = 'link'
      } else {
        delete r.dataset.state
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      x = e.clientX
      y = e.clientY
      if (!visible) {
        visible = true
        rx = x
        ry = y
        root.current?.setAttribute('data-on', '')
      }
      setState(e.target as Element)
    }
    const onDown = () => {
      const r = root.current
      if (r) r.dataset.state = 'down'
    }
    const onUp = (e: PointerEvent) => setState(e.target as Element)
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        visible = false
        root.current?.removeAttribute('data-on')
      }
    }

    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseout', onOut)
    return () => {
      cancelAnimationFrame(raf)
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseout', onOut)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div ref={ring} className="cursor__ring">
        <span ref={label} className="cursor__label" />
      </div>
      <div ref={dot} className="cursor__dot" />
    </div>
  )
}
