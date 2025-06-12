
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, Typography, useTheme, useMediaQuery, TextField, Drawer, 
  Divider, InputAdornment, Tooltip, IconButton, Button, List, ListItem, ListItemText
} from "@mui/material";
import { Menu, X, Search, Moon, Sun } from "lucide-react";

// Define themeColors for direct circle selection
const themeColors = {
  blue: {
    primary: "#3b82f6",
    secondary: "#1d4ed8",
  },
  purple: {
    primary: "#8b5cf6",
    secondary: "#6d28d9",
  },
  green: {
    primary: "#10b981",
    secondary: "#059669",
  },
  // pink: {
  //   primary: "#ec4899",
  //   secondary: "#db2777",
  // },
  // orange: {
  //   primary: "#f97316",
  //   secondary: "#ea580c",
  // },
  // teal: {
  //   primary: "#14b8a6",
  //   secondary: "#0d9488",
  // },
  // indigo: {
  //   primary: "#6366f1",
  //   secondary: "#4f46e5",
  // },
  red: {
    primary: "#ef4444",
    secondary: "#dc2626",
  },
};

// Enhanced ColorSelector component with animation
const ColorSelector = ({ themeColor, setThemeColor }) => {
  return (
    <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
      {Object.entries(themeColors).map(([color, values]) => (
        <motion.div 
          key={color}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: themeColor === color ? 1.15 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Tooltip title={color} arrow placement="top">
            <IconButton
              onClick={() => setThemeColor(color)}
              sx={{
                width: "28px",
                height: "28px",
                backgroundColor: values.primary,
                border: "2px solid",
                borderColor: themeColor === color ? "#fff" : "transparent",
                boxShadow: themeColor === color ? `0 0 0 2px ${values.primary}` : "none",
                p: 0,
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  backgroundColor: values.primary,
                  transform: "scale(1.1)"
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              {themeColor === color && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        </motion.div>
      ))}
    </Box>
  );
};

// Animated ThemeToggle component
const ThemeToggle = ({ theme, toggleTheme, themeColor }) => {
  const primaryColor = themeColors[themeColor]?.primary || '#3b82f6';
  
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: theme === "dark" ? "#fff" : primaryColor,
          backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          p: 1,
          borderRadius: "50%",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </AnimatePresence>
      </IconButton>
    </motion.div>
  );
};

const NavItem = React.memo(({ item, activeSection, scrollToSection, theme, themeColor }) => {
  const isActive = activeSection === item.toLowerCase();
  const handleClick = useCallback(() => scrollToSection(item.toLowerCase()), [item, scrollToSection]);

  return (
    <motion.li 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      style={{ position: "relative" }}
    >
      <Button
        onClick={handleClick}
        sx={{
          color: isActive 
            ? themeColors[themeColor]?.primary || '#3b82f6'
            : theme === "dark" ? "#fff" : themeColors[themeColor]?.primary,
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

export default function Header({ theme, toggleTheme, themeColor = 'blue', setThemeColor, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const searchRef = useRef(null);
  
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  
  const navItems = useMemo(() => (
    ["Home", "About", "Skills", "Timeline", "Projects", "Certifications", "References", "Contact"]
  ), []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateScrollState = () => {
      setIsScrolled(lastScrollY > 10);
      ticking = false;
    };
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionDetection = () => {
      const sections = navItems.map(item => item.toLowerCase());
      const scrollPosition = window.scrollY + 70;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition > element.offsetTop && scrollPosition <= element.offsetTop + element.offsetHeight) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    const debouncedDetection = () => {
      window.requestAnimationFrame ? window.requestAnimationFrame(handleSectionDetection) : setTimeout(handleSectionDetection, 100);
    };
    
    window.addEventListener("scroll", debouncedDetection, { passive: true });
    return () => window.removeEventListener("scroll", debouncedDetection);
  }, [navItems]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = navItems
        .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(item => ({ type: "section", title: item, link: `#${item.toLowerCase()}` }));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, navItems]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      const timer = setTimeout(() => searchRef.current.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setSearchOpen(false);
    if (searchQuery && searchResults.length > 0) {
      scrollToSection(searchResults[0].title.toLowerCase());
    }
    setSearchQuery("");
  }, [searchQuery, searchResults, scrollToSection]);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const toggleColorPicker = useCallback(() => setColorPickerOpen(prev => !prev), []);

  return (
    <>
      <Box 
        component="header" 
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: theme === "light" 
            ? isScrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.9)"
            : isScrolled ? "rgba(15,23,42,0.98)" : "rgba(15,23,42,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid",
          borderColor: theme === "light" ? "rgba(229,231,235,0.5)" : "rgba(51,65,85,0.5)",
          boxShadow: isScrolled ? theme === "light" 
            ? "0 4px 16px rgba(0,0,0,0.08)" 
            : "0 4px 16px rgba(0,0,0,0.2)" 
            : "none",
          transition: "all 0.3s ease",
          height: isScrolled ? "50px" : "60px",
        }}
      >
        <Box 
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          {!isMobile && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Box component="ul" sx={{ 
                display: "flex", 
                gap: { md: "0.25rem", lg: "0.5rem" }, 
                listStyle: "none", 
                padding: 0, 
                margin: 0,
                alignItems: "center",
                height: "100%",
              }}>
                {navItems.map((item) => (
                  <NavItem 
                    key={item}
                    item={item}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    theme={theme}
                    themeColor={themeColor}
                  />
                ))}
              </Box>
            </motion.nav>
          )}

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem",
              marginLeft: isMobile ? "auto" : "0" 
            }}
          >
            <Tooltip title="Search" arrow>
              <IconButton
                onClick={() => setSearchOpen(true)}
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: themeColors[themeColor]?.primary || '#3b82f6',
                    backgroundColor: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                  },
                  transition: "all 0.2s ease",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Search size={18} />
              </IconButton>
            </Tooltip>
            
            {/* Direct theme toggle button */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} themeColor={themeColor} />
            
            {/* Direct color picker button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Tooltip title="Change Theme Color" arrow>
                <IconButton
                  onClick={toggleColorPicker}
                  size="small"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: themeColors[themeColor]?.primary || '#3b82f6',
                    border: "2px solid white",
                    p: 0,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: `0 0 10px ${themeColors[themeColor]?.primary}80`
                    }
                  }}
                >
                  {colorPickerOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%", 
                        backgroundColor: "#fff"
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </motion.div>

            {isMobile && (
              <IconButton
                onClick={toggleMobileMenu}
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: themeColors[themeColor]?.primary || '#3b82f6',
                    backgroundColor: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Menu size={20} />
              </IconButton>
            )}
          </motion.div>
        </Box>
      </Box>
      
      {/* Search Modal with improved animation */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme === "light" ? "rgba(255,255,255,0.98)" : "rgba(15,23,42,0.98)",
              backdropFilter: "blur(20px)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              boxShadow: theme === "light" 
                ? "0 8px 32px rgba(0,0,0,0.2)" 
                : "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "2rem" 
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${themeColors[themeColor]?.primary || '#3b82f6'}, ${themeColors[themeColor]?.secondary || '#1d4ed8'})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Search
              </Typography>
              <IconButton 
                onClick={() => setSearchOpen(false)}
                sx={{ 
                  color: "text.secondary",
                  "&:hover": {
                    color: themeColors[themeColor]?.primary || '#3b82f6',
                    transform: "rotate(90deg)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <X size={24} />
              </IconButton>
            </Box>
            
            <Box 
              component="form" 
              onSubmit={handleSearch} 
              sx={{ 
                width: "100%", 
                maxWidth: "800px", 
                margin: "0 auto",
                position: "relative",
              }}
            >
              <TextField
                inputRef={searchRef}
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sections..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={{ color: themeColors[themeColor]?.primary || '#3b82f6' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "16px",
                    backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.9)",
                    boxShadow: theme === "light" 
                      ? "0 4px 20px rgba(0,0,0,0.1)" 
                      : "0 4px 20px rgba(0,0,0,0.3)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: themeColors[themeColor]?.primary || '#3b82f6',
                      borderWidth: "2px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: themeColors[themeColor]?.secondary || '#1d4ed8',
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: themeColors[themeColor]?.primary || '#3b82f6',
                    },
                  },
                }}
                sx={{ marginBottom: "2rem" }}
              />
            </Box>
            
            {searchResults.length > 0 && (
              <Box sx={{ 
                marginTop: "1rem", 
                width: "100%", 
                maxWidth: "800px", 
                margin: "0 auto",
                maxHeight: "60vh",
                overflowY: "auto",
                backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.9)",
                borderRadius: "16px",
                padding: "1rem",
                boxShadow: theme === "light" 
                  ? "0 4px 20px rgba(0,0,0,0.1)" 
                  : "0 4px 20px rgba(0,0,0,0.3)",
              }}>
                <List>
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={`${result.type}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ListItem 
                        button
                        onClick={() => {
                          setSearchOpen(false);
                          scrollToSection(result.title.toLowerCase());
                        }}
                        sx={{
                          borderRadius: "12px",
                          marginBottom: "0.5rem",
                          padding: "1rem",
                          "&:hover": {
                            backgroundColor: theme === "light" 
                              ? "rgba(243,244,246,0.8)" 
                              : "rgba(30,41,59,0.8)",
                            transform: "translateX(5px)",
                          },
                          transition: "all 0.2s ease",
                          backgroundColor: theme === "light" 
                            ? "rgba(255,255,255,0.5)" 
                            : "rgba(15,23,42,0.5)",
                        }}
                      >
                        <ListItemText 
                          primary={result.title}
                          primaryTypographyProps={{ 
                            fontWeight: 500,
                            color: themeColors[themeColor]?.primary || '#3b82f6',
                          }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Box>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Picker Popover */}
      <AnimatePresence>
        {colorPickerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: isScrolled ? "55px" : "65px",
              right: "20px",
              backgroundColor: theme === "light" ? "white" : "#1e293b",
              borderRadius: "16px",
              padding: "1rem",
              zIndex: 60,
              boxShadow: theme === "light" 
                ? "0 10px 25px rgba(0,0,0,0.15)" 
                : "0 10px 25px rgba(0,0,0,0.4)",
              border: "1px solid",
              borderColor: theme === "light" ? "rgba(229,231,235,0.8)" : "rgba(51,65,85,0.8)",
            }}
          >
            <ColorSelector themeColor={themeColor} setThemeColor={setThemeColor} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer with improved animation */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: "280px",
            backgroundColor: theme === "light" ? "background.paper" : "background.default",
            borderLeft: "1px solid",
            borderColor: theme === "light" ? "rgba(229,231,235,0.5)" : "rgba(51,65,85,0.5)",
            backdropFilter: "blur(20px)",
            boxShadow: theme === "light" 
              ? "0 8px 32px rgba(0,0,0,0.2)" 
              : "0 8px 32px rgba(0,0,0,0.4)",
          },
        }}
      >
        <Box sx={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "1.5rem" 
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              background: `linear-gradient(45deg, ${themeColors[themeColor]?.primary || '#3b82f6'}, ${themeColors[themeColor]?.secondary || '#1d4ed8'})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Navigation
            </Typography>
            <IconButton 
              onClick={toggleMobileMenu}
              sx={{
                "&:hover": {
                  transform: "rotate(90deg)",
                  color: themeColors[themeColor]?.primary || '#3b82f6',
                },
                transition: "all 0.2s ease",
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>
          
          <Divider sx={{ 
            marginBottom: "1.5rem",
            borderColor: themeColors[themeColor]?.primary || '#3b82f6',
            opacity: 0.3,
          }} />
          
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <List>
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ListItem 
                    button
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      toggleMobileMenu();
                    }}
                    sx={{
                      borderRadius: "12px",
                      marginBottom: "0.5rem",
                      padding: "0.75rem",
                      backgroundColor: activeSection === item.toLowerCase() 
                        ? theme === "light" 
                          ? "rgba(243,244,246,0.8)" 
                          : "rgba(30,41,59,0.8)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: theme === "light" 
                          ? "rgba(243,244,246,0.8)" 
                          : "rgba(30,41,59,0.8)",
                        transform: "translateX(5px)",
                      },
                      transition: "all 0.2s ease",
                      boxShadow: activeSection === item.toLowerCase() 
                        ? `0 0 12px ${themeColors[themeColor]?.primary || '#3b82f6'}40`
                        : "none",
                    }}
                  >
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{
                        fontWeight: activeSection === item.toLowerCase() ? 600 : 500,
                        color: activeSection === item.toLowerCase() 
                          ? themeColors[themeColor]?.primary || '#3b82f6'
                          : "text.primary",
                      }}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Box>
          
          {/* Color selection in mobile menu */}
          <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: theme === "light" ? "rgba(229,231,235,0.5)" : "rgba(51,65,85,0.5)" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>Theme Color</Typography>
            <ColorSelector themeColor={themeColor} setThemeColor={setThemeColor} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}


