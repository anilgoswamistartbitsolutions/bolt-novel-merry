import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'sepia';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  isSepia: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'sepia');
    
    // Add current theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('sepia');
      // Apply sepia styles to body
      document.body.style.backgroundColor = '#fefdf8';
      document.body.style.color = '#4a4a4a';
    } else {
      // Reset body styles for light mode
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, [theme]);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isSepia }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};