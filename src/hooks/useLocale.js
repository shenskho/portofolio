import { useContext } from 'react'
import { LocaleContext } from '../context/localeContext'

export function useLocale() {
  const locale = useContext(LocaleContext)

  if (!locale) {
    throw new Error('useLocale must be used inside LocaleProvider')
  }

  return locale
}
