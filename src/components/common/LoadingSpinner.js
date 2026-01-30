/**
 * LoadingSpinner Component
 * 
 * Loading indicator with optional message
 */

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

// Spinner sizes
export const SPINNER_SIZES = {
  SMALL: 'small',
  LARGE: 'large',
};

const LoadingSpinner = ({
  // Loading state
  loading = true,
  
  // Content
  message,
  
  // Styling
  size = SPINNER_SIZES.LARGE,
  color = colors.primary.main,
  backgroundColor,
  overlay = false,
  fullScreen = false,
  
  // Custom
  style,
  
  // Accessibility
  accessibilityLabel = 'Loading',
  testID,
  
  ...props
}) => {
  if (!loading) return null;

  const content = (
    <>
      <ActivityIndicator
        size={size}
        color={color}
        accessibilityLabel={accessibilityLabel}
      />
      
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </>
  );

  if (overlay) {
    return (
      <View
        testID={testID}
        style={[
          styles.overlay,
          fullScreen && styles.fullScreen,
          backgroundColor && { backgroundColor },
          style,
        ]}
        {...props}>
        <View style={styles.overlayContent}>
          {content}
        </View>
      </View>
    );
  }

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        backgroundColor && { backgroundColor },
        style,
      ]}
      {...props}>
      {content}
    </View>
  );
};

// Full screen loading overlay
export const LoadingOverlay = ({
  visible = true,
  message = 'Loading...',
  ...props
}) => {
  if (!visible) return null;

  return (
    <LoadingSpinner
      overlay
      fullScreen
      message={message}
      {...props}
    />
  );
};

// Inline loading indicator
export const InlineLoader = ({
  loading = true,
  size = SPINNER_SIZES.SMALL,
  color = colors.primary.main,
  style,
  ...props
}) => {
  if (!loading) return null;

  return (
    <ActivityIndicator
      size={size}
      color={color}
      style={style}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.xl,
    alignItems: 'center',
    minWidth: 120,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  message: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default LoadingSpinner;