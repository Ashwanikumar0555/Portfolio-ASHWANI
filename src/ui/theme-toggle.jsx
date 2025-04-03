"use client";
import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@mui/material";
import { themeColors } from "../ui/color-selector"; // Adjust path as needed

export default function ThemeToggle({ theme, toggleTheme, themeColor }) {
  // Animation variants for the icon transition
  const iconVariants = {
    light: { rotate: 90, scale: 0, opacity: 0 },
    dark: { rotate: 0, scale: 1, opacity: 1 },
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full border ${themeColors[themeColor].border} bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-sm`}
    >
      <IconButton
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        sx={{
          p: 1.5,
          color: "text.secondary",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {/* Sun Icon (visible in light mode) */}
        <motion.div
          variants={iconVariants}
          initial={theme === "light" ? "dark" : "light"}
          animate={theme === "light" ? "dark" : "light"}
          whileHover="hover"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun
            size={20}
            className={`text-gradient bg-gradient-to-r ${themeColors[themeColor].primary}`}
          />
        </motion.div>

        {/* Moon Icon (visible in dark mode) */}
        <motion.div
          variants={iconVariants}
          initial={theme === "dark" ? "dark" : "light"}
          animate={theme === "dark" ? "dark" : "light"}
          whileHover="hover"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon
            size={20}
            className={`text-gradient bg-gradient-to-r ${themeColors[themeColor].primary}`}
          />
        </motion.div>

        <span className="sr-only">Toggle theme</span>
      </IconButton>
    </motion.div>
  );
}

// Optional CSS for gradient text if not handled by Tailwind
const style = document.createElement("style");
style.textContent = `
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
document.head.appendChild(style);