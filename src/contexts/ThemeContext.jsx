import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem, KEYS } from '../utils/storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = getItem(KEYS.THEME, 'dark');
    return saved;
  });

  useEffect(() => {
    // Apply theme to document
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    setItem(KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    const themes = ['dark', 'light', 'system'];
    const current = theme === 'dark' ? 1 : theme === 'light' ? 2 : 0;
    setTheme(themes[(current + 1) % 3]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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
