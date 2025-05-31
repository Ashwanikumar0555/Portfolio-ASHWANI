"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { cn } from "../utils/cn";
import { themeColors } from "../ui/color-selector";
import { 
  Code, Database, Wrench, Layers, Search, Filter, X, RotateCw, 
  Star, Zap, Award, TrendingUp, Check, AlertCircle, 
  Sparkles, ArrowDown, ChevronRight, ExternalLink,
  BarChart3, Trophy, Target, Flame, GitBranch, Clock, Users
} from 'lucide-react';

// Mock API fetch function - replace with actual API call in production
const fetchSkillsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { 
      name: "HTML5", 
      level: 95, 
      category: "frontend", 
      icon: <Code size={18} />, 
      difficulty: "beginner", 
      featured: true, 
      // experience: "5+ years", 
      // projects: 50,
      description: "Expert in semantic HTML5, accessibility, and modern web standards",
      certifications: ["W3C HTML5", "MDN Web Docs"],
      lastUsed: "2024",
      proficiency: "Expert"
    },
    { 
      name: "CSS3 & SCSS", 
      level: 92, 
      category: "frontend", 
      icon: <Code size={18} />, 
      difficulty: "intermediate", 
      featured: true, 
      // experience: "4+ years", 
      // projects: 45,
      description: "Advanced CSS3 features, animations, and SCSS architecture",
      certifications: ["CSS Advanced Concepts"],
      lastUsed: "2024",
      proficiency: "Advanced"
    },
    { 
      name: "JavaScript (ES6+)", 
      level: 88, 
      category: "frontend", 
      icon: <Code size={18} />, 
      difficulty: "advanced", 
      featured: true, 
      // experience: "4+ years", 
      // projects: 40,
      description: "Modern JavaScript, ES6+ features, and functional programming",
      certifications: ["JavaScript Advanced Concepts"],
      lastUsed: "2024",
      proficiency: "Advanced"
    },
    { 
      name: "React.js", 
      level: 90, 
      category: "frontend", 
      icon: <Code size={18} />, 
      difficulty: "advanced", 
      featured: true, 
      // experience: "3+ years", 
      // projects: 35,
      description: "React hooks, context, performance optimization, and state management",
      certifications: ["React Advanced Patterns"],
      lastUsed: "2024",
      proficiency: "Expert"
    },
    
    { 
      name: "Node.js", 
      level: 85, 
      category: "backend", 
      icon: <Database size={18} />, 
      difficulty: "advanced", 
      featured: true, 
      // experience: "3+ years", 
      // projects: 30,
      description: "RESTful APIs, Express.js, and server-side development",
      certifications: ["Node.js Advanced Concepts"],
      lastUsed: "2024",
      proficiency: "Advanced"
    },
    { 
      name: "MongoDB", 
      level: 80, 
      category: "backend", 
      icon: <Database size={18} />, 
      difficulty: "intermediate", 
      featured: false, 
      // experience: "2+ years", 
      // projects: 20,
      description: "Database design, indexing, and aggregation pipelines",
      certifications: ["MongoDB University"],
      lastUsed: "2024",
      proficiency: "Intermediate"
    },
    { 
      name: "Git & GitHub", 
      level: 92, 
      category: "tools", 
      icon: <GitBranch size={18} />, 
      difficulty: "intermediate", 
      featured: true, 
      // experience: "5+ years", 
      // projects: 50,
      description: "Version control, branching strategies, and CI/CD",
      certifications: ["GitHub Actions"],
      lastUsed: "2024",
      proficiency: "Expert"
    },
    { 
      name: "Docker", 
      level: 75, 
      category: "tools", 
      icon: <Wrench size={18} />, 
      difficulty: "intermediate", 
      featured: false, 
      // experience: "2+ years", 
      // projects: 15,
      description: "Containerization, Docker Compose, and deployment",
      certifications: ["Docker Fundamentals"],
      lastUsed: "2024",
      proficiency: "Intermediate"
    },
    { 
      name: "TypeScript", 
      level: 85, 
      category: "frontend", 
      icon: <Code size={18} />, 
      difficulty: "advanced", 
      featured: true, 
      // experience: "3+ years", 
      // projects: 30,
      description: "Type safety, interfaces, and advanced TypeScript features",
      certifications: ["TypeScript Advanced"],
      lastUsed: "2024",
      proficiency: "Advanced"
    },
    { 
      name: "Tailwind CSS", 
      level: 90, 
      category: "frontend", 
      icon: <Code size={18} />, 
      difficulty: "intermediate", 
      featured: true, 
      // experience: "3+ years", 
      // projects: 40,
      description: "Utility-first CSS, responsive design, and custom configurations",
      certifications: ["Tailwind CSS Mastery"],
      lastUsed: "2024",
      proficiency: "Expert"
    },
    
  ];
};

