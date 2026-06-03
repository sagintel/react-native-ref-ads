import React, { createContext, useContext, useMemo } from 'react';
import { AdTheme } from '../types';
import { defaultTheme } from '../utils/constants';

interface ThemeContextValue {
  theme: AdTheme;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: defaultTheme });

export const useAdTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAdTheme must be used within a ThemeProvider');
  }
  return context.theme;
};

interface ThemeProviderProps {
  theme?: Partial<AdTheme>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme: overrideTheme, children }) => {
  const theme = useMemo(() => {
    if (!overrideTheme) return defaultTheme;
    return {
      ...defaultTheme,
      colors: { ...defaultTheme.colors, ...overrideTheme.colors },
      fonts: { ...defaultTheme.fonts, ...overrideTheme.fonts },
      spacing: { ...defaultTheme.spacing, ...overrideTheme.spacing },
      borderRadius: { ...defaultTheme.borderRadius, ...overrideTheme.borderRadius },
      shadows: { ...defaultTheme.shadows, ...overrideTheme.shadows },
    };
  }, [overrideTheme]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};
