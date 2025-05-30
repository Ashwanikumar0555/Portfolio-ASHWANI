// "use client"

// import { useRef, useState, useEffect, useMemo } from "react"
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
// import { Github, Linkedin, Mail, ArrowDown, Code, Database, Server } from "lucide-react"
// import { Button } from "@mui/material"
// import { cn } from "../utils/cn"
// import { themeColors } from "../ui/color-selector"
// import TypewriterComponent from "../components/typewriter-effect"
// import { getPersonalInfo } from "../utils/api"
// import mypic from "../assets/my pic .jpg"


// const defaultInfo = {
//   name: "Ashwani Kumar",
//   title: "Full Stack Developer  ",
//   bio: "A passionate first-year B.Tech student with a drive for creating innovative web solutions and exploring cutting-edge technologies.",
//   github: "https://github.com/Ashwanikumar0555",
//   linkedin: "https://www.linkedin.com/in/ashwani-kumar056/",
//   email: "ashwanikumar05556@gmail.com",
//   typewriterTexts: ["Ashwani Kumar", "a Developer", "a Creator", "an Innovator"],
//   skills: ["React", "Node.js", "MongoDB", "Next.js", "TypeScript", "Tailwind CSS"],
//   avatar: mypic
// }

// export default function HeroSection({ themeColor = 'blue', scrollToSection }) {
//   const [personalInfo, setPersonalInfo] = useState(defaultInfo)
//   const [isAvatarHovered, setIsAvatarHovered] = useState(false)
//   const [currentColorTheme, setCurrentColorTheme] = useState('dark') // Changed default theme to dark
//   const ref = useRef(null)
  
//   const currentTheme = useMemo(() => themeColors[themeColor] || themeColors.blue, [themeColor])
  
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   })
  
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"])
//   const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

//   useEffect(() => {
//     let isMounted = true
    
//     // Always set dark theme initially
//     if (typeof window !== 'undefined') {
//       setCurrentColorTheme('dark')
//     }
    
//     const fetchData = async () => {
//       try {
//         const result = await getPersonalInfo()
//         if (isMounted) {
//           setPersonalInfo(prev => ({
//             ...defaultInfo,
//             ...result.data
//           }))
//         }
//       } catch (err) {
//         console.error("Error fetching personal info:", err)
//       }
//     }
    
//     fetchData()
//     return () => { isMounted = false }
//   }, [])

//   const buttonStyles = useMemo(() => {
//     const accentColor = currentTheme.accent?.replace('text-', '') || 'blue-500'
//     return {
//       contained: {
//         bg: `${accentColor}`,
//         hoverBg: `${accentColor}-dark`
//       },
//       outline: {
//         color: accentColor,
//         borderColor: `${accentColor}50`,
//         hoverBorderColor: accentColor,
//         hoverBg: `${accentColor}15`
//       }
//     }
//   }, [currentTheme])

//   const avatarVariants = {
//     initial: { opacity: 0, scale: 0.8, rotate: -5 },
//     animate: { 
//       opacity: 1, 
//       scale: 1,
//       rotate: 0,
//       transition: { 
//         type: "spring",
//         stiffness: 200,
//         damping: 20,
//         delay: 0.3 
//       }
//     },
//     hover: { 
//       scale: 1.05,
//       boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
//       transition: { 
//         type: "spring",
//         stiffness: 300,
//         damping: 15
//       }
//     },
//     pulse: {
//       scale: [1, 1.03, 1],
//       transition: {
//         duration: 2,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   }

//   const techBadgeVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: (i) => ({
//       opacity: 1, 
//       y: 0,
//       transition: {
//         delay: 0.8 + (i * 0.1),
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }),
//     float: (i) => ({
//       y: [0, -8, 0],
//       transition: {
//         duration: 3 + (i * 0.2),
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: i * 0.1
//       }
//     })
//   }

