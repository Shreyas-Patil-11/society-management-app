/**
 * BottomSheet Component
 * 
 * Modal sheet that slides up from bottom
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { shadows } from '../../theme/shadows';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheet = ({
  // Visibility
  visible = false,
  onClose,
  
  // Header
  title,
  subtitle,
  showHandle = true,
  showCloseButton = true,
  headerRight,
  
  // Content
  children,
  scrollable = false,
  
  // Sizing
  height, // Fixed height
  maxHeight = SCREEN_HEIGHT * 0.9,
  minHeight = 200,
  snapPoints, // Array of heights to snap to [0.3, 0.6, 0.9]
  
  // Behavior
  closeOnBackdrop = true,
  closeOnDrag = true,
  enableDrag = true,
  
  // Styling
  backgroundColor = colors.background.primary,
  backdropOpacity = 0.5,
  style,
  contentStyle,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;
  const currentHeight = useRef(height || maxHeight * 0.5);

  /**
   * Pan responder for drag gestures
   */
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enableDrag,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return enableDrag && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 && closeOnDrag) {
          handleClose();
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
          }).start();
        }
      },
    })
  ).current;

  /**
   * Handle open/close animation
   */
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.timing(backdropOpacityAnim, {
          toValue: backdropOpacity,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity]);

  /**
   * Handle close
   */
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacityAnim, {
        toValue: 0,
        duration: 250,
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
    if (closeOnBackdrop) {
      handleClose();
    }
  };

  if (!visible) return null;

  /**
   * Render header
   */
  const renderHeader = () => {
    if (!title && !showCloseButton && !showHandle) return null;

    return (
      <View style={styles.header} {...panResponder.panHandlers}>
        {showHandle && <View style={styles.handle} />}
        
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            {title && (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
          
          <View style={styles.headerRight}>
            {headerRight}
            {showCloseButton && (
              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityLabel="Close"
                style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.icon.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  /**
   * Render content
   */
  const renderContent = () => {
    const content = (
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    );

    if (scrollable) {
      return (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      );
    }

    return content;
  };

  const sheetHeight = height || maxHeight * 0.5;

  return (
    <View style={StyleSheet.absoluteFill} testID={testID}>
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacityAnim },
        ]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
          activeOpacity={1}
          accessibilityLabel="Close bottom sheet"
        />
      </Animated.View>
      
      {/* Sheet */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}>
        <Animated.View
          accessibilityLabel={accessibilityLabel || title}
          style={[
            styles.sheet,
            {
              backgroundColor,
              maxHeight,
              minHeight,
              paddingBottom: insets.bottom || spacing.base,
              transform: [{ translateY }],
            },
            shadows.xl,
            style,
          ]}
          {...props}>
          {renderHeader()}
          {renderContent()}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  header: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border.main,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xxs,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  content: {
    padding: spacing.base,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default BottomSheet;