
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../utils/cn"
import { Github, Linkedin, Mail, ArrowUp, MapPin, Phone, Calendar, Check, X, ChevronRight, Bell, Code } from "lucide-react"
import * as THREE from 'three'

export default function Footer({ themeColor = "blue" }) {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [subscribers, setSubscribers] = useState(0)
  const emailRef = useRef(null)
  const particlesMeshRef = useRef(null)

  // Theme colors with enhanced gradients
  const themeColors = {
    blue: {
      primary: "from-blue-600 via-blue-500 to-cyan-400",
      hover: "hover:text-blue-500",
      bg: "bg-gradient-to-r from-blue-600 to-cyan-500",
      shadow: "shadow-blue-500/20",
      border: "border-blue-500/20",
      light: "bg-blue-50 dark:bg-blue-900/20"
    },
    red: {
      primary: "from-red-600 via-red-500 to-orange-400", 
      hover: "hover:text-red-500",
      bg: "bg-gradient-to-r from-red-600 to-orange-500",
      shadow: "shadow-red-500/20",
      border: "border-red-500/20",
      light: "bg-red-50 dark:bg-red-900/20"
    },
    purple: {
      primary: "from-purple-600 via-purple-500 to-pink-400",
      hover: "hover:text-purple-500", 
      bg: "bg-gradient-to-r from-purple-600 to-pink-500",
      shadow: "shadow-purple-500/20",
      border: "border-purple-500/20",
      light: "bg-purple-50 dark:bg-purple-900/20"
    },
    green: {
      primary: "from-emerald-600 via-emerald-500 to-green-400",
      hover: "hover:text-emerald-500",
      bg: "bg-gradient-to-r from-emerald-600 to-green-500", 
      shadow: "shadow-emerald-500/20",
      border: "border-emerald-500/20",
      light: "bg-emerald-50 dark:bg-emerald-900/20"
    },
  }

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
      
      const sections = ["home", "about", "skills", "projects", "contact"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    setMounted(true)
    setSubscribers(Math.floor(Math.random() * 110) + 120)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced toast notification
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Scroll handlers
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Handle subscribe form submission
  const handleSubscribe = async (e) => {
    e.preventDefault()
    
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setToast({
        show: true,
        message: "Please enter a valid email address",
        type: "error"
      })
      return
    }
    
    setSubscribing(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubscribing(false)
      setEmail("")
      setSubscribers(prev => prev + 1)
      setToast({
        show: true,
        message: "Successfully subscribed to newsletter!",
        type: "success"
      })
      
    } catch (error) {
      setToast({
        show: true,
        message: "Failed to subscribe. Please try again.",
        type: "error"
      })
    } finally {
      setSubscribing(false)
    }
  }

  // Social media links
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/Ashwanikumar0555",
      ariaLabel: "Visit Ashwani Kumar's GitHub",
      description: "Check out my code repositories"
    },
    {
      name: "LinkedIn", 
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/ashwani-kumar056/",
      ariaLabel: "Visit Ashwani Kumar's LinkedIn",
      description: "Connect with me professionally"
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      url: "mailto:ashwanikumar05556@gmail.com",
      ariaLabel: "Email Ashwani Kumar",
      description: "Send me a message"
    }
  ]

  // Contact information
  const contactInfo = [
    {
      icon: <MapPin size={16} />,
      text: "Haryana, Palwal",
      href: null
    },
    {
      icon: <Mail size={16} />,
      text: "ashwanikumar05556@gmail.com", 
      href: "mailto:ashwanikumar05556@gmail.com"
    },
    {
      icon: <Code size={16} />,
      text: "Full Stack Developer",
      href: null
    }
  ]

  // Recent projects
  const recentProjects = [
    {
      name: "E-commerce Platform",
      description: "Full-stack online store",
      tags: ["React", "Node.js","Express.js","MongoDB"]
    },
    {
      name: "Portfolio Website",
      description: "Interactive personal showcase", 
      tags: ["React.js", "Tailwind"]
    },
    {
      name: "Redux-API",
      description: "State management library",
      tags: ["Redux"]
    }
  ]

  // 3D background effect
  useEffect(() => {
    if (!mounted) return
    
    const canvas = document.getElementById('footer-canvas')
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000)
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, 200)
    
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    
    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: themeColor === 'blue' ? 0x4299e1 : 
             themeColor === 'red' ? 0xf56565 :
             themeColor === 'purple' ? 0x9f7aea :
             0x48bb78
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    particlesMeshRef.current = particlesMesh
    scene.add(particlesMesh)
    
    camera.position.z = 3
    
    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.x += 0.001
      particlesMesh.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    
    animate()
    
    const handleResize = () => {
      renderer.setSize(window.innerWidth, 200)
      camera.aspect = window.innerWidth / 200
      camera.updateProjectionMatrix()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
      particlesMeshRef.current = null
    }
  }, [mounted, themeColor])

  return (
    <footer className="relative py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute bottom-0 left-0 w-full h-48 opacity-30 pointer-events-none">
        <canvas id="footer-canvas" className="w-full h-full"></canvas>
      </div>
      
      {/* Enhanced Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed top-6 left-1/2 transform -translate-x-1/2 z-50",
              "px-6 py-4 rounded-xl shadow-2xl",
              "backdrop-blur-lg bg-opacity-95",
              "flex items-center space-x-3 min-w-[300px]",
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            )}
          >
            {toast.type === "success" ? (
              <Check size={24} className="text-white" />
            ) : (
              <X size={24} className="text-white" />
            )}
            <span className="text-white font-medium text-base">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className={cn(
              "fixed bottom-8 right-8 p-3 rounded-full z-50",
              "text-white transition-all duration-300",
              "backdrop-blur-md shadow-lg",
              themeColors[themeColor].bg,
              "hover:scale-110"
            )}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h2
              className={cn(
                "text-3xl font-bold bg-gradient-to-r text-transparent bg-clip-text",
                themeColors[themeColor].primary,
              )}
            >
              Ashwani Kumar
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 mb-4">Full Stack Developer</p>
            
            {/* Contact info list */}
            <div className="flex flex-col space-y-3 mt-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className={cn(
                    "text-slate-500 dark:text-slate-500 p-1 rounded-md",
                    themeColors[themeColor].light
                  )}>
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:underline">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Social media icons */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-3 rounded-lg shadow-lg backdrop-blur-md",
                    "text-white transition-all duration-300",
                    themeColors[themeColor].bg
                  )}
                  title={link.description}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">Navigation</h3>
            <div className="flex flex-col space-y-3">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  whileHover={{ x: 8 }}
                  className={cn(
                    "capitalize text-slate-600 dark:text-slate-400 transition-colors duration-300",
                    "flex items-center space-x-2",
                    activeSection === section ? `font-medium ${themeColors[themeColor].hover.replace("hover:", "")}` : ""
                  )}
                >
                  {activeSection === section ? (
                    <motion.span
                      layoutId="activeSection"
                      className={cn("h-1 w-1 rounded-full", themeColors[themeColor].bg)}
                    />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-transparent" />
                  )}
                  <span>{section}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">Recent Projects</h3>
            <div className="flex flex-col space-y-3 w-full">
              {recentProjects.map((project, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className={cn(
                    "p-3 rounded-lg",
                    "cursor-pointer transition-all duration-300",
                    themeColors[themeColor].light,
                    "border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  )}
                  onClick={() => scrollToSection("projects")}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{project.name}</span>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{project.description}</p>
                  <div className="flex mt-2 space-x-1">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className={cn(
                          "text-xs px-2 py-1 rounded",
                          "text-slate-600 dark:text-slate-400",
                          "bg-slate-100 dark:bg-slate-800"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter/Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">Stay Connected</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Bell size={16} className={cn("text-slate-500", themeColors[themeColor].hover)} />
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Join <span className="font-medium">{subscribers}</span> subscribers
              </p>
            </div>
            
            <form className="w-full" onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "bg-slate-100 dark:bg-slate-800/70",
                      "border border-slate-200 dark:border-slate-700",
                      "text-slate-800 dark:text-slate-200",
                      "focus:outline-none focus:ring-2",
                      "focus:ring-opacity-50",
                      "transition-all duration-300",
                      `focus:ring-${themeColor}-500`,
                      "pr-6"
                    )}
                    required
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("")
                        emailRef.current?.focus()
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-white font-medium",
                    "transform transition-all duration-300",
                    "shadow-lg flex justify-center items-center",
                    themeColors[themeColor].bg
                  )}
                  type="submit"
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Subscribe"
                  )}
                </motion.button>
              </div>
            </form>
            
            {/* Newsletter benefits */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-green-500" />
                <p className="text-xs text-slate-500 dark:text-slate-500">Weekly project updates</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-green-500" />
                <p className="text-xs text-slate-500 dark:text-slate-500">Early access to new work</p>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Check size={14} className="text-green-500" />
                <p className="text-xs text-slate-500 dark:text-slate-500"></p>
              </div> */}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 text-center"
        >
          <div className="perspective-1000">
            <motion.p 
              className="text-slate-600 dark:text-slate-400 transform-gpu"
              whileHover={{ rotateX: 10, z: 20 }}
            >
              © {new Date().getFullYear()} Ashwani Kumar. All rights reserved.
            </motion.p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Designed and built with{" "}
            <motion.span 
              className="inline-block text-red-500"
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { repeat: Infinity, duration: 1.5 }
              }}
            >
              ❤️
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

