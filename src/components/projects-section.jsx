

// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Github, ExternalLink, Heart, Coffee } from "lucide-react"
// import * as Tabs from "@radix-ui/react-tabs"
// import { cn } from "../utils/cn"
// import { themeColors } from "../ui/color-selector"
// import ProjectCard from "../components/project-card"
// import coffee from "../assets/coffee.png"

// export default function ProjectsSection({ themeColor = "blue" }) {
//   const [favorites, setFavorites] = useState([])
//   const [activeCategory, setActiveCategory] = useState("all")
//   const [isLoading, setIsLoading] = useState(false)
  
//   // Load favorites from localStorage
//   useEffect(() => {
//     const savedFavorites = localStorage.getItem("projectFavorites")
//     if (savedFavorites) {
//       try {
//         setFavorites(JSON.parse(savedFavorites))
//       } catch (e) {
//         console.error("Failed to parse favorites", e)
//       }
//     }
//   }, [])
  
//   // Save favorites to localStorage
//   useEffect(() => {
//     localStorage.setItem("projectFavorites", JSON.stringify(favorites))
//   }, [favorites])

//   const categories = [
//     { value: "all", label: "All Projects" },
//     { value: "react", label: "React" }
//   ]

//   // Single coffee project
//   const allProjects = [
//     {
//       id: "coffee-project",
//       title: "Modern Coffee Shop",
//       description: "An elegant and responsive coffee shop website featuring online ordering, a customer loyalty program, and a seamless user experience. Built with modern web technologies.",
//       tags: ["React", "TailwindCSS", "Responsive Design"],
//       category: "react",
//       image: coffee,
//       githubUrl: "https://github.com/Ashwanikumar0555/Coffee-",
//       liveUrl: "https://coffee-ak.onrender.com/",
//       features: [
//         "Online ordering system",
//         "Customer loyalty program",
//         "Responsive design",
//         "Modern UI/UX"
//       ]
//     }
//   ]

//   // Filter projects by category
//   const filteredProjects = activeCategory === "all" 
//     ? allProjects 
//     : allProjects.filter(project => project.category === activeCategory)

//   const toggleFavorite = (projectId) => {
//     setFavorites(prev => 
//       prev.includes(projectId)
//         ? prev.filter(id => id !== projectId)
//         : [...prev, projectId]
//     )
//   }

//   // Simulate fetching projects based on category
//   const fetchProjectsByCategory = (category) => {
//     setIsLoading(true)
//     setActiveCategory(category)
    
//     setTimeout(() => {
//       setIsLoading(false)
//     }, 400)
//   }

//   const colorGradient = themeColors[themeColor]?.primary || themeColors.blue.primary
//   const buttonGradient = themeColors[themeColor]?.button || themeColors.blue.button
//   const accentColor = themeColors[themeColor]?.accent || "text-blue-600 dark:text-blue-400"

//   return (
//     <section id="projects" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Header section with coffee icon */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="flex items-center justify-center mb-4">
//             <Coffee className={cn("h-10 w-10 mr-3", accentColor)} />
//             <h2 className={cn(
//               "text-4xl md:text-5xl font-bold bg-gradient-to-r text-transparent bg-clip-text inline-block",
//               colorGradient
//             )}>
//               Featured Project
//             </h2>
//           </div>
//           <div className={cn("h-1.5 w-24 bg-gradient-to-r mx-auto mb-8", colorGradient)} />
//           <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg md:text-xl">
//             Explore my coffee shop project - a showcase of modern web development with React and TailwindCSS.
//           </p>
//         </motion.div>

