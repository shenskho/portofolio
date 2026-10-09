'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from '@/components/ui/Logo'
import { vars } from '@/lib/css'
import { CloseIcon, MenuIcon, PlayIcon } from '@/components/ui/Icons'
import { FX_EVENTS } from '@/components/fx/Effects'
import MotionToggle from './MotionToggle'
import styles from './Nav.module.css'

interface Props {
  homeHref: string
  altHref: string
  isHome: boolean
  links: { label: string; href: string }[]
  ui: {
    primaryNavigation: string
    resume: string
    openMenu: string
    closeMenu: string
    switchLanguage: string
    switchLanguageLabel: string
    languageShort: string
    play: string
    home: string
    pauseMotion: string
  }
  resumeUrl: string
}

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function Nav({ homeHref, altHref, isHome, links, ui, resumeUrl }: Props) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const burgerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const wasOpen = useRef(false)

  const hrefFor = useCallback((hash: string) => (isHome ? hash : `${homeHref}${hash}`), [homeHref, isHome])
  const langCode = ui.languageShort === 'EN' ? 'en' : 'fa'

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 240)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const ids = links.map((l) => l.href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [isHome, links])

  // The menu is a modal: lock scroll, make the page inert, contain Tab, close on Escape / when the layout becomes desktop.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const background = [document.getElementById('main-content'), document.querySelector('footer')]
    root.style.overflow = 'hidden'
    background.forEach((el) => el?.setAttribute('inert', ''))
    sheetRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const nodes = [
        ...Array.from(headerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
        ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((el) => el.getClientRects().length > 0)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1040px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
      root.style.overflow = ''
      background.forEach((el) => el?.removeAttribute('inert'))
    }
  }, [open])

  // Give focus back to the burger when the menu closes (but not on first render).
  useEffect(() => {
    if (wasOpen.current && !open) burgerRef.current?.focus({ preventScroll: true })
    wasOpen.current = open
  }, [open])

  const startGame = () => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent(FX_EVENTS.game))
  }

  return (
    <>
      <header
        ref={headerRef}
        className={styles.header}
        data-hidden={hidden && !open ? '' : undefined}
        data-scrolled={scrolled ? '' : undefined}
      >
        <div className={`${styles.bar} wrap`}>
          <Link href={homeHref} className={styles.brand} aria-label={`AmirHossein — ${ui.home}`} data-magnetic>
            <Logo />
            <span className={`${styles.brandName} latin`}>AmirHossein</span>
          </Link>

          <nav className={styles.nav} aria-label={ui.primaryNavigation}>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={hrefFor(l.href)} className={styles.link} data-active={active === l.href.slice(1) ? '' : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.tools}>
            <MotionToggle label={ui.pauseMotion} />
            <button type="button" className={styles.play} onClick={startGame} aria-haspopup="dialog" data-magnetic>
              <PlayIcon width={14} height={14} />
              <span>{ui.play}</span>
            </button>
            <a href={altHref} className={styles.lang} hrefLang={langCode} lang={langCode} aria-label={`${ui.switchLanguage} — ${ui.switchLanguageLabel}`}>
              {ui.switchLanguage}
            </a>
            <a href={resumeUrl} className={styles.resume} target="_blank" rel="noopener" data-magnetic>
              {ui.resume}
            </a>
            <button
              ref={burgerRef}
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header> on purpose: a fixed element inside a header that has backdrop-filter is sized to the header, not the screen. */}
      <div ref={sheetRef} id="mobile-menu" className={styles.sheet} data-open={open ? '' : undefined} aria-hidden={!open}>
        <div className={styles.sheetInner}>
          <ul>
            {links.map((l, i) => (
              <li key={l.href} style={vars({ '--i': i })}>
                <a href={hrefFor(l.href)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <span className={`${styles.sheetIdx} latin`}>{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.sheetFoot}>
            <MotionToggle label={ui.pauseMotion} className={styles.motionSheet} />
            <button type="button" className={styles.playSheet} onClick={startGame} tabIndex={open ? 0 : -1} aria-haspopup="dialog">
              <PlayIcon width={14} height={14} />
              <span>{ui.play}</span>
            </button>
            <a href={altHref} className={styles.langSheet} hrefLang={langCode} lang={langCode} tabIndex={open ? 0 : -1}>
              {ui.switchLanguage}
            </a>
            <a href={resumeUrl} className={styles.resumeSheet} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
              {ui.resume}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
