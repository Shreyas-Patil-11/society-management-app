/**
 * Chip Component
 * 
 * Compact element for filters, tags, and selections
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';

// Chip variants
export const CHIP_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  SOFT: 'soft',
};

// Chip sizes
export const CHIP_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

const Chip = ({
  // Content
  label,
  icon,
  
  // States
  selected = false,
  disabled = false,
  
  // Variants
  variant = CHIP_VARIANTS.OUTLINED,
  size = CHIP_SIZES.MD,
  
  // Colors
  color = colors.primary.main,
  
  // Dismissible
  dismissible = false,
  onDismiss,
  
  // Press
  onPress,
  
  // Styling
  style,
  labelStyle,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  /**
   * Get size styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case CHIP_SIZES.SM:
        return {
          container: {
            paddingVertical: spacing.xxs,
            paddingHorizontal: spacing.sm,
            height: 24,
          },
          text: typography.textStyles.caption,
          iconSize: 14,
        };
      
      case CHIP_SIZES.LG:
        return {
          container: {
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.base,
            height: 40,
          },
          text: typography.textStyles.labelLarge,
          iconSize: 20,
        };
      
      case CHIP_SIZES.MD:
      default:
        return {
          container: {
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.md,
            height: 32,
          },
          text: typography.textStyles.labelMedium,
          iconSize: 16,
        };
    }
  };

  /**
   * Get variant styles
   */
  const getVariantStyles = () => {
    const isActive = selected;
    const chipColor = isActive ? color : colors.text.secondary;

    switch (variant) {
      case CHIP_VARIANTS.FILLED:
        return {
          container: {
            backgroundColor: isActive ? color : colors.background.tertiary,
            borderWidth: 0,
          },
          text: {
            color: isActive ? colors.white : colors.text.primary,
          },
          iconColor: isActive ? colors.white : colors.icon.secondary,
        };
      
      case CHIP_VARIANTS.SOFT:
        return {
          container: {
            backgroundColor: isActive ? color + '20' : colors.background.tertiary,
            borderWidth: 0,
          },
          text: {
            color: isActive ? color : colors.text.primary,
          },
          iconColor: isActive ? color : colors.icon.secondary,
        };
      
      case CHIP_VARIANTS.OUTLINED:
      default:
        return {
          container: {
            backgroundColor: isActive ? color + '10' : 'transparent',
            borderWidth: 1,
            borderColor: isActive ? color : colors.border.main,
          },
          text: {
            color: isActive ? color : colors.text.primary,
          },
          iconColor: isActive ? color : colors.icon.secondary,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const containerStyle = [
    styles.container,
    sizeStyles.container,
    variantStyles.container,
    disabled && styles.disabled,
    style,
  ];

  const content = (
    <>
      {icon && (
        <Icon
          name={icon}
          size={sizeStyles.iconSize}
          color={disabled ? colors.text.disabled : variantStyles.iconColor}
          style={styles.leadingIcon}
        />
      )}
      
      <Text
        style={[
          styles.label,
          sizeStyles.text,
          variantStyles.text,
          disabled && styles.disabledText,
          labelStyle,
        ]}
        numberOfLines={1}>
        {label}
      </Text>
      
      {dismissible && (
        <TouchableOpacity
          onPress={onDismiss}
          disabled={disabled}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.dismissButton}>
          <Icon
            name="close"
            size={sizeStyles.iconSize}
            color={disabled ? colors.text.disabled : variantStyles.iconColor}
          />
        </TouchableOpacity>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || label}
        accessibilityState={{ selected, disabled }}
        testID={testID}
        style={containerStyle}
        {...props}>
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
      style={containerStyle}
      {...props}>
      {content}
    </View>
  );
};

// Chip Group for multiple chips
export const ChipGroup = ({
  chips = [], // Array of { label, value, icon }
  selected, // Single value or array of values
  onChange,
  multiple = false,
  variant = CHIP_VARIANTS.OUTLINED,
  size = CHIP_SIZES.MD,
  style,
  chipStyle,
  ...props
}) => {
  const handlePress = (value) => {
    if (multiple) {
      const selectedArray = Array.isArray(selected) ? selected : [];
      const isSelected = selectedArray.includes(value);
      const newSelected = isSelected
        ? selectedArray.filter(v => v !== value)
        : [...selectedArray, value];
      onChange?.(newSelected);
    } else {
      onChange?.(value === selected ? null : value);
    }
  };

  const isSelected = (value) => {
    if (multiple) {
      return Array.isArray(selected) && selected.includes(value);
    }
    return selected === value;
  };

  return (
    <View style={[styles.chipGroup, style]} {...props}>
      {chips.map((chip, index) => (
        <Chip
          key={chip.value || index}
          label={chip.label}
          icon={chip.icon}
          selected={isSelected(chip.value)}
          onPress={() => handlePress(chip.value)}
          variant={variant}
          size={size}
          style={[styles.groupChip, chipStyle]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  },
  label: {
    textAlign: 'center',
  },
  leadingIcon: {
    marginRight: spacing.xxs,
  },
  dismissButton: {
    marginLeft: spacing.xxs,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.disabled,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  groupChip: {
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
});

export default Chip;