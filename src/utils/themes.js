// src/utils/themes.js
import React, { createContext, useContext, useState, useEffect } from 'react';
export const THEMES = {
  default: {
    id: 'default',
    name: 'Padrão',
    description: 'Tema clássico do Quest Tasks',
    icon: '🎨',
    unlockLevel: 0,
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      dark: '#1F2937',
      background: 'from-purple-50 to-blue-50',
      card: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200'
    },
    gradients: {
      button: 'from-purple-600 to-blue-600',
      buttonHover: 'from-purple-700 to-blue-700',
      xpBar: 'from-purple-500 to-blue-500',
      header: 'bg-white'
    }
  },

  dark: {
    id: 'dark',
    name: 'Modo Escuro',
    description: 'Tema escuro para usar à noite',
    icon: '🌙',
    unlockLevel: 5,
    colors: {
      primary: '#A855F7',
      secondary: '#F472B6',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      dark: '#111827',
      background: 'from-gray-900 to-black',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700'
    },
    gradients: {
      button: 'from-purple-500 to-pink-500',
      buttonHover: 'from-purple-600 to-pink-600',
      xpBar: 'from-purple-400 to-pink-400',
      header: 'bg-gray-800 border-gray-700'
    }
  },

  neon: {
    id: 'neon',
    name: 'Neon Cyber',
    description: 'Tema futurista com cores vibrantes',
    icon: '💜',
    unlockLevel: 10,
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      success: '#00FF00',
      warning: '#FFFF00',
      error: '#FF0040',
      dark: '#0D001A',
      background: 'from-purple-900 via-pink-900 to-blue-900',
      card: 'bg-gray-900 border border-purple-500',
      text: 'text-pink-100',
      textSecondary: 'text-purple-200',
      border: 'border-purple-500'
    },
    gradients: {
      button: 'from-pink-500 to-cyan-500',
      buttonHover: 'from-pink-600 to-cyan-600',
      xpBar: 'from-pink-400 to-cyan-400',
      header: 'bg-gray-900 border-purple-500'
    }
  },

  nature: {
    id: 'nature',
    name: 'Natureza',
    description: 'Tema inspirado na natureza',
    icon: '🌿',
    unlockLevel: 15,
    colors: {
      primary: '#059669',
      secondary: '#DC2626',
      success: '#10B981',
      warning: '#D97706',
      error: '#DC2626',
      dark: '#064E3B',
      background: 'from-green-50 to-emerald-50',
      card: 'bg-white border border-green-200',
      text: 'text-green-900',
      textSecondary: 'text-green-700',
      border: 'border-green-200'
    },
    gradients: {
      button: 'from-green-600 to-emerald-600',
      buttonHover: 'from-green-700 to-emerald-700',
      xpBar: 'from-green-500 to-emerald-500',
      header: 'bg-green-50 border-green-200'
    }
  },

  gold: {
    id: 'gold',
    name: 'Ouro Real',
    description: 'Tema luxuoso dourado',
    icon: '✨',
    unlockLevel: 20,
    colors: {
      primary: '#D97706',
      secondary: '#DC2626',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      dark: '#92400E',
      background: 'from-yellow-50 to-orange-50',
      card: 'bg-gradient-to-br from-yellow-50 to-orange-100 border border-yellow-300',
      text: 'text-yellow-900',
      textSecondary: 'text-yellow-800',
      border: 'border-yellow-300'
    },
    gradients: {
      button: 'from-yellow-500 to-orange-500',
      buttonHover: 'from-yellow-600 to-orange-600',
      xpBar: 'from-yellow-400 to-orange-400',
      header: 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300'
    }
  },

  ocean: {
    id: 'ocean',
    name: 'Oceano Profundo',
    description: 'Tema azul oceânico relaxante',
    icon: '🌊',
    unlockLevel: 25,
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      dark: '#0C4A6E',
      background: 'from-blue-50 to-cyan-50',
      card: 'bg-white border border-blue-200',
      text: 'text-blue-900',
      textSecondary: 'text-blue-700',
      border: 'border-blue-200'
    },
    gradients: {
      button: 'from-blue-500 to-cyan-500',
      buttonHover: 'from-blue-600 to-cyan-600',
      xpBar: 'from-blue-400 to-cyan-400',
      header: 'bg-blue-50 border-blue-200'
    }
  },

  fire: {
    id: 'fire',
    name: 'Chamas Ardentes',
    description: 'Tema quente e energético',
    icon: '🔥',
    unlockLevel: 30,
    colors: {
      primary: '#DC2626',
      secondary: '#EA580C',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#DC2626',
      dark: '#7F1D1D',
      background: 'from-red-50 to-orange-50',
      card: 'bg-white border border-red-200',
      text: 'text-red-900',
      textSecondary: 'text-red-700',
      border: 'border-red-200'
    },
    gradients: {
      button: 'from-red-500 to-orange-500',
      buttonHover: 'from-red-600 to-orange-600',
      xpBar: 'from-red-400 to-orange-400',
      header: 'bg-red-50 border-red-200'
    }
  },

  // Tema especial por conquista
  legendary: {
    id: 'legendary',
    name: 'Lendário',
    description: 'Tema exclusivo para verdadeiras lendas',
    icon: '👑',
    unlockLevel: 50,
    unlockCondition: 'legend', // Conquista específica
    colors: {
      primary: '#7C3AED',
      secondary: '#DB2777',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      dark: '#4C1D95',
      background: 'from-violet-100 via-purple-50 to-pink-100',
      card: 'bg-gradient-to-br from-white to-purple-50 border border-purple-300 shadow-lg',
      text: 'text-purple-900',
      textSecondary: 'text-purple-700',
      border: 'border-purple-300'
    },
    gradients: {
      button: 'from-purple-600 via-pink-600 to-purple-600',
      buttonHover: 'from-purple-700 via-pink-700 to-purple-700',
      xpBar: 'from-purple-500 via-pink-500 to-purple-500',
      header: 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'
    }
  }
};

