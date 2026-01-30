/**
 * Border Radius System for Society Management App
 * 
 * Consistent border radius values for all components
 */

export const borderRadius = {
  // None
  none: 0,
  
  // Extra Small - Subtle rounding
  xs: 2,
  
  // Small - Buttons, inputs
  sm: 4,
  
  // Medium - Cards, containers
  md: 8,
  
  // Large - Modals, large cards
  lg: 12,
  
  // Extra Large - Bottom sheets
  xl: 16,
  
  // 2XL - Large modals
  xxl: 24,
  
  // Full - Pills, circular elements
  full: 9999,
  
  // Circle (for avatars) - Use with equal width/height
  circle: 9999,
};

/**
 * Component-specific border radius
 */
export const componentRadius = {
  // Buttons
  button: {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    pill: borderRadius.full,
  },
  
  // Cards
  card: {
    sm: borderRadius.md,
    md: borderRadius.lg,
    lg: borderRadius.xl,
  },
  
  // Inputs
  input: {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
  },
  
  // Avatar
  avatar: {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    circle: borderRadius.circle,
  },
  
  // Badge
  badge: {
    sm: borderRadius.xs,
    md: borderRadius.sm,
    pill: borderRadius.full,
  },
  
  // Modal
  modal: borderRadius.xl,
  
  // Bottom Sheet
  bottomSheet: {
    top: borderRadius.xl,
  },
  
  // Toast
  toast: borderRadius.md,
  
  // Image
  image: {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
  },
  
  // Chip/Tag
  chip: borderRadius.full,
  
  // Tab indicator
  tabIndicator: borderRadius.full,
  
  // Progress bar
  progressBar: borderRadius.full,
  
  // Skeleton
  skeleton: borderRadius.md,
};

export default {
  ...borderRadius,
  component: componentRadius,
};