"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "../utils/cn"

// Define themeColors locally since it's not exported from theme-toggle
const themeColors = {
  blue: {
    primary: 'from-blue-500 to-blue-600'
  },
  red: {
    primary: 'from-red-500 to-red-600'
  },
  green: {
    primary: 'from-green-500 to-green-600'
  },
  purple: {
    primary: 'from-purple-500 to-purple-600'
  }
  // Add more themes as needed
}

export default function BackgroundAnimation({ themeColor = 'blue' }) {
  // Safe window access for SSR
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(typeof window !== 'undefined')
  }, [])

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full">
          {/* Floating circles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className={cn(
                "absolute rounded-full",
                `bg-gradient-to-r ${themeColors[themeColor]?.primary || 'from-blue-500 to-blue-600'} opacity-10 dark:opacity-20`
              )}
              initial={{
                opacity: 0,
                scale: 0,
                x: isBrowser ? Math.random() * window.innerWidth : 0,
                y: isBrowser ? Math.random() * window.innerHeight : 0
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 2, 0],
                x: isBrowser ? Math.random() * window.innerWidth : 0,
                y: isBrowser ? Math.random() * window.innerHeight : 0
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50
              }}
            />
          ))}

          {/* Floating squares */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`square-${i}`}
              className={cn(
                "absolute rounded-md",
                `bg-gradient-to-r ${themeColors[themeColor]?.primary || 'from-blue-500 to-blue-600'} opacity-10 dark:opacity-15`
              )}
              initial={{
                opacity: 0,
                rotate: 0,
                x: isBrowser ? Math.random() * window.innerWidth : 0,
                y: isBrowser ? Math.random() * window.innerHeight : 0
              }}
              animate={{
                opacity: [0, 0.3, 0],
                rotate: [0, 90, 180],
                x: isBrowser ? Math.random() * window.innerWidth : 0,
                y: isBrowser ? Math.random() * window.innerHeight : 0
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                width: Math.random() * 100 + 30,
                height: Math.random() * 100 + 30
              }}
            />
          ))}

          {/* Floating triangles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`triangle-${i}`}
              className="absolute opacity-10 dark:opacity-15"
              initial={{
                opacity: 0,
                rotate: 0,
                x: isBrowser ? Math.random() * window.innerWidth : 0,
                y: isBrowser ? Math.random() * window.innerHeight : 0
              }}
              animate={{
                opacity: [0, 0.3, 0],
                rotate: [0, 120, 240],
                x: isBrowser ? Math.random() * window.innerWidth : 0,
                y: isBrowser ? Math.random() * window.innerHeight : 0
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                width: 0,
                height: 0,
                borderLeft: `${Math.random() * 50 + 25}px solid transparent`,
                borderRight: `${Math.random() * 50 + 25}px solid transparent`,
                borderBottomWidth: `${Math.random() * 100 + 50}px`,
                borderBottomStyle: "solid",
                borderBottomColor: "rgba(239, 68, 68, 0.2)"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}