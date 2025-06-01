"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Heart, Coffee, Code, Server, Figma, Monitor, Database, Layout } from "lucide-react"
import * as Tabs from "@radix-ui/react-tabs"
import { cn } from "../utils/cn"
import { themeColors } from "../ui/color-selector"

// Updated image imports with GitHub URLs
const portfolio = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/portfolio.png?raw=true"
const coffee = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/coffee.png?raw=true"
const youtube = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/youtube%20clone.png?raw=true"
const reactroutertask = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/react%20router%20task.png?raw=true"
const yourlogo = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/yourlogo.png?raw=true"
const mernapp = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/Luxora.png?raw=true"
const foodeat = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/Food%20Eat.png?raw=true"
const reduxapi = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/Redux-Api.png?raw=true"
const bgchanger = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/BG-Changer.png?raw=true"
const sdsteel = "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/SD%20Steel.png?raw=true"

// 1. Add a tech icon mapping function
const techIcons = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TailwindCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  // Add more as needed
}

export default function ProjectsSection({ themeColor = "blue" }) {
  const [favorites, setFavorites] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [modalProject, setModalProject] = useState(null)
  
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
      techStack: ["React", "TailwindCSS", "JavaScript"],
      year: "2024",
      role: "Full Stack Developer",
      status: "Live",
      category: "react",
      image: portfolio,
      githubUrl: "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI",
      liveUrl: "https://chic-cactus-199732.netlify.app/",
      featured: true
    },
    {
      id: "mern-app",
      title: "MERN Stack App",
      description: "A full stack MERN application with authentication and CRUD operations.",
      tags: ["MongoDB", "Express", "React", "Node"],
      category: ["mern", "backend"],
      image: mernapp,
      githubUrl: "https://github.com/Ashwanikumar0555/luxora",
      liveUrl: "https://vocal-pithivier-6af21a.netlify.app/",
      featured: true,
      features: [
        "Modern business landing page",
        "Product & service showcase",
        "Contact form integration",
        "Fully responsive design"
      ]
    },
    {
      id: "sd-steel",
      title: "SD Steel",
      description: "A modern, responsive website for SD Steel, featuring a sleek UI, product showcase, and contact integration. Built with React and TailwindCSS for a seamless user experience.",
      tags: ["React", "TailwindCSS", "Frontend", "Business"],
      techStack: ["React", "TailwindCSS", "JavaScript"],
      year: "2024",
      role: "Frontend Developer",
      status: "Live",
      category: "react",
      image: sdsteel,
      githubUrl: "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/SD%20Steel.png?raw=true",
      liveUrl: "https://lambent-toffee-26a719.netlify.app/",
      featured: true,
      features: [
        "Modern business landing page",
        "Product & service showcase",
        "Contact form integration",
        "Fully responsive design"
      ]
    },
    {
      id: "coffee-project",
      title: "Modern Coffee Shop",
      description: "An elegant and responsive coffee shop website featuring online ordering, a customer loyalty program, and a seamless user experience.",
      tags: ["React", "TailwindCSS", "Responsive"],
      techStack: ["React", "TailwindCSS", "JavaScript"],
      year: "2023",
      role: "Frontend Developer",
      status: "Live",
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
      githubUrl: "https://github.com/Ashwanikumar0555/youtube-clone-main",
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
      githubUrl: "https://github.com/Ashwanikumar0555/react-route-task-",
      liveUrl: "https://reactroutertaskapi.netlify.app/",
      featured: false
    },
    {
      id: "your-logo",
      title: "Your Logo",
      description: "A modern logo design and branding project.",
      tags: ["Design", "Branding", "Logo", "React"],
      category: ["figma", "react"],
      image: yourlogo,
      githubUrl: "https://github.com/Ashwanikumar0555/Your-logo-",
      liveUrl: "https://yourlog.netlify.app/about",
      featured: false
    },
    {
      id: "food-eat",
      title: "Food Eat",
      description: "A responsive food ordering website built with HTML and CSS.",
      tags: ["HTML", "CSS", "Responsive"],
      category: "html-css",
      image: foodeat,
      githubUrl: "https://github.com/Ashwanikumar0555/foodeat",
      liveUrl: "https://foodeatak.netlify.app/",
      featured: false
    },
    {
      id: "redux-api",
      title: "Redux API Integration",
      description: "React application showcasing Redux integration with API calls.",
      tags: ["React", "Redux", "API"],
      category: "react",
      image: reduxapi,
      githubUrl: "https://github.com/Ashwanikumar0555/Redux-api",
      liveUrl: "https://reduxak.netlify.app/",
      featured: false
    },
    {
      id: "bg-changer",
      title: "Background Changer",
      description: "React and Tailwind CSS app for dynamic background color changes.",
      tags: ["React", "TailwindCSS"],
      category: "react",
      image: bgchanger,
      githubUrl: "https://github.com/Ashwanikumar0555/bg-changer",
      liveUrl: "https://bg-changerak.netlify.app/",
      featured: false
    }
  ]

  const filteredProjects = allProjects
    .filter(project => {
      if (activeCategory !== "all" && 
          (Array.isArray(project.category) 
            ? !project.category.includes(activeCategory)
            : project.category !== activeCategory)) {
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
                        {project.id === "sd-steel" && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-xs font-bold text-white rounded shadow-lg animate-pulse">
                            New • React Frontend
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
                        {project.id === "sd-steel" && project.features && (
                          <ul className="mb-2 ml-2 list-disc text-xs text-blue-700 dark:text-blue-300">
                            {project.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{project.year}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{project.status}</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{project.role}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {project.techStack && project.techStack.map(tech => (
                            <img key={tech} src={techIcons[tech]} alt={tech} title={tech} className="h-5 w-5" />
                          ))}
                        </div>
                        <button onClick={() => setModalProject(project)} className="mt-2 px-3 py-1.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200 transition">Details</button>
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
                          {project.id === "sd-steel" && project.features && (
                            <ul className="mb-2 ml-2 list-disc text-xs text-blue-700 dark:text-blue-300">
                              {project.features.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          )}
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
                        {project.id === "sd-steel" && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-xs font-bold text-white rounded shadow-lg animate-pulse">
                            New • React Frontend
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Project Details Modal */}
      {modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
            <button onClick={() => setModalProject(null)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 text-xl">&times;</button>
            <img src={modalProject.image} alt={modalProject.title} className="rounded-lg w-full h-48 object-cover mb-4" />
            <h2 className="text-2xl font-bold mb-2">{modalProject.title}</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {modalProject.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{modalProject.year}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{modalProject.status}</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{modalProject.role}</span>
            </div>
            <p className="mb-3 text-slate-700 dark:text-slate-300 text-sm">{modalProject.description}</p>
            {modalProject.features && (
              <ul className="mb-3 ml-4 list-disc text-xs text-blue-700 dark:text-blue-300">
                {modalProject.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            <div className="flex gap-2 mb-3">
              {modalProject.techStack && modalProject.techStack.map(tech => (
                <img key={tech} src={techIcons[tech]} alt={tech} title={tech} className="h-6 w-6" />
              ))}
            </div>
            <div className="flex gap-3">
              <a href={modalProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Live Demo</a>
              <a href={modalProject.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition">Code</a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}