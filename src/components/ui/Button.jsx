export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      className={`btn btn--${variant} ${className}`}
      {...props}
    >
      <span className="btn__text">{children}</span>
      <span className="btn__glow" aria-hidden="true" />
    </Tag>
  )
}