//         {/* Project Display */}
//         <div className="grid grid-cols-1 gap-8">
//           {filteredProjects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               viewport={{ once: true }}
//               className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl overflow-hidden"
//             >
//               <div className="grid md:grid-cols-2 gap-6 p-6">
//                 <div className="relative group">
//                   <img 
//                     src={project.image} 
//                     alt={project.title}
//                     className="w-full h-[300px] object-cover rounded-xl shadow-md transition-transform group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-3 bg-white rounded-full hover:bg-slate-100 transition-colors"
//                     >
//                       <ExternalLink className="h-6 w-6 text-slate-900" />
//                     </a>
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-3 bg-white rounded-full hover:bg-slate-100 transition-colors"
//                     >
//                       <Github className="h-6 w-6 text-slate-900" />
//                     </a>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
//                       {project.title}
//                     </h3>
//                     <p className="text-slate-600 dark:text-slate-300 mb-6">
//                       {project.description}
//                     </p>
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {project.tags.map(tag => (
//                         <span 
//                           key={tag}
//                           className={cn(
//                             "px-3 py-1 rounded-full text-sm font-medium",
//                             "bg-gradient-to-r text-white",
//                             buttonGradient
//                           )}
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-4">
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={cn(
//                         "flex-1 text-center px-6 py-3 rounded-lg text-white font-medium",
//                         "bg-gradient-to-r shadow-md hover:shadow-lg transition-all",
//                         buttonGradient
//                       )}
//                     >
//                       Live Demo
//                     </a>
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 text-center px-6 py-3 rounded-lg font-medium border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
//                     >
//                       View Code
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Heart, Coffee, Code, Server, Figma, Monitor, Database, Layout } from "lucide-react"
import * as Tabs from "@radix-ui/react-tabs"
import { cn } from "../utils/cn"
import { themeColors } from "../ui/color-selector"
import portfolio from "../assets/portfolio.png"
import coffee from "../assets/coffee.png"
import youtube from "../assets/youtube clone.png"
import reactroutertask from "../assets/react router task.png"
import yourlogo from "../assets/yourlogo.png"

export default function ProjectsSection({ themeColor = "blue" }) {
  const [favorites, setFavorites] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem("projectFavorites")
    const savedViewMode = localStorage.getItem("projectViewMode")
    
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites", e)
      }
    }
    
    if (savedViewMode) {
      setViewMode(savedViewMode)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("projectFavorites", JSON.stringify(favorites))
  }, [favorites])
  
  useEffect(() => {
    localStorage.setItem("projectViewMode", viewMode)
  }, [viewMode])

  const categories = [
    { value: "all", label: "All Projects", icon: <Layout className="w-4 h-4" /> },
    { value: "react", label: "React", icon: <Code className="w-4 h-4" /> },
    { value: "html-css", label: "HTML/CSS", icon: <Monitor className="w-4 h-4" /> },
    { value: "figma", label: "Figma", icon: <Figma className="w-4 h-4" /> },
    { value: "backend", label: "Backend", icon: <Server className="w-4 h-4" /> },
    { value: "mern", label: "MERN Stack", icon: <Database className="w-4 h-4" /> }
  ]

  const allProjects = [

    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "My personal portfolio showcasing projects and skills.",
      tags: ["React", "TailwindCSS", "Portfolio"],
      category: "react",
      image: portfolio,
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "#",
      featured: true
    },
    {
      id: "coffee-project",
      title: "Modern Coffee Shop",
      description: "An elegant and responsive coffee shop website featuring online ordering, a customer loyalty program, and a seamless user experience.",
      tags: ["React", "TailwindCSS", "Responsive"],
      category: "react",
      image: coffee,
      githubUrl: "https://github.com/Ashwanikumar0555/Coffee-",
      liveUrl: "https://coffee-ak.onrender.com/",
      featured: true
    },
    {
      id: "youtube-clone",
      title: "YouTube Clone",
      description: "A YouTube clone with video playback, search, and recommendations.",
      tags: ["React", "YouTube API", "Responsive"],
      category: "react",
      image: youtube,
      githubUrl: "https://github.com/yourusername/youtube-clone",
      liveUrl: "https://youtubeclonemainn.netlify.app/",
      featured: true
    },
    {
      id: "react-router",
      title: "React Router Task",
      description: "Implementation of React Router with API integration.",
      tags: ["React", "Router", "API"],
      category: "react",
      image: reactroutertask,
      githubUrl: "https://github.com/yourusername/react-router-task",
      liveUrl: "https://reactroutertaskapi.netlify.app/",
      featured: false
    },
    {
      id: "your-logo",
      title: "Your Logo",
      description: "A modern logo design and branding project.",
      tags: ["Design", "Branding", "Logo"],
      category: "figma",
      image: yourlogo,
      githubUrl: "#",
      liveUrl: "https://yourlog.netlify.app/about",
      featured: false
    },
    // {
    //   id: "portfolio",
    //   title: "Portfolio Website",
    //   description: "My personal portfolio showcasing projects and skills.",
    //   tags: ["React", "TailwindCSS", "Portfolio"],
    //   category: "react",
    //   image: portfolio,
    //   githubUrl: "https://github.com/yourusername/portfolio",
    //   liveUrl: "#",
    //   featured: true
    // }
  ]

  // Rest of the code remains the same...
  // (Keep all the filtering, sorting, and UI rendering logic as is)

  const filteredProjects = allProjects
    .filter(project => {
      if (activeCategory !== "all" && project.category !== activeCategory) {
        return false
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      return true
    })
    
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    
    const aIsFavorite = favorites.includes(a.id)
    const bIsFavorite = favorites.includes(b.id)
    
    if (aIsFavorite && !bIsFavorite) return -1
    if (!aIsFavorite && bIsFavorite) return 1
    
    return 0
  })

  const toggleFavorite = (projectId) => {
    setFavorites(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const handleCategoryChange = (category) => {
    setIsLoading(true)
    setActiveCategory(category)
    
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const colorGradient = themeColors[themeColor]?.primary || themeColors.blue.primary
  const buttonGradient = themeColors[themeColor]?.button || themeColors.blue.button
  const accentColor = themeColors[themeColor]?.accent || "text-blue-600 dark:text-blue-400"
  const hoverBg = themeColors[themeColor]?.hoverBg || "hover:bg-blue-50 dark:hover:bg-blue-900/20"

  return (
    <section id="projects" className="py-16 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Coffee className={cn("h-8 w-8 mr-3", accentColor)} />
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold bg-gradient-to-r text-transparent bg-clip-text inline-block",
              colorGradient
            )}>
              My Projects
            </h2>
          </div>
          <div className={cn("h-1 w-20 bg-gradient-to-r mx-auto mb-6", colorGradient)} />
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Explore my portfolio of projects across various technologies and domains
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-200 dark:border-slate-700 
                           bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <button 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-4 py-2 rounded-l-lg flex items-center justify-center",
                  viewMode === "grid" 
                    ? cn("bg-gradient-to-r text-white", buttonGradient) 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-4 py-2 rounded-r-lg flex items-center justify-center",
                  viewMode === "list" 
                    ? cn("bg-gradient-to-r text-white", buttonGradient) 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs.Root 
            value={activeCategory} 
            onValueChange={handleCategoryChange}
          >
            <Tabs.List 
              className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-700"
              aria-label="Project categories"
            >
              {categories.map((category) => (
                <Tabs.Trigger
                  key={category.value}
                  value={category.value}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                    activeCategory === category.value
                      ? cn("bg-gradient-to-r text-white", buttonGradient)
                      : cn("bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700", hoverBg)
                  )}
                >
                  {category.icon}
                  {category.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        {/* Projects Display */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No projects found. Try a different search or category.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-4"
              )}
            >
              {sortedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "bg-white dark:bg-slate-800/50 rounded-xl shadow-md overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all",
                    viewMode === "list" && "flex flex-col md:flex-row"
                  )}
                >
                  {/* Project Card Content */}
                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="relative group h-48">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5 text-slate-900" />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                          >
                            <Github className="h-5 w-5 text-slate-900" />
                          </a>
                          <button
                            onClick={() => toggleFavorite(project.id)}
                            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                          >
                            <Heart 
                              className={cn(
                                "h-5 w-5",
                                favorites.includes(project.id) 
                                  ? "fill-red-500 text-red-500" 
                                  : "text-slate-900"
                              )} 
                            />
                          </button>
                        </div>
                        {project.featured && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-xs font-bold text-white rounded">
                            Featured
                          </div>
                        )}
                        {favorites.includes(project.id) && (
                          <div className="absolute top-2 right-2 p-1 bg-white rounded-full">
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-56 h-40 md:h-auto">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {project.featured && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-xs font-bold text-white rounded">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                              {project.title}
                            </h3>
                            <button
                              onClick={() => toggleFavorite(project.id)}
                              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/50"
                            >
                              <Heart 
                                className={cn(
                                  "h-4 w-4",
                                  favorites.includes(project.id) 
                                    ? "fill-red-500 text-red-500" 
                                    : "text-slate-400 dark:text-slate-500"
                                )} 
                              />
                            </button>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.map(tag => (
                              <span 
                                key={tag}
                                className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium",
                              "bg-gradient-to-r text-white",
                              buttonGradient
                            )}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}