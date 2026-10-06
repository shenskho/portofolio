import { StarIcon } from './Icons'
import { vars } from '@/lib/css'

export default function Marquee({
  items,
  reverse = false,
  outline = false,
  duration = 52,
  label,
}: {
  items: string[]
  reverse?: boolean
  outline?: boolean
  duration?: number
  label?: string
}) {
  const group = (hidden: boolean) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className={`marquee__item${outline ? ' marquee__item--outline' : ''}`}>
          {item}
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
      role={label ? 'group' : 'presentation'}
      aria-label={label}
    >
      <div className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
