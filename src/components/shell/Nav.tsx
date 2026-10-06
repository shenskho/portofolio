'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import Logo from '@/components/ui/Logo'
import { vars } from '@/lib/css'
import { CloseIcon, MenuIcon, PlayIcon } from '@/components/ui/Icons'
import { FX_EVENTS } from '@/components/fx/Effects'
import styles from './Nav.module.css'

interface Props {
  homeHref: string
  altHref: string
  isHome: boolean
  name: string
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
  }
  resumeUrl: string
}

export default function Nav({ homeHref, altHref, isHome, name, links, ui, resumeUrl }: Props) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  const hrefFor = useCallback((hash: string) => (isHome ? hash : `${homeHref}${hash}`), [homeHref, isHome])

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

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const startGame = () => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent(FX_EVENTS.game))
  }

  return (
    <header className={styles.header} data-hidden={hidden && !open ? '' : undefined} data-scrolled={scrolled ? '' : undefined}>
      <div className={`${styles.bar} wrap`}>
        <Link href={homeHref} className={styles.brand} aria-label={name} data-magnetic>
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
          <button type="button" className={styles.play} onClick={startGame} data-magnetic>
            <PlayIcon width={14} height={14} />
            <span>{ui.play}</span>
          </button>
          <a href={altHref} className={styles.lang} hrefLang={ui.languageShort === 'EN' ? 'en' : 'fa'} lang={ui.languageShort === 'EN' ? 'en' : 'fa'} aria-label={ui.switchLanguageLabel}>
            {ui.switchLanguage}
          </a>
          <a href={resumeUrl} className={styles.resume} target="_blank" rel="noopener" data-magnetic>
            {ui.resume}
          </a>
          <button
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

      <div id="mobile-menu" className={styles.sheet} data-open={open ? '' : undefined} aria-hidden={!open}>
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
          <button type="button" className={styles.play} onClick={startGame} tabIndex={open ? 0 : -1}>
            <PlayIcon width={14} height={14} />
            <span>{ui.play}</span>
          </button>
          <a href={altHref} className={styles.lang} tabIndex={open ? 0 : -1}>
            {ui.switchLanguage}
          </a>
          <a href={resumeUrl} className={styles.resume} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
            {ui.resume}
          </a>
        </div>
      </div>
    </header>
  )
}