// import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Box, Typography, useTheme, useMediaQuery, TextField, Drawer, 
//   Divider, InputAdornment, Tooltip, IconButton, Button, List, ListItem, ListItemText
// } from "@mui/material";
// import { Menu, X, Search, Moon, Sun } from "lucide-react";

// // Define themeColors for direct circle selection
// const themeColors = {
//   blue: {
//     primary: "#3b82f6",
//     secondary: "#1d4ed8",
//   },
//   purple: {
//     primary: "#8b5cf6",
//     secondary: "#6d28d9",
//   },
//   green: {
//     primary: "#10b981",
//     secondary: "#059669",
//   },
//   // pink: {
//   //   primary: "#ec4899",
//   //   secondary: "#db2777",
//   // },
//   // orange: {
//   //   primary: "#f97316",
//   //   secondary: "#ea580c",
//   // },
//   // teal: {
//   //   primary: "#14b8a6",
//   //   secondary: "#0d9488",
//   // },
//   // indigo: {
//   //   primary: "#6366f1",
//   //   secondary: "#4f46e5",
//   // },
//   red: {
//     primary: "#ef4444",
//     secondary: "#dc2626",
//   },
// };

// // Enhanced ColorSelector component with animation
// const ColorSelector = ({ themeColor, setThemeColor }) => {
//   return (
//     <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
//       {Object.entries(themeColors).map(([color, values]) => (
//         <motion.div 
//           key={color}
//           whileHover={{ scale: 1.2 }}
//           whileTap={{ scale: 0.9 }}
//           animate={{ scale: themeColor === color ? 1.15 : 1 }}
//           transition={{ duration: 0.2 }}
//         >
//           <Tooltip title={color} arrow placement="top">
//             <IconButton
//               onClick={() => setThemeColor(color)}
//               sx={{
//                 width: "28px",
//                 height: "28px",
//                 backgroundColor: values.primary,
//                 border: "2px solid",
//                 borderColor: themeColor === color ? "#fff" : "transparent",
//                 boxShadow: themeColor === color ? `0 0 0 2px ${values.primary}` : "none",
//                 p: 0,
//                 overflow: "hidden",
//                 position: "relative",
//                 "&:hover": {
//                   backgroundColor: values.primary,
//                   transform: "scale(1.1)"
//                 },
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//               }}
//             >
//               {themeColor === color && (
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 0.2 }}
//                   style={{
//                     position: "absolute",
//                     width: "8px",
//                     height: "8px",
//                     borderRadius: "50%",
//                     backgroundColor: "#fff",
//                   }}
//                 />
//               )}
//             </IconButton>
//           </Tooltip>
//         </motion.div>
//       ))}
//     </Box>
//   );
// };

