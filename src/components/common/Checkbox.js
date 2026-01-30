/**
 * Checkbox Component
 * 
 * Single and group checkbox selection
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { useHaptic } from '../../hooks/useHaptic';

const Checkbox = ({
  // Value
  checked = false,
  onValueChange,
  indeterminate = false,
  
  // Label
  label,
  description,
  
  // States
  disabled = false,
  
  // Colors
  activeColor = colors.primary.main,
  inactiveColor = colors.border.main,
  checkColor = colors.white,
  
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
  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  /**
   * Get size dimensions
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          box: 18,
          iconSize: 14,
          borderWidth: 2,
          radius: borderRadius.xs,
        };
      case 'lg':
        return {
          box: 28,
          iconSize: 22,
          borderWidth: 2,
          radius: borderRadius.sm,
        };
      case 'md':
      default:
        return {
          box: 22,
          iconSize: 18,
          borderWidth: 2,
          radius: borderRadius.xs,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  /**
   * Animate check
   */
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked || indeterminate ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start();
  }, [checked, indeterminate]);

  /**
   * Handle toggle
   */
  const handlePress = () => {
    if (disabled) return;
    
    if (enableHaptic) {
      selection();
    }
    
    onValueChange?.(!checked);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ checked, disabled }}
      testID={testID}
      style={[styles.container, style]}
      {...props}>
      <View
        style={[
          styles.box,
          {
            width: sizeStyles.box,
            height: sizeStyles.box,
            borderRadius: sizeStyles.radius,
            borderWidth: sizeStyles.borderWidth,
            borderColor: checked || indeterminate ? activeColor : inactiveColor,
            backgroundColor: checked || indeterminate ? activeColor : 'transparent',
          },
          disabled && styles.disabled,
        ]}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          }}>
          <Icon
            name={indeterminate ? 'remove' : 'check'}
            size={sizeStyles.iconSize}
            color={checkColor}
          />
        </Animated.View>
      </View>
      
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              disabled && styles.disabledLabel,
              labelStyle,
            ]}>
            {label}
          </Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

// Checkbox Group Component
export const CheckboxGroup = ({
  options = [], // Array of { value, label, description, disabled }
  values = [], // Array of selected values
  onChange,
  direction = 'vertical', // 'vertical', 'horizontal'
  size = 'md',
  style,
  optionStyle,
  ...props
}) => {
  const handleChange = (optionValue, checked) => {
    if (checked) {
      onChange?.([...values, optionValue]);
    } else {
      onChange?.(values.filter(v => v !== optionValue));
    }
  };

  return (
    <View
      style={[
        styles.group,
        direction === 'horizontal' && styles.groupHorizontal,
        style,
      ]}
      {...props}>
      {options.map((option, index) => (
        <Checkbox
          key={option.value || index}
          checked={values.includes(option.value)}
          onValueChange={(checked) => handleChange(option.value, checked)}
          label={option.label}
          description={option.description}
          disabled={option.disabled}
          size={size}
          style={[
            direction === 'horizontal' && index > 0 && styles.horizontalSpacing,
            direction === 'vertical' && index > 0 && styles.verticalSpacing,
            optionStyle,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  labelContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  label: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  disabledLabel: {
    color: colors.text.disabled,
  },
  description: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xxs,
  },
  group: {
    // Default vertical
  },
  groupHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  verticalSpacing: {
    marginTop: spacing.md,
  },
  horizontalSpacing: {
    marginLeft: spacing.xl,
  },
});

export default Checkbox;