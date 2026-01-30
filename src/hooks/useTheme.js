/**
 * useTheme Hook
 * 
 * Custom hook for accessing theme context
 */

import { useContext, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { colors as lightColors, darkColors } from '../theme/colors';
import { typography, textStyles } from '../theme/typography';
import { spacing, componentSpacing, layout } from '../theme/spacing';
import { shadows, componentShadows } from '../theme/shadows';
import { borderRadius, componentRadius } from '../theme/borderRadius';

/**
 * Hook to access theme context
 * @returns {object} Theme context value with extended utilities
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  // Extended theme object
  const extendedTheme = useMemo(() => ({
    ...context,
    
    // Typography
    typography,
    textStyles,
    
    // Spacing
    spacing,
    componentSpacing,
    layout,
    
    // Shadows
    shadows,
    componentShadows,
    
    // Border radius
    borderRadius,
    componentRadius,
    
    // Color helpers
    lightColors,
    darkColors,
  }), [context]);

  return extendedTheme;
};

/**
 * Hook to get themed styles
 * @param {function} stylesFn - Function that returns styles based on theme
 * @returns {object} Themed styles
 */
export const useThemedStyles = (stylesFn) => {
  const theme = useTheme();
  
  return useMemo(() => {
    return stylesFn(theme);
  }, [theme, stylesFn]);
};

export default useTheme;