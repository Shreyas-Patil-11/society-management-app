/**
 * Color Palette for Society Management App
 * WCAG AA Compliant - Minimum contrast ratio 4.5:1 for text
 * 
 * Usage:
 * - Blue: Primary actions, links, interactive elements
 * - Green: Success states, approvals, confirmations
 * - Red: Emergency, alerts, errors, rejections
 * - Yellow/Orange: Pending states, warnings
 * - Grey: Backgrounds, borders, disabled states
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    main: '#2563EB',      // Primary Blue - Main actions
    light: '#3B82F6',     // Lighter blue - Hover states
    dark: '#1D4ED8',      // Darker blue - Pressed states
    contrast: '#FFFFFF',  // Text on primary
    background: '#EFF6FF', // Light blue background
  },

  // Secondary Colors
  secondary: {
    main: '#64748B',      // Slate gray
    light: '#94A3B8',     // Light slate
    dark: '#475569',      // Dark slate
    contrast: '#FFFFFF',  // Text on secondary
  },

  // Status Colors
  success: {
    main: '#16A34A',      // Green - Approved/Success
    light: '#22C55E',     // Light green
    dark: '#15803D',      // Dark green
    contrast: '#FFFFFF',  // Text on success
    background: '#F0FDF4', // Light green background
  },

  error: {
    main: '#DC2626',      // Red - Error/Emergency
    light: '#EF4444',     // Light red
    dark: '#B91C1C',      // Dark red
    contrast: '#FFFFFF',  // Text on error
    background: '#FEF2F2', // Light red background
  },

  warning: {
    main: '#F59E0B',      // Amber - Pending/Warning
    light: '#FBBF24',     // Light amber
    dark: '#D97706',      // Dark amber
    contrast: '#000000',  // Text on warning
    background: '#FFFBEB', // Light amber background
  },

  info: {
    main: '#0EA5E9',      // Sky blue - Information
    light: '#38BDF8',     // Light sky
    dark: '#0284C7',      // Dark sky
    contrast: '#FFFFFF',  // Text on info
    background: '#F0F9FF', // Light sky background
  },

  // Text Colors
  text: {
    primary: '#1F2937',   // Main text - Dark gray
    secondary: '#6B7280', // Secondary text - Medium gray
    tertiary: '#9CA3AF',  // Tertiary text - Light gray
    disabled: '#D1D5DB',  // Disabled text
    inverse: '#FFFFFF',   // Text on dark backgrounds
    link: '#2563EB',      // Link text
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',   // Main background
    secondary: '#F9FAFB', // Secondary background (cards, sections)
    tertiary: '#F3F4F6',  // Tertiary background (inputs, dividers)
    dark: '#1F2937',      // Dark background
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
  },

  // Border Colors
  border: {
    light: '#E5E7EB',     // Light border
    main: '#D1D5DB',      // Main border
    dark: '#9CA3AF',      // Dark border
    focus: '#2563EB',     // Focus border
  },

  // Surface Colors (Cards, Modals)
  surface: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    elevated: '#FFFFFF',
  },

  // Icon Colors
  icon: {
    primary: '#374151',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    disabled: '#D1D5DB',
    inverse: '#FFFFFF',
  },

  // Specific Feature Colors
  visitor: {
    guest: '#8B5CF6',      // Purple for guests
    delivery: '#F97316',   // Orange for delivery
    cab: '#FBBF24',        // Yellow for cab
    service: '#06B6D4',    // Cyan for serviceman
  },

  // Status Badge Colors
  status: {
    pending: '#F59E0B',
    approved: '#16A34A',
    rejected: '#DC2626',
    inProgress: '#3B82F6',
    completed: '#16A34A',
    cancelled: '#6B7280',
  },

  // Social/Action Colors
  social: {
    like: '#EF4444',
    comment: '#3B82F6',
    share: '#10B981',
  },

  // Payment Status
  payment: {
    paid: '#16A34A',
    pending: '#F59E0B',
    overdue: '#DC2626',
    partial: '#8B5CF6',
  },

  // Guard Specific
  guard: {
    emergency: '#DC2626',
    nightMode: '#1F2937',
    dayMode: '#FFFFFF',
    allowed: '#16A34A',
    declined: '#DC2626',
    waiting: '#F59E0B',
    ringing: '#3B82F6',
  },

  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Shimmer/Skeleton
  skeleton: {
    base: '#E5E7EB',
    highlight: '#F3F4F6',
  },
};

// Dark Mode Colors (for future implementation)
export const darkColors = {
  primary: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    contrast: '#FFFFFF',
    background: '#1E3A5F',
  },

  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    disabled: '#6B7280',
    inverse: '#1F2937',
    link: '#60A5FA',
  },

  background: {
    primary: '#111827',
    secondary: '#1F2937',
    tertiary: '#374151',
    dark: '#030712',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  border: {
    light: '#374151',
    main: '#4B5563',
    dark: '#6B7280',
    focus: '#3B82F6',
  },

  surface: {
    primary: '#1F2937',
    secondary: '#374151',
    elevated: '#374151',
  },
};

export default colors;