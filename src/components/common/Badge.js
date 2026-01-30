/**
 * Badge Component
 * 
 * Small status indicator attached to other elements
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const Badge = ({
  // Content
  count,
  text,
  dot = false,
  
  // Max count
  maxCount = 99,
  showZero = false,
  
  // Position (when used as overlay)
  position = 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  offset = { x: 0, y: 0 },
  
  // Color
  color = colors.error.main,
  textColor = colors.white,
  
  // Size
  size = 'md', // 'sm', 'md', 'lg'
  
  // Styling
  style,
  
  // Children (content to attach badge to)
  children,
  
  ...props
}) => {
  /**
   * Get display text
   */
  const getDisplayText = () => {
    if (text) return text;
    if (count === undefined || count === null) return null;
    if (count > maxCount) return `${maxCount}+`;
    return count.toString();
  };

  /**
   * Get size styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          minWidth: 16,
          height: 16,
          fontSize: 10,
          dotSize: 8,
        };
      case 'lg':
        return {
          minWidth: 24,
          height: 24,
          fontSize: 14,
          dotSize: 14,
        };
      case 'md':
      default:
        return {
          minWidth: 20,
          height: 20,
          fontSize: 12,
          dotSize: 10,
        };
    }
  };

  /**
   * Get position styles
   */
  const getPositionStyles = () => {
    const sizeStyles = getSizeStyles();
    const badgeOffset = dot ? sizeStyles.dotSize / 2 : sizeStyles.height / 2;

    switch (position) {
      case 'top-left':
        return {
          top: -badgeOffset + offset.y,
          left: -badgeOffset + offset.x,
        };
      case 'bottom-right':
        return {
          bottom: -badgeOffset + offset.y,
          right: -badgeOffset + offset.x,
        };
      case 'bottom-left':
        return {
          bottom: -badgeOffset + offset.y,
          left: -badgeOffset + offset.x,
        };
      case 'top-right':
      default:
        return {
          top: -badgeOffset + offset.y,
          right: -badgeOffset + offset.x,
        };
    }
  };

  const displayText = getDisplayText();
  const sizeStyles = getSizeStyles();
  const shouldShow = dot || showZero || (count !== undefined && count > 0) || text;

  if (!shouldShow) {
    return children || null;
  }

  /**
   * Render badge element
   */
  const renderBadge = () => {
    if (dot) {
      return (
        <View
          style={[
            styles.dot,
            {
              width: sizeStyles.dotSize,
              height: sizeStyles.dotSize,
              borderRadius: sizeStyles.dotSize / 2,
              backgroundColor: color,
            },
            children && styles.positioned,
            children && getPositionStyles(),
            style,
          ]}
          {...props}
        />
      );
    }

    return (
      <View
        style={[
          styles.badge,
          {
            minWidth: sizeStyles.minWidth,
            height: sizeStyles.height,
            borderRadius: sizeStyles.height / 2,
            backgroundColor: color,
          },
          children && styles.positioned,
          children && getPositionStyles(),
          style,
        ]}
        {...props}>
        <Text
          style={[
            styles.text,
            {
              fontSize: sizeStyles.fontSize,
              color: textColor,
            },
          ]}
          numberOfLines={1}>
          {displayText}
        </Text>
      </View>
    );
  };

  if (children) {
    return (
      <View style={styles.container}>
        {children}
        {renderBadge()}
      </View>
    );
  }

  return renderBadge();
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  positioned: {
    position: 'absolute',
    zIndex: 1,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  dot: {
    // Size and color applied dynamically
  },
});

export default Badge;