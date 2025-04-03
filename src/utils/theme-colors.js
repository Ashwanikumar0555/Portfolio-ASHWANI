// src/constants/themeColors.js

/**
 * Complete theme colors configuration for consistent theming across the application
 * Each theme includes all necessary color variants for different UI components
 */
export const themeColors = {
    blue: {
      id: 'blue',
      name: 'Blue',
      primary: 'from-blue-500 to-cyan-400',
      secondary: 'from-blue-400 to-cyan-300',
      text: 'text-blue-500',
      textSecondary: 'text-blue-400',
      bg: 'bg-blue-500',
      bgSecondary: 'bg-blue-400',
      border: 'border-blue-500',
      hover: 'hover:bg-blue-600',
      active: 'active:bg-blue-700',
      focus: 'focus:ring-blue-500',
      button: {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
        outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50'
      },
      badge: 'bg-blue-100 text-blue-800',
      card: 'bg-white border border-blue-100 hover:border-blue-200',
      shadow: 'shadow-blue-200',
      gradient: {
        primary: 'bg-gradient-to-r from-blue-500 to-cyan-400',
        secondary: 'bg-gradient-to-r from-blue-400 to-cyan-300'
      }
    },
    red: {
      id: 'red',
      name: 'Red',
      primary: 'from-red-500 to-orange-400',
      secondary: 'from-red-400 to-orange-300',
      text: 'text-red-500',
      textSecondary: 'text-red-400',
      bg: 'bg-red-500',
      bgSecondary: 'bg-red-400',
      border: 'border-red-500',
      hover: 'hover:bg-red-600',
      active: 'active:bg-red-700',
      focus: 'focus:ring-red-500',
      button: {
        primary: 'bg-red-500 hover:bg-red-600 text-white',
        secondary: 'bg-red-100 hover:bg-red-200 text-red-700',
        outline: 'border border-red-500 text-red-500 hover:bg-red-50'
      },
      badge: 'bg-red-100 text-red-800',
      card: 'bg-white border border-red-100 hover:border-red-200',
      shadow: 'shadow-red-200',
      gradient: {
        primary: 'bg-gradient-to-r from-red-500 to-orange-400',
        secondary: 'bg-gradient-to-r from-red-400 to-orange-300'
      }
    },
    purple: {
      id: 'purple',
      name: 'Purple',
      primary: 'from-purple-500 to-pink-400',
      secondary: 'from-purple-400 to-pink-300',
      text: 'text-purple-500',
      textSecondary: 'text-purple-400',
      bg: 'bg-purple-500',
      bgSecondary: 'bg-purple-400',
      border: 'border-purple-500',
      hover: 'hover:bg-purple-600',
      active: 'active:bg-purple-700',
      focus: 'focus:ring-purple-500',
      button: {
        primary: 'bg-purple-500 hover:bg-purple-600 text-white',
        secondary: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
        outline: 'border border-purple-500 text-purple-500 hover:bg-purple-50'
      },
      badge: 'bg-purple-100 text-purple-800',
      card: 'bg-white border border-purple-100 hover:border-purple-200',
      shadow: 'shadow-purple-200',
      gradient: {
        primary: 'bg-gradient-to-r from-purple-500 to-pink-400',
        secondary: 'bg-gradient-to-r from-purple-400 to-pink-300'
      }
    },
    green: {
      id: 'green',
      name: 'Green',
      primary: 'from-emerald-500 to-green-400',
      secondary: 'from-emerald-400 to-green-300',
      text: 'text-emerald-500',
      textSecondary: 'text-emerald-400',
      bg: 'bg-emerald-500',
      bgSecondary: 'bg-emerald-400',
      border: 'border-emerald-500',
      hover: 'hover:bg-emerald-600',
      active: 'active:bg-emerald-700',
      focus: 'focus:ring-emerald-500',
      button: {
        primary: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        secondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700',
        outline: 'border border-emerald-500 text-emerald-500 hover:bg-emerald-50'
      },
      badge: 'bg-emerald-100 text-emerald-800',
      card: 'bg-white border border-emerald-100 hover:border-emerald-200',
      shadow: 'shadow-emerald-200',
      gradient: {
        primary: 'bg-gradient-to-r from-emerald-500 to-green-400',
        secondary: 'bg-gradient-to-r from-emerald-400 to-green-300'
      }
    }
  };
  
  /**
   * Gets the theme configuration for a specific theme
   * @param {string} themeId - The theme identifier (blue, red, purple, green)
   * @returns {Object} The theme configuration object
   */
  export const getTheme = (themeId) => {
    return themeColors[themeId] || themeColors.blue;
  };
  
  /**
   * Gets all available themes as an array
   * @returns {Array} Array of theme objects
   */
  export const getAllThemes = () => {
    return Object.values(themeColors);
  };
  
  /**
   * Applies theme classes to a component
   * @param {string} themeId - The theme identifier
   * @param {string} type - The type of component (button, card, etc.)
   * @param {string} variant - The variant (primary, secondary, etc.)
   * @returns {string} The combined class names
   */
  export const applyThemeClasses = (themeId, type, variant = 'primary') => {
    const theme = getTheme(themeId);
    
    if (type === 'button' && theme.button) {
      return theme.button[variant] || '';
    }
    
    if (type === 'gradient' && theme.gradient) {
      return theme.gradient[variant] || theme.gradient.primary;
    }
    
    return theme[type] || '';
  };
  
  /**
   * Theme provider component props
   * @typedef {Object} ThemeProviderProps
   * @property {string} theme - The current theme ID
   * @property {function} setTheme - Function to change the theme
   * @property {function} toggleTheme - Function to toggle between themes
   */
  
  /**
   * Default theme context
   * @type {ThemeProviderProps}
   */
  export const defaultThemeContext = {
    theme: 'blue',
    setTheme: () => {},
    toggleTheme: () => {}
  };