//   const iconMap = {
//     "React": <Code size={16} />,
//     "Node.js": <Server size={16} />,
//     "MongoDB": <Database size={16} />,
//     "Next.js": <Code size={16} />,
//     "TypeScript": <Code size={16} />,
//     "Tailwind CSS": <Code size={16} />
//   }

//   const socialLinks = [
//     { Icon: Github, link: personalInfo.github, label: "GitHub" },
//     { Icon: Linkedin, link: personalInfo.linkedin, label: "LinkedIn" },
//     { Icon: Mail, link: `mailto:${personalInfo.email}`, label: "Email" }
//   ]

//   const floatingTechBadges = [
//     { tech: "React", position: "top-5 right-0", icon: <Code size={14} /> },
//     { tech: "Node.js", position: "bottom-10 -left-5", icon: <Server size={14} /> },
//     { tech: "MongoDB", position: "top-20 -left-5", icon: <Database size={14} /> }
//   ]

//   // Add smooth scroll function
//   const handleScrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       const headerOffset = 80 // Adjust this value based on your header height
//       const elementPosition = element.getBoundingClientRect().top
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth"
//       })
//     }
//   }

//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
//       ref={ref}
//     >
//       {/* Enhanced animated background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
//         <motion.div 
//           className={cn(
//             "absolute inset-0 opacity-20 blur-3xl",
//             currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'
//           )}
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
        
//         {/* Improved floating tech bubbles with smoother animations */}
//         {Array.from({ length: 5 }).map((_, i) => (
//           <motion.div
//             key={`bubble-${i}`}
//             className={cn(
//               "absolute rounded-full opacity-10",
//               currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500' // Updated to use theme accent color
//             )}
//             style={{
//               width: `${80 + i * 40}px`,
//               height: `${80 + i * 40}px`,
//               left: `${10 + (i * 20) % 80}%`,
//               top: `${15 + (i * 15) % 70}%`,
//               background: `linear-gradient(to right, var(--${currentTheme.accent?.replace('text-', '')} || blue-500), var(--${currentTheme.accent?.replace('text-', '')}-light || cyan-400))` // Updated gradient
//             }}
//             animate={{
//               y: [0, 40, 0],
//               x: [0, 20, 0],
//             }}
//             transition={{
//               duration: 12 + i * 4,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 1.5
//             }}
//           />
//         ))}
//       </div>

//       <motion.div 
//         style={{ y: textY, opacity }} 
//         className="container mx-auto px-4 sm:px-6 z-10"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
//           {/* Left Column - Content with improved animations */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="text-center lg:text-left"
//           >
//             {/* Enhanced Title Badge with smoother animations */}
//             <motion.div
//               className={cn(
//                 "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6",
//                 "shadow-md backdrop-blur-md bg-white/40 dark:bg-gray-800/40",
//                 currentTheme.secondary?.replace('bg-', 'text-') || 'text-blue-500'
//               )}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: `0 5px 15px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}40`
//               }}
//             >
//               <motion.span 
//                 className="w-2 h-2 rounded-full mr-2"
//                 style={{ 
//                   backgroundColor: `var(--${currentTheme.accent?.replace('text-', '')} || var(--blue-500))` 
//                 }}
//                 animate={{ 
//                   scale: [1, 1.5, 1],
//                   opacity: [0.8, 1, 0.8]
//                 }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               />
//               {personalInfo.title}
//             </motion.div>

//             {/* Headline with enhanced animation */}
//             <motion.h1
//               className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//             >
//               Hey, I'm   <span className={cn(
//                 "text-transparent bg-clip-text bg-gradient-to-r",
//                 currentTheme.primary || 'from-blue-500 to-cyan-400'
//               )}>Ashwani Kumar</span>
//               <span className={cn(
//                 "block mt-2 bg-gradient-to-r text-transparent bg-clip-text",
//                 currentTheme.primary || 'from-blue-500 to-cyan-400'
//               )}>
//                 <TypewriterComponent
//                   strings={personalInfo.typewriterTexts}
//                   autoStart={true}
//                   loop={true}
//                   cursorClassName={currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}
//                 />
//               </span>
//             </motion.h1>

