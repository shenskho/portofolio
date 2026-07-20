import { useState, useEffect } from 'react'

export function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1))
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1))
        if (displayText.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}
