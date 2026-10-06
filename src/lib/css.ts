import type { CSSProperties } from 'react'

/** Typed helper for passing CSS custom properties through `style`. */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties
}
