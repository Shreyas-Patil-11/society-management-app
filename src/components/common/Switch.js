/**
 * Switch Component
 * 
 * Toggle switch for boolean values
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useHaptic } from '../../hooks/useHaptic';

const Switch = ({
  // Value
  value = false,
  onValueChange,
  
  // Label
  label,
  labelPosition = 'left', // 'left', 'right'
  description,
  
  // States
  disabled = false,
  
  // Colors
  activeColor = colors.primary.main,
  inactiveColor = colors.background.tertiary,
  thumbColor = colors.white,
  
  // Size
  size = 'md', // 'sm', 'md', 'lg'
  
  // Haptics
  enableHaptic = true,
  
  // Styling
  style,
  labelStyle,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  const { selection } = useHaptic();
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;

  /**
   * Get size dimensions
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          width: 40,
          height: 24,
          thumbSize: 18,
          padding: 3,
        };
      case 'lg':
        return {
          width: 60,
          height: 36,
          thumbSize: 28,
          padding: 4,
        };
      case 'md':
      default:
        return {
          width: 52,
          height: 32,
          thumbSize: 24,
          padding: 4,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  /**
   * Animate switch
   */
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start();
  }, [value]);

  /**
   * Handle toggle
   */
  const handleToggle = () => {
    if (disabled) return;
    
    if (enableHaptic) {
      selection();
    }
    
    onValueChange?.(!value);
  };

  /**
   * Calculate thumb position
   */
  const thumbPosition = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [
      sizeStyles.padding,
      sizeStyles.width - sizeStyles.thumbSize - sizeStyles.padding,
    ],
  });

  /**
   * Calculate background color
   */
  const backgroundColor = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  /**
   * Render switch track and thumb
   */
  const renderSwitch = () => (
    <TouchableOpacity
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ checked: value, disabled }}
      testID={testID}
      {...props}>
      <Animated.View
        style={[
          styles.track,
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
            borderRadius: sizeStyles.height / 2,
            backgroundColor,
          },
          disabled && styles.disabled,
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: sizeStyles.thumbSize,
              height: sizeStyles.thumbSize,
              borderRadius: sizeStyles.thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbPosition }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );

  if (!label) {
    return renderSwitch();
  }

  return (
    <View style={[styles.container, style]}>
      {labelPosition === 'left' && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      )}
      
      {renderSwitch()}
      
      {labelPosition === 'right' && (
        <View style={[styles.labelContainer, styles.labelRight]}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  labelContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  labelRight: {
    marginRight: 0,
    marginLeft: spacing.md,
  },
  label: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  description: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xxs,
  },
});

export default Switch;