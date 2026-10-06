'use client'

import { useEffect, useRef, useState } from 'react'
import { FX_EVENTS, toast } from '@/components/fx/Effects'
import type { Content } from '@/data'
import styles from './BugHunt.module.css'

const DURATION = 25
const BEST_KEY = 'bughunt-best-v1'
const WIN_SCORE = 12

const BUG_SVG = `<svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
  <g class="legs" stroke="#ecebe4" stroke-width="1.6" stroke-linecap="round" fill="none">
    <path d="M17 18 7 12M16 25H5M17 32 8 38"/><path d="M31 18 41 12M32 25h11M31 32l9 6"/>
  </g>
  <path d="M20 12 16 5M28 12l4-7" stroke="#ecebe4" stroke-width="1.4" stroke-linecap="round"/>
  <ellipse cx="24" cy="11" rx="5.5" ry="5" fill="#ecebe4"/>
  <ellipse cx="24" cy="29" rx="11" ry="14" fill="#ff5a2c"/>
  <path d="M24 16v26" stroke="#07070a" stroke-width="1.6"/>
  <circle cx="19" cy="26" r="2" fill="#07070a"/><circle cx="29" cy="31" r="2" fill="#07070a"/><circle cx="19" cy="35" r="1.6" fill="#07070a"/>
</svg>`

interface Bug {
  el: HTMLButtonElement
  x: number
  y: number
  a: number
  v: number
  turn: number
}

