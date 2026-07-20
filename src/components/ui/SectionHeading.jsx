import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SectionHeading({ subtitle, title, align = 'left' }) {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className={`section-heading section-heading--${align} scroll-reveal`}>
      <span className="section-heading__subtitle">{subtitle}</span>
      <h2 className="section-heading__title">{title}</h2>
      <div className="section-heading__line" />
    </div>
  )
}