//             {/* Bio with improved animation */}
//             <motion.p
//               className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
//             >
//               {personalInfo.bio}
//             </motion.p>

//             {/* Enhanced CTA Buttons with smoother animations */}
//             <motion.div
//               className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-10"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
//             >
//               <motion.div 
//                 whileHover={{ y: -3, transition: { duration: 0.2 } }} 
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={() => handleScrollToSection("projects")}
//                   sx={{
//                     background: `var(--${buttonStyles.contained.bg})`,
//                     color: 'white',
//                     '&:hover': {
//                       background: `var(--${buttonStyles.contained.hoverBg})`,
//                       transform: 'translateY(-2px)'
//                     },
//                     borderRadius: '12px',
//                     padding: '12px 32px',
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
//                   }}
//                 >
//                   Explore Projects
//                 </Button>
//               </motion.div>
              
//               <motion.div 
//                 whileHover={{ y: -3, transition: { duration: 0.2 } }} 
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={() => handleScrollToSection("contact")}
//                   sx={{
//                     color: `var(--${buttonStyles.outline.color})`,
//                     borderColor: `var(--${buttonStyles.outline.borderColor})`,
//                     '&:hover': {
//                       borderColor: `var(--${buttonStyles.outline.hoverBorderColor})`,
//                       backgroundColor: `var(--${buttonStyles.outline.hoverBg})`,
//                       transform: 'translateY(-2px)'
//                     },
//                     borderRadius: '12px',
//                     padding: '12px 32px',
//                     borderWidth: '2px',
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
//                   }}
//                 >
//                   Get in Touch
//                 </Button>
//               </motion.div>
//             </motion.div>

//             {/* Social Links with improved hover effects and smoother animations */}
//             <motion.div
//               className="flex justify-center lg:justify-start gap-4 sm:gap-6 mb-10"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               {socialLinks.map(({ Icon, link, label }, index) => (
//                 <motion.a
//                   key={label}
//                   href={link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={cn(
//                     "p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm",
//                     "border border-gray-200 dark:border-gray-700",
//                     currentTheme.hover || 'hover:bg-blue-500/10'
//                   )}
//                   whileHover={{ 
//                     scale: 1.15,
//                     boxShadow: `0 8px 20px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}30`,
//                     backgroundColor: currentColorTheme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(30,41,59,0.9)'
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300,
//                     damping: 15,
//                     delay: 0.6 + (index * 0.08) 
//                   }}
//                 >
//                   <Icon className={cn("w-5 h-5", currentTheme.accent || 'text-blue-500')} />
//                 </motion.a>
//               ))}
//             </motion.div>

