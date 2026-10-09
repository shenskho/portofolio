import HomePage from '@/components/pages/HomePage'
import { homeMetadata } from '@/lib/pages'

export const metadata = homeMetadata('fa')

export default function Page() {
  return <HomePage locale="fa" />
}
