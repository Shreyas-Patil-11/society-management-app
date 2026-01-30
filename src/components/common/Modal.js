/**
 * Modal Component
 * 
 * Customizable modal dialog
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { shadows } from '../../theme/shadows';
import Button from './Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Modal sizes
export const MODAL_SIZES = {
  SMALL: 280,
  MEDIUM: SCREEN_WIDTH * 0.85,
  LARGE: SCREEN_WIDTH * 0.95,
  FULL: SCREEN_WIDTH,
};

const Modal = ({
  // Visibility
  visible = false,
  onClose,
  
  // Header
  title,
  subtitle,
  icon,
  iconColor,
  showCloseButton = true,
  
  // Content
  children,
  message,
  
  // Actions
  primaryAction,
  primaryActionLabel = 'Confirm',
  onPrimaryAction,
  primaryActionVariant = 'primary',
  primaryActionLoading = false,
  
  secondaryAction = true,
  secondaryActionLabel = 'Cancel',
  onSecondaryAction,
  
  // Sizing
  size = MODAL_SIZES.MEDIUM,
  
  // Behavior
  closeOnBackdrop = true,
  dismissible = true,
  
  // Styling
  backgroundColor = colors.background.primary,
  backdropOpacity = 0.5,
  style,
  contentStyle,
  
  // Animation
  animationType = 'fade', // 'fade', 'scale', 'slide'
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  /**
   * Handle animation on visibility change
   */
  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset
      opacity.setValue(0);
      scale.setValue(0.9);
      translateY.setValue(50);
    }
  }, [visible]);

  /**
   * Handle close
   */
  const handleClose = () => {
    if (!dismissible) return;
    
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  /**
   * Handle backdrop press
   */
  const handleBackdropPress = () => {
    if (closeOnBackdrop && dismissible) {
      handleClose();
    }
  };

  /**
   * Handle primary action
   */
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      handleClose();
    }
  };

  /**
   * Handle secondary action
   */
  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      handleClose();
    }
  };

  if (!visible) return null;

  /**
   * Get animation style
   */
  const getAnimationStyle = () => {
    switch (animationType) {
      case 'scale':
        return { transform: [{ scale }] };
      case 'slide':
        return { transform: [{ translateY }] };
      case 'fade':
      default:
        return {};
    }
  };

  return (
    <View style={StyleSheet.absoluteFill} testID={testID}>
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: Animated.multiply(opacity, backdropOpacity) },
        ]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
          activeOpacity={1}
          accessibilityLabel="Close modal"
        />
      </Animated.View>
      
      {/* Modal */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}>
        <Animated.View
          accessibilityLabel={accessibilityLabel || title}
          accessibilityRole="dialog"
          style={[
            styles.modal,
            {
              width: size,
              backgroundColor,
              opacity,
            },
            getAnimationStyle(),
            shadows.xl,
            style,
          ]}
          {...props}>
          {/* Header */}
          {(title || icon || showCloseButton) && (
            <View style={styles.header}>
              {icon && (
                <View style={[styles.iconContainer, iconColor && { backgroundColor: iconColor + '20' }]}>
                  <Icon
                    name={icon}
                    size={32}
                    color={iconColor || colors.primary.main}
                  />
                </View>
              )}
              
              {title && (
                <Text style={styles.title}>{title}</Text>
              )}
              
              {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
              
              {showCloseButton && dismissible && (
                <TouchableOpacity
                  onPress={handleClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityLabel="Close"
                  style={styles.closeButton}>
                  <Icon name="close" size={24} color={colors.icon.secondary} />
                </TouchableOpacity>
              )}
            </View>
          )}
          
          {/* Content */}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.contentContainer}
            contentContainerStyle={[styles.content, contentStyle]}>
            {message && (
              <Text style={styles.message}>{message}</Text>
            )}
            {children}
          </ScrollView>
          
          {/* Actions */}
          {(primaryAction !== false || secondaryAction) && (
            <View style={styles.actions}>
              {secondaryAction && (
                <Button
                  title={secondaryActionLabel}
                  variant="outline"
                  onPress={handleSecondaryAction}
                  style={styles.actionButton}
                  disabled={primaryActionLoading}
                />
              )}
              
              {primaryAction !== false && (
                <Button
                  title={primaryActionLabel}
                  variant={primaryActionVariant}
                  onPress={handlePrimaryAction}
                  loading={primaryActionLoading}
                  style={styles.actionButton}
                />
              )}
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

// Confirmation Modal
export const ConfirmModal = ({
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
  ...props
}) => (
  <Modal
    title={title}
    message={message}
    primaryActionLabel={confirmLabel}
    primaryActionVariant={destructive ? 'danger' : 'primary'}
    onPrimaryAction={onConfirm}
    secondaryActionLabel={cancelLabel}
    onSecondaryAction={onCancel}
    onClose={onCancel}
    size={MODAL_SIZES.SMALL}
    {...props}
  />
);

// Alert Modal
export const AlertModal = ({
  title,
  message,
  buttonLabel = 'OK',
  onDismiss,
  type = 'info', // 'info', 'success', 'warning', 'error'
  ...props
}) => {
  const typeConfig = {
    info: { icon: 'info', color: colors.info.main },
    success: { icon: 'check-circle', color: colors.success.main },
    warning: { icon: 'warning', color: colors.warning.main },
    error: { icon: 'error', color: colors.error.main },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <Modal
      title={title}
      message={message}
      icon={config.icon}
      iconColor={config.color}
      primaryActionLabel={buttonLabel}
      onPrimaryAction={onDismiss}
      onClose={onDismiss}
      secondaryAction={false}
      size={MODAL_SIZES.SMALL}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.base,
  },
  modal: {
    borderRadius: borderRadius.xl,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    paddingBottom: spacing.base,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.primary.background,
  },
  title: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    padding: spacing.xs,
  },
  contentContainer: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.base,
  },
  message: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    padding: spacing.base,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});

export default Modal;