/** Opt-in mini-game: squash bugs that flee from your cursor. Winning unlocks the hero "hyperdrive". */
export default function BugHunt({ g }: { g: Content['game'] }) {
  const [phase, setPhase] = useState<'idle' | 'intro' | 'playing' | 'done'>('idle')
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(DURATION)
  const [best, setBest] = useState(0)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const open = () => setPhase((p) => (p === 'idle' ? 'intro' : p))
    window.addEventListener(FX_EVENTS.game, open)
    return () => window.removeEventListener(FX_EVENTS.game, open)
  }, [])

  useEffect(() => {
    if (phase === 'idle') return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPhase('idle')
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  useEffect(() => {
    document.documentElement.classList.toggle('playing', phase === 'playing')
    return () => document.documentElement.classList.remove('playing')
  }, [phase])

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists on the client
      setBest(Number(window.localStorage.getItem(BEST_KEY)) || 0)
    } catch {
      /* no persisted best score */
    }
  }, [])

  useEffect(() => {
    if (phase !== 'playing') return
    const layer = layerRef.current
    if (!layer) return

    const bugs: Bug[] = []
    const pointer = { x: -999, y: -999 }
    let points = 0
    let raf = 0
    let last = performance.now()
    const startedAt = last
    let spawnIn = 0.2
    let lastClock = DURATION
    let ended = false

    const spawn = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const edge = Math.floor(Math.random() * 4)
      const x = edge === 0 ? -30 : edge === 1 ? w + 30 : Math.random() * w
      const y = edge === 2 ? -30 : edge === 3 ? h + 30 : Math.random() * h
      const a = Math.atan2(h / 2 - y, w / 2 - x) + (Math.random() - 0.5) * 1.2
      const el = document.createElement('button')
      el.type = 'button'
      el.tabIndex = -1
      el.className = styles.bug
      el.innerHTML = BUG_SVG
      el.setAttribute('aria-label', 'bug')
      const bug: Bug = { el, x, y, a, v: 90, turn: 0 }
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        e.stopPropagation()
        squash(bug)
      })
      layer.appendChild(el)
      bugs.push(bug)
    }

    const squash = (bug: Bug) => {
      const i = bugs.indexOf(bug)
      if (i === -1) return
      bugs.splice(i, 1)
      const splat = document.createElement('span')
      splat.className = styles.splat
      splat.style.left = `${bug.x}px`
      splat.style.top = `${bug.y}px`
      layer.appendChild(splat)
      window.setTimeout(() => splat.remove(), 700)
      bug.el.remove()
      points += 1
      setScore(points)
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const end = () => {
      if (ended) return
      ended = true
      setPhase('done')
      setBest((prev) => {
        const next = Math.max(prev, points)
        try {
          window.localStorage.setItem(BEST_KEY, String(next))
        } catch {
          /* best score not persisted */
        }
        return next
      })
      if (points >= WIN_SCORE) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.dispatchEvent(new CustomEvent(FX_EVENTS.warp))
        toast(g.resultGood)
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const elapsed = (now - startedAt) / 1000
      const left = Math.max(0, DURATION - elapsed)
      const clock = Math.ceil(left)
      if (clock !== lastClock) {
        lastClock = clock
        setTime(clock)
      }
      if (left <= 0) {
        end()
        return
      }

      spawnIn -= dt
      const maxBugs = 6 + Math.floor(elapsed / 5)
      if (spawnIn <= 0 && bugs.length < maxBugs) {
        spawn()
        spawnIn = Math.max(0.35, 0.95 - elapsed * 0.02)
      }

      const w = window.innerWidth
      const h = window.innerHeight
      const speedBase = 110 + elapsed * 7
      for (const b of bugs) {
        const dx = b.x - pointer.x
        const dy = b.y - pointer.y
        const d = Math.hypot(dx, dy)
        let speed = speedBase
        if (d < 170) {
          // flee: steer toward the direction pointing away from the cursor
          const away = Math.atan2(dy, dx)
          let diff = away - b.a
          diff = Math.atan2(Math.sin(diff), Math.cos(diff))
          b.a += Math.sign(diff) * Math.min(Math.abs(diff), dt * 7)
          speed *= 1.7
        } else {
          b.turn += (Math.random() - 0.5) * dt * 9
          b.turn *= 0.97
          b.a += b.turn * dt
        }
        b.x += Math.cos(b.a) * speed * dt
        b.y += Math.sin(b.a) * speed * dt
        const m = 24
        if (b.x < m) { b.x = m; b.a = Math.PI - b.a }
        else if (b.x > w - m) { b.x = w - m; b.a = Math.PI - b.a }
        if (b.y < m) { b.y = m; b.a = -b.a }
        else if (b.y > h - m) { b.y = h - m; b.a = -b.a }
        b.el.style.transform = `translate3d(${b.x - 23}px, ${b.y - 23}px, 0) rotate(${b.a + Math.PI / 2}rad)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      layer.replaceChildren()
    }
  }, [phase, g.resultGood])

  const begin = () => {
    setScore(0)
    setTime(DURATION)
    setPhase('playing')
  }

  if (phase === 'idle') return null

  return (
    <div className={styles.root} role="dialog" aria-label={g.title}>
      <div ref={layerRef} className={styles.layer} aria-hidden="true" />

      {phase === 'playing' ? (
        <div className={`${styles.hud} mono`}>
          <span>{g.title}</span>
          <span>
            {g.score} <b>{score}</b>
          </span>
          <span>
            {g.time} <b>{time}</b>
          </span>
          <button type="button" onClick={() => setPhase('idle')} aria-label={g.close}>
            ✕
          </button>
        </div>
      ) : (
        <div className={styles.backdrop}>
          <div className={styles.panel}>
            <p className="mono">{g.title}</p>
            {phase === 'done' ? (
              <>
                <p className={styles.big}>{score}</p>
                <p className={styles.result}>{score >= WIN_SCORE ? g.resultGood : g.resultOk}</p>
                <p className="mono">
                  {g.best}: {Math.max(best, score)}
                </p>
              </>
            ) : (
              <p className={styles.result}>{g.hint}</p>
            )}
            <div className={styles.actions}>
              <button type="button" className="btn btn--solid" onClick={begin} autoFocus>
                {phase === 'done' ? g.again : g.start}
              </button>
              <button type="button" className="btn" onClick={() => setPhase('idle')}>
                {g.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
