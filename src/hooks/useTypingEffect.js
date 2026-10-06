import { useState, useEffect } from 'react'

export function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return undefined

    const currentWord = words[wordIndex % words.length]
    const isComplete = displayText === currentWord
    const delay = isComplete && !isDeleting
      ? pauseDuration
      : isDeleting
        ? deletingSpeed
        : typingSpeed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (isComplete) setIsDeleting(true)
        else setDisplayText(currentWord.slice(0, displayText.length + 1))
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1))
        if (displayText.length <= 1) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    pauseDuration,
    typingSpeed,
    wordIndex,
    words,
  ])

  return displayText
}
