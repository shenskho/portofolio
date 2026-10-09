import type { NextConfig } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

/** Placeholder hosts that must never reach a production build (canonicals would point at the wrong site). */
const PLACEHOLDER_HOST = /(^|\.)(your-domain\.com|example\.(com|org|net)|[^.]+\.test|localhost)$/i

function describeSiteUrlProblem(value: string): string | null {
  if (!value) return 'is not set.'
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return `("${value}") is not a valid URL; include the scheme, e.g. https://your-domain.ir`
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return `("${value}") must start with https://`
  if (url.pathname !== '/' || url.search || url.hash) return `("${value}") must be just the domain, without a path`
  // CI and local smoke tests can opt in to placeholder domains explicitly.
  if (PLACEHOLDER_HOST.test(url.hostname) && process.env.ALLOW_PLACEHOLDER_SITE_URL !== '1') {
    return `("${value}") is a placeholder domain. Use your real domain (or set ALLOW_PLACEHOLDER_SITE_URL=1 for a throwaway test build).`
  }
  return null
}

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

  if (phase === PHASE_PRODUCTION_BUILD) {
    const problem = describeSiteUrlProblem(siteUrl)
    if (problem) {
      throw new Error(
        [
          '',
          `  NEXT_PUBLIC_SITE_URL ${problem}`,
          '  Canonical URLs, sitemap, hreflang and structured data need your real domain.',
          '',
          '  Create .env.local (or set it in your host) with, for example:',
          '    NEXT_PUBLIC_SITE_URL=https://real-domain.ir',
          '  (scheme included, no path, no trailing slash)',
          '',
        ].join('\n'),
      )
    }
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
