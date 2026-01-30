/**
 * Theme Context
 * Manages app theme (light/dark/system/auto)
 */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useColorScheme, Appearance } from 'react-native';

import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import colors from '../theme/colors';
import darkColors from '../theme/colors';
import { isNightTime } from '../utils/helpers';

// Theme modes
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
  AUTO: 'auto',
};

// Create context
export const ThemeContext = createContext(null);

// Provider
export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();

  const [themeMode, setThemeMode] = useState(THEME_MODES.LIGHT);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await storage.getItem(STORAGE_KEYS.THEME_MODE);
        if (savedTheme && Object.values(THEME_MODES).includes(savedTheme)) {
          setThemeMode(savedTheme);
        }
      } catch (e) {
        console.warn('Theme load error', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Listen to system theme change
  useEffect(() => {
    const sub = Appearance.addChangeListener(() => {});
    return () => sub.remove();
  }, []);

  // Determine dark mode
  const isDarkMode = useMemo(() => {
    if (themeMode === THEME_MODES.DARK) return true;
    if (themeMode === THEME_MODES.LIGHT) return false;
    if (themeMode === THEME_MODES.SYSTEM) {
      return systemColorScheme === 'dark';
    }
    if (themeMode === THEME_MODES.AUTO) {
      return isNightTime();
    }
    return false;
  }, [themeMode, systemColorScheme]);

  const theme = useMemo(
    () => (isDarkMode ? darkColors : colors),
    [isDarkMode]
  );

  const setTheme = useCallback(async (mode) => {
    if (!Object.values(THEME_MODES).includes(mode)) return;
    setThemeMode(mode);
    await storage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(isDarkMode ? THEME_MODES.LIGHT : THEME_MODES.DARK);
  }, [isDarkMode, setTheme]);

  const value = useMemo(
    () => ({
      themeMode,
      isDarkMode,
      isLoading,
      theme,
      colors: theme,
      setTheme,
      toggleTheme,
      THEME_MODES,
    }),
    [themeMode, isDarkMode, isLoading, theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
