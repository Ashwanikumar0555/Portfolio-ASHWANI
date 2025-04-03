"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Palette, Copy, Play, Pause } from "lucide-react";

// Enhanced theme colors with additional properties
export const themeColors = {
  blue: {
    name: "Ocean Blue",
    primary: "from-blue-500 to-cyan-400",
    secondary: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    accent: "text-blue-400",
    button: "from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
    hover: "hover:bg-blue-500/10",
    border: "border-blue-500/50",
    progress: "from-blue-500 to-cyan-400",
  },
  red: {
    name: "Sunset Red",
    primary: "from-red-500 to-orange-400",
    secondary: "bg-red-500/20 text-red-400 border-red-500/20",
    accent: "text-red-400",
    button: "from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600",
    hover: "hover:bg-red-500/10",
    border: "border-red-500/50",
    progress: "from-red-500 to-orange-400",
  },
  purple: {
    name: "Twilight Purple",
    primary: "from-purple-500 to-pink-400",
    secondary: "bg-purple-500/20 text-purple-400 border-purple-500/20",
    accent: "text-purple-400",
    button: "from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
    hover: "hover:bg-purple-500/10",
    border: "border-purple-500/50",
    progress: "from-purple-500 to-pink-400",
  },
  green: {
    name: "Forest Green",
    primary: "from-emerald-500 to-green-400",
    secondary: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    accent: "text-emerald-400",
    button: "from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600",
    hover: "hover:bg-emerald-500/10",
    border: "border-emerald-500/50",
    progress: "from-emerald-500 to-green-400",
  },
  amber: {
    name: "Golden Amber",
    primary: "from-amber-500 to-yellow-400",
    secondary: "bg-amber-500/20 text-amber-400 border-amber-500/20",
    accent: "text-amber-400",
    button: "from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600",
    hover: "hover:bg-amber-500/10",
    border: "border-amber-500/50",
    progress: "from-amber-500 to-yellow-400",
  },
  teal: {
    name: "Deep Teal",
    primary: "from-teal-500 to-cyan-400",
    secondary: "bg-teal-500/20 text-teal-400 border-teal-500/20",
    accent: "text-teal-400",
    button: "from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600",
    hover: "hover:bg-teal-500/10",
    border: "border-teal-500/50",
    progress: "from-teal-500 to-cyan-400",
  },
};

export default function ColorSelector({ themeColor, setThemeColor, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(themeColor);
  const [previewColor, setPreviewColor] = useState(null);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  const colorKeys = Object.keys(themeColors);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        resetPreview();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    let interval;
    if (isAutoRotate) {
      interval = setInterval(() => {
        const nextIndex = (currentAutoIndex + 1) % colorKeys.length;
        setCurrentAutoIndex(nextIndex);
        setPreviewColor(colorKeys[nextIndex]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoRotate, currentAutoIndex, colorKeys]);

  // Sync preview color with theme
  useEffect(() => {
    if (previewColor !== null) {
      setThemeColor(previewColor);
    } else {
      setThemeColor(selectedColor);
    }
  }, [previewColor, selectedColor, setThemeColor]);

  // Reset preview when auto-rotate stops
  useEffect(() => {
    if (!isAutoRotate && previewColor !== null) {
      setPreviewColor(null);
      setThemeColor(selectedColor);
    }
  }, [isAutoRotate, selectedColor, setThemeColor]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setThemeColor(color);
    setIsOpen(false);
    setIsAutoRotate(false);
    setCurrentAutoIndex(colorKeys.indexOf(color));
    setPreviewColor(null);
  };

  const handlePreview = (color) => {
    if (!isAutoRotate) {
      setPreviewColor(color);
    }
  };

  const resetPreview = () => {
    if (!isAutoRotate && previewColor !== null) {
      setPreviewColor(null);
      setThemeColor(selectedColor);
    }
  };

  const toggleAutoRotate = (e) => {
    e.stopPropagation();
    setIsAutoRotate((prev) => !prev);
  };

  const copyThemeConfig = (e) => {
    e.stopPropagation();
    const config = JSON.stringify(themeColors[selectedColor], null, 2);
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Main Button */}
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border ${themeColors[themeColor].border} bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-sm transition-all duration-300`}
        aria-label="Select theme color"
        aria-expanded={isOpen}
      >
        <motion.span
          animate={{ rotate: isAutoRotate ? 360 : 0 }}
          transition={{ duration: 2, repeat: isAutoRotate ? Infinity : 0, ease: "linear" }}
          className={`w-6 h-6 rounded-full bg-gradient-to-r ${themeColors[themeColor].primary} shadow-inner`}
        />
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {themeColors[themeColor].name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-slate-600 dark:text-slate-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-3 w-72 right-0 origin-top-right rounded-xl bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Select Theme
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleAutoRotate}
                    className={`p-1.5 rounded-full transition-colors ${isAutoRotate ? themeColors[themeColor].secondary : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                    aria-label={isAutoRotate ? "Pause auto-rotate" : "Start auto-rotate"}
                  >
                    {isAutoRotate ? (
                      <Pause size={16} className={themeColors[themeColor].accent} />
                    ) : (
                      <Play size={16} className="text-slate-500" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyThemeConfig}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Copy theme configuration"
                  >
                    <Copy size={16} className={copied ? "text-green-500" : "text-slate-500"} />
                  </motion.button>
                </div>
              </div>

              {/* Color Options */}
              <div className="grid grid-cols-1 gap-2">
                {colorKeys.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleColorSelect(color)}
                    onMouseEnter={() => handlePreview(color)}
                    onMouseLeave={resetPreview}
                    className={`flex items-center gap-3 p-2 rounded-lg ${themeColors[color].hover} transition-all duration-200`}
                    aria-label={`Select ${themeColors[color].name} theme`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${themeColors[color].primary} flex items-center justify-center shadow-md`}
                    >
                      {(selectedColor === color || previewColor === color) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                          <Check size={16} className="text-white drop-shadow-sm" />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1 text-left">
                      {themeColors[color].name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Preview Bar */}
              <motion.div
                className={`h-1.5 rounded-full bg-gradient-to-r ${themeColors[previewColor || selectedColor].progress}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Auto-Rotate Status */}
              {isAutoRotate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-slate-500 dark:text-slate-400 italic text-center"
                >
                  Auto-rotating themes every 2 seconds
                </motion.div>
              )}
              {copied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-green-500 text-center"
                >
                  Theme config copied to clipboard!
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}