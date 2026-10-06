import { useCallback, useEffect, useMemo, useState } from 'react'
import { portfolioContent } from '../data/portfolio'
import { LocaleContext } from './localeContext'

const STORAGE_KEY = 'portfolio-language'
const supportedLanguages = new Set(Object.keys(portfolioContent))

function getInitialLanguage() {
  const documentLanguage = document.documentElement.lang
  return supportedLanguages.has(documentLanguage) ? documentLanguage : 'en'
}

export default function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const content = portfolioContent[language]
  const direction = language === 'fa' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = language
    root.dir = direction
    document.title = content.meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', content.meta.description)

    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // The selected language still works when storage is unavailable.
    }
  }, [content.meta.description, content.meta.title, direction, language])

  const toggleLanguage = useCallback(() => {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'fa' : 'en'))
  }, [])

  const value = useMemo(
    () => ({
      language,
      direction,
      content,
      setLanguage,
      toggleLanguage,
    }),
    [content, direction, language, toggleLanguage],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}
