import { socialLinks } from '../../data/portfolio'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLocale } from '../../hooks/useLocale'
import Button from '../ui/Button'

export default function Hero() {
  const { content } = useLocale()
  const { hero, site, ui } = content
  const typedRole = useTypingEffect(hero.roles)
  const ref = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="home" className="hero section">
      <div ref={ref} className="hero__inner container scroll-reveal">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {site.availability}
          </div>

          <p className="hero__greeting">{hero.greeting}</p>

          <h1 className="hero__name">
            {site.name.split(' ').map((word, i) => (
              <span key={word} className="hero__name-word" style={{ '--word-index': i }}>
                {word}
              </span>
            ))}
          </h1>

          <p className="hero__role">
            <span className="hero__role-text">{typedRole}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </p>

          <p className="hero__description">{hero.description}</p>

          <div className="hero__actions">
            <Button href={hero.ctaPrimary.href} variant="primary">
              {hero.ctaPrimary.label}
            </Button>
            <Button href={hero.ctaSecondary.href} variant="outline">
              {hero.ctaSecondary.label}
            </Button>
          </div>

          <div className="hero__social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__avatar-ring">
            <div className="hero__avatar-ring hero__avatar-ring--2" />
            <div className="hero__avatar-ring hero__avatar-ring--3" />
            <div className="hero__avatar">
              <span>{site.avatarInitials}</span>
            </div>
          </div>

          <div className="hero__code-card" dir="ltr" lang="en">
            <div className="hero__code-header">
              <span /><span /><span />
              <code>developer.js</code>
            </div>
            <pre className="hero__code-body">
              <code>{`const dev = {
  name: "${site.codeName}",
  role: "${site.title}",
  skills: ["React", "Redux", "JS"],
  passion: Infinity,
  available: true
};`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="hero__stats container">
        {hero.stats.map((stat, i) => (
          <div key={stat.label} className="hero__stat" style={{ '--stat-index': i }}>
            <span className="hero__stat-value">{stat.value}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <a href="#about" className="hero__scroll-hint" aria-label={ui.scrollDown}>
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
      </a>
    </section>
  )
}
