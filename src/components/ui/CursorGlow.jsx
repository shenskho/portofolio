import { useMousePosition } from '../../hooks/useMousePosition'

export default function CursorGlow() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="cursor-glow"
      style={{ '--mouse-x': `${x}px`, '--mouse-y': `${y}px` }}
      aria-hidden="true"
    />
  )
}