// "use client"

// import { motion } from "framer-motion"
// import { cn } from "../utils/cn"

// export default function Footer({ themeColor }) {
//   const themeColors = {
//     blue: {
//       primary: "from-blue-500 to-cyan-400",
//     },
//     red: {
//       primary: "from-red-500 to-orange-400",
//     },
//     purple: {
//       primary: "from-purple-500 to-pink-400",
//     },
//     green: {
//       primary: "from-emerald-500 to-green-400",
//     },
//   }

//   // Scroll to section
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   return (
//     <footer className="py-10 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mb-6 md:mb-0"
//           >
//             <h2
//               className={cn(
//                 "text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text",
//                 themeColors[themeColor].primary,
//               )}
//             >
//               Ashwani Kumar
//             </h2>
//             <p className="text-slate-600 dark:text-slate-400 mt-2">Full Stack Developer</p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="flex flex-wrap justify-center gap-4 md:gap-6"
//           >
//             <button
//               onClick={() => scrollToSection("home")}
//               className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
//             >
//               Home
//             </button>
//             <button
//               onClick={() => scrollToSection("about")}
//               className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
//             >
//               About
//             </button>
//             <button
//               onClick={() => scrollToSection("skills")}
//               className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
//             >
//               Skills
//             </button>
//             <button
//               onClick={() => scrollToSection("projects")}
//               className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
//             >
//               Projects
//             </button>
//             <button
//               onClick={() => scrollToSection("contact")}
//               className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
//             >
//               Contact
//             </button>
//           </motion.div>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           viewport={{ once: true }}
//           className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center"
//         >
//           <p className="text-slate-600 dark:text-slate-400">
//             © {new Date().getFullYear()} Ashwani Kumar. All rights reserved.
//           </p>
//         </motion.div>
//       </div>
//     </footer>
//   )
// }