//             {/* Skills Tags with enhanced animations and better visibility */}
//             <motion.div 
//               className="hidden lg:flex flex-wrap gap-2 max-w-md"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7, duration: 0.6 }}
//             >
//               {personalInfo.skills.map((skill, index) => (
//                 <motion.span
//                   key={skill}
//                   className={cn(
//                     "text-xs font-medium px-3 py-1.5 rounded-full",
//                     "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
//                     "border border-gray-200 dark:border-gray-700",
//                     currentTheme.accent?.replace('text-', 'text-') || 'text-blue-500'
//                   )}
//                   custom={index}
//                   variants={techBadgeVariants}
//                   initial="initial"
//                   animate={["animate", "float"]}
//                   whileHover={{ 
//                     scale: 1.08,
//                     boxShadow: `0 4px 8px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}20`
//                   }}
//                 >
//                   <span className="flex items-center gap-1">
//                     {iconMap[skill]}
//                     {skill}
//                   </span>
//                 </motion.span>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Right Column - Enhanced Avatar Section with smoother animations */}
//           <motion.div
//             className="relative flex justify-center items-center"
//             initial="initial"
//             animate="animate"
//             variants={avatarVariants}
//             whileHover="hover"
//           >
//             <motion.div
//               className="relative"
//               onHoverStart={() => setIsAvatarHovered(true)}
//               onHoverEnd={() => setIsAvatarHovered(false)}
//             >
//               {/* Enhanced Rotating Gradient Border */}
//               <motion.div
//                 className={cn(
//                   "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
//                   "w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full",
//                   currentTheme.primary || 'from-blue-500 via-purple-500 to-cyan-400',
//                   "opacity-80 blur-sm"
//                 )}
//                 style={{
//                   background: `linear-gradient(to right, var(--${currentTheme.accent?.replace('text-', '')}) 0%, var(--${currentTheme.accent?.replace('text-', '')}-light) 100%)`
//                 }}
//                 animate={{ 
//                   rotate: [0, 360],
//                   scale: isAvatarHovered ? [1, 1.05, 1] : 1,
//                   opacity: isAvatarHovered ? 0.9 : 0.7
//                 }}
//                 transition={{ 
//                   rotate: { duration: 15, repeat: Infinity, ease: "linear" },
//                   scale: { duration: 2, repeat: isAvatarHovered ? Infinity : 0, ease: "easeInOut" },
//                   opacity: { duration: 0.5 }
//                 }}
//               />
              
//               {/* Profile Image with improved visibility and animation */}
//               <motion.div
//                 className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden relative z-10"
//                 animate={isAvatarHovered ? "pulse" : "animate"}
//                 variants={avatarVariants}
//               >
//                 <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-1.5 shadow-xl">
//                   <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-700 relative">
//                     <motion.img
//                       src={personalInfo.avatar}
//                       alt={personalInfo.name}
//                       className="w-full h-full object-cover"
//                       whileHover={{ scale: 1.04 }}
//                       transition={{ duration: 0.4 }}
//                     />
//                     <div className={cn(
//                       "absolute inset-0 bg-gradient-to-tr opacity-10 hover:opacity-5 transition-opacity duration-300",
//                       currentTheme.primary || 'from-blue-500 to-cyan-400'
//                     )} />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Floating Tech Badges with improved animations */}
//               <AnimatePresence>
//                 {floatingTechBadges.map(({ tech, position, icon }, index) => (
//                   <motion.div
//                     key={tech}
//                     className={cn(
//                       "absolute p-2 rounded-lg shadow-lg",
//                       "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm", 
//                       "border border-gray-200 dark:border-gray-700",
//                       position,
//                       "z-20" // Added z-index to ensure badges stay above image
//                     )}
//                     style={{
//                       // Increased distance from circle
//                       left: index === 1 ? "-120px" : index === 2 ? "-100px" : "auto", 
//                       right: index === 0 ? "-100px" : "auto",
//                       top: index === 0 ? "20%" : index === 2 ? "30%" : "auto",
//                       bottom: index === 1 ? "30%" : "auto"
//                     }}
//                     custom={index}
//                     variants={techBadgeVariants}
//                     initial="initial"
//                     animate={["animate", "float"]}
//                     whileHover={{ 
//                       scale: 1.15,
//                       zIndex: 30,
//                       boxShadow: `0 8px 20px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}30`
//                     }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <motion.span
//                         className={cn(
//                           "w-2.5 h-2.5 rounded-full",
//                           currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'
//                         )}
//                         animate={{ 
//                           scale: [1, 1.3, 1],
//                           opacity: [0.8, 1, 0.8]
//                         }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                       />
//                       <span className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-gray-300">
//                         {icon}
//                         {tech}
//                       </span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Enhanced Scroll Indicator with smoother animation */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
//         onClick={() => handleScrollToSection("about")}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ 
//           opacity: 1,
//           y: [0, 10, 0],
//         }}
//         transition={{ 
//           y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
//           opacity: { duration: 0.6, delay: 1 }
//         }}
//         whileHover={{ 
//           scale: 1.1,
//           transition: { duration: 0.2 }
//         }}
//       >
//         <div className="flex flex-col items-center">
//           <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
//           <motion.div 
//             className={cn(
//               "p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
//               "shadow-lg border border-gray-200 dark:border-gray-700"
//             )}
//             whileHover={{
//               y: [0, -3, 0],
//               transition: { duration: 0.5, repeat: Infinity }
//             }}
//           >
//             <ArrowDown 
//               className={cn(
//                 "w-5 h-5",
//                 currentTheme.accent || 'text-blue-500'
//               )}
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   )
// }

