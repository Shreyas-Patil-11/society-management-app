/**
 * ListItem Component
 * 
 * Reusable list item with multiple layouts
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
import Avatar from './Avatar';

const ListItem = ({
  // Content
  title,
  subtitle,
  description,
  
  // Left content
  leftIcon,
  leftIconColor = colors.icon.primary,
  leftIconBackground,
  leftAvatar,
  leftAvatarName,
  leftComponent,
  
  // Right content
  rightIcon = 'chevron-right',
  rightIconColor = colors.icon.tertiary,
  rightText,
  rightTextColor = colors.text.secondary,
  rightComponent,
  showRightIcon = true,
  
  // States
  disabled = false,
  selected = false,
  
  // Styling
  backgroundColor,
  borderBottom = true,
  compact = false,
  style,
  contentStyle,
  
  // Press behavior
  onPress,
  onLongPress,
  
  // Accessibility
  accessibilityLabel,
  accessibilityHint,
  testID,
  
  ...props
}) => {
  /**
   * Render left section
   */
  const renderLeft = () => {
    if (leftComponent) {
      return <View style={styles.leftComponent}>{leftComponent}</View>;
    }

    if (leftAvatar || leftAvatarName) {
      return (
        <Avatar
          source={leftAvatar}
          name={leftAvatarName}
          size={compact ? 36 : 44}
          style={styles.avatar}
        />
      );
    }

    if (leftIcon) {
      return (
        <View
          style={[
            styles.iconContainer,
            leftIconBackground && {
              backgroundColor: leftIconBackground,
              width: compact ? 36 : 44,
              height: compact ? 36 : 44,
              borderRadius: compact ? 18 : 22,
            },
          ]}>
          <Icon
            name={leftIcon}
            size={compact ? 20 : 24}
            color={leftIconColor}
          />
        </View>
      );
    }

    return null;
  };

  /**
   * Render right section
   */
  const renderRight = () => {
    if (rightComponent) {
      return <View style={styles.rightComponent}>{rightComponent}</View>;
    }

    return (
      <View style={styles.rightSection}>
        {rightText && (
          <Text
            style={[styles.rightText, { color: rightTextColor }]}
            numberOfLines={1}>
            {rightText}
          </Text>
        )}
        {showRightIcon && rightIcon && (
          <Icon
            name={rightIcon}
            size={20}
            color={rightIconColor}
            style={styles.rightIcon}
          />
        )}
      </View>
    );
  };

  const containerStyle = [
    styles.container,
    compact && styles.compactContainer,
    borderBottom && styles.borderBottom,
    selected && styles.selected,
    disabled && styles.disabled,
    backgroundColor && { backgroundColor },
    style,
  ];

  const content = (
    <>
      {renderLeft()}
      
      <View style={[styles.content, contentStyle]}>
        {title && (
          <Text
            style={[
              styles.title,
              compact && styles.compactTitle,
              disabled && styles.disabledText,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
        )}
        
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              disabled && styles.disabledText,
            ]}
            numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        
        {description && (
          <Text
            style={[
              styles.description,
              disabled && styles.disabledText,
            ]}
            numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
      
      {renderRight()}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled, selected }}
        testID={testID}
        style={containerStyle}
        {...props}>
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel || title}
      testID={testID}
      style={containerStyle}
      {...props}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.background.primary,
    minHeight: 64,
  },
  compactContainer: {
    paddingVertical: spacing.sm,
    minHeight: 52,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  selected: {
    backgroundColor: colors.primary.background,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatar: {
    marginRight: spacing.md,
  },
  leftComponent: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.textStyles.bodyLarge,
    color: colors.text.primary,
  },
  compactTitle: {
    ...typography.textStyles.bodyMedium,
  },
  subtitle: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xxs,
  },
  description: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  disabledText: {
    color: colors.text.disabled,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  rightText: {
    ...typography.textStyles.bodySmall,
    marginRight: spacing.xs,
  },
  rightIcon: {
    // Styles applied via Icon component
  },
  rightComponent: {
    marginLeft: spacing.sm,
  },
});

export default ListItem;