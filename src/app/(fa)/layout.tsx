import type { Viewport } from 'next'
import Shell from '@/components/shell/Shell'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07070a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="fa">{children}</Shell>
}
