'use client'

import { useEffect, useRef, useState } from 'react'
import { FX_EVENTS } from './Effects'

/**
 * Small instrument readouts in the page corners (desktop only):
 * pointer coordinates, scroll depth and the current time in Tehran.
 * Values are written straight to the DOM so nothing re-renders per frame.
 */
export default function Hud() {
  const xy = useRef<HTMLSpanElement>(null)
  const sc = useRef<HTMLSpanElement>(null)
  const clock = useRef<HTMLSpanElement>(null)
  const [message, setMessage] = useState('')
  const [on, setOn] = useState(false)

  useEffect(() => {
    let raf = 0
    let px = 0
    let py = 0
    const pad = (n: number, l = 4) => String(Math.round(n)).padStart(l, '0')

    const paint = () => {
      raf = 0
      if (xy.current) xy.current.textContent = `${pad(px)} · ${pad(py)}`
      if (sc.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        sc.current.textContent = `${pad(max > 0 ? (window.scrollY / max) * 100 : 0, 3)}%`
      }
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      queue()
    }

    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tehran',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => {
      if (clock.current) clock.current.textContent = fmt.format(new Date())
    }
    tick()
    const clockTimer = window.setInterval(tick, 1000)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', queue, { passive: true })
    queue()
    return () => {
      cancelAnimationFrame(raf)
      window.clearInterval(clockTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', queue)
    }
  }, [])

  useEffect(() => {
    let timer = 0
    const onToast = (e: Event) => {
      setMessage(String((e as CustomEvent).detail ?? ''))
      setOn(true)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setOn(false), 3200)
    }
    window.addEventListener(FX_EVENTS.toast, onToast)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(FX_EVENTS.toast, onToast)
    }
  }, [])

  return (
    <>
      <div className="hud hud--start mono" aria-hidden="true">
        XY <b ref={xy}>0000 · 0000</b>
        <br />
        SCR <b ref={sc}>000%</b>
      </div>
      <div className="hud hud--end mono" aria-hidden="true">
        THR <b ref={clock}>--:--:--</b>
        <br />
        UTC+3:30
      </div>
      <div className="toast" data-on={on ? '' : undefined} role="status" aria-live="polite">
        <div className="toast__inner">{message}</div>
      </div>
      <div className="progress" aria-hidden="true">
        <div className="progress__bar" data-scroll-bar />
      </div>
    </>
  )
}
