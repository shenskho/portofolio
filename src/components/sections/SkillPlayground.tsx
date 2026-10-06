'use client'

import { useEffect, useRef } from 'react'
import type { SkillKind } from '@/data/types'
import styles from './Skills.module.css'

interface Pill {
  name: string
  kind: SkillKind
}

interface Body {
  el: HTMLElement
  w: number
  h: number
  r: number
  x: number
  y: number
  vx: number
  vy: number
  offsets: number[]
  dragging: boolean
}

const GRAVITY = 2300
const RESTITUTION = 0.32
const FLOOR_FRICTION = 0.9

/**
 * Tech pills as little rigid bodies in a glass box. Each pill is a capsule built from
 * overlapping circles; they fall, stack, can be dragged and thrown, and the whole box can
 * be shaken. Without JS (or with reduced motion) the pills simply wrap as a normal tag list.
 */
export default function SkillPlayground({
  pills,
  legend,
  hint,
  shake,
}: {
  pills: Pill[]
  legend: Record<SkillKind, string>
  hint: string
  shake: string
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const shakeRef = useRef<() => void>(() => {})

  useEffect(() => {
    const box = boxRef.current
    const list = listRef.current
    if (!box || !list) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(list.querySelectorAll<HTMLElement>('li'))
    let bodies: Body[] = []
    let W = 0
    let H = 0
    let raf = 0
    let running = false
    let visible = false
    let started = false
    let last = 0
    let calmFor = 0
    let drag: { body: Body; id: number; ox: number; oy: number; px: number; py: number; t: number } | null = null

    const measure = () => {
      const r = box.getBoundingClientRect()
      W = r.width
      H = r.height
    }

    const build = () => {
      measure()
      bodies = items.map((el, i) => {
        const w = el.offsetWidth
        const h = el.offsetHeight
        const r = h / 2
        const span = Math.max(0, w - h)
        const n = Math.max(1, Math.ceil(span / (r * 1.1)) + 1)
        const offsets = n === 1 ? [0] : Array.from({ length: n }, (_, k) => -span / 2 + (span * k) / (n - 1))
        return {
          el,
          w,
          h,
          r,
          x: w / 2 + Math.random() * Math.max(1, W - w),
          y: -h - i * 64 - Math.random() * 40,
          vx: (Math.random() - 0.5) * 220,
          vy: 0,
          offsets,
          dragging: false,
        }
      })
      box.dataset.mode = 'physics'
    }

    const paint = () => {
      for (const b of bodies) {
        const tilt = Math.max(-10, Math.min(10, b.vx * 0.01))
        b.el.style.transform = `translate3d(${(b.x - b.w / 2).toFixed(1)}px, ${(b.y - b.h / 2).toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg)`
      }
    }

    const collide = (a: Body, b: Body) => {
      if (Math.abs(a.x - b.x) > (a.w + b.w) / 2 || Math.abs(a.y - b.y) > (a.h + b.h) / 2) return
      let best = 0
      let bnx = 0
      let bny = 0
      for (const oa of a.offsets) {
        for (const ob of b.offsets) {
          const dx = b.x + ob - (a.x + oa)
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy)
          const min = a.r + b.r
          if (dist < min) {
            const overlap = min - dist
            if (overlap > best) {
              best = overlap
              bnx = dist === 0 ? 0 : dx / dist
              bny = dist === 0 ? 1 : dy / dist
            }
          }
        }
      }
      if (best === 0) return
      const aFixed = a.dragging
      const bFixed = b.dragging
      const wa = aFixed ? 0 : bFixed ? 1 : 0.5
      const wb = bFixed ? 0 : aFixed ? 1 : 0.5
      a.x -= bnx * best * wa
      a.y -= bny * best * wa
      b.x += bnx * best * wb
      b.y += bny * best * wb
      const rvx = b.vx - a.vx
      const rvy = b.vy - a.vy
      const vn = rvx * bnx + rvy * bny
      if (vn < 0) {
        const j = -(1 + RESTITUTION) * vn
        if (!aFixed) {
          a.vx -= j * bnx * wa
          a.vy -= j * bny * wa
        }
        if (!bFixed) {
          b.vx += j * bnx * wb
          b.vy += j * bny * wb
        }
        // light tangential friction so piles settle instead of sliding forever
        const tx = -bny
        const ty = bnx
        const vt = rvx * tx + rvy * ty
        const f = vt * 0.04
        if (!aFixed) {
          a.vx += f * tx
          a.vy += f * ty
        }
        if (!bFixed) {
          b.vx -= f * tx
          b.vy -= f * ty
        }
      }
    }

    const step = (dt: number) => {
      let energy = 0
      for (const b of bodies) {
        if (b.dragging) continue
        b.vy += GRAVITY * dt
        b.vx *= 0.9985
        b.x += b.vx * dt
        b.y += b.vy * dt
        if (b.x < b.w / 2) {
          b.x = b.w / 2
          b.vx = Math.abs(b.vx) * RESTITUTION
        } else if (b.x > W - b.w / 2) {
          b.x = W - b.w / 2
          b.vx = -Math.abs(b.vx) * RESTITUTION
        }
        if (b.y > H - b.h / 2) {
          b.y = H - b.h / 2
          b.vy = Math.abs(b.vy) < 90 ? 0 : -b.vy * RESTITUTION
          b.vx *= FLOOR_FRICTION
        }
      }
      for (let it = 0; it < 4; it++) {
        for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) collide(bodies[i], bodies[j])
        // keep resolved bodies inside the box
        for (const b of bodies) {
          b.x = Math.min(W - b.w / 2, Math.max(b.w / 2, b.x))
          if (b.y > H - b.h / 2) b.y = H - b.h / 2
        }
      }
      for (const b of bodies) energy += b.vx * b.vx + b.vy * b.vy
      return energy
    }

    const loop = (now: number) => {
      if (!running) return
      const frame = Math.min(0.034, (now - last) / 1000 || 0.016)
      last = now
      let energy = 0
      const sub = 2
      for (let s = 0; s < sub; s++) energy = step(frame / sub)
      paint()
      const onScreenSettled = energy / Math.max(1, bodies.length) < 260 && !drag
      calmFor = onScreenSettled ? calmFor + frame : 0
      if (calmFor > 1.4) {
        running = false
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      calmFor = 0
      if (running || !visible) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    shakeRef.current = () => {
      if (!started) return
      for (const b of bodies) {
        b.vy = -(700 + Math.random() * 1100)
        b.vx = (Math.random() - 0.5) * 1300
      }
      wake()
    }

    const onDown = (e: PointerEvent) => {
      const li = (e.target as Element).closest('li')
      const body = bodies.find((b) => b.el === li)
      if (!body || !started) return
      if (e.pointerType === 'touch') {
        // Touch keeps page scrolling intact: a tap pokes the pill instead of dragging it.
        body.vy = -900
        body.vx += (Math.random() - 0.5) * 500
        wake()
        return
      }
      const r = box.getBoundingClientRect()
      drag = { body, id: e.pointerId, ox: e.clientX - r.left - body.x, oy: e.clientY - r.top - body.y, px: body.x, py: body.y, t: performance.now() }
      body.dragging = true
      body.el.setPointerCapture(e.pointerId)
      body.el.dataset.drag = ''
      wake()
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const r = box.getBoundingClientRect()
      const b = drag.body
      const nx = Math.min(W - b.w / 2, Math.max(b.w / 2, e.clientX - r.left - drag.ox))
      const ny = Math.min(H - b.h / 2, Math.max(b.h / 2 - 120, e.clientY - r.top - drag.oy))
      const now = performance.now()
      const dt = Math.max(8, now - drag.t) / 1000
      b.vx = Math.max(-3200, Math.min(3200, ((nx - drag.px) / dt) * 0.6 + b.vx * 0.4))
      b.vy = Math.max(-3200, Math.min(3200, ((ny - drag.py) / dt) * 0.6 + b.vy * 0.4))
      drag.px = b.x = nx
      drag.py = b.y = ny
      drag.t = now
      wake()
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      drag.body.dragging = false
      delete drag.body.el.dataset.drag
      drag = null
      wake()
    }

    const start = () => {
      if (started) return
      started = true
      build()
      paint()
      wake()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          if (!started) start()
          else wake()
        } else {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(box)

    let lastW = box.getBoundingClientRect().width
    const ro = new ResizeObserver(() => {
      const w = box.getBoundingClientRect().width
      if (Math.abs(w - lastW) < 2) return
      lastW = w
      if (!started) return
      measure()
      for (const b of bodies) b.x = Math.min(W - b.w / 2, Math.max(b.w / 2, b.x))
      wake()
    })
    ro.observe(box)

    list.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      list.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      box.dataset.mode = 'static'
      for (const b of bodies) b.el.style.transform = ''
    }
  }, [])

  return (
    <div>
      <div ref={boxRef} className={styles.box} data-mode="static" data-spot>
        <ul ref={listRef} className={styles.pills}>
          {pills.map((p) => (
            <li key={p.name} className={styles.pill} data-kind={p.kind} data-cursor="DRAG">
              <span className={styles.pillDot} aria-hidden="true" />
              {p.name}
            </li>
          ))}
        </ul>
        <p className={`${styles.boxHint} mono`} aria-hidden="true">
          {hint}
        </p>
        <button type="button" className={styles.shake} onClick={() => shakeRef.current()}>
          {shake}
        </button>
      </div>
      <ul className={styles.legend} aria-label="legend">
        {(Object.keys(legend) as SkillKind[]).map((k) => (
          <li key={k} data-kind={k}>
            <span className={styles.pillDot} aria-hidden="true" />
            {legend[k]}
          </li>
        ))}
      </ul>
    </div>
  )
}
