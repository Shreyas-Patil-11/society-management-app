/**
 * Theme Index - Central export for all theme values
 */

import colors, { darkColors } from './colors';
import typography, { 
  fontFamily, 
  fontWeight, 
  fontSize, 
  lineHeight, 
  letterSpacing, 
  textStyles 
} from './typography';
import spacing, { 
  screenPadding, 
  componentSpacing, 
  layout, 
  insets 
} from './spacing';
import shadows, { 
  getShadow, 
  createShadow, 
  componentShadows 
} from './shadows';
import borderRadius, { componentRadius } from './borderRadius';

// Combined theme object
export const theme = {
  colors,
  darkColors,
  typography,
  spacing,
  shadows,
  borderRadius,
};

// Named exports
export {
  colors,
  darkColors,
  typography,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  textStyles,
  spacing,
  screenPadding,
  componentSpacing,
  layout,
  insets,
  shadows,
  getShadow,
  createShadow,
  componentShadows,
  borderRadius,
  componentRadius,
};

export default theme;