/**
 * Header Component
 * 
 * Reusable screen header with navigation and actions
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

const Header = ({
  // Title
  title,
  subtitle,
  titleAlign = 'center', // 'left', 'center', 'right'
  
  // Navigation
  showBack = false,
  onBackPress,
  backIcon = 'arrow-back',
  
  // Actions
  leftIcon,
  onLeftPress,
  leftComponent,
  rightIcon,
  onRightPress,
  rightComponent,
  rightIcons = [], // Array of { icon, onPress, badge }
  
  // Styling
  backgroundColor = colors.background.primary,
  titleColor = colors.text.primary,
  iconColor = colors.icon.primary,
  elevated = true,
  transparent = false,
  style,
  titleStyle,
  
  // Safe area
  useSafeArea = true,
  
  // Status bar
  statusBarStyle,
  statusBarBackgroundColor,
  
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  /**
   * Render left section
   */
  const renderLeft = () => {
    if (leftComponent) {
      return <View style={styles.leftSection}>{leftComponent}</View>;
    }

    if (showBack || leftIcon) {
      return (
        <TouchableOpacity
          onPress={showBack ? handleBack : onLeftPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={showBack ? 'Go back' : 'Menu'}>
          <Icon
            name={showBack ? backIcon : leftIcon}
            size={24}
            color={iconColor}
          />
        </TouchableOpacity>
      );
    }

    return <View style={styles.placeholder} />;
  };

  /**
   * Render right section
   */
  const renderRight = () => {
    if (rightComponent) {
      return <View style={styles.rightSection}>{rightComponent}</View>;
    }

    if (rightIcons.length > 0) {
      return (
        <View style={styles.rightIcons}>
          {rightIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel={item.label || item.icon}>
              <Icon name={item.icon} size={24} color={iconColor} />
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (rightIcon) {
      return (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Action">
          <Icon name={rightIcon} size={24} color={iconColor} />
        </TouchableOpacity>
      );
    }

    return <View style={styles.placeholder} />;
  };

  /**
   * Render title section
   */
  const renderTitle = () => {
    if (!title && !subtitle) {
      return <View style={styles.titleContainer} />;
    }

    return (
      <View
        style={[
          styles.titleContainer,
          titleAlign === 'left' && styles.titleLeft,
          titleAlign === 'right' && styles.titleRight,
        ]}>
        {title && (
          <Text
            style={[
              styles.title,
              { color: titleColor },
              titleStyle,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={[styles.subtitle, { color: colors.text.secondary }]}
            numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  const headerBackgroundColor = transparent ? 'transparent' : backgroundColor;
  const headerElevation = elevated && !transparent ? shadows.sm : {};

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle || (transparent ? 'light-content' : 'dark-content')}
        backgroundColor={statusBarBackgroundColor || headerBackgroundColor}
        translucent={transparent}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: headerBackgroundColor },
          headerElevation,
          useSafeArea && { paddingTop: insets.top },
          style,
        ]}
        {...props}>
        <View style={styles.content}>
          {renderLeft()}
          {renderTitle()}
          {renderRight()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.base,
  },
  leftSection: {
    minWidth: 48,
    alignItems: 'flex-start',
  },
  rightSection: {
    minWidth: 48,
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  titleLeft: {
    alignItems: 'flex-start',
  },
  titleRight: {
    alignItems: 'flex-end',
  },
  title: {
    ...typography.textStyles.h3,
  },
  subtitle: {
    ...typography.textStyles.caption,
    marginTop: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error.main,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    ...typography.textStyles.badge,
    color: colors.white,
  },
});

export default Header;