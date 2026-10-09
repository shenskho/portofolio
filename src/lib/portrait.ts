import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

const candidates = ['portrait.webp', 'portrait.png', 'portrait.avif']

/**
 * Looks (at build time) for the owner's background-free photo in public/images.
 * Drop a transparent PNG/WebP named `portrait.png|webp|avif` there and the About
 * section switches from the upload slot to the real portrait automatically.
 */
export function findPortrait(): { src: string } | null {
  for (const file of candidates) {
    if (fs.existsSync(path.join(process.cwd(), 'public', 'images', file))) {
      return { src: `/images/${file}` }
    }
  }
  return null
}
