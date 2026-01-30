/**
 * EmptyState Component
 * 
 * Displays when there's no data to show
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
import Button from './Button';

const EmptyState = ({
  // Content
  icon = 'inbox',
  title = 'No Data',
  message,
  
  // Action
  actionLabel,
  onAction,
  actionVariant = 'primary',
  
  // Secondary action
  secondaryActionLabel,
  onSecondaryAction,
  
  // Styling
  iconSize = 80,
  iconColor = colors.text.tertiary,
  compact = false,
  style,
  
  // Custom content
  children,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  return (
    <View
      accessibilityLabel={accessibilityLabel || title}
      testID={testID}
      style={[
        styles.container,
        compact && styles.compactContainer,
        style,
      ]}
      {...props}>
      <Icon
        name={icon}
        size={compact ? iconSize * 0.6 : iconSize}
        color={iconColor}
        style={styles.icon}
      />
      
      <Text
        style={[
          styles.title,
          compact && styles.compactTitle,
        ]}>
        {title}
      </Text>
      
      {message && (
        <Text
          style={[
            styles.message,
            compact && styles.compactMessage,
          ]}>
          {message}
        </Text>
      )}
      
      {children}
      
      {actionLabel && (
        <View style={styles.actions}>
          <Button
            title={actionLabel}
            onPress={onAction}
            variant={actionVariant}
            size={compact ? 'small' : 'medium'}
          />
          
          {secondaryActionLabel && (
            <Button
              title={secondaryActionLabel}
              onPress={onSecondaryAction}
              variant="ghost"
              size={compact ? 'small' : 'medium'}
              style={styles.secondaryAction}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  compactContainer: {
    flex: 0,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.base,
  },
  icon: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  compactTitle: {
    ...typography.textStyles.h4,
  },
  message: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  compactMessage: {
    ...typography.textStyles.bodySmall,
    marginBottom: spacing.md,
  },
  actions: {
    marginTop: spacing.base,
    alignItems: 'center',
  },
  secondaryAction: {
    marginTop: spacing.sm,
  },
});

export default EmptyState;