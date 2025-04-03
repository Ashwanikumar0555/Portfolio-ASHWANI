// "use client";

// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
// import { useInView } from 'react-intersection-observer';
// import { cn } from "../utils/cn";
// import { themeColors } from "../ui/color-selector";
// import { Code, Database, Wrench, Layers, Search, ChevronDown, X, RotateCw, Star, Zap, Award, TrendingUp, Filter, Check, AlertCircle, Palette, Sparkles } from 'lucide-react';

// // Mock API fetch function - replace with actual API call in production
// const fetchSkillsData = async () => {
//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 300));
  
//   return [
//     { name: "HTML", level: 95, category: "frontend", icon: <Code size={18} />, difficulty: "beginner", featured: false },
//     { name: "CSS", level: 90, category: "frontend", icon: <Code size={18} />, difficulty: "intermediate", featured: true },
//     { name: "JavaScript", level: 88, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: true },
//     { name: "TypeScript", level: 82, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: false },
//     { name: "React", level: 85, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: true },
//     { name: "Next.js", level: 80, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: true },
//     { name: "Tailwind CSS", level: 90, category: "frontend", icon: <Code size={18} />, difficulty: "intermediate", featured: true },
//     { name: "Node.js", level: 80, category: "backend", icon: <Database size={18} />, difficulty: "advanced", featured: true },
//     { name: "Express.js", level: 80, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: false },
//     { name: "MongoDB", level: 75, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: false },
//     { name: "PostgreSQL", level: 70, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: false },
//     { name: "REST API", level: 82, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: true },
//     { name: "GraphQL", level: 75, category: "backend", icon: <Database size={18} />, difficulty: "advanced", featured: false },
//     { name: "Git & GitHub", level: 85, category: "tools", icon: <Wrench size={18} />, difficulty: "beginner", featured: true },
//     { name: "Docker", level: 70, category: "tools", icon: <Wrench size={18} />, difficulty: "intermediate", featured: false },
//     { name: "VS Code", level: 90, category: "tools", icon: <Wrench size={18} />, difficulty: "beginner", featured: false },
//     { name: "Figma", level: 70, category: "tools", icon: <Wrench size={18} />, difficulty: "intermediate", featured: false },
//     { name: "Responsive Design", level: 92, category: "other", icon: <Layers size={18} />, difficulty: "intermediate", featured: true },
//     { name: "Web Accessibility", level: 80, category: "other", icon: <Layers size={18} />, difficulty: "intermediate", featured: false },
//     { name: "API Integration", level: 80, category: "other", icon: <Layers size={18} />, difficulty: "advanced", featured: true },
//     { name: "Performance Optimization", level: 78, category: "other", icon: <Layers size={18} />, difficulty: "advanced", featured: false },
//   ];
// };

// const categories = [
//   { id: "all", title: "All Skills", icon: <Layers size={24} />, description: "Show all technical skills", color: "gray" },
//   { id: "frontend", title: "Frontend", icon: <Code size={24} />, description: "UI/UX development technologies", color: "blue" },
//   { id: "backend", title: "Backend", icon: <Database size={24} />, description: "Server-side technologies", color: "purple" },
//   { id: "tools", title: "Dev Tools", icon: <Wrench size={24} />, description: "Development workflow tools", color: "green" },
//   { id: "other", title: "Core Concepts", icon: <Award size={24} />, description: "Fundamental web principles", color: "orange" },
// ];

// const difficulties = [
//   { id: "all", title: "All Levels", icon: <Layers size={16} />, color: "gray" },
//   { id: "beginner", title: "Beginner", icon: <Zap size={16} />, color: "green" },
//   { id: "intermediate", title: "Intermediate", icon: <TrendingUp size={16} />, color: "yellow" },
//   { id: "advanced", title: "Advanced", icon: <Star size={16} />, color: "red" },
// ];

// const sortOptions = [
//   { id: "level", title: "Proficiency", icon: <TrendingUp size={16} /> },
//   { id: "name", title: "Alphabetical", icon: <Code size={16} /> },
//   { id: "featured", title: "Featured", icon: <Star size={16} /> },
// ];

