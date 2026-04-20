'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (nextTheme: Theme) => {
  document.documentElement.classList.toggle('dark', nextTheme === 'dark');
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [systemTheme, setSystemTheme] = useState<Theme>('light');
  const [manualTheme, setManualTheme] = useState<Theme | null>(null);
  const [isSystemThemeReady, setIsSystemThemeReady] = useState(false);
  const theme = manualTheme ?? systemTheme;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('theme');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const syncSystemTheme = () => {
      setSystemTheme(getSystemTheme());
      setIsSystemThemeReady(true);
    };

    syncSystemTheme();

    mediaQuery.addEventListener('change', syncSystemTheme);
    return () => mediaQuery.removeEventListener('change', syncSystemTheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isSystemThemeReady) return;
    applyTheme(theme);
  }, [isSystemThemeReady, theme]);

  const toggleTheme = () => {
    const currentTheme = manualTheme ?? systemTheme;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    setManualTheme(nextTheme === systemTheme ? null : nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
