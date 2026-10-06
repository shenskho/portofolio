import type { NextConfig } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

/**
 * Static export: `npm run build` writes a plain HTML/CSS/JS site into `out/`,
 * which can be uploaded to any host (cPanel, Nginx, Netlify, Cloudflare Pages, Vercel…).
 *
 * NEXT_PUBLIC_SITE_URL is required for production builds because canonical URLs,
 * hreflang, sitemap, Open Graph and JSON-LD must all contain the real domain.
 * A wrong domain here is worse than a failed build, so we fail loudly.
 */
export default function config(phase: string): NextConfig {
  const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : ''
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || '').replace(/\/+$/, '')

  if (phase === PHASE_PRODUCTION_BUILD && !siteUrl) {
    throw new Error(
      [
        '',
        '  NEXT_PUBLIC_SITE_URL is not set.',
        '  Canonical URLs, sitemap, hreflang and structured data need your real domain.',
        '',
        '  Create .env.local (or set it in your host) with, for example:',
        '    NEXT_PUBLIC_SITE_URL=https://your-domain.com',
        '',
      ].join('\n'),
    )
  }

  return {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    poweredByHeader: false,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_SITE_URL: siteUrl || 'http://localhost:3000' },
    experimental: { globalNotFound: true },
    agentRules: false,
  }
}