// const getThemeClasses = (themeColorKey) => {
//   const theme = themeColors[themeColorKey] || themeColors.blue;
//   if (!theme) {
//     console.error(`Theme not found for key: ${themeColorKey}, and fallback 'blue' failed.`);
//     return {};
//   }
//   return {
//     gradientText: theme.primary ?? '',
//     accentColor: theme.accent ?? '',
//     progressBar: theme.progress || theme.primary || '',
//     shadow: theme.shadow || 'shadow-blue-500/30',
//     border: theme.border || 'border-blue-500/30',
//     bgLight: theme.bgLight || 'bg-blue-50',
//     bgDark: theme.bgDark || 'bg-blue-900/30',
//     buttonGradient: theme.button || theme.primary || '',
//     ringColor: theme.border ? theme.border.replace('border-', 'ring-') : 'ring-blue-500/30',
//   };
// };

// const SkillBadge = ({ difficulty, featured, themeClasses }) => {
//   const difficultyStyles = {
//     beginner: { class: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300", icon: <Zap size={12} /> },
//     intermediate: { class: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300", icon: <TrendingUp size={12} /> },
//     advanced: { class: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300", icon: <Star size={12} /> },
//   };
//   const styles = difficultyStyles[difficulty] || difficultyStyles.intermediate;
//   return (
//     <div className="flex items-center gap-1.5 flex-wrap">
//       <span className={cn("text-xs px-2 py-0.5 rounded-full flex items-center gap-1", styles.class)}>
//         {styles.icon} {difficulty}
//       </span>
//       {featured && (
//         <span className={cn("text-xs px-2 py-0.5 rounded-full flex items-center gap-1", themeClasses.bgLight, themeClasses.accentColor)}>
//           <Sparkles size={12} /> Featured
//         </span>
//       )}
//     </div>
//   );
// };

// const AnimatedSkillBar = ({ name, level, icon, isHighlighted, themeClasses = {}, difficulty, featured }) => {
//   const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
//   const progress = useMotionValue(0);
//   const springProgress = useSpring(progress, { damping: 40, stiffness: 200 });
//   const width = useTransform(springProgress, val => `${val}%`);
  
//   useEffect(() => {
//     if (inView) progress.set(level);
//   }, [inView, level]);

//   return (
//     <motion.div
//       ref={ref}
//       className={cn(
//         "group p-4 rounded-lg border transition-all duration-300",
//         isHighlighted === false ? "opacity-50" : "opacity-100",
//         "hover:shadow-lg hover:scale-[1.02] border-slate-200/50 dark:border-slate-700/50",
//         "bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm"
//       )}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       whileHover={{ scale: 1.02 }}
//       layout
//     >
//       <div className="flex items-start justify-between mb-2 gap-4">
//         <div className="flex items-center gap-3 flex-grow min-w-0">
//           <div className={cn("p-2 rounded-lg", themeClasses.bgLight)}>
//             {React.cloneElement(icon, { className: themeClasses.accentColor })}
//           </div>
//           <div className="flex-grow min-w-0">
//             <h4 className="font-medium text-slate-900 dark:text-white mb-1">{name}</h4>
//             <SkillBadge difficulty={difficulty} featured={featured} themeClasses={themeClasses} />
//           </div>
//         </div>
//         <div className={cn("text-lg font-semibold tabular-nums", themeClasses.accentColor)}>
//           {Math.round(springProgress.get())}%
//         </div>
//       </div>
      
//       <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
//         <motion.div
//           className={cn("h-full rounded-full relative", themeClasses.progressBar)}
//           style={{ width }}
//         >
//           <div className="absolute inset-0 rounded-full shadow-inner opacity-20" />
//           <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// const SkillsSection = ({ themeColor = 'blue' }) => {
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedDifficulty, setSelectedDifficulty] = useState('all');
//   const [sortBy, setSortBy] = useState('level');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   const themeClasses = useMemo(() => getThemeClasses(themeColor), [themeColor]);

//   useEffect(() => {
//     const loadSkills = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchSkillsData();
//         setSkills(data);
//       } catch (err) {
//         setError('Failed to load skills data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadSkills();
//   }, []);

//   const filteredAndSortedSkills = useMemo(() => {
//     let result = [...skills];

