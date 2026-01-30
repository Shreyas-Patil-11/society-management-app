/**
 * ProgressBar Component
 * 
 * Visual indicator for progress or loading
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';

const ProgressBar = ({
  // Progress
  progress = 0, // 0 to 100
  
  // Styling
  height = 8,
  backgroundColor = colors.background.tertiary,
  progressColor = colors.primary.main,
  borderRadius: radius = borderRadius.full,
  
  // Label
  showLabel = false,
  labelPosition = 'right', // 'top', 'right', 'bottom'
  formatLabel, // Custom label formatter
  
  // Animation
  animated = true,
  animationDuration = 300,
  
  // Indeterminate
  indeterminate = false,
  
  // Styling
  style,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(0)).current;

  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  /**
   * Animate progress change
   */
  useEffect(() => {
    if (!indeterminate) {
      if (animated) {
        Animated.timing(animatedWidth, {
          toValue: clampedProgress,
          duration: animationDuration,
          useNativeDriver: false,
        }).start();
      } else {
        animatedWidth.setValue(clampedProgress);
      }
    }
  }, [clampedProgress, animated, animationDuration, indeterminate]);

  /**
   * Indeterminate animation
   */
  useEffect(() => {
    if (indeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(indeterminateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      indeterminateAnim.setValue(0);
    }
  }, [indeterminate]);

  /**
   * Format label text
   */
  const getLabelText = () => {
    if (formatLabel) {
      return formatLabel(clampedProgress);
    }
    return `${Math.round(clampedProgress)}%`;
  };

  /**
   * Render label
   */
  const renderLabel = () => {
    if (!showLabel) return null;

    return (
      <Text
        style={[
          styles.label,
          labelPosition === 'top' && styles.labelTop,
          labelPosition === 'bottom' && styles.labelBottom,
        ]}>
        {getLabelText()}
      </Text>
    );
  };

  /**
   * Get progress width style
   */
  const getProgressStyle = () => {
    if (indeterminate) {
      const translateX = indeterminateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-100%', '100%'],
      });

      return {
        width: '30%',
        transform: [{ translateX }],
      };
    }

    return {
      width: animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }),
    };
  };

  return (
    <View
      accessibilityLabel={accessibilityLabel || `Progress: ${clampedProgress}%`}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      testID={testID}
      style={[
        styles.container,
        labelPosition === 'right' && styles.containerRow,
        style,
      ]}
      {...props}>
      {labelPosition === 'top' && renderLabel()}
      
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor,
            borderRadius: radius,
          },
          labelPosition === 'right' && styles.trackFlex,
        ]}>
        <Animated.View
          style={[
            styles.progress,
            {
              height,
              backgroundColor: progressColor,
              borderRadius: radius,
            },
            getProgressStyle(),
          ]}
        />
      </View>
      
      {labelPosition === 'right' && renderLabel()}
      {labelPosition === 'bottom' && renderLabel()}
    </View>
  );
};

// Circular Progress
export const CircularProgress = ({
  progress = 0,
  size = 48,
  strokeWidth = 4,
  backgroundColor = colors.background.tertiary,
  progressColor = colors.primary.main,
  showLabel = false,
  formatLabel,
  style,
  ...props
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  const getLabelText = () => {
    if (formatLabel) return formatLabel(clampedProgress);
    return `${Math.round(clampedProgress)}%`;
  };

  return (
    <View style={[styles.circularContainer, { width: size, height: size }, style]} {...props}>
      <View style={styles.circularBackground}>
        <View
          style={[
            styles.circularTrack,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: backgroundColor,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.circularLabel, { fontSize: size * 0.25 }]}>
          {getLabelText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  trackFlex: {
    flex: 1,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  label: {
    ...typography.textStyles.labelMedium,
    color: colors.text.secondary,
  },
  labelTop: {
    marginBottom: spacing.xs,
  },
  labelBottom: {
    marginTop: spacing.xs,
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularBackground: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularTrack: {
    // Border styles applied dynamically
  },
  circularLabel: {
    ...typography.textStyles.labelMedium,
    color: colors.text.primary,
  },
});

export default ProgressBar;