// // Animated ThemeToggle component
// const ThemeToggle = ({ theme, toggleTheme, themeColor }) => {
//   const primaryColor = themeColors[themeColor]?.primary || '#3b82f6';
  
//   return (
//     <motion.div
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//     >
//       <IconButton
//         onClick={toggleTheme}
//         sx={{
//           color: theme === "dark" ? "#fff" : primaryColor,
//           backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
//           p: 1,
//           borderRadius: "50%",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
//           }
//         }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={theme}
//             initial={{ opacity: 0, rotate: -30 }}
//             animate={{ opacity: 1, rotate: 0 }}
//             exit={{ opacity: 0, rotate: 30 }}
//             transition={{ duration: 0.3 }}
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </motion.div>
//         </AnimatePresence>
//       </IconButton>
//     </motion.div>
//   );
// };

// const NavItem = React.memo(({ item, activeSection, scrollToSection, theme, themeColor }) => {
//   const isActive = activeSection === item.toLowerCase();
//   const handleClick = useCallback(() => scrollToSection(item.toLowerCase()), [item, scrollToSection]);

//   return (
//     <motion.li 
//       whileHover={{ scale: 1.05 }} 
//       whileTap={{ scale: 0.95 }}
//       style={{ position: "relative" }}
//     >
//       <Button
//         onClick={handleClick}
//         sx={{
//           color: isActive 
//             ? themeColors[themeColor]?.primary || '#3b82f6'
//             : theme === "dark" ? "#fff" : themeColors[themeColor]?.primary,
//           position: "relative",
//           "&:hover": {
//             color: themeColors[themeColor]?.primary || '#3b82f6',
//             backgroundColor: "transparent",
//           },
//           textTransform: "none",
//           fontSize: "0.85rem",
//           fontWeight: isActive ? 600 : 500,
//           padding: "0.25rem 0.75rem",
//           minWidth: "auto",
//           transition: "all 0.2s ease",
//         }}
//       >
//         {item}
//         {isActive && (
//           <motion.div
//             layoutId="activeIndicator"
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: "50%",
//               width: "40%",
//               height: "2px",
//               background: themeColors[themeColor]?.primary || '#3b82f6',
//               borderRadius: "2px",
//               transform: "translateX(-50%)",
//               boxShadow: `0 0 8px ${themeColors[themeColor]?.primary || '#3b82f6'}80`,
//             }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           />
//         )}
//       </Button>
//     </motion.li>
//   );
// });