// ///
"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, ArrowDown, Code, Database, Server } from "lucide-react"
import { Button } from "@mui/material"
import { cn } from "../utils/cn"
import { themeColors } from "../ui/color-selector"
import TypewriterComponent from "../components/typewriter-effect"
import { getPersonalInfo } from "../utils/api"
import mypic from "../assets/my pic .jpg"


const defaultInfo = {
  name: "Ashwani Kumar",
  title: "Full Stack Developer  ",
  bio: "A passionate first-year B.Tech student with a drive for creating innovative web solutions and exploring cutting-edge technologies.",
  github: "https://github.com/Ashwanikumar0555",
  linkedin: "https://www.linkedin.com/in/ashwani-kumar056/",
  email: "ashwanikumar05556@gmail.com",
  typewriterTexts: ["Ashwani Kumar", "a Developer", "a Creator", "an Innovator"],
  skills: ["React", "Node.js", "MongoDB", "Next.js", "TypeScript", "Tailwind CSS"],
  avatar: mypic
}

export default function HeroSection({ themeColor = 'blue', scrollToSection }) {
  const [personalInfo, setPersonalInfo] = useState(defaultInfo)
  const [isAvatarHovered, setIsAvatarHovered] = useState(false)
  const [currentColorTheme, setCurrentColorTheme] = useState('dark') // Changed default theme to dark
  const ref = useRef(null)
  
  const currentTheme = useMemo(() => themeColors[themeColor] || themeColors.blue, [themeColor])
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    let isMounted = true
    
    // Always set dark theme initially
    if (typeof window !== 'undefined') {
      setCurrentColorTheme('dark')
    }
    
    const fetchData = async () => {
      try {
        const result = await getPersonalInfo()
        if (isMounted) {
          setPersonalInfo(prev => ({
            ...defaultInfo,
            ...result.data
          }))
        }
      } catch (err) {
        console.error("Error fetching personal info:", err)
      }
    }
    
    fetchData()
    return () => { isMounted = false }
  }, [])

  const buttonStyles = useMemo(() => {
    const accentColor = currentTheme.accent?.replace('text-', '') || 'blue-500'
    return {
      contained: {
        bg: `${accentColor}`,
        hoverBg: `${accentColor}-dark`
      },
      outline: {
        color: accentColor,
        borderColor: `${accentColor}50`,
        hoverBorderColor: accentColor,
        hoverBg: `${accentColor}15`
      }
    }
  }, [currentTheme])

  const avatarVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    pulse: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const techBadgeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.8 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    float: (i) => ({
      y: [0, -8, 0],
      transition: {
        duration: 3 + (i * 0.2),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.1
      }
    })
  }

  const iconMap = {
    "React": <Code size={16} />,
    "Node.js": <Server size={16} />,
    "MongoDB": <Database size={16} />,
    "Next.js": <Code size={16} />,
    "TypeScript": <Code size={16} />,
    "Tailwind CSS": <Code size={16} />
  }

  const socialLinks = [
    { Icon: Github, link: personalInfo.github, label: "GitHub" },
    { Icon: Linkedin, link: personalInfo.linkedin, label: "LinkedIn" },
    { Icon: Mail, link: `mailto:${personalInfo.email}`, label: "Email" }
  ]

  const floatingTechBadges = [
    { tech: "React", position: "top-5 right-0", icon: <Code size={14} /> },
    { tech: "Node.js", position: "bottom-10 -left-5", icon: <Server size={14} /> },
    { tech: "MongoDB", position: "top-20 -left-5", icon: <Database size={14} /> }
  ]

  // Add smooth scroll function
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      ref={ref}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <motion.div 
          className={cn(
            "absolute inset-0 opacity-20 blur-3xl",
            currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'
          )}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Improved floating tech bubbles with smoother animations */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className={cn(
              "absolute rounded-full opacity-10",
              currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500' // Updated to use theme accent color
            )}
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${10 + (i * 20) % 80}%`,
              top: `${15 + (i * 15) % 70}%`,
              background: `linear-gradient(to right, var(--${currentTheme.accent?.replace('text-', '')} || blue-500), var(--${currentTheme.accent?.replace('text-', '')}-light || cyan-400))` // Updated gradient
            }}
            animate={{
              y: [0, 40, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y: textY, opacity }} 
        className="container mx-auto px-4 sm:px-6 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content with improved animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Enhanced Title Badge with smoother animations */}
            <motion.div
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6",
                "shadow-md backdrop-blur-md bg-white/40 dark:bg-gray-800/40",
                currentTheme.secondary?.replace('bg-', 'text-') || 'text-blue-500'
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 5px 15px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}40`
              }}
            >
              <motion.span 
                className="w-2 h-2 rounded-full mr-2"
                style={{ 
                  backgroundColor: `var(--${currentTheme.accent?.replace('text-', '')} || var(--blue-500))` 
                }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {personalInfo.title}
            </motion.div>

            {/* Headline with enhanced animation */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Hey, I'm   <span className={cn(
                "text-transparent bg-clip-text bg-gradient-to-r",
                currentTheme.primary || 'from-blue-500 to-cyan-400'
              )}>Ashwani Kumar</span>
              <span className={cn(
                "block mt-2 bg-gradient-to-r text-transparent bg-clip-text",
                currentTheme.primary || 'from-blue-500 to-cyan-400'
              )}>
                <TypewriterComponent
                  strings={personalInfo.typewriterTexts}
                  autoStart={true}
                  loop={true}
                  cursorClassName={currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}
                />
              </span>
            </motion.h1>

            {/* Bio with improved animation */}
            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Enhanced CTA Buttons with smoother animations */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }} 
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleScrollToSection("projects")}
                  sx={{
                    background: `var(--${buttonStyles.contained.bg})`,
                    color: 'white',
                    '&:hover': {
                      background: `var(--${buttonStyles.contained.hoverBg})`,
                      transform: 'translateY(-2px)'
                    },
                    borderRadius: '12px',
                    padding: '12px 32px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  Explore Projects
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }} 
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleScrollToSection("contact")}
                  sx={{
                    color: `var(--${buttonStyles.outline.color})`,
                    borderColor: `var(--${buttonStyles.outline.borderColor})`,
                    '&:hover': {
                      borderColor: `var(--${buttonStyles.outline.hoverBorderColor})`,
                      backgroundColor: `var(--${buttonStyles.outline.hoverBg})`,
                      transform: 'translateY(-2px)'
                    },
                    borderRadius: '12px',
                    padding: '12px 32px',
                    borderWidth: '2px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links with improved hover effects and smoother animations */}
            <motion.div
              className="flex justify-center lg:justify-start gap-4 sm:gap-6 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {socialLinks.map(({ Icon, link, label }, index) => (
                <motion.a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm",
                    "border border-gray-200 dark:border-gray-700",
                    currentTheme.hover || 'hover:bg-blue-500/10'
                  )}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: `0 8px 20px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}30`,
                    backgroundColor: currentColorTheme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(30,41,59,0.9)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 15,
                    delay: 0.6 + (index * 0.08) 
                  }}
                >
                  <Icon className={cn("w-5 h-5", currentTheme.accent || 'text-blue-500')} />
                </motion.a>
              ))}
            </motion.div>

            {/* Skills Tags with enhanced animations and better visibility */}
            <motion.div 
              className="hidden lg:flex flex-wrap gap-2 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {personalInfo.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className={cn(
                    "text-xs font-medium px-3 py-1.5 rounded-full",
                    "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
                    "border border-gray-200 dark:border-gray-700",
                    currentTheme.accent?.replace('text-', 'text-') || 'text-blue-500'
                  )}
                  custom={index}
                  variants={techBadgeVariants}
                  initial="initial"
                  animate={["animate", "float"]}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: `0 4px 8px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}20`
                  }}
                >
                  <span className="flex items-center gap-1">
                    {iconMap[skill]}
                    {skill}
                  </span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Avatar Section with smoother animations */}
          <motion.div
            className="relative flex justify-center items-center"
            initial="initial"
            animate="animate"
            variants={avatarVariants}
            whileHover="hover"
          >
            <motion.div
              className="relative"
              onHoverStart={() => setIsAvatarHovered(true)}
              onHoverEnd={() => setIsAvatarHovered(false)}
            >
              {/* Enhanced Rotating Gradient Border */}
              <motion.div
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full",
                  currentTheme.primary || 'from-blue-500 via-purple-500 to-cyan-400',
                  "opacity-80 blur-sm"
                )}
                style={{
                  background: `linear-gradient(to right, var(--${currentTheme.accent?.replace('text-', '')}) 0%, var(--${currentTheme.accent?.replace('text-', '')}-light) 100%)`
                }}
                animate={{ 
                  rotate: [0, 360],
                  scale: isAvatarHovered ? [1, 1.05, 1] : 1,
                  opacity: isAvatarHovered ? 0.9 : 0.7
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: isAvatarHovered ? Infinity : 0, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
              />
              
              {/* Profile Image with improved visibility and animation */}
              <motion.div
                className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden relative z-10"
                animate={isAvatarHovered ? "pulse" : "animate"}
                variants={avatarVariants}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-700 relative">
                    <motion.img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-tr opacity-10 hover:opacity-5 transition-opacity duration-300",
                      currentTheme.primary || 'from-blue-500 to-cyan-400'
                    )} />
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Badges with improved animations */}
              <AnimatePresence>
                {floatingTechBadges.map(({ tech, position, icon }, index) => (
                  <motion.div
                    key={tech}
                    className={cn(
                      "absolute p-2 rounded-lg shadow-lg",
                      "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm", 
                      "border border-gray-200 dark:border-gray-700",
                      position,
                      "z-20" // Added z-index to ensure badges stay above image
                    )}
                    style={{
                      // Increased distance from circle
                      left: index === 1 ? "-120px" : index === 2 ? "-100px" : "auto", 
                      right: index === 0 ? "-100px" : "auto",
                      top: index === 0 ? "20%" : index === 2 ? "30%" : "auto",
                      bottom: index === 1 ? "30%" : "auto"
                    }}
                    custom={index}
                    variants={techBadgeVariants}
                    initial="initial"
                    animate={["animate", "float"]}
                    whileHover={{ 
                      scale: 1.15,
                      zIndex: 30,
                      boxShadow: `0 8px 20px ${currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'}30`
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.span
                        className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          currentTheme.accent?.replace('text-', 'bg-') || 'bg-blue-500'
                        )}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-gray-300">
                        {icon}
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator with smoother animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => handleScrollToSection("about")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{ 
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.6, delay: 1 }
        }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
          <motion.div 
            className={cn(
              "p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
              "shadow-lg border border-gray-200 dark:border-gray-700"
            )}
            whileHover={{
              y: [0, -3, 0],
              transition: { duration: 0.5, repeat: Infinity }
            }}
          >
            <ArrowDown 
              className={cn(
                "w-5 h-5",
                currentTheme.accent || 'text-blue-500'
              )}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}