"use client"

import { motion } from "framer-motion"
import { cn } from "../utils/cn"

export default function Footer({ themeColor }) {
  const themeColors = {
    blue: {
      primary: "from-blue-500 to-cyan-400",
    },
    red: {
      primary: "from-red-500 to-orange-400",
    },
    purple: {
      primary: "from-purple-500 to-pink-400",
    },
    green: {
      primary: "from-emerald-500 to-green-400",
    },
  }

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="py-10 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <h2
              className={cn(
                "text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text",
                themeColors[themeColor].primary,
              )}
            >
              Ashwani Kumar
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Full Stack Developer</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            <button
              onClick={() => scrollToSection("home")}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Ashwani Kumar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}