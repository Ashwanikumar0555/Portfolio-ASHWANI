"use client"

import { useEffect, useState, useCallback } from "react"

export default function TypewriterEffect({ 
  text = "", 
  delay = 100, 
  infinite = false,
  cursor = true,
  cursorStyle = "|",
  typingSpeed = 1,
  deletingSpeed = 0.5,
  pauseDuration = 1500,
  onTypingComplete,
  className = ""
}) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Handle typing logic
  const type = useCallback(() => {
    if (isPaused) return

    const currentDelay = isDeleting ? delay * deletingSpeed : delay * typingSpeed

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Deleting phase
        setCurrentText(prev => prev.slice(0, -1))
        setCurrentIndex(prev => prev - 1)

        if (currentIndex <= 1) {
          setIsDeleting(false)
          setIsPaused(true)
        }
      } else {
        // Typing phase
        setCurrentText(text.slice(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)

        if (currentIndex >= text.length - 1) {
          if (typeof onTypingComplete === 'function') {
            onTypingComplete()
          }
          
          if (infinite) {
            setIsPaused(true)
          }
        }
      }
    }, currentDelay)

    return () => clearTimeout(timeout)
  }, [
    currentIndex, 
    delay, 
    infinite, 
    isDeleting, 
    isPaused, 
    text, 
    typingSpeed, 
    deletingSpeed,
    onTypingComplete
  ])

  // Handle pause between cycles
  useEffect(() => {
    if (!isPaused) return

    const pauseTimeout = setTimeout(() => {
      setIsPaused(false)
      if (infinite && currentIndex >= text.length) {
        setIsDeleting(true)
      }
    }, pauseDuration)

    return () => clearTimeout(pauseTimeout)
  }, [isPaused, infinite, currentIndex, text.length, pauseDuration])

  // Main typing effect
  useEffect(() => {
    type()
  }, [type])

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      {cursor && (
        <span 
          className={`animate-blink ${isPaused ? 'opacity-0' : 'opacity-100'}`}
          style={{ animationDuration: '1s' }}
        >
          {cursorStyle}
        </span>
      )}
    </span>
  )
}