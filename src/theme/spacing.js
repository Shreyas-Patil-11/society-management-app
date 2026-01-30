/**
 * Spacing System for Society Management App
 * 
 * Based on 4px grid system
 * Ensures consistent spacing throughout the app
 */

// Base unit
const BASE_UNIT = 4;

// Spacing Scale
export const spacing = {
  // None
  none: 0,
  
  // Extra Extra Small - 2px
  xxs: BASE_UNIT * 0.5,  // 2
  
  // Extra Small - 4px
  xs: BASE_UNIT,          // 4
  
  // Small - 8px
  sm: BASE_UNIT * 2,      // 8
  
  // Medium - 12px
  md: BASE_UNIT * 3,      // 12
  
  // Base/Default - 16px
  base: BASE_UNIT * 4,    // 16
  
  // Large - 20px
  lg: BASE_UNIT * 5,      // 20
  
  // Extra Large - 24px
  xl: BASE_UNIT * 6,      // 24
  
  // 2XL - 32px
  xxl: BASE_UNIT * 8,     // 32
  
  // 3XL - 40px
  xxxl: BASE_UNIT * 10,   // 40
  
  // 4XL - 48px
  xxxxl: BASE_UNIT * 12,  // 48
  
  // 5XL - 64px
  xxxxxl: BASE_UNIT * 16, // 64
};

// Screen Padding
export const screenPadding = {
  horizontal: spacing.base,  // 16
  vertical: spacing.base,    // 16
};

// Component Specific Spacing
export const componentSpacing = {
  // Cards
  card: {
    padding: spacing.base,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  
  // Buttons
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  
  // Input Fields
  input: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
    labelGap: spacing.xs,
  },
  
  // List Items
  listItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  
  // Section Headers
  section: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    titleGap: spacing.sm,
  },
  
  // Modal
  modal: {
    padding: spacing.xl,
    gap: spacing.base,
  },
  
  // Avatar
  avatar: {
    marginRight: spacing.md,
  },
  
  // Icon
  icon: {
    marginRight: spacing.sm,
    size: {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    },
  },
  
  // Badge
  badge: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
  },
  
  // Tab Bar
  tabBar: {
    paddingBottom: spacing.sm,
    height: 60,
  },
  
  // Header
  header: {
    height: 56,
    paddingHorizontal: spacing.base,
  },
  
  // Bottom Sheet
  bottomSheet: {
    padding: spacing.xl,
    handleHeight: spacing.xs,
    handleWidth: spacing.xxxl,
  },
  
  // Toast
  toast: {
    padding: spacing.base,
    marginHorizontal: spacing.base,
    marginBottom: spacing.xxl,
  },
};

// Layout Spacing
export const layout = {
  // Container max width
  maxWidth: 600,
  
  // Gutter
  gutter: spacing.base,
  
  // Gap between items in a row/column
  gap: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.base,
    xl: spacing.xl,
  },
  
  // Stack spacing (vertical)
  stack: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.base,
    xl: spacing.xl,
  },
  
  // Inline spacing (horizontal)
  inline: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.base,
    xl: spacing.xl,
  },
};

// Insets (padding shorthand)
export const insets = {
  none: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  xs: {
    top: spacing.xs,
    right: spacing.xs,
    bottom: spacing.xs,
    left: spacing.xs,
  },
  sm: {
    top: spacing.sm,
    right: spacing.sm,
    bottom: spacing.sm,
    left: spacing.sm,
  },
  md: {
    top: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    left: spacing.md,
  },
  base: {
    top: spacing.base,
    right: spacing.base,
    bottom: spacing.base,
    left: spacing.base,
  },
  lg: {
    top: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    left: spacing.lg,
  },
  xl: {
    top: spacing.xl,
    right: spacing.xl,
    bottom: spacing.xl,
    left: spacing.xl,
  },
  screen: {
    top: spacing.base,
    right: spacing.base,
    bottom: spacing.base,
    left: spacing.base,
  },
};

export default {
  ...spacing,
  screen: screenPadding,
  component: componentSpacing,
  layout,
  insets,
};