/**
 * Shadow System for Society Management App
 * 
 * Platform-specific shadows for iOS and Android
 * Elevation levels from 0 to 5
 */

import { Platform } from 'react-native';
import { colors } from './colors';

// Shadow color
const SHADOW_COLOR = colors.black;

/**
 * iOS Shadow Properties
 * Uses shadowOffset, shadowOpacity, shadowRadius
 */
const iosShadows = {
  none: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  xs: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  sm: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  md: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lg: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  xl: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  xxl: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
};

/**
 * Android Elevation Properties
 * Uses elevation property
 */
const androidShadows = {
  none: {
    elevation: 0,
  },
  xs: {
    elevation: 1,
  },
  sm: {
    elevation: 2,
  },
  md: {
    elevation: 4,
  },
  lg: {
    elevation: 8,
  },
  xl: {
    elevation: 16,
  },
  xxl: {
    elevation: 24,
  },
};

/**
 * Get shadow style based on platform
 */
export const getShadow = (level = 'md') => {
  return Platform.select({
    ios: iosShadows[level] || iosShadows.md,
    android: androidShadows[level] || androidShadows.md,
  });
};

/**
 * Pre-defined shadow styles
 */
export const shadows = {
  none: getShadow('none'),
  xs: getShadow('xs'),
  sm: getShadow('sm'),
  md: getShadow('md'),
  lg: getShadow('lg'),
  xl: getShadow('xl'),
  xxl: getShadow('xxl'),
};

/**
 * Component-specific shadows
 */
export const componentShadows = {
  // Card shadows
  card: getShadow('sm'),
  cardHover: getShadow('md'),
  cardPressed: getShadow('xs'),
  
  // Button shadows
  button: getShadow('sm'),
  buttonPressed: getShadow('xs'),
  buttonFloating: getShadow('lg'),
  
  // Modal/Bottom sheet shadows
  modal: getShadow('xl'),
  bottomSheet: getShadow('xl'),
  
  // Header shadow
  header: getShadow('sm'),
  
  // Tab bar shadow
  tabBar: Platform.select({
    ios: {
      shadowColor: SHADOW_COLOR,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 8,
    },
  }),
  
  // Dropdown shadow
  dropdown: getShadow('lg'),
  
  // Toast shadow
  toast: getShadow('md'),
  
  // Avatar shadow
  avatar: getShadow('sm'),
  
  // Input focus shadow
  inputFocus: Platform.select({
    ios: {
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
};

/**
 * Custom shadow generator
 */
export const createShadow = ({
  color = SHADOW_COLOR,
  offsetX = 0,
  offsetY = 2,
  opacity = 0.1,
  radius = 4,
  elevation = 4,
}) => {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: offsetX, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation: elevation,
    },
  });
};

export default {
  ...shadows,
  component: componentShadows,
  getShadow,
  createShadow,
};