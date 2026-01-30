/**
 * useHaptic Hook
 * 
 * Custom hook for haptic feedback
 */

import { useCallback } from 'react';
import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Haptic feedback types
export const HAPTIC_TYPES = {
  SELECTION: 'selection',
  IMPACT_LIGHT: 'impactLight',
  IMPACT_MEDIUM: 'impactMedium',
  IMPACT_HEAVY: 'impactHeavy',
  NOTIFICATION_SUCCESS: 'notificationSuccess',
  NOTIFICATION_WARNING: 'notificationWarning',
  NOTIFICATION_ERROR: 'notificationError',
};

// Default options
const defaultOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Hook for haptic feedback
 * @returns {object} Haptic feedback functions
 */
export const useHaptic = () => {
  /**
   * Trigger haptic feedback
   * @param {string} type - Haptic type
   * @param {object} options - Haptic options
   */
  const trigger = useCallback((type = HAPTIC_TYPES.SELECTION, options = {}) => {
    try {
      ReactNativeHapticFeedback.trigger(type, {
        ...defaultOptions,
        ...options,
      });
    } catch (error) {
      // Haptic feedback not available, fail silently
      console.log('Haptic feedback not available');
    }
  }, []);

  /**
   * Selection feedback (light tap)
   */
  const selection = useCallback(() => {
    trigger(HAPTIC_TYPES.SELECTION);
  }, [trigger]);

  /**
   * Light impact feedback
   */
  const impactLight = useCallback(() => {
    trigger(HAPTIC_TYPES.IMPACT_LIGHT);
  }, [trigger]);

  /**
   * Medium impact feedback
   */
  const impactMedium = useCallback(() => {
    trigger(HAPTIC_TYPES.IMPACT_MEDIUM);
  }, [trigger]);

  /**
   * Heavy impact feedback
   */
  const impactHeavy = useCallback(() => {
    trigger(HAPTIC_TYPES.IMPACT_HEAVY);
  }, [trigger]);

  /**
   * Success notification feedback
   */
  const success = useCallback(() => {
    trigger(HAPTIC_TYPES.NOTIFICATION_SUCCESS);
  }, [trigger]);

  /**
   * Warning notification feedback
   */
  const warning = useCallback(() => {
    trigger(HAPTIC_TYPES.NOTIFICATION_WARNING);
  }, [trigger]);

  /**
   * Error notification feedback
   */
  const error = useCallback(() => {
    trigger(HAPTIC_TYPES.NOTIFICATION_ERROR);
  }, [trigger]);

  return {
    trigger,
    selection,
    impactLight,
    impactMedium,
    impactHeavy,
    success,
    warning,
    error,
    HAPTIC_TYPES,
  };
};

export default useHaptic;