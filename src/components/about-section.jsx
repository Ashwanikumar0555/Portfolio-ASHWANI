

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const AboutSection = ({ themeColor = 'blue' }) => {
  const themeColors = {
    blue: {
      primary: "from-blue-500 to-cyan-500",
      accent: "text-blue-600 dark:text-blue-400", 
      secondary: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
    },
    indigo: {
      primary: "from-indigo-500 to-blue-500",
      accent: "text-indigo-600 dark:text-indigo-400",
      secondary: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200"
    },
    purple: {
      primary: "from-purple-500 to-pink-500", 
      accent: "text-purple-600 dark:text-purple-400",
      secondary: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
    },
    green: {
      primary: "from-green-500 to-teal-500",
      accent: "text-green-600 dark:text-green-400",
      secondary: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
    },
    red: {
      primary: "from-red-500 to-rose-500",
      accent: "text-red-600 dark:text-red-400",
      secondary: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
    }
  }

  const currentTheme = themeColors[themeColor] || themeColors.blue

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-15 blur-3xl -z-10`} />
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r text-transparent bg-clip-text ${currentTheme.primary}`}>
              About Me
            </h2>
          </div>
          <div className={`h-1 w-20 bg-gradient-to-r mx-auto mb-6 rounded-full ${currentTheme.primary}`} />
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-6">
            As a dedicated Full-Stack Developer, I specialize in creating dynamic and responsive web applications utilizing the MERN stack (MongoDB, Express.js, React, Node.js)
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <AboutCard 
            icon={<AboutIcon />}
            title="Professional Journey"
            delay={0.2}
            currentTheme={currentTheme}
          >
            <p>With 1 years of intensive development experience, I've delivered 5+ production-grade applications using modern web technologies. My expertise spans:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
              <li>Full-stack MERN development</li>
            
            </ul>
          </AboutCard>

          <AboutCard 
            icon={<EducationIcon />}
            title="Education & Certifications"
            delay={0.4}
            currentTheme={currentTheme}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">B.Tech in Computer Science</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Rai University • 2024 - 2028</p>
                <p className="mt-2 text-gray-700 dark:text-gray-200">
                  Currently pursuing a B.Tech in Computer Science with a CGPA of 9.05. I'm Ashwani Kumar, a passionate Full Stack Developer specializing in building scalable web applications using React, Node.js, MongoDB, and modern frameworks. 
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Professional Certifications</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Certificate of Tech Expo 2025</li>
                
                </ul>
              </div>
            </div>
          </AboutCard>

          <AboutCard 
            icon={<SkillsIcon />}
            title="Technical Expertise"
            delay={0.6}
            currentTheme={currentTheme}
          >
            <div className="grid grid-cols-2 gap-4">
              {['React', 'Node.js', 'MongoDB', 'Express.js', 'Redux',   'Tailwind CSS'].map((skill) => (
                <div 
                  key={skill}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-center border border-slate-200 dark:border-slate-800 transition-colors hover:${currentTheme.secondary}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </AboutCard>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { value: '5+', label: 'Projects Deployed' },
            { value: '99%', label: 'Client Satisfaction' },
            { value: '1y', label: 'Experience' },
            { value: '∞', label: 'Passion for Code' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`text-4xl font-bold mb-3 ${currentTheme.accent}`}
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// About Card Component
const AboutCard = ({ icon, title, children, delay = 0, currentTheme }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl transition-opacity ${currentTheme.primary} opacity-0 group-hover:opacity-20 blur-xl`} />
      
      <div className="relative bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r shadow-md ${currentTheme.primary}`}>
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          {title}
        </h3>

        <AnimatePresence initial={false}>
          <motion.div
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ height: 0 }}
            animate={{ height: isExpanded ? "auto" : 100 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="text-slate-600 dark:text-slate-400 space-y-4 text-lg leading-relaxed">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-6 flex items-center gap-2 font-semibold transition-colors ${currentTheme.accent}`}
        >
          {isExpanded ? (
            <>
              Show Less
              <ChevronUpIcon className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More
              <ChevronDownIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const EducationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
)

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
)

const QuoteIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
  </svg>
)

const ChevronDownIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronUpIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
)

export default AboutSection


// "use client"

// import { motion, AnimatePresence } from "framer-motion"
// import { useState } from "react"

// const AboutSection = ({ themeColor = 'blue' }) => {
//   const themeColors = {
//     blue: {
//       primary: "from-blue-500 to-cyan-500",
//       accent: "text-blue-600 dark:text-blue-400",
//       secondary: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
//     },
//     indigo: {
//       primary: "from-indigo-500 to-blue-500",
//       accent: "text-indigo-600 dark:text-indigo-400",
//       secondary: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200"
//     },
//     purple: {
//       primary: "from-purple-500 to-pink-500",
//       accent: "text-purple-600 dark:text-purple-400",
//       secondary: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
//     },
//     green: {
//       primary: "from-green-500 to-teal-500",
//       accent: "text-green-600 dark:text-green-400",
//       secondary: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
//     }
//   }

//   const currentTheme = themeColors[themeColor] || themeColors.blue

//   return (
//     <section id="about" className="relative py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/50">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <div className="inline-block relative">
//             <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-15 blur-3xl -z-10`} />
//             <h2 className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r text-transparent bg-clip-text ${currentTheme.primary}`}>
//               About Me
//             </h2>
//           </div>
//           <div className={`h-1 w-20 bg-gradient-to-r mx-auto mb-6 rounded-full ${currentTheme.primary}`} />
//           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-6">
//             As a dedicated Full-Stack Developer, I specialize in creating dynamic and responsive web applications utilizing the MERN stack (MongoDB, Express.js, React, Node.js)
//           </p>
//         </motion.div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
//           <AboutCard 
//             icon={<AboutIcon />}
//             title="Professional Journey"
//             delay={0.2}
//             currentTheme={currentTheme}
//           >
//             <p>With 1 years of intensive development experience, I've delivered 5+ production-grade applications using modern web technologies. My expertise spans:</p>
//             <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
//               <li>Full-stack MERN development</li>
//               <li>Cloud-native architectures</li>
//               <li>Performance optimization</li>
//               <li>CI/CD pipelines</li>
//             </ul>
//           </AboutCard>

//           <AboutCard 
//             icon={<EducationIcon />}
//             title="Education & Certifications"
//             delay={0.4}
//             currentTheme={currentTheme}
//           >
//             <div className="space-y-6">
//               <div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white">B.Tech in Computer Science</h4>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">Rai University • 2024 - 2028</p>
//                 <p className="mt-2 text-gray-700 dark:text-gray-200">
//                   Currently pursuing a B.Tech in Computer Science with a CGPA of 9.05. I'm Ashwani Kumar, a passionate Full Stack Developer specializing in building scalable web applications using React, Node.js, MongoDB, and modern frameworks. 
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white">Professional Certifications</h4>
//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Certificate of Tech Expo 2025</li>
//                   <li>MongoDB University Certification</li>
//                   <li>React Advanced Concepts</li>
//                 </ul>
//               </div>
//             </div>
//           </AboutCard>

//           <AboutCard 
//             icon={<SkillsIcon />}
//             title="Technical Expertise"
//             delay={0.6}
//             currentTheme={currentTheme}
//           >
//             <div className="grid grid-cols-2 gap-4">
//               {['React', 'Node.js', 'MongoDB', 'Express.js', 'AWS', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((skill) => (
//                 <div 
//                   key={skill}
//                   className={`px-3 py-2 rounded-lg text-sm font-medium text-center border border-slate-200 dark:border-slate-800 transition-colors hover:${currentTheme.secondary}`}
//                 >
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           </AboutCard>
//         </div>

//         {/* Testimonials */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="mb-20"
//         >
//           <TestimonialCarousel currentTheme={currentTheme} />
//         </motion.div>

//         {/* Stats */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
//         >
//           {[
//             { value: '5+', label: 'Projects Deployed' },
//             { value: '99%', label: 'Client Satisfaction' },
//             { value: '1y', label: 'Experience' },
//             { value: '∞', label: 'Passion for Code' }
//           ].map((stat, index) => (
//             <div 
//               key={stat.label}
//               className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow"
//             >
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 whileInView={{ scale: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 className={`text-4xl font-bold mb-3 ${currentTheme.accent}`}
//               >
//                 {stat.value}
//               </motion.div>
//               <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// // About Card Component
// const AboutCard = ({ icon, title, children, delay = 0, currentTheme }) => {
//   const [isExpanded, setIsExpanded] = useState(false)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay }}
//       viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//       className="relative group"
//     >
//       <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl transition-opacity ${currentTheme.primary} opacity-0 group-hover:opacity-20 blur-xl`} />
      
//       <div className="relative bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//         <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r shadow-md ${currentTheme.primary}`}>
//           {icon}
//         </div>

//         <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
//           {title}
//         </h3>

//         <AnimatePresence initial={false}>
//           <motion.div
//             key={isExpanded ? "expanded" : "collapsed"}
//             initial={{ height: 0 }}
//             animate={{ height: isExpanded ? "auto" : 100 }}
//             exit={{ height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="text-slate-600 dark:text-slate-400 space-y-4 text-lg leading-relaxed">
//               {children}
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className={`mt-6 flex items-center gap-2 font-semibold transition-colors ${currentTheme.accent}`}
//         >
//           {isExpanded ? (
//             <>
//               Show Less
//               <ChevronUpIcon className="w-4 h-4" />
//             </>
//           ) : (
//             <>
//               Read More
//               <ChevronDownIcon className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </div>
//     </motion.div>
//   )
// }

// // Testimonial Carousel Component
// const TestimonialCarousel = ({ currentTheme }) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
  
//   const testimonials = [
//     {
//       quote: "Ashwani delivered exceptional results on our project, exceeding all expectations with his technical expertise.",
//       name: "Sarah Johnson",
//       role: "CTO at TechSolutions"
//     },
//     {
//       quote: "Working with Ashwani was a pleasure. His attention to detail and problem-solving skills are remarkable.",
//       name: "Michael Chen",
//       role: "Product Manager at InnovateX"
//     },
//     {
//       quote: "One of the most talented developers I've worked with. His code is clean, efficient, and well-documented.",
//       name: "Emily Rodriguez",
//       role: "Lead Developer at DigitalCraft"
//     }
//   ]

//   return (
//     <div className="relative max-w-4xl mx-auto">
//       <div className={`absolute inset-0 bg-gradient-to-r rounded-3xl opacity-10 blur-xl ${currentTheme.primary}`} />
      
//       <motion.div
//         key={currentIndex}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.4 }}
//         className="relative bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg"
//       >
//         <QuoteIcon className={`w-8 h-8 mb-6 ${currentTheme.accent}`} />
        
//         <blockquote className="text-xl lg:text-2xl font-medium text-slate-800 dark:text-slate-200 mb-8">
//           {testimonials[currentIndex].quote}
//         </blockquote>
        
//         <div className="flex items-center gap-4">
//           <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center text-white font-bold text-xl`}>
//             {testimonials[currentIndex].name.charAt(0)}
//           </div>
//           <div>
//             <p className="font-bold text-slate-900 dark:text-white">
//               {testimonials[currentIndex].name}
//             </p>
//             <p className={`text-sm ${currentTheme.accent}`}>
//               {testimonials[currentIndex].role}
//             </p>
//           </div>
//         </div>
        
//         <div className="flex gap-2 mt-8 justify-center">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? currentTheme.accent : 'bg-slate-300 dark:bg-slate-700'}`}
//               aria-label={`Go to testimonial ${index + 1}`}
//             />
//           ))}
//         </div>
        
//         <div className="flex justify-between mt-6">
//           <button 
//             onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
//             className={`p-2 rounded-full border border-slate-200 dark:border-slate-700 ${currentTheme.accent} hover:bg-slate-50 dark:hover:bg-slate-800`}
//             aria-label="Previous testimonial"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//             </svg>
//           </button>
//           <button 
//             onClick={() => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
//             className={`p-2 rounded-full border border-slate-200 dark:border-slate-700 ${currentTheme.accent} hover:bg-slate-50 dark:hover:bg-slate-800`}
//             aria-label="Next testimonial"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//             </svg>
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// // Icons
// const AboutIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//   </svg>
// )

// const EducationIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
//   </svg>
// )

// const SkillsIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
//   </svg>
// )

// const QuoteIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
//   </svg>
// )

// const ChevronDownIcon = (props) => (
//   <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//   </svg>
// )

// const ChevronUpIcon = (props) => (
//   <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
//   </svg>
// )

// export default AboutSection