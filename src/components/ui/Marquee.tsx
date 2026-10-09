import { StarIcon } from './Icons'
import { vars } from '@/lib/css'

export default function Marquee({
  items,
  reverse = false,
  outline = false,
  duration = 52,
  label,
  decorative = false,
}: {
  items: string[]
  reverse?: boolean
  outline?: boolean
  duration?: number
  label?: string
  /** Purely visual repeat of other content: hidden from assistive technology. */
  decorative?: boolean
}) {
  const group = (hidden: boolean) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className={`marquee__item${outline ? ' marquee__item--outline' : ''}`}
          // Decorative repeats are drawn from a data attribute (CSS ::before) so they are not real text:
          // nothing for assistive tech, search engines or contrast checkers to read.
          data-text={decorative ? item : undefined}
        >
          {decorative ? null : item}
          <StarIcon className="marquee__star" />
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className="marquee"
      data-marquee
      data-reverse={reverse ? '' : undefined}
      style={vars({ '--dur': `${duration}s` })}
      role={decorative ? undefined : label ? 'group' : 'presentation'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      <div className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
