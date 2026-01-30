/**
 * Toast Context
 * 
 * Provides toast notification functionality
 * throughout the app
 */

import React, { createContext, useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';
import { TIMEOUTS } from '../utils/constants';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Toast position
export const TOAST_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

// Create context
export const ToastContext = createContext(null);

/**
 * Toast Provider Component
 */
export const ToastProvider = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  /**
   * Get toast configuration based on type
   */
  const getToastConfig = useCallback((type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return {
          backgroundColor: colors.success.main,
          icon: 'check-circle',
          iconColor: colors.white,
        };
      case TOAST_TYPES.ERROR:
        return {
          backgroundColor: colors.error.main,
          icon: 'error',
          iconColor: colors.white,
        };
      case TOAST_TYPES.WARNING:
        return {
          backgroundColor: colors.warning.main,
          icon: 'warning',
          iconColor: colors.black,
        };
      case TOAST_TYPES.INFO:
      default:
        return {
          backgroundColor: colors.info.main,
          icon: 'info',
          iconColor: colors.white,
        };
    }
  }, []);

  /**
   * Show toast notification
   * @param {object} options
   */
  const showToast = useCallback((options) => {
    const {
      message,
      type = TOAST_TYPES.INFO,
      duration = TIMEOUTS.TOAST_DURATION,
      position = TOAST_POSITIONS.TOP,
      action = null,
      onDismiss = null,
    } = typeof options === 'string' ? { message: options } : options;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set toast data
    setToast({
      message,
      type,
      position,
      action,
      onDismiss,
      config: getToastConfig(type),
    });

    // Calculate animation values based on position
    const startValue = position === TOAST_POSITIONS.TOP ? -100 : 100;
    translateY.setValue(startValue);
    opacity.setValue(0);

    setIsVisible(true);

    // Animate in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  }, [getToastConfig, translateY, opacity]);

  /**
   * Hide toast notification
   */
  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const endValue = toast?.position === TOAST_POSITIONS.TOP ? -100 : 100;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: endValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      if (toast?.onDismiss) {
        toast.onDismiss();
      }
      setToast(null);
    });
  }, [toast, translateY, opacity]);

  /**
   * Show success toast
   */
  const showSuccess = useCallback((message, options = {}) => {
    showToast({ message, type: TOAST_TYPES.SUCCESS, ...options });
  }, [showToast]);

  /**
   * Show error toast
   */
  const showError = useCallback((message, options = {}) => {
    showToast({ message, type: TOAST_TYPES.ERROR, ...options });
  }, [showToast]);

  /**
   * Show warning toast
   */
  const showWarning = useCallback((message, options = {}) => {
    showToast({ message, type: TOAST_TYPES.WARNING, ...options });
  }, [showToast]);

  /**
   * Show info toast
   */
  const showInfo = useCallback((message, options = {}) => {
    showToast({ message, type: TOAST_TYPES.INFO, ...options });
  }, [showToast]);

  // Context value
  const value = useMemo(() => ({
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    TOAST_TYPES,
    TOAST_POSITIONS,
  }), [showToast, hideToast, showSuccess, showError, showWarning, showInfo]);

  /**
   * Render toast component
   */
  const renderToast = () => {
    if (!isVisible || !toast) return null;

    const isTop = toast.position === TOAST_POSITIONS.TOP;
    const textColor = toast.type === TOAST_TYPES.WARNING ? colors.black : colors.white;

    return (
      <Animated.View
        style={[
          styles.toastContainer,
          isTop
            ? { top: insets.top + spacing.sm }
            : { bottom: insets.bottom + spacing.xxl },
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
        pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={hideToast}
          style={[
            styles.toast,
            { backgroundColor: toast.config.backgroundColor },
          ]}>
          <Icon
            name={toast.config.icon}
            size={24}
            color={toast.config.iconColor}
            style={styles.icon}
          />
          <Text
            style={[styles.message, { color: textColor }]}
            numberOfLines={2}>
            {toast.message}
          </Text>
          {toast.action && (
            <TouchableOpacity
              onPress={() => {
                toast.action.onPress();
                hideToast();
              }}
              style={styles.actionButton}>
              <Text style={[styles.actionText, { color: textColor }]}>
                {toast.action.label}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
            <Icon name="close" size={20} color={textColor} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {renderToast()}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: spacing.base,
    right: spacing.base,
    zIndex: 9999,
    elevation: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: 12,
    ...shadows.lg,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  icon: {
    marginRight: spacing.sm,
  },
  message: {
    flex: 1,
    ...typography.textStyles.bodyMedium,
  },
  actionButton: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  actionText: {
    ...typography.textStyles.labelMedium,
    textDecorationLine: 'underline',
  },
  closeButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
});

export default ToastContext;