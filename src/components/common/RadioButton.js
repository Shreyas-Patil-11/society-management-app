/**
 * RadioButton Component
 * 
 * Single and group radio selection
 */

import React from 'react';
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

const RadioButton = ({
  // Value
  selected = false,
  onSelect,
  
  // Label
  label,
  description,
  
  // States
  disabled = false,
  
  // Colors
  activeColor = colors.primary.main,
  inactiveColor = colors.border.main,
  
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

  /**
   * Get size dimensions
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          outer: 18,
          inner: 8,
          borderWidth: 2,
        };
      case 'lg':
        return {
          outer: 28,
          inner: 14,
          borderWidth: 2,
        };
      case 'md':
      default:
        return {
          outer: 22,
          inner: 10,
          borderWidth: 2,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  /**
   * Handle selection
   */
  const handlePress = () => {
    if (disabled) return;
    
    if (enableHaptic) {
      selection();
    }
    
    onSelect?.();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ selected, disabled }}
      testID={testID}
      style={[styles.container, style]}
      {...props}>
      <View
        style={[
          styles.outer,
          {
            width: sizeStyles.outer,
            height: sizeStyles.outer,
            borderRadius: sizeStyles.outer / 2,
            borderWidth: sizeStyles.borderWidth,
            borderColor: selected ? activeColor : inactiveColor,
          },
          disabled && styles.disabled,
        ]}>
        {selected && (
          <View
            style={[
              styles.inner,
              {
                width: sizeStyles.inner,
                height: sizeStyles.inner,
                borderRadius: sizeStyles.inner / 2,
                backgroundColor: activeColor,
              },
            ]}
          />
        )}
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

// Radio Group Component
export const RadioGroup = ({
  options = [], // Array of { value, label, description, disabled }
  value,
  onChange,
  direction = 'vertical', // 'vertical', 'horizontal'
  size = 'md',
  style,
  optionStyle,
  ...props
}) => {
  return (
    <View
      style={[
        styles.group,
        direction === 'horizontal' && styles.groupHorizontal,
        style,
      ]}
      {...props}>
      {options.map((option, index) => (
        <RadioButton
          key={option.value || index}
          selected={value === option.value}
          onSelect={() => onChange?.(option.value)}
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
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    // Size applied dynamically
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

export default RadioButton;