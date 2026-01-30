/**
 * StatusBadge Component
 * 
 * Displays status with color-coded badge
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { getStatusColor, getStatusLabel } from '../../utils/helpers';

// Badge sizes
export const BADGE_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

// Badge variants
export const BADGE_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  SOFT: 'soft',
  DOT: 'dot',
};

const StatusBadge = ({
  // Status
  status,
  label,
  
  // Customization
  color,
  icon,
  
  // Variants
  variant = BADGE_VARIANTS.SOFT,
  size = BADGE_SIZES.MD,
  
  // Dot only
  showDot = true,
  dotPosition = 'left', // 'left', 'right'
  
  // Styling
  style,
  textStyle,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  // Get color based on status
  const statusColor = color || getStatusColor(status);
  
  // Get label based on status
  const displayLabel = label || getStatusLabel(status);

  /**
   * Get size styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case BADGE_SIZES.SM:
        return {
          container: {
            paddingVertical: spacing.xxs,
            paddingHorizontal: spacing.sm,
          },
          text: typography.textStyles.caption,
          dotSize: 6,
          iconSize: 12,
        };
      
      case BADGE_SIZES.LG:
        return {
          container: {
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.base,
          },
          text: typography.textStyles.labelLarge,
          dotSize: 10,
          iconSize: 18,
        };
      
      case BADGE_SIZES.MD:
      default:
        return {
          container: {
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.md,
          },
          text: typography.textStyles.labelMedium,
          dotSize: 8,
          iconSize: 14,
        };
    }
  };

  /**
   * Get variant styles
   */
  const getVariantStyles = () => {
    switch (variant) {
      case BADGE_VARIANTS.FILLED:
        return {
          container: {
            backgroundColor: statusColor,
          },
          text: {
            color: colors.white,
          },
          dotColor: colors.white,
        };
      
      case BADGE_VARIANTS.OUTLINED:
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: statusColor,
          },
          text: {
            color: statusColor,
          },
          dotColor: statusColor,
        };
      
      case BADGE_VARIANTS.DOT:
        return {
          container: {
            backgroundColor: 'transparent',
            paddingHorizontal: 0,
            paddingVertical: 0,
          },
          text: {
            color: colors.text.primary,
          },
          dotColor: statusColor,
        };
      
      case BADGE_VARIANTS.SOFT:
      default:
        return {
          container: {
            backgroundColor: statusColor + '20', // 20% opacity
          },
          text: {
            color: statusColor,
          },
          dotColor: statusColor,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  /**
   * Render dot indicator
   */
  const renderDot = () => {
    if (!showDot || variant === BADGE_VARIANTS.FILLED) return null;

    return (
      <View
        style={[
          styles.dot,
          {
            width: sizeStyles.dotSize,
            height: sizeStyles.dotSize,
            borderRadius: sizeStyles.dotSize / 2,
            backgroundColor: variantStyles.dotColor,
          },
          dotPosition === 'left' ? styles.dotLeft : styles.dotRight,
        ]}
      />
    );
  };

  /**
   * Render icon
   */
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <Icon
        name={icon}
        size={sizeStyles.iconSize}
        color={variantStyles.text.color}
        style={styles.icon}
      />
    );
  };

  // For DOT variant with no label
  if (variant === BADGE_VARIANTS.DOT && !displayLabel) {
    return (
      <View
        accessibilityLabel={accessibilityLabel || status}
        accessibilityRole="text"
        testID={testID}
        style={[
          styles.dotOnly,
          {
            width: sizeStyles.dotSize,
            height: sizeStyles.dotSize,
            borderRadius: sizeStyles.dotSize / 2,
            backgroundColor: statusColor,
          },
          style,
        ]}
        {...props}
      />
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel || displayLabel || status}
      accessibilityRole="text"
      testID={testID}
      style={[
        styles.container,
        sizeStyles.container,
        variantStyles.container,
        style,
      ]}
      {...props}>
      {dotPosition === 'left' && renderDot()}
      {renderIcon()}
      
      {displayLabel && (
        <Text
          style={[
            styles.text,
            sizeStyles.text,
            variantStyles.text,
            textStyle,
          ]}
          numberOfLines={1}>
          {displayLabel}
        </Text>
      )}
      
      {dotPosition === 'right' && renderDot()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    textTransform: 'capitalize',
  },
  dot: {
    // Size set dynamically
  },
  dotLeft: {
    marginRight: spacing.xs,
  },
  dotRight: {
    marginLeft: spacing.xs,
  },
  dotOnly: {
    // Size set dynamically
  },
  icon: {
    marginRight: spacing.xxs,
  },
});

export default StatusBadge;