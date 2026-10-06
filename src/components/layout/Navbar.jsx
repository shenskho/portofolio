import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../../hooks/useLocale'

export default function Navbar() {
  const { content, toggleLanguage } = useLocale()
  const { navLinks, site, ui } = content
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [navLinks])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)
  const handleLanguageChange = () => {
    setMenuOpen(false)
    toggleLanguage()
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label={ui.primaryNavigation}>
        <a href="#home" className="navbar__logo" onClick={handleNavClick} dir="ltr">
          <span className="navbar__logo-bracket">&lt;</span>
          {site.logoName}
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <ul
          id="primary-navigation"
          className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={handleNavClick}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar__mobile-resume">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
            >
              {ui.resume}
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <a
            href={site.resumeUrl}
            className="navbar__resume btn btn--outline btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ui.resume}
          </a>

          <button
            type="button"
            className="navbar__language"
            onClick={handleLanguageChange}
            aria-label={ui.switchLanguage}
            title={ui.switchLanguage}
          >
            <span aria-hidden="true">◎</span>
            <bdi>{ui.languageShort}</bdi>
          </button>

          <button
            ref={toggleRef}
            type="button"
            className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  )
}
