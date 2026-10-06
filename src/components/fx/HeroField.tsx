'use client'

import { useEffect, useRef } from 'react'
import { FX_EVENTS } from './Effects'

/**
 * "Iron filings" field: a grid of short strokes that
 *  - drift with a slow flow when idle,
 *  - rotate toward (and stretch near) the pointer,
 *  - swirl while the pointer is held down,
 *  - emit a ring when clicked,
 *  - and snap into a radial warp on the Konami code / after winning the bug hunt.
 * Strokes are batched into three paths so ~2000 cells stay cheap to draw.
 */
export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || coarse
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--lime').trim() || '#c8ff3d'

    let w = 0
    let h = 0
    let dpr = 1
    let cell = lowPower ? 40 : 30
    let cols = 0
    let rows = 0
    let angles = new Float32Array(0)

    const pointer = { x: -9999, y: -9999, active: false, down: false }
    const ripples: { x: number; y: number; t: number }[] = []
    let warpUntil = 0
    let running = false
    let visible = true
    let raf = 0
    let last = 0

    const resize = () => {
      const r = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2)
      w = Math.max(1, Math.floor(r.width))
      h = Math.max(1, Math.floor(r.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = w < 700 ? 30 : lowPower ? 40 : 30
      cols = Math.ceil(w / cell) + 1
      rows = Math.ceil(h / cell) + 1
      angles = new Float32Array(cols * rows)
      for (let i = 0; i < angles.length; i++) angles[i] = flow(i % cols, Math.floor(i / cols), 0)
      if (!running) draw(performance.now(), 0)
    }

    const flow = (cx: number, cy: number, t: number) =>
      Math.sin(cx * 0.21 + t * 0.00035) * 1.4 + Math.cos(cy * 0.27 - t * 0.0003) * 1.4 + Math.sin((cx + cy) * 0.11 + t * 0.0002)

    const angleDelta = (from: number, to: number) => {
      let d = (to - from) % (Math.PI * 2)
      if (d > Math.PI) d -= Math.PI * 2
      if (d < -Math.PI) d += Math.PI * 2
      return d
    }

    function draw(now: number, dt: number) {
      ctx!.clearRect(0, 0, w, h)
      const warp = now < warpUntil
      const warpK = warp ? Math.min(1, (warpUntil - now) / 600, (now - (warpUntil - 4200)) / 500) : 0
      const R = 250
      const R2 = R * R
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t > 1400) ripples.splice(i, 1)

      const dim = new Path2D()
      const mid = new Path2D()
      const hot = new Path2D()

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i
          const cx = i * cell
          const cy = j * cell
          let target = flow(i, j, now)
          let len = 8
          let heat = 0

          if (pointer.active) {
            const dx = pointer.x - cx
            const dy = pointer.y - cy
            const d2 = dx * dx + dy * dy
            if (d2 < R2) {
              const k = 1 - Math.sqrt(d2) / R
              const toward = Math.atan2(dy, dx)
              const swirl = pointer.down ? Math.PI / 2 + k * 1.2 : 0
              const mix = k * k * (3 - 2 * k)
              target = target + angleDelta(target, toward + swirl) * Math.min(1, mix * 1.3)
              len += k * 15
              heat = Math.max(heat, k)
            }
          }

          for (const rp of ripples) {
            const age = (now - rp.t) / 1000
            const rad = age * 520
            const dx = cx - rp.x
            const dy = cy - rp.y
            const d = Math.sqrt(dx * dx + dy * dy)
            const band = Math.abs(d - rad)
            if (band < 70) {
              const k = (1 - band / 70) * Math.max(0, 1 - age / 1.4)
              target += angleDelta(target, Math.atan2(dy, dx) + Math.PI / 2) * k
              len += k * 14
              heat = Math.max(heat, k)
            }
          }

          if (warpK > 0) {
            const dx = cx - w / 2
            const dy = cy - h / 2
            const d = Math.sqrt(dx * dx + dy * dy)
            target += angleDelta(target, Math.atan2(dy, dx)) * warpK
            len += warpK * Math.min(60, d * 0.12 + 6)
            heat = Math.max(heat, warpK * 0.9)
          }

          angles[idx] += angleDelta(angles[idx], target) * (dt > 0 ? Math.min(1, dt * 0.012) : 1)
          const a = angles[idx]
          const ox = (Math.cos(a) * len) / 2
          const oy = (Math.sin(a) * len) / 2
          const path = heat > 0.55 ? hot : heat > 0.12 ? mid : dim
          path.moveTo(cx - ox, cy - oy)
          path.lineTo(cx + ox, cy + oy)
        }
      }

      ctx!.lineCap = 'round'
      ctx!.lineWidth = 1.2
      ctx!.strokeStyle = 'rgba(236,235,228,0.24)'
      ctx!.stroke(dim)
      ctx!.strokeStyle = 'rgba(200,255,61,0.7)'
      ctx!.stroke(mid)
      ctx!.lineWidth = 1.8
      ctx!.strokeStyle = accent
      ctx!.stroke(hot)
    }

    const loop = (now: number) => {
      if (!running) return
      const dt = last ? Math.min(50, now - last) : 16
      last = now
      draw(now, dt)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce || !visible || document.hidden) return
      running = true
      last = 0
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const toLocal = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = pointer.x >= -40 && pointer.y >= -40 && pointer.x <= r.width + 40 && pointer.y <= r.height + 40
    }
    const onMove = (e: PointerEvent) => {
      toLocal(e)
      if (!running && pointer.active) start()
    }
    const onDown = (e: PointerEvent) => {
      toLocal(e)
      if (!pointer.active) return
      const t = e.target as Element
      if (t.closest('a, button, input, textarea, summary, [data-cursor]')) return
      pointer.down = true
      ripples.push({ x: pointer.x, y: pointer.y, t: performance.now() })
    }
    const onUp = () => (pointer.down = false)
    const onLeave = () => {
      pointer.active = false
      pointer.down = false
    }
    const onWarp = () => {
      warpUntil = performance.now() + 4200
      start()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(host)
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    start()

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener(FX_EVENTS.warp, onWarp)
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener(FX_EVENTS.warp, onWarp)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}
