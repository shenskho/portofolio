'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { vars } from '@/lib/css'
import { DownloadIcon, CloseIcon } from '@/components/ui/Icons'
import styles from './Portrait.module.css'

interface Labels {
  alt: string
  dropTitle: string
  dropHint: string
  dropDragging: string
  dropError: string
  previewNote: string
  download: string
  reset: string
  scanLabel: string
  orbit: string[]
  backWord: string
}

const STORAGE_KEY = 'portrait-preview-v1'
const MAX_HEIGHT = 1600

/**
 * The "background-free photo" showcase.
 *
 * - If public/images/portrait.(webp|png|avif) exists at build time, `src` is set and the
 *   photo is shown as a layered, interactive hologram.
 * - Otherwise a drop zone is shown. Dropping / pasting / picking a transparent image gives
 *   a live preview (stored only in this browser) plus a one-click optimised download.
 */
export default function Portrait({ src, labels, caption }: { src: string | null; labels: Labels; caption: string }) {
  const stageRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const image = src ?? preview

  // Restore a previously dropped preview (client-only).
  useEffect(() => {
    if (src) return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists on the client
      if (stored) setPreview(stored)
    } catch {
      /* storage unavailable: preview just won't persist */
    }
  }, [src])

  const processFile = useCallback((file: File | null | undefined) => {
    if (!file || !file.type.startsWith('image/')) {
      setError(true)
      return
    }
    setError(false)
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, MAX_HEIGHT / img.naturalHeight)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.naturalWidth * scale)
      canvas.height = Math.round(img.naturalHeight * scale)
      canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height)
      // WebP keeps the alpha channel and is far smaller than the original PNG.
      const dataUrl = canvas.toDataURL('image/webp', 0.92)
      setPreview(dataUrl)
      try {
        window.localStorage.setItem(STORAGE_KEY, dataUrl)
      } catch {
        /* too large for storage: preview lasts until reload */
      }
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      setError(true)
      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [])

  // Paste an image straight from the clipboard.
  useEffect(() => {
    if (src) return
    const onPaste = (e: ClipboardEvent) => {
      const file = Array.from(e.clipboardData?.files ?? []).find((f) => f.type.startsWith('image/'))
      if (file) processFile(file)
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [src, processFile])

  // Pointer-driven spotlight + tilt, with an idle autopilot.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      stage.setAttribute('data-reduce', '')
      return
    }

    const s = { px: 50, py: 44, tx: 50, ty: 44, rx: 0, ry: 0, trx: 0, tryy: 0 }
    let lastPointer = 0
    let raf = 0
    let visible = false

    const loop = (now: number) => {
      if (now - lastPointer > 2200) {
        s.tx = 50 + 27 * Math.sin(now * 0.0007)
        s.ty = 42 + 26 * Math.sin(now * 0.0005 + 1)
        s.trx = Math.sin(now * 0.0004) * 3
        s.tryy = Math.cos(now * 0.0003) * 5
      }
      s.px += (s.tx - s.px) * 0.1
      s.py += (s.ty - s.py) * 0.1
      s.rx += (s.trx - s.rx) * 0.08
      s.ry += (s.tryy - s.ry) * 0.08
      stage.style.setProperty('--px', `${s.px.toFixed(2)}%`)
      stage.style.setProperty('--py', `${s.py.toFixed(2)}%`)
      stage.style.setProperty('--rx', `${s.rx.toFixed(2)}deg`)
      stage.style.setProperty('--ry', `${s.ry.toFixed(2)}deg`)
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(loop)
    })
    io.observe(stage)

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      const fx = (e.clientX - r.left) / r.width
      const fy = (e.clientY - r.top) / r.height
      s.tx = fx * 100
      s.ty = fy * 100
      s.trx = (fy - 0.5) * -12
      s.tryy = (fx - 0.5) * 14
      lastPointer = performance.now()
    }
    const onLeave = () => (lastPointer = 0)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [image])

  const fireGlitch = () => {
    setGlitch(true)
    window.setTimeout(() => setGlitch(false), 560)
  }

  const reset = () => {
    setPreview(null)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* nothing to clear */
    }
  }

  const orbit = labels.orbit.slice(0, 4)

  return (
    <figure
      ref={stageRef}
      className={styles.stage}
      data-reveal
      data-has-image={image ? '' : undefined}
      data-glitch={glitch ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
      style={image ? vars({ '--img': `url("${image}")` }) : undefined}
    >
      <div className={`${styles.back} latin`} aria-hidden="true">
        {labels.backWord}
      </div>

      <div className={styles.rings} aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="96" className={styles.ringA} />
          <circle cx="100" cy="100" r="78" className={styles.ringB} />
        </svg>
      </div>

      <div
        className={styles.frame}
        onClick={image ? fireGlitch : undefined}
        data-cursor={image ? 'GLITCH' : undefined}
      >
        {image ? (
          <>
            <div className={styles.aura} aria-hidden="true" />
            {/* Decorative layers reuse the same file through CSS; the <img> is the one real, indexable image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.base} src={image} alt={labels.alt} decoding="async" fetchPriority="low" draggable={false} />
            <div className={styles.lit} aria-hidden="true" />
            <div className={`${styles.ghost} ${styles.ghostA}`} aria-hidden="true" />
            <div className={`${styles.ghost} ${styles.ghostB}`} aria-hidden="true" />
            <div className={styles.scan} aria-hidden="true" />
          </>
        ) : (
          <div
            className={styles.drop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              processFile(e.dataTransfer.files?.[0])
            }}
          >
            <svg className={styles.silhouette} viewBox="0 0 400 500" aria-hidden="true" focusable="false">
              <ellipse cx="200" cy="165" rx="72" ry="88" />
              <path d="M36 500C36 388 108 338 200 328c92 10 164 60 164 172" />
            </svg>
            <div className={styles.dropScan} aria-hidden="true" />
            <button
              type="button"
              className={styles.dropBtn}
              onClick={() => inputRef.current?.click()}
              aria-describedby="portrait-hint"
              data-cursor="UPLOAD"
            >
              <strong>{dragging ? labels.dropDragging : labels.dropTitle}</strong>
              <span id="portrait-hint">{error ? labels.dropError : labels.dropHint}</span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/webp,image/avif,image/*"
              hidden
              onChange={(e) => {
                processFile(e.target.files?.[0])
                e.target.value = ''
              }}
            />
          </div>
        )}
        <i className={`${styles.corner} ${styles.c1}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.c2}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.c3}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.c4}`} aria-hidden="true" />
        <span className={`${styles.tag} ${styles.tagTop} mono latin`} aria-hidden="true">
          SUBJ // AG-01
        </span>
        <span className={`${styles.tag} ${styles.tagBottom} mono latin`} aria-hidden="true">
          {labels.scanLabel} {image ? '100%' : '000%'}
        </span>
      </div>

      <ul className={styles.orbit} aria-hidden="true">
        {orbit.map((chip, i) => (
          <li key={chip} className={`${styles.chip} latin`} style={vars({ '--a0': `${(360 / orbit.length) * i}deg`, '--sp': `${16 + i * 3}s` })}>
            {chip}
          </li>
        ))}
      </ul>

      <figcaption className={`${styles.caption} mono`}>{caption}</figcaption>

      {!src && preview ? (
        <div className={styles.tools}>
          <p>{labels.previewNote}</p>
          <div>
            <a className={styles.toolBtn} href={preview} download="portrait.webp">
              <DownloadIcon width={16} height={16} />
              {labels.download}
            </a>
            <button type="button" className={styles.toolBtn} onClick={reset}>
              <CloseIcon width={16} height={16} />
              {labels.reset}
            </button>
          </div>
        </div>
      ) : null}
    </figure>
  )
}
