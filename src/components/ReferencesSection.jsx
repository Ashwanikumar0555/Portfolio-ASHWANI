"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { cn } from "../utils/cn"
import { themeColors } from "../ui/color-selector"

export default function ReferencesSection({ themeColor }) {
  const references = [
    {
      name: "Patel Neel Maheshbhai",
      position: "Co-Founder",
      company: "CodingGita",
      content:
        "Patel Neel Maheshbhai is a trailblazing entrepreneur and Co-Founder of CodingGita, whose unwavering dedication to technological advancement and creative problem-solving propel the platform to new heights.",
      avatar: "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/NeelSir.png?raw=true",
    },
  ]

  return (
    <section id="references" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text inline-block",
              themeColors[themeColor].primary
            )}
          >
            References
          </h2>
          <div className={cn("h-1 w-20 bg-gradient-to-r mx-auto mb-8", themeColors[themeColor].primary)}></div>
          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">Professional references available upon request.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {references.map((reference, index) => (
            <motion.div
              key={reference.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={cn(
                "bg-white dark:bg-slate-800/50 p-8 rounded-2xl border shadow-xl transition-all duration-300 transform hover:-translate-y-2",
                "border-slate-200 dark:border-slate-700"
              )}
            >
              <div className="flex items-center mb-6">
                <div className="relative mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={reference.avatar || "/placeholder.svg"}
                      alt={reference.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                      `bg-gradient-to-r ${themeColors[themeColor].primary}`
                    )}
                  >
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{reference.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {reference.position}, {reference.company}
                  </p>
                </div>
              </div>
              <div className="relative">
                <svg
                  className={cn("w-10 h-10 absolute -top-4 -left-4 opacity-10", themeColors[themeColor].accent)}
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-slate-700 dark:text-slate-300 relative z-10">{reference.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}