const categories = [
  { 
    id: "all", 
    title: "All Skills", 
    icon: <Layers size={20} />, 
    description: "Complete skill overview", 
    color: "gray", 
    count: 0 
  },
  { 
    id: "frontend", 
    title: "Frontend", 
    icon: <Code size={20} />, 
    description: "UI/UX Technologies", 
    color: "blue", 
    count: 0 
  },
  { 
    id: "backend", 
    title: "Backend", 
    icon: <Database size={20} />, 
    description: "Server Technologies", 
    color: "purple", 
    count: 0 
  },
  { 
    id: "tools", 
    title: "Tools", 
    icon: <Wrench size={20} />, 
    description: "Development Tools", 
    color: "green", 
    count: 0 
  }
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
  { id: "featured", title: "Featured First", icon: <Star size={16} /> },
  { id: "experience", title: "Experience", icon: <Trophy size={16} /> },
  { id: "projects", title: "Projects", icon: <GitBranch size={16} /> },
  { id: "recent", title: "Recently Used", icon: <Clock size={16} /> },
];

// Enhanced Skill Badge Component
const SkillBadge = ({ difficulty, featured, experience, projects, themeClasses }) => {
  const difficultyStyles = {
    beginner: { 
      class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800", 
      icon: <Zap size={12} /> 
    },
    intermediate: { 
      class: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800", 
      icon: <TrendingUp size={12} /> 
    },
    advanced: { 
      class: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800", 
      icon: <Star size={12} /> 
    },
  };
  
  const styles = difficultyStyles[difficulty] || difficultyStyles.intermediate;
  
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 border font-medium ${styles.class}`}>
        {styles.icon} {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
      {featured && (
        <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 dark:from-yellow-900/40 dark:to-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800 font-medium">
          <Sparkles size={12} /> Featured
        </span>
      )}
    </div>
  );
};

// Enhanced Animated Progress Bar
const AnimatedProgressBar = ({ level, inView, themeClasses }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { 
    damping: 30, 
    stiffness: 100,
    mass: 0.8
  });
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        progress.set(level);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [inView, level, progress]);

  useEffect(() => {
    const unsubscribe = springProgress.onChange(value => {
      setDisplayValue(Math.round(value));
    });
    return unsubscribe;
  }, [springProgress]);

  const width = useTransform(springProgress, val => `${val}%`);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Proficiency</span>
        <div className="flex items-center gap-2">
          <span className={cn("text-2xl font-bold tabular-nums", themeClasses.accentColor)}>
            {displayValue}%
          </span>
          {level >= 90 && <Trophy className="w-4 h-4 text-yellow-500" />}
          {level >= 80 && level < 90 && <Target className="w-4 h-4 text-blue-500" />}
          {level >= 70 && level < 80 && <Flame className="w-4 h-4 text-orange-500" />}
        </div>
      </div>
      
      <div className="relative h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={cn("h-full rounded-full relative overflow-hidden", themeClasses.progressBar)}
          style={{ width }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Background Animation Component
const SkillsBackgroundAnimation = ({ themeColor }) => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl top-0 -left-64 animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl bottom-0 -right-32 animate-[pulse_14s_ease-in-out_infinite_1s]" />
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full blur-3xl -bottom-64 left-1/4 animate-[pulse_18s_ease-in-out_infinite_2s]" />

      {/* Floating Tech Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`tech-${i}`}
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

      {/* Floating Code Elements */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`code-${i}`}
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
    </div>
  );
};

// Enhanced Skill Card Component
const EnhancedSkillCard = ({ skill, isHighlighted, index, themeClasses }) => {
  const { ref, inView } = useInView({ 
    threshold: 0.2, 
    triggerOnce: true,
    rootMargin: '50px'
  });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, type: 'spring', stiffness: 80 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'group relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden',
        isHighlighted 
          ? 'border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl' 
          : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
      )}
    >
      {/* Enhanced Background Pattern */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"
      )} />
      
      {/* Animated Border */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl",
          themeClasses.border
        )}
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 1 : 0.5
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex items-center gap-4 flex-grow min-w-0">
            <motion.div 
              className={cn(
                "p-3 rounded-xl border",
                themeClasses.bgLight,
                themeClasses.border
              )}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {React.cloneElement(skill.icon, { 
                className: themeClasses.accentColor,
                size: 20
              })}
            </motion.div>
            <div className="flex-grow min-w-0">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-2 truncate">
                {skill.name}
              </h4>
              <SkillBadge 
                difficulty={skill.difficulty} 
                featured={skill.featured}
                experience={skill.experience}
                projects={skill.projects}
                themeClasses={themeClasses}
              />
            </div>
          </div>
          
          {/* Level indicator with icon */}
          <div className="flex flex-col items-end gap-1">
            {skill.level >= 90 && (
              <motion.div 
                className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0
                }}
              >
                <Trophy size={16} />
                <span className="text-xs font-medium">Expert</span>
              </motion.div>
            )}
            {skill.level >= 80 && skill.level < 90 && (
              <motion.div 
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0
                }}
              >
                <Target size={16} />
                <span className="text-xs font-medium">Advanced</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proficiency</span>
            <span className={cn("text-xs font-bold", themeClasses.accentColor)}>{skill.level}%</span>
          </div>
          <div className="relative h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner mt-1">
            <motion.div
              className={cn('h-full rounded-full', themeClasses.progressBar)}
              initial={{ width: 0 }}
              animate={{ width: inView ? `${skill.level}%` : 0 }}
              transition={{ duration: 1.2, delay: index * 0.07, type: 'spring', stiffness: 60 }}
              style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {skill.experience}
            </span>
            <span className="flex items-center gap-1">
              <GitBranch size={14} />
              {skill.projects}+ projects
            </span>
          </div>
          
          {skill.featured && (
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 },
                scale: { duration: 0.2 }
              }}
              className="text-yellow-500"
            >
              <Star size={16} fill="currentColor" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Category Card
const CategoryCard = ({ category, isActive, onClick, skillCount, themeClasses }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(category.id)}
      className={cn(
        "p-5 rounded-xl cursor-pointer transition-all duration-300 border",
        isActive 
          ? cn(
              "ring-2 bg-white dark:bg-slate-800 shadow-lg",
              themeClasses.ringColor,
              themeClasses.border
            )
          : "bg-white/60 dark:bg-slate-800/60 hover:shadow-md border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-lg",
            isActive ? themeClasses.bgLight : "bg-slate-100 dark:bg-slate-700"
          )}>
            {React.cloneElement(category.icon, { 
              className: isActive ? themeClasses.accentColor : "text-slate-600 dark:text-slate-300"
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
        <div className="text-right">
          <div className={cn(
            "text-lg font-bold",
            isActive ? themeClasses.accentColor : "text-slate-600 dark:text-slate-300"
          )}>
            {skillCount}
          </div>
          <div className="text-xs text-slate-400">skills</div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Skills Section Component
const EnhancedSkillsSection = ({ themeColor = 'blue' }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('level');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const skillsGridRef = useRef(null);
  const headerRef = useRef(null);

  const themeClasses = useMemo(() => {
    const theme = themeColors[themeColor] || themeColors.blue;
    return {
      gradientText: theme.primary,
      accentColor: theme.accent,
      progressBar: theme.progress,
      shadow: theme.shadow,
      border: theme.border,
      bgLight: theme.bgLight,
      bgDark: theme.bgDark,
      buttonGradient: theme.button,
      ringColor: theme.border ? theme.border.replace('border-', 'ring-') : 'ring-blue-500/30',
    };
  }, [themeColor]);

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

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? skills.length 
        : skills.filter(skill => skill.category === category.id).length
    }));
  }, [skills]);

  const filteredAndSortedSkills = useMemo(() => {
    let result = [...skills];

    if (selectedCategory !== 'all') {
      result = result.filter(skill => skill.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      result = result.filter(skill => skill.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        skill.difficulty.toLowerCase().includes(query) ||
        skill.description?.toLowerCase().includes(query)
      );
    }

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
      case 'experience':
        result.sort((a, b) => {
          const aYears = parseInt(a.experience) || 0;
          const bYears = parseInt(b.experience) || 0;
          return bYears - aYears;
        });
        break;
      case 'projects':
        result.sort((a, b) => b.projects - a.projects);
        break;
      case 'recent':
        result.sort((a, b) => b.lastUsed.localeCompare(a.lastUsed));
        break;
      default:
        break;
    }

    return result;
  }, [skills, selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('level');
    setSearchQuery('');
  };

  const averageSkillLevel = useMemo(() => {
    if (filteredAndSortedSkills.length === 0) return 0;
    const total = filteredAndSortedSkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / filteredAndSortedSkills.length);
  }, [filteredAndSortedSkills]);

  return (
    <section id="skills" className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Enhanced Background Animation */}
      <SkillsBackgroundAnimation themeColor={themeColor} />

      {/* Hero Section */}
      <div ref={headerRef} className="relative min-h-[60vh] flex flex-col items-center justify-center space-y-8 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            className="inline-block relative px-6 py-2 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={cn("absolute inset-0 blur-2xl -z-10", themeClasses.gradientText)} />
            <h2 className={cn("text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text", themeClasses.gradientText)}>
              Technical Skills
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8"
          >
            A comprehensive showcase of my technical expertise across modern web technologies and development tools.
          </motion.p>

          {/* Enhanced Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center items-center gap-8 flex-wrap"
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn("text-2xl font-bold", themeClasses.accentColor)}>{skills.length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Total Skills</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn("text-2xl font-bold", themeClasses.accentColor)}>{averageSkillLevel}%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Proficiency</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn("text-2xl font-bold", themeClasses.accentColor)}>{skills.filter(s => s.featured).length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Featured</div>
            </motion.div>
          </motion.div>
        </motion.div>

        
      </div>

      <div ref={skillsGridRef} className="container mx-auto px-4 max-w-7xl">
        {/* Category Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {categoriesWithCounts.map((category) => (
            <CategoryCard 
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={setSelectedCategory}
              skillCount={category.count}
              themeClasses={themeClasses}
            />
          ))}
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={cn(
            "mb-8 backdrop-blur-lg p-6 rounded-2xl border shadow-lg",
            "bg-white/90 dark:bg-slate-900/90",
            themeClasses.border
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-grow md:flex-grow-0">
              <div className="relative flex-grow md:flex-grow-0 md:min-w-[350px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search skills, categories, or difficulty levels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full pl-12 pr-4 py-3 rounded-xl border transition-all",
                    "bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400",
                    "focus:outline-none focus:ring-2 focus:border-transparent",
                    themeClasses.border,
                    themeClasses.ringColor
                  )}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  showFilters 
                    ? cn(
                        themeClasses.bgLight,
                        themeClasses.border,
                        themeClasses.accentColor
                      )
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                )}
                aria-label="Toggle filters"
              >
                <Filter size={20} />
              </motion.button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {filteredAndSortedSkills.length} of {skills.length} skills
              </span>
              {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || sortBy !== 'level' || searchQuery) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearFilters}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all border",
                    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
                    "hover:bg-slate-200 dark:hover:bg-slate-700",
                    themeClasses.border
                  )}
                >
                  <RotateCw size={14} />
                  Reset Filters
                </motion.button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="py-6 space-y-6 border-t border-slate-200 dark:border-slate-700">
                  {/* Difficulty Filter */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Difficulty Level
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {difficulties.map(difficulty => (
                        <motion.button
                          key={difficulty.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDifficulty(difficulty.id)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                            selectedDifficulty === difficulty.id
                              ? cn(
                                  themeClasses.bgLight,
                                  themeClasses.accentColor,
                                  themeClasses.border
                                )
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
                          )}
                        >
                          {difficulty.icon}
                          {difficulty.title}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Sort By
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map(option => (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSortBy(option.id)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                            sortBy === option.id
                              ? cn(
                                  themeClasses.bgLight,
                                  themeClasses.accentColor,
                                  themeClasses.border
                                )
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
                          )}
                        >
                          {option.icon}
                          {option.title}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={cn(
                "w-12 h-12 border-4 rounded-full mb-4",
                themeClasses.border,
                themeClasses.accentColor
              )}
            />
            <p className="text-slate-600 dark:text-slate-400">Loading skills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle size={24} />
              <span className="text-lg">{error}</span>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && !error && (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredAndSortedSkills.map((skill, index) => (
                <EnhancedSkillCard
                  key={skill.name}
                  skill={skill}
                  index={index}
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

        {/* No Results State */}
        {!loading && !error && filteredAndSortedSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No skills found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-md">
              Try adjusting your search criteria or clearing the filters to see more results.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearFilters}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all shadow-lg",
                themeClasses.buttonGradient
              )}
            >
              <RotateCw size={16} />
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
        
        {/* Back to Top Button */}
        {filteredAndSortedSkills.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => headerRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-medium transition-all shadow-lg hover:shadow-xl",
                themeClasses.buttonGradient
              )}
            >
              <ArrowDown className="w-5 h-5 rotate-180" />
              Back to Top
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EnhancedSkillsSection;