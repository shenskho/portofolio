'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isCalm } from '@/lib/motion'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export const FX_EVENTS = {
  warp: 'fx:warp',
  toast: 'fx:toast',
  game: 'fx:game',
} as const

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(FX_EVENTS.toast, { detail: message }))
}

function countUp(el: HTMLElement, delay = 0) {
  const to = parseFloat(el.dataset.count ?? '')
  if (Number.isNaN(to)) return
  const decimals = Number(el.dataset.decimals ?? 0)
  const suffix = el.dataset.suffix ?? ''
  const nf = new Intl.NumberFormat(el.dataset.numLocale === 'fa' ? 'fa-IR' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
  })
  // The server HTML carries the final number (good for crawlers); start from 0 only once we are going to animate.
  el.textContent = nf.format(0) + suffix
  const dur = 1500
  window.setTimeout(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const t = clamp((now - start) / dur, 0, 1)
      const eased = 1 - Math.pow(2, -10 * t)
      el.textContent = nf.format(to * eased) + suffix
      if (t < 1) requestAnimationFrame(tick)
      else el.textContent = nf.format(to) + suffix
    }
    requestAnimationFrame(tick)
  }, delay)
}

/**
 * One global client component that powers most of the page's feel without
 * making every section a client component. Elements opt in with data-attributes:
 *   data-reveal   fade/slide in when scrolled into view
 *   data-count    count-up number
 *   data-scroll-p writes --p (0..1) as the element travels through the viewport
 *   data-spot     cursor-following spotlight (--sx/--sy)
 *   data-tilt     3D tilt toward the pointer
 *   data-magnetic pulled slightly toward the pointer
 *   data-marquee  skews with scroll velocity
 */
export default function Effects() {
  const pathname = usePathname()

  // Tell the stylesheet that scripts really run (it keeps a no-JS/failed-JS fail-safe for the reveal animation).
  useEffect(() => {
    document.documentElement.classList.add('fx')
  }, [])

  // Re-scan the DOM whenever the route changes.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in]), [data-count]:not([data-counted])')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.setAttribute('data-in', '')
          if (el.dataset.count !== undefined && !el.dataset.counted) {
            el.dataset.counted = '1'
            if (!isCalm()) countUp(el, Number(el.dataset.countDelay) || 0)
          }
          io.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  // Scroll-linked values: progress bar, --p on [data-scroll-p], marquee skew.
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('[data-scroll-bar]')
    let scrollEls: HTMLElement[] = []
    let marquees: HTMLElement[] = []
    let lastY = window.scrollY
    let skew = 0
    let raf = 0
    let ticking = false

    const collect = () => {
      scrollEls = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-p]'))
      marquees = Array.from(document.querySelectorAll<HTMLElement>('[data-marquee]'))
    }
    collect()

    const update = () => {
      ticking = false
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`

      const vh = window.innerHeight
      for (const el of scrollEls) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const p = clamp((vh * 0.72 - r.top) / (r.height + vh * 0.2), 0, 1)
        el.style.setProperty('--p', p.toFixed(4))
      }

      if (!isCalm()) {
        const v = y - lastY
        lastY = y
        skew += (clamp(v * -0.18, -9, 9) - skew) * 0.25
        for (const m of marquees) m.style.setProperty('--skew', `${skew.toFixed(2)}deg`)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }
    // Decay skew back to 0 shortly after scrolling stops.
    const settle = window.setInterval(() => {
      if (Math.abs(skew) > 0.05 && !ticking) {
        skew *= 0.7
        for (const m of marquees) m.style.setProperty('--skew', `${skew.toFixed(2)}deg`)
      }
    }, 90)

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Late-mounted nodes (route change) are picked up on the next pathname effect pass.
    const mo = new MutationObserver(() => {
      collect()
      onScroll()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      window.clearInterval(settle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mo.disconnect()
    }
  }, [])

  // Pointer-driven: spotlight, tilt, magnetic.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    let raf = 0
    let lastEvent: PointerEvent | null = null

    const apply = () => {
      raf = 0
      const e = lastEvent
      if (!e) return
      const target = e.target as Element | null
      if (!target || !('closest' in target)) return

      const spot = target.closest<HTMLElement>('[data-spot]')
      if (spot) {
        const r = spot.getBoundingClientRect()
        spot.style.setProperty('--sx', `${e.clientX - r.left}px`)
        spot.style.setProperty('--sy', `${e.clientY - r.top}px`)
      }

      if (isCalm()) return

      const tilt = target.closest<HTMLElement>('[data-tilt]')
      if (tilt) {
        const r = tilt.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        const max = Number(tilt.dataset.tilt) || 8
        tilt.setAttribute('data-tilting', '')
        tilt.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
        tilt.style.setProperty('--ry', `${(px * max * 1.2).toFixed(2)}deg`)
        tilt.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
        tilt.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
      }

      const mag = target.closest<HTMLElement>('[data-magnetic]')
      if (mag) {
        const r = mag.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        mag.style.setProperty('--mx', `${(dx * 0.28).toFixed(1)}px`)
        mag.style.setProperty('--my', `${(dy * 0.38).toFixed(1)}px`)
      }
    }

    const onMove = (e: PointerEvent) => {
      lastEvent = e
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onLeave = (e: PointerEvent) => {
      const el = e.target
      if (!(el instanceof HTMLElement)) return
      if (el.matches('[data-tilt]')) {
        el.removeAttribute('data-tilting')
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      }
      if (el.matches('[data-magnetic]')) {
        el.style.setProperty('--mx', '0px')
        el.style.setProperty('--my', '0px')
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave, true)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave, true)
    }
  }, [])

  // Easter egg: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      i = k === code[i] ? i + 1 : k === code[0] ? 1 : 0
      if (i === code.length) {
        i = 0
        window.dispatchEvent(new CustomEvent(FX_EVENTS.warp))
        toast('↑ ↑ ↓ ↓ ← → ← → B A — hyperdrive')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