//     // Apply category filter
//     if (selectedCategory !== 'all') {
//       result = result.filter(skill => skill.category === selectedCategory);
//     }

//     // Apply difficulty filter
//     if (selectedDifficulty !== 'all') {
//       result = result.filter(skill => skill.difficulty === selectedDifficulty);
//     }

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(skill => 
//         skill.name.toLowerCase().includes(query) ||
//         skill.category.toLowerCase().includes(query) ||
//         skill.difficulty.toLowerCase().includes(query)
//       );
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case 'level':
//         result.sort((a, b) => b.level - a.level);
//         break;
//       case 'name':
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case 'featured':
//         result.sort((a, b) => {
//           if (a.featured === b.featured) return b.level - a.level;
//           return a.featured ? -1 : 1;
//         });
//         break;
//       default:
//         break;
//     }

//     return result;
//   }, [skills, selectedCategory, selectedDifficulty, searchQuery, sortBy]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleDifficultyChange = (difficulty) => {
//     setSelectedDifficulty(difficulty);
//   };

//   const handleSortChange = (sort) => {
//     setSortBy(sort);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleClearFilters = () => {
//     setSelectedCategory('all');
//     setSelectedDifficulty('all');
//     setSortBy('level');
//     setSearchQuery('');
//   };

//   return (
//     <section id="skills" className="relative py-20 lg:py-28">
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
//             <div className={cn("absolute inset-0 opacity-15 blur-3xl -z-10", themeClasses.gradientText)} />
//             <h2 className={cn("text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent", themeClasses.gradientText)}>
//               Technical Skills
//             </h2>
//           </div>
//           <div className={cn("h-1 w-20 mx-auto mb-6 rounded-full", themeClasses.gradientText)} />
//           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
//             A comprehensive overview of my technical expertise and proficiency levels across various technologies and tools.
//           </p>
//         </motion.div>

//         {/* Filters Section */}
//         <div className="mb-8">
//           <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//             <div className="flex items-center gap-2 flex-grow md:flex-grow-0">
//               <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search skills..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-blue-500 dark:focus:ring-blue-400"
//                 />
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={cn(
//                   "p-2 rounded-lg border border-slate-200 dark:border-slate-700",
//                   "hover:bg-slate-50 dark:hover:bg-slate-800",
//                   "text-slate-600 dark:text-slate-300",
//                   showFilters && "bg-slate-50 dark:bg-slate-800"
//                 )}
//                 aria-label="Toggle filters"
//               >
//                 <Filter size={20} />
//               </button>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-slate-500 dark:text-slate-400">
//                 {filteredAndSortedSkills.length} skills
//               </span>
//               {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || sortBy !== 'level' || searchQuery) && (
//                 <button
//                   onClick={handleClearFilters}
//                   className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
//                 >
//                   <RotateCw size={14} />
//                   Reset
//                 </button>
//               )}
//             </div>
//           </div>

//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="overflow-hidden"
//               >
//                 <div className="py-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
//                   {/* Categories */}
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => handleCategoryChange(category.id)}
//                           className={cn(
//                             "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
//                             selectedCategory === category.id
//                               ? cn("bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300", themeClasses.accentColor)
//                               : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                           )}
//                         >
//                           {category.icon}
//                           {category.title}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Difficulties */}
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Difficulty Level</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {difficulties.map(difficulty => (
//                         <button
//                           key={difficulty.id}
//                           onClick={() => handleDifficultyChange(difficulty.id)}
//                           className={cn(
//                             "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
//                             selectedDifficulty === difficulty.id
//                               ? cn("bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300", themeClasses.accentColor)
//                               : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                           )}
//                         >
//                           {difficulty.icon}
//                           {difficulty.title}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Sort Options */}
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Sort By</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {sortOptions.map(option => (
//                         <button
//                           key={option.id}
//                           onClick={() => handleSortChange(option.id)}
//                           className={cn(
//                             "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
//                             sortBy === option.id
//                               ? cn("bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300", themeClasses.accentColor)
//                               : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                           )}
//                         >
//                           {option.icon}
//                           {option.title}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Skills Grid */}
//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center py-12 text-red-500">
//             <AlertCircle className="mr-2" />
//             {error}
//           </div>
//         ) : (
//           <AnimatePresence mode="popLayout">
//             <motion.div
//               layout
//               className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             >
//               {filteredAndSortedSkills.map((skill) => (
//                 <AnimatedSkillBar
//                   key={skill.name}
//                   {...skill}
//                   themeClasses={themeClasses}
//                   isHighlighted={
//                     !searchQuery || 
//                     skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     skill.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
//                   }
//                 />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SkillsSection;


"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { cn } from "../utils/cn";
import { themeColors } from "../ui/color-selector";
import { 
  Code, Database, Wrench, Layers, Search, ChevronDown, X, RotateCw, 
  Star, Zap, Award, TrendingUp, Filter, Check, AlertCircle, 
  Palette, Sparkles, ArrowDown, MousePointer 
} from 'lucide-react';

// Mock API fetch function - replace with actual API call in production
const fetchSkillsData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    { name: "HTML", level: 95, category: "frontend", icon: <Code size={18} />, difficulty: "beginner", featured: false },
    { name: "CSS", level: 90, category: "frontend", icon: <Code size={18} />, difficulty: "intermediate", featured: true },
    { name: "JavaScript", level: 88, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: true },
    // { name: "TypeScript", level: 82, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: false },
    { name: "React", level: 85, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: true },
    // { name: "Next.js", level: 80, category: "frontend", icon: <Code size={18} />, difficulty: "advanced", featured: true },
    { name: "Tailwind CSS", level: 90, category: "frontend", icon: <Code size={18} />, difficulty: "intermediate", featured: true },
    { name: "Node.js", level: 80, category: "backend", icon: <Database size={18} />, difficulty: "advanced", featured: true },
    { name: "Express.js", level: 80, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: false },
    { name: "MongoDB", level: 75, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: false },
    // { name: "PostgreSQL", level: 70, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: false },
    { name: "REST API", level: 82, category: "backend", icon: <Database size={18} />, difficulty: "intermediate", featured: true },
    // { name: "GraphQL", level: 75, category: "backend", icon: <Database size={18} />, difficulty: "advanced", featured: false },
    { name: "Git & GitHub", level: 85, category: "tools", icon: <Wrench size={18} />, difficulty: "beginner", featured: true },
    // { name: "Docker", level: 70, category: "tools", icon: <Wrench size={18} />, difficulty: "intermediate", featured: false },
    { name: "VS Code", level: 90, category: "tools", icon: <Wrench size={18} />, difficulty: "beginner", featured: false },
    { name: "Figma", level: 70, category: "tools", icon: <Wrench size={18} />, difficulty: "intermediate", featured: false },
    { name: "Responsive Design", level: 92, category: "other", icon: <Layers size={18} />, difficulty: "intermediate", featured: true },
    { name: "Web Accessibility", level: 80, category: "other", icon: <Layers size={18} />, difficulty: "intermediate", featured: false },
    { name: "API Integration", level: 80, category: "other", icon: <Layers size={18} />, difficulty: "advanced", featured: true },
    { name: "Performance Optimization", level: 78, category: "other", icon: <Layers size={18} />, difficulty: "advanced", featured: false },
  ];
};

const categories = [
  { id: "all", title: "All Skills", icon: <Layers size={24} />, description: "Show all technical skills", color: "gray" },
  { id: "frontend", title: "Frontend", icon: <Code size={24} />, description: "UI/UX development technologies", color: "blue" },
  { id: "backend", title: "Backend", icon: <Database size={24} />, description: "Server-side technologies", color: "purple" },
  { id: "tools", title: "Dev Tools", icon: <Wrench size={24} />, description: "Development workflow tools", color: "green" },
  { id: "other", title: "Core Concepts", icon: <Award size={24} />, description: "Fundamental web principles", color: "orange" },
];

const difficulties = [
  { id: "all", title: "All Levels", icon: <Layers size={16} />, color: "gray" },
  { id: "beginner", title: "Beginner", icon: <Zap size={16} />, color: "green" },
  { id: "intermediate", title: "Intermediate", icon: <TrendingUp size={16} />, color: "yellow" },
  { id: "advanced", title: "Advanced", icon: <Star size={16} />, color: "red" },
];

const sortOptions = [
  { id: "level", title: "Proficiency", icon: <TrendingUp size={16} /> },
  { id: "name", title: "Alphabetical", icon: <Code size={16} /> },
  { id: "featured", title: "Featured", icon: <Star size={16} /> },
];

const getThemeClasses = (themeColorKey) => {
  const theme = themeColors[themeColorKey] || themeColors.blue;
  if (!theme) {
    console.error(`Theme not found for key: ${themeColorKey}, and fallback 'blue' failed.`);
    return {};
  }
  return {
    gradientText: theme.primary ?? '',
    accentColor: theme.accent ?? '',
    progressBar: theme.progress || theme.primary || '',
    shadow: theme.shadow || 'shadow-blue-500/30',
    border: theme.border || 'border-blue-500/30',
    bgLight: theme.bgLight || 'bg-blue-50',
    bgDark: theme.bgDark || 'bg-blue-900/30',
    buttonGradient: theme.button || theme.primary || '',
    ringColor: theme.border ? theme.border.replace('border-', 'ring-') : 'ring-blue-500/30',
  };
};

const SkillBadge = ({ difficulty, featured, themeClasses }) => {
  const difficultyStyles = {
    beginner: { class: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300", icon: <Zap size={12} /> },
    intermediate: { class: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300", icon: <TrendingUp size={12} /> },
    advanced: { class: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300", icon: <Star size={12} /> },
  };
  const styles = difficultyStyles[difficulty] || difficultyStyles.intermediate;
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className={cn("text-xs px-2 py-0.5 rounded-full flex items-center gap-1", styles.class)}>
        {styles.icon} {difficulty}
      </span>
      {featured && (
        <span className={cn("text-xs px-2 py-0.5 rounded-full flex items-center gap-1", themeClasses.bgLight, themeClasses.accentColor)}>
          <Sparkles size={12} /> Featured
        </span>
      )}
    </div>
  );
};

const AnimatedSkillBar = ({ name, level, icon, isHighlighted, themeClasses = {}, difficulty, featured }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { damping: 40, stiffness: 200 });
  const width = useTransform(springProgress, val => `${val}%`);
  
  useEffect(() => {
    if (inView) progress.set(level);
  }, [inView, level]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group p-4 rounded-lg border transition-all duration-300",
        isHighlighted === false ? "opacity-50" : "opacity-100",
        "hover:shadow-lg hover:scale-[1.02] border-slate-200/50 dark:border-slate-700/50",
        "bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-start justify-between mb-2 gap-4">
        <div className="flex items-center gap-3 flex-grow min-w-0">
          <div className={cn("p-2 rounded-lg", themeClasses.bgLight)}>
            {React.cloneElement(icon, { className: themeClasses.accentColor })}
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="font-medium text-slate-900 dark:text-white mb-1">{name}</h4>
            <SkillBadge difficulty={difficulty} featured={featured} themeClasses={themeClasses} />
          </div>
        </div>
        <div className={cn("text-lg font-semibold tabular-nums", themeClasses.accentColor)}>
          {Math.round(springProgress.get())}%
        </div>
      </div>
      
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full relative", themeClasses.progressBar)}
          style={{ width }}
        >
          <div className="absolute inset-0 rounded-full shadow-inner opacity-20" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ScrollDownIndicator = ({ targetRef, themeClasses }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle scroll to target
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide indicator after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTarget}
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer",
            "transition-all duration-300 hover:transform hover:-translate-y-1"
          )}
        >
          <span className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
            Explore Skills
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={cn(
              "p-2 rounded-full",
              themeClasses.bgLight
            )}
          >
            <ArrowDown className={cn("w-5 h-5", themeClasses.accentColor)} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const CategoryCard = ({ category, isActive, onClick, themeClasses }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(category.id)}
      className={cn(
        "p-5 rounded-xl cursor-pointer transition-all duration-300",
        "border border-slate-200 dark:border-slate-700",
        isActive 
          ? cn("ring-2", themeClasses.ringColor, "bg-white dark:bg-slate-800", "shadow-lg") 
          : "bg-white/80 dark:bg-slate-800/80 hover:shadow"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-3 rounded-lg", 
          isActive ? themeClasses.bgLight : "bg-slate-100 dark:bg-slate-700"
        )}>
          {React.cloneElement(category.icon, { 
            className: isActive ? themeClasses.accentColor : "text-slate-700 dark:text-slate-300" 
          })}
        </div>
        <div>
          <h3 className={cn(
            "font-semibold",
            isActive ? themeClasses.accentColor : "text-slate-800 dark:text-white"
          )}>
            {category.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {category.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ themeColor = 'blue' }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('level');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Refs for scroll functionality
  const skillsGridRef = useRef(null);
  const headerRef = useRef(null);

  const themeClasses = useMemo(() => getThemeClasses(themeColor), [themeColor]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkillsData();
        setSkills(data);
      } catch (err) {
        setError('Failed to load skills data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  const filteredAndSortedSkills = useMemo(() => {
    let result = [...skills];

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(skill => skill.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter(skill => skill.difficulty === selectedDifficulty);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        skill.difficulty.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'level':
        result.sort((a, b) => b.level - a.level);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
        result.sort((a, b) => {
          if (a.featured === b.featured) return b.level - a.level;
          return a.featured ? -1 : 1;
        });
        break;
      default:
        break;
    }

    return result;
  }, [skills, selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('level');
    setSearchQuery('');
  };

  return (
    <section id="skills" className="relative py-20 lg:py-32">
      {/* Hero section with large title */}
      <div ref={headerRef} className="relative min-h-[50vh] flex flex-col items-center justify-center space-y-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block relative px-4">
            <div className={cn("absolute inset-0 bg-gradient-to-r opacity-15 blur-3xl -z-10", themeClasses.buttonGradient)} />
            <h2 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r text-transparent bg-clip-text", themeClasses.gradientText)}>
              Technical Skills
            </h2>
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-6 text-center leading-relaxed"
        >
          A comprehensive overview of my technical expertise and proficiency levels
          across various technologies and development tools.
        </motion.p>
        
        {/* Scroll down indicator */}
        <ScrollDownIndicator targetRef={skillsGridRef} themeClasses={themeClasses} />
      </div>

      <div ref={skillsGridRef} className="container mx-auto px-4 max-w-7xl">
        {/* Category Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={handleCategoryChange}
              themeClasses={themeClasses}
            />
          ))}
        </motion.div>

        {/* Filters Section */}
        <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 flex-grow md:flex-grow-0">
              <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-2 rounded-lg border border-slate-200 dark:border-slate-700",
                  "hover:bg-slate-50 dark:hover:bg-slate-800",
                  "text-slate-600 dark:text-slate-300",
                  showFilters && "bg-slate-50 dark:bg-slate-800"
                )}
                aria-label="Toggle filters"
              >
                <Filter size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {filteredAndSortedSkills.length} skills
              </span>
              {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || sortBy !== 'level' || searchQuery) && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <RotateCw size={14} />
                  Reset
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
                  {/* Difficulties */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Difficulty Level</h3>
                    <div className="flex flex-wrap gap-2">
                      {difficulties.map(difficulty => (
                        <button
                          key={difficulty.id}
                          onClick={() => handleDifficultyChange(difficulty.id)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
                            selectedDifficulty === difficulty.id
                              ? cn("bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300", themeClasses.accentColor)
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          )}
                        >
                          {difficulty.icon}
                          {difficulty.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Sort By</h3>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleSortChange(option.id)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
                            sortBy === option.id
                              ? cn("bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300", themeClasses.accentColor)
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          )}
                        >
                          {option.icon}
                          {option.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-red-500">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredAndSortedSkills.map((skill) => (
                <AnimatedSkillBar
                  key={skill.name}
                  {...skill}
                  themeClasses={themeClasses}
                  isHighlighted={
                    !searchQuery || 
                    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    skill.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
        
        {/* Footer with back to top button */}
        {filteredAndSortedSkills.length > 0 && (
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => headerRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2",
                "transition-all hover:shadow-lg",
                themeClasses.buttonGradient,
                "text-white"
              )}
            >
              <ArrowDown className="w-4 h-4 rotate-180" /> Back to Top
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;