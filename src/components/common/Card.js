/**
 * Card Component
 * 
 * Reusable card container with multiple variants
 * Follows Gestalt principles for visual grouping
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { shadows } from '../../theme/shadows';

// Card variants
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  OUTLINED: 'outlined',
  FILLED: 'filled',
};

const Card = ({
  // Content
  children,
  
  // Variants
  variant = CARD_VARIANTS.DEFAULT,
  
  // Styling
  padding = spacing.base,
  margin,
  marginBottom = spacing.md,
  backgroundColor,
  borderColor,
  style,
  
  // Press behavior
  onPress,
  onLongPress,
  disabled = false,
  activeOpacity = 0.7,
  
  // Accessibility
  accessibilityLabel,
  accessibilityHint,
  testID,
  
  ...props
}) => {
  /**
   * Get variant styles
   */
  const getVariantStyles = () => {
    switch (variant) {
      case CARD_VARIANTS.ELEVATED:
        return {
          backgroundColor: backgroundColor || colors.surface.elevated,
          ...shadows.md,
        };
      
      case CARD_VARIANTS.OUTLINED:
        return {
          backgroundColor: backgroundColor || colors.surface.primary,
          borderWidth: 1,
          borderColor: borderColor || colors.border.light,
        };
      
      case CARD_VARIANTS.FILLED:
        return {
          backgroundColor: backgroundColor || colors.background.secondary,
        };
      
      case CARD_VARIANTS.DEFAULT:
      default:
        return {
          backgroundColor: backgroundColor || colors.surface.primary,
          ...shadows.sm,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const cardStyle = [
    styles.card,
    variantStyles,
    { padding },
    margin !== undefined && { margin },
    marginBottom !== undefined && { marginBottom },
    style,
  ];

  // If pressable, wrap in TouchableOpacity
  if (onPress || onLongPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled }}
        testID={testID}
        style={cardStyle}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={cardStyle}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
});

// Card sub-components for structured layouts
export const CardHeader = ({ children, style, ...props }) => (
  <View style={[cardStyles.header, style]} {...props}>
    {children}
  </View>
);

export const CardContent = ({ children, style, ...props }) => (
  <View style={[cardStyles.content, style]} {...props}>
    {children}
  </View>
);

export const CardFooter = ({ children, style, ...props }) => (
  <View style={[cardStyles.footer, style]} {...props}>
    {children}
  </View>
);

export const CardTitle = ({ children, style, ...props }) => (
  <View style={[cardStyles.title, style]} {...props}>
    {children}
  </View>
);

const cardStyles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.sm,
  },
});

export default Card;