// Hook para gerenciar temas
export const useThemes = (playerData) => {
  const getAvailableThemes = () => {
    return Object.values(THEMES).filter(theme => {
      if (theme.unlockLevel > playerData.level) return false;
      
      if (theme.unlockCondition) {
        return playerData.achievements?.includes(theme.unlockCondition);
      }
      
      return true;
    });
  };

  const getLockedThemes = () => {
    return Object.values(THEMES).filter(theme => {
      if (theme.unlockLevel > playerData.level) return true;
      
      if (theme.unlockCondition) {
        return !playerData.achievements?.includes(theme.unlockCondition);
      }
      
      return false;
    });
  };

  const getThemeById = (themeId) => {
    return THEMES[themeId] || THEMES.default;
  };

  const isThemeUnlocked = (themeId) => {
    const theme = THEMES[themeId];
    if (!theme) return false;
    
    if (theme.unlockLevel > playerData.level) return false;
    
    if (theme.unlockCondition) {
      return playerData.achievements?.includes(theme.unlockCondition);
    }
    
    return true;
  };

  const getNextThemeToUnlock = () => {
    const lockedThemes = getLockedThemes();
    return lockedThemes.sort((a, b) => a.unlockLevel - b.unlockLevel)[0];
  };

  return {
    getAvailableThemes,
    getLockedThemes,
    getThemeById,
    isThemeUnlocked,
    getNextThemeToUnlock,
    allThemes: Object.values(THEMES)
  };
};

// Context para tema atual

const ThemeContext = createContext();

export const ThemeProvider = ({ children, playerData }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const { isThemeUnlocked, getThemeById } = useThemes(playerData);

  // Carregar tema salvo do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('quest-tasks-theme');
    if (savedTheme && isThemeUnlocked(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, [playerData.level, playerData.achievements]);

  const changeTheme = (themeId) => {
    if (isThemeUnlocked(themeId)) {
      setCurrentTheme(themeId);
      localStorage.setItem('quest-tasks-theme', themeId);
    }
  };

  const theme = getThemeById(currentTheme);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentTheme, 
      changeTheme,
      playerData 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};