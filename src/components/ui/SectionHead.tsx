export default function SectionHead({
  index,
  kicker,
  title,
  id,
  compact = false,
  children,
}: {
  index: string
  kicker: string
  title: string
  id: string
  compact?: boolean
  children?: React.ReactNode
}) {
  return (
    <header data-reveal>
      <p className="kicker mono">
        <span className="kicker__idx latin">{index}</span>
        <span className="kicker__rule" aria-hidden="true" />
        <span>{kicker}</span>
      </p>
      <h2 id={id} className={compact ? 'h2 h2--sm' : 'h2'}>
        {title}
      </h2>
      {children}
    </header>
  )
}
