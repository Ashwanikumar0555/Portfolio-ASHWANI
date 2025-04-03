// ui/nav-item.js
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { themeColors } from "./color-selector";

const NavItem = React.memo(({ item, activeSection, scrollToSection, theme, themeColor }) => {
  const isActive = activeSection === item.toLowerCase();
  const handleClick = useCallback(() => scrollToSection(item.toLowerCase()), [item, scrollToSection]);

  return (
    <motion.li 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      style={{ position: "relative", listStyle: "none" }}
    >
      <Button
        onClick={handleClick}
        sx={{
          color: isActive 
            ? themeColors[themeColor]?.primary || '#3b82f6'
            : theme === "light" ? "text.secondary" : "text.primary",
          position: "relative",
          "&:hover": {
            color: themeColors[themeColor]?.primary || '#3b82f6',
            backgroundColor: "transparent",
          },
          textTransform: "none",
          fontSize: "0.85rem",
          fontWeight: isActive ? 600 : 500,
          padding: "0.25rem 0.75rem",
          minWidth: "auto",
          transition: "all 0.2s ease",
        }}
      >
        {item}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: "40%",
              height: "2px",
              background: themeColors[themeColor]?.primary || '#3b82f6',
              borderRadius: "2px",
              transform: "translateX(-50%)",
              boxShadow: `0 0 8px ${themeColors[themeColor]?.primary || '#3b82f6'}80`,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Button>
    </motion.li>
  );
});

export default NavItem;