/**
 * IconButton Component
 * 
 * Touchable icon with customizable appearance
 */

import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { shadows } from '../../theme/shadows';
import { useHaptic } from '../../hooks/useHaptic';

// Icon button variants
export const ICON_BUTTON_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TONAL: 'tonal',
};

// Icon button sizes
export const ICON_BUTTON_SIZES = {
  SM: 32,
  MD: 40,
  LG: 48,
  XL: 56,
};

const IconButton = ({
  // Icon
  icon,
  iconSize,
  iconColor,
  
  // Variant
  variant = ICON_BUTTON_VARIANTS.DEFAULT,
  
  // Size
  size = ICON_BUTTON_SIZES.MD,
  
  // Colors
  backgroundColor,
  borderColor,
  activeColor = colors.primary.main,
  
  // States
  loading = false,
  disabled = false,
  active = false,
  
  // Badge
  badge,
  badgeColor = colors.error.main,
  
  // Styling
  rounded = true,
  elevated = false,
  style,
  
  // Haptics
  enableHaptic = true,
  
  // Events
  onPress,
  onLongPress,
  
  // Accessibility
  accessibilityLabel,
  accessibilityHint,
  testID,
  
  ...props
}) => {
  const { selection } = useHaptic();

  /**
   * Handle press with haptic
   */
  const handlePress = useCallback(() => {
    if (disabled || loading) return;
    
    if (enableHaptic) {
      selection();
    }
    
    onPress?.();
  }, [disabled, loading, enableHaptic, selection, onPress]);

  /**
   * Get variant styles
   */
  const getVariantStyles = () => {
    const isActive = active;
    const isDisabled = disabled || loading;

    switch (variant) {
      case ICON_BUTTON_VARIANTS.FILLED:
        return {
          container: {
            backgroundColor: isDisabled
              ? colors.background.tertiary
              : isActive
                ? activeColor
                : backgroundColor || colors.primary.main,
          },
          icon: isActive || !isDisabled ? colors.white : colors.text.disabled,
        };
      
      case ICON_BUTTON_VARIANTS.OUTLINED:
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: isDisabled
              ? colors.border.light
              : isActive
                ? activeColor
                : borderColor || colors.border.main,
          },
          icon: isDisabled
            ? colors.text.disabled
            : isActive
              ? activeColor
              : iconColor || colors.icon.primary,
        };
      
      case ICON_BUTTON_VARIANTS.TONAL:
        return {
          container: {
            backgroundColor: isDisabled
              ? colors.background.tertiary
              : isActive
                ? colors.primary.background
                : backgroundColor || colors.background.secondary,
          },
          icon: isDisabled
            ? colors.text.disabled
            : isActive
              ? activeColor
              : iconColor || colors.icon.primary,
        };
      
      case ICON_BUTTON_VARIANTS.DEFAULT:
      default:
        return {
          container: {
            backgroundColor: 'transparent',
          },
          icon: isDisabled
            ? colors.text.disabled
            : isActive
              ? activeColor
              : iconColor || colors.icon.primary,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const calculatedIconSize = iconSize || size * 0.5;
  const badgeSize = Math.max(size * 0.35, 16);

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || icon}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: rounded ? size / 2 : borderRadius.md,
        },
        variantStyles.container,
        elevated && shadows.sm,
        style,
      ]}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.icon}
        />
      ) : (
        <Icon
          name={icon}
          size={calculatedIconSize}
          color={variantStyles.icon}
        />
      )}
      
      {badge !== undefined && badge !== null && !loading && (
        <View
          style={[
            styles.badge,
            {
              minWidth: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: badgeColor,
            },
          ]}>
          {typeof badge === 'number' && badge > 0 && (
            <View style={styles.badgeTextContainer}>
              <Icon
                name="circle"
                size={badgeSize * 0.4}
                color={colors.white}
                style={styles.badgeIcon}
              />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    opacity: 0,
  },
});

export default IconButton;