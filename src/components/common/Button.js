/**
 * Button Component
 * 
 * Reusable button with multiple variants, sizes, and states
 * Follows Fitts's Law with appropriate touch targets
 */

import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { shadows } from '../../theme/shadows';
import { useHaptic } from '../../hooks/useHaptic';

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
};

// Button sizes
export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const Button = ({
  // Content
  title,
  leftIcon,
  rightIcon,
  children,
  
  // Variants
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MEDIUM,
  
  // States
  loading = false,
  disabled = false,
  
  // Styling
  fullWidth = false,
  rounded = false,
  style,
  textStyle,
  
  // Haptics
  enableHaptic = true,
  hapticType = 'selection',
  
  // Events
  onPress,
  onLongPress,
  
  // Accessibility
  accessibilityLabel,
  accessibilityHint,
  testID,
  
  ...props
}) => {
  const { trigger } = useHaptic();

  /**
   * Handle press with haptic feedback
   */
  const handlePress = useCallback(() => {
    if (disabled || loading) return;
    
    if (enableHaptic) {
      trigger(hapticType);
    }
    
    onPress?.();
  }, [disabled, loading, enableHaptic, hapticType, trigger, onPress]);

  /**
   * Handle long press with haptic feedback
   */
  const handleLongPress = useCallback(() => {
    if (disabled || loading) return;
    
    if (enableHaptic) {
      trigger('impactMedium');
    }
    
    onLongPress?.();
  }, [disabled, loading, enableHaptic, trigger, onLongPress]);

  /**
   * Get variant styles
   */
  const getVariantStyles = () => {
    const isDisabled = disabled || loading;
    
    switch (variant) {
      case BUTTON_VARIANTS.PRIMARY:
        return {
          container: {
            backgroundColor: isDisabled ? colors.primary.light : colors.primary.main,
            ...shadows.sm,
          },
          text: { color: colors.primary.contrast },
          icon: colors.primary.contrast,
        };
      
      case BUTTON_VARIANTS.SECONDARY:
        return {
          container: {
            backgroundColor: isDisabled ? colors.secondary.light : colors.secondary.main,
          },
          text: { color: colors.secondary.contrast },
          icon: colors.secondary.contrast,
        };
      
      case BUTTON_VARIANTS.OUTLINE:
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: isDisabled ? colors.border.light : colors.primary.main,
          },
          text: { color: isDisabled ? colors.text.disabled : colors.primary.main },
          icon: isDisabled ? colors.text.disabled : colors.primary.main,
        };
      
      case BUTTON_VARIANTS.GHOST:
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: { color: isDisabled ? colors.text.disabled : colors.primary.main },
          icon: isDisabled ? colors.text.disabled : colors.primary.main,
        };
      
      case BUTTON_VARIANTS.DANGER:
        return {
          container: {
            backgroundColor: isDisabled ? colors.error.light : colors.error.main,
            ...shadows.sm,
          },
          text: { color: colors.error.contrast },
          icon: colors.error.contrast,
        };
      
      case BUTTON_VARIANTS.SUCCESS:
        return {
          container: {
            backgroundColor: isDisabled ? colors.success.light : colors.success.main,
            ...shadows.sm,
          },
          text: { color: colors.success.contrast },
          icon: colors.success.contrast,
        };
      
      case BUTTON_VARIANTS.WARNING:
        return {
          container: {
            backgroundColor: isDisabled ? colors.warning.light : colors.warning.main,
            ...shadows.sm,
          },
          text: { color: colors.warning.contrast },
          icon: colors.warning.contrast,
        };
      
      default:
        return {
          container: { backgroundColor: colors.primary.main },
          text: { color: colors.primary.contrast },
          icon: colors.primary.contrast,
        };
    }
  };

  /**
   * Get size styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case BUTTON_SIZES.SMALL:
        return {
          container: {
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            minHeight: 36,
          },
          text: typography.textStyles.buttonSmall,
          iconSize: 16,
        };
      
      case BUTTON_SIZES.LARGE:
        return {
          container: {
            paddingVertical: spacing.base,
            paddingHorizontal: spacing.xl,
            minHeight: 56,
          },
          text: typography.textStyles.buttonLarge,
          iconSize: 24,
        };
      
      case BUTTON_SIZES.MEDIUM:
      default:
        return {
          container: {
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
            minHeight: 48,
          },
          text: typography.textStyles.buttonMedium,
          iconSize: 20,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  /**
   * Render button content
   */
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variantStyles.text.color}
        />
      );
    }

    return (
      <View style={styles.content}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={sizeStyles.iconSize}
            color={variantStyles.icon}
            style={styles.leftIcon}
          />
        )}
        
        {title ? (
          <Text
            style={[
              styles.text,
              sizeStyles.text,
              variantStyles.text,
              textStyle,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
        ) : (
          children
        )}
        
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={sizeStyles.iconSize}
            color={variantStyles.icon}
            style={styles.rightIcon}
          />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={onLongPress ? handleLongPress : undefined}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
      style={[
        styles.container,
        sizeStyles.container,
        variantStyles.container,
        fullWidth && styles.fullWidth,
        rounded && styles.rounded,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...props}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  rounded: {
    borderRadius: borderRadius.full,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;