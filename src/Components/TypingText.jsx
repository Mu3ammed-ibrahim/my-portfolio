// TypingText.jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TypingText = ({ phrases, typingSpeed = 100, pauseTime = 1500 }) => {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const type = () => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setText(currentPhrase.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (charIndex > 0) {
          setText(currentPhrase.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }

    const timer = setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, phrases, phraseIndex, typingSpeed, pauseTime])

  return (
    <motion.p
      className="text-5xl font-semibold z-10 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {text}
      <span className="animate-pulse text-green-500">|</span>
    </motion.p>
  )
}

export default TypingText