// export default function Header({ theme, toggleTheme, themeColor = 'blue', setThemeColor, scrollToSection }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [activeSection, setActiveSection] = useState("home");
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [colorPickerOpen, setColorPickerOpen] = useState(false);
//   const searchRef = useRef(null);
  
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  
//   const navItems = useMemo(() => (
//     ["Home", "About", "Skills", "Timeline", "Projects", "Certifications", "References", "Contact"]
//   ), []);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;
    
//     const updateScrollState = () => {
//       setIsScrolled(lastScrollY > 10);
//       ticking = false;
//     };
    
//     const handleScroll = () => {
//       lastScrollY = window.scrollY;
//       if (!ticking) {
//         window.requestAnimationFrame(updateScrollState);
//         ticking = true;
//       }
//     };
    
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleSectionDetection = () => {
//       const sections = navItems.map(item => item.toLowerCase());
//       const scrollPosition = window.scrollY + 70;
      
//       for (let i = sections.length - 1; i >= 0; i--) {
//         const element = document.getElementById(sections[i]);
//         if (element && scrollPosition > element.offsetTop && scrollPosition <= element.offsetTop + element.offsetHeight) {
//           setActiveSection(sections[i]);
//           break;
//         }
//       }
//     };
    
//     const debouncedDetection = () => {
//       window.requestAnimationFrame ? window.requestAnimationFrame(handleSectionDetection) : setTimeout(handleSectionDetection, 100);
//     };
    
//     window.addEventListener("scroll", debouncedDetection, { passive: true });
//     return () => window.removeEventListener("scroll", debouncedDetection);
//   }, [navItems]);

//   useEffect(() => {
//     if (searchQuery.trim().length > 1) {
//       const results = navItems
//         .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
//         .map(item => ({ type: "section", title: item, link: `#${item.toLowerCase()}` }));
//       setSearchResults(results);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchQuery, navItems]);

//   useEffect(() => {
//     if (searchOpen && searchRef.current) {
//       const timer = setTimeout(() => searchRef.current.focus(), 50);
//       return () => clearTimeout(timer);
//     }
//   }, [searchOpen]);

//   const handleSearch = useCallback((e) => {
//     e.preventDefault();
//     setSearchOpen(false);
//     if (searchQuery && searchResults.length > 0) {
//       scrollToSection(searchResults[0].title.toLowerCase());
//     }
//     setSearchQuery("");
//   }, [searchQuery, searchResults, scrollToSection]);

//   const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
//   const toggleColorPicker = useCallback(() => setColorPickerOpen(prev => !prev), []);

//   return (
//     <>
//       <Box 
//         component="header" 
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 50,
//           backgroundColor: theme === "light" 
//             ? isScrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.9)"
//             : isScrolled ? "rgba(15,23,42,0.98)" : "rgba(15,23,42,0.9)",
//           backdropFilter: "blur(20px)",
//           borderBottom: "1px solid",
//           borderColor: theme === "light" ? "rgba(229,231,235,0.5)" : "rgba(51,65,85,0.5)",
//           boxShadow: isScrolled ? theme === "light" 
//             ? "0 4px 16px rgba(0,0,0,0.08)" 
//             : "0 4px 16px rgba(0,0,0,0.2)" 
//             : "none",
//           transition: "all 0.3s ease",
//           height: isScrolled ? "50px" : "60px",
//         }}
//       >
//         <Box 
//           sx={{
//             maxWidth: "1400px",
//             margin: "0 auto",
//             padding: "0 1.5rem",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             height: "100%",
//           }}
//         >
//           {!isMobile && (
//             <motion.nav
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//             >
//               <Box component="ul" sx={{ 
//                 display: "flex", 
//                 gap: { md: "0.25rem", lg: "0.5rem" }, 
//                 listStyle: "none", 
//                 padding: 0, 
//                 margin: 0,
//                 alignItems: "center",
//                 height: "100%",
//               }}>
//                 {navItems.map((item) => (
//                   <NavItem 
//                     key={item}
//                     item={item}
//                     activeSection={activeSection}
//                     scrollToSection={scrollToSection}
//                     theme={theme}
//                     themeColor={themeColor}
//                   />
//                 ))}
//               </Box>
//             </motion.nav>
//           )}

//           <motion.div
//             initial={{ opacity: 0, x: 10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
//             style={{ 
//               display: "flex", 
//               alignItems: "center", 
//               gap: "0.5rem",
//               marginLeft: isMobile ? "auto" : "0" 
//             }}
//           >
//             <Tooltip title="Search" arrow>
//               <IconButton
//                 onClick={() => setSearchOpen(true)}
//                 size="small"
//                 sx={{
//                   color: "text.secondary",
//                   "&:hover": {
//                     color: themeColors[themeColor]?.primary || '#3b82f6',
//                     backgroundColor: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
//                   },
//                   transition: "all 0.2s ease",
//                   display: { xs: "none", sm: "flex" },
//                 }}
//               >
//                 <Search size={18} />
//               </IconButton>
//             </Tooltip>
            
//             {/* Direct theme toggle button */}
//             <ThemeToggle theme={theme} toggleTheme={toggleTheme} themeColor={themeColor} />
            
//             {/* Direct color picker button */}
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Tooltip title="Change Theme Color" arrow>
//                 <IconButton
//                   onClick={toggleColorPicker}
//                   size="small"
//                   sx={{
//                     width: "30px",
//                     height: "30px",
//                     backgroundColor: themeColors[themeColor]?.primary || '#3b82f6',
//                     border: "2px solid white",
//                     p: 0,
//                     position: "relative",
//                     overflow: "hidden",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       boxShadow: `0 0 10px ${themeColors[themeColor]?.primary}80`
//                     }
//                   }}
//                 >
//                   {colorPickerOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       style={{
//                         position: "absolute",
//                         width: "10px",
//                         height: "10px",
//                         borderRadius: "50%", 
//                         backgroundColor: "#fff"
//                       }}
//                     />
//                   )}
//                 </IconButton>
//               </Tooltip>
//             </motion.div>

//             {isMobile && (
//               <IconButton
//                 onClick={toggleMobileMenu}
//                 size="small"
//                 sx={{
//                   color: "text.secondary",
//                   "&:hover": {
//                     color: themeColors[themeColor]?.primary || '#3b82f6',
//                     backgroundColor: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <Menu size={20} />
//               </IconButton>
//             )}
//           </motion.div>
//         </Box>
//       </Box>
      
//       {/* Search Modal with improved animation */}
//       <AnimatePresence>
//         {searchOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: theme === "light" ? "rgba(255,255,255,0.98)" : "rgba(15,23,42,0.98)",
//               backdropFilter: "blur(20px)",
//               zIndex: 100,
//               display: "flex",
//               flexDirection: "column",
//               padding: "2rem",
//               boxShadow: theme === "light" 
//                 ? "0 8px 32px rgba(0,0,0,0.2)" 
//                 : "0 8px 32px rgba(0,0,0,0.4)",
//             }}
//           >
//             <Box sx={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "2rem" 
//             }}>
//               <Typography variant="h5" sx={{ 
//                 fontWeight: 700,
//                 background: `linear-gradient(45deg, ${themeColors[themeColor]?.primary || '#3b82f6'}, ${themeColors[themeColor]?.secondary || '#1d4ed8'})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}>
//                 Search
//               </Typography>
//               <IconButton 
//                 onClick={() => setSearchOpen(false)}
//                 sx={{ 
//                   color: "text.secondary",
//                   "&:hover": {
//                     color: themeColors[themeColor]?.primary || '#3b82f6',
//                     transform: "rotate(90deg)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <X size={24} />
//               </IconButton>
//             </Box>
            
//             <Box 
//               component="form" 
//               onSubmit={handleSearch} 
//               sx={{ 
//                 width: "100%", 
//                 maxWidth: "800px", 
//                 margin: "0 auto",
//                 position: "relative",
//               }}
//             >
//               <TextField
//                 inputRef={searchRef}
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search sections..."
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search style={{ color: themeColors[themeColor]?.primary || '#3b82f6' }} />
//                     </InputAdornment>
//                   ),
//                   sx: {
//                     borderRadius: "16px",
//                     backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.9)",
//                     boxShadow: theme === "light" 
//                       ? "0 4px 20px rgba(0,0,0,0.1)" 
//                       : "0 4px 20px rgba(0,0,0,0.3)",
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       borderColor: themeColors[themeColor]?.primary || '#3b82f6',
//                       borderWidth: "2px",
//                     },
//                     "&:hover .MuiOutlinedInput-notchedOutline": {
//                       borderColor: themeColors[themeColor]?.secondary || '#1d4ed8',
//                     },
//                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                       borderColor: themeColors[themeColor]?.primary || '#3b82f6',
//                     },
//                   },
//                 }}
//                 sx={{ marginBottom: "2rem" }}
//               />
//             </Box>
            
//             {searchResults.length > 0 && (
//               <Box sx={{ 
//                 marginTop: "1rem", 
//                 width: "100%", 
//                 maxWidth: "800px", 
//                 margin: "0 auto",
//                 maxHeight: "60vh",
//                 overflowY: "auto",
//                 backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.9)",
//                 borderRadius: "16px",
//                 padding: "1rem",
//                 boxShadow: theme === "light" 
//                   ? "0 4px 20px rgba(0,0,0,0.1)" 
//                   : "0 4px 20px rgba(0,0,0,0.3)",
//               }}>
//                 <List>
//                   {searchResults.map((result, index) => (
//                     <motion.div
//                       key={`${result.type}-${index}`}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                     >
//                       <ListItem 
//                         button
//                         onClick={() => {
//                           setSearchOpen(false);
//                           scrollToSection(result.title.toLowerCase());
//                         }}
//                         sx={{
//                           borderRadius: "12px",
//                           marginBottom: "0.5rem",
//                           padding: "1rem",
//                           "&:hover": {
//                             backgroundColor: theme === "light" 
//                               ? "rgba(243,244,246,0.8)" 
//                               : "rgba(30,41,59,0.8)",
//                             transform: "translateX(5px)",
//                           },
//                           transition: "all 0.2s ease",
//                           backgroundColor: theme === "light" 
//                             ? "rgba(255,255,255,0.5)" 
//                             : "rgba(15,23,42,0.5)",
//                         }}
//                       >
//                         <ListItemText 
//                           primary={result.title}
//                           primaryTypographyProps={{ 
//                             fontWeight: 500,
//                             color: themeColors[themeColor]?.primary || '#3b82f6',
//                           }}
//                         />
//                       </ListItem>
//                     </motion.div>
//                   ))}
//                 </List>
//               </Box>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Color Picker Popover */}
//       <AnimatePresence>
//         {colorPickerOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.2 }}
//             style={{
//               position: "fixed",
//               top: isScrolled ? "55px" : "65px",
//               right: "20px",
//               backgroundColor: theme === "light" ? "white" : "#1e293b",
//               borderRadius: "16px",
//               padding: "1rem",
//               zIndex: 60,
//               boxShadow: theme === "light" 
//                 ? "0 10px 25px rgba(0,0,0,0.15)" 
//                 : "0 10px 25px rgba(0,0,0,0.4)",
//               border: "1px solid",
//               borderColor: theme === "light" ? "rgba(229,231,235,0.8)" : "rgba(51,65,85,0.8)",
//             }}
//           >
//             <ColorSelector themeColor={themeColor} setThemeColor={setThemeColor} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Mobile Menu Drawer with improved animation */}
//       <Drawer
//         anchor="right"
//         open={mobileMenuOpen}
//         onClose={toggleMobileMenu}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: "280px",
//             backgroundColor: theme === "light" ? "background.paper" : "background.default",
//             borderLeft: "1px solid",
//             borderColor: theme === "light" ? "rgba(229,231,235,0.5)" : "rgba(51,65,85,0.5)",
//             backdropFilter: "blur(20px)",
//             boxShadow: theme === "light" 
//               ? "0 8px 32px rgba(0,0,0,0.2)" 
//               : "0 8px 32px rgba(0,0,0,0.4)",
//           },
//         }}
//       >
//         <Box sx={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
//           <Box sx={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center", 
//             marginBottom: "1.5rem" 
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 600,
//               background: `linear-gradient(45deg, ${themeColors[themeColor]?.primary || '#3b82f6'}, ${themeColors[themeColor]?.secondary || '#1d4ed8'})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}>
//               Navigation
//             </Typography>
//             <IconButton 
//               onClick={toggleMobileMenu}
//               sx={{
//                 "&:hover": {
//                   transform: "rotate(90deg)",
//                   color: themeColors[themeColor]?.primary || '#3b82f6',
//                 },
//                 transition: "all 0.2s ease",
//               }}
//             >
//               <X size={20} />
//             </IconButton>
//           </Box>
          
//           <Divider sx={{ 
//             marginBottom: "1.5rem",
//             borderColor: themeColors[themeColor]?.primary || '#3b82f6',
//             opacity: 0.3,
//           }} />
          
//           <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//             <List>
//               {navItems.map((item, index) => (
//                 <motion.div
//                   key={item}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <ListItem 
//                     button
//                     onClick={() => {
//                       scrollToSection(item.toLowerCase());
//                       toggleMobileMenu();
//                     }}
//                     sx={{
//                       borderRadius: "12px",
//                       marginBottom: "0.5rem",
//                       padding: "0.75rem",
//                       backgroundColor: activeSection === item.toLowerCase() 
//                         ? theme === "light" 
//                           ? "rgba(243,244,246,0.8)" 
//                           : "rgba(30,41,59,0.8)"
//                         : "transparent",
//                       "&:hover": {
//                         backgroundColor: theme === "light" 
//                           ? "rgba(243,244,246,0.8)" 
//                           : "rgba(30,41,59,0.8)",
//                         transform: "translateX(5px)",
//                       },
//                       transition: "all 0.2s ease",
//                       boxShadow: activeSection === item.toLowerCase() 
//                         ? `0 0 12px ${themeColors[themeColor]?.primary || '#3b82f6'}40`
//                         : "none",
//                     }}
//                   >
//                     <ListItemText 
//                       primary={item} 
//                       primaryTypographyProps={{
//                         fontWeight: activeSection === item.toLowerCase() ? 600 : 500,
//                         color: activeSection === item.toLowerCase() 
//                           ? themeColors[themeColor]?.primary || '#3b82f6'
//                           : "text.primary",
//                       }}
//                     />
//                   </ListItem>
//                 </motion.div>
//               ))}
//             </List>
//           </Box>
          
//           {/* Color selection in mobile menu */}
//           <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: theme === "light" ? "rgba(229,231,235,0.5)" : "rgba(51,65,85,0.5)" }}>
//             <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>Theme Color</Typography>
//             <ColorSelector themeColor={themeColor} setThemeColor={setThemeColor} />
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// }