/**
 * Avatar Component
 * 
 * Displays user profile image or initials
 */

import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { getInitials, getAvatarColor } from '../../utils/helpers';
import { shadows } from '../../theme/shadows';

// Avatar sizes
export const AVATAR_SIZES = {
  XS: 24,
  SM: 32,
  MD: 40,
  LG: 56,
  XL: 80,
  XXL: 120,
};

const Avatar = ({
  // Image source
  source,
  uri,
  
  // Fallback
  name,
  icon = 'person',
  
  // Size
  size = AVATAR_SIZES.MD,
  
  // Styling
  backgroundColor,
  textColor = colors.white,
  borderWidth = 0,
  borderColor = colors.white,
  style,
  
  // Press behavior
  onPress,
  
  // Badge
  badge,
  badgeColor = colors.success.main,
  badgePosition = 'bottom-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  
  // Status indicator
  showStatus = false,
  isOnline = false,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  // Get initials from name
  const initials = name ? getInitials(name) : '';
  
  // Get background color
  const bgColor = backgroundColor || getAvatarColor(name || '');
  
  // Calculate font size based on avatar size
  const fontSize = size * 0.4;
  
  // Calculate badge size
  const badgeSize = Math.max(size * 0.3, 12);
  
  /**
   * Get badge position styles
   */
  const getBadgePosition = () => {
    const offset = -badgeSize * 0.2;
    
    switch (badgePosition) {
      case 'top-right':
        return { top: offset, right: offset };
      case 'top-left':
        return { top: offset, left: offset };
      case 'bottom-left':
        return { bottom: offset, left: offset };
      case 'bottom-right':
      default:
        return { bottom: offset, right: offset };
    }
  };

  /**
   * Render content (image, initials, or icon)
   */
  const renderContent = () => {
    const imageSource = source || (uri ? { uri } : null);
    
    if (imageSource && !imageError) {
      return (
        <Image
          source={imageSource}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
      );
    }

    if (initials) {
      return (
        <Text
          style={[
            styles.initials,
            { fontSize, color: textColor },
          ]}
          numberOfLines={1}>
          {initials}
        </Text>
      );
    }

    return (
      <Icon
        name={icon}
        size={size * 0.5}
        color={textColor}
      />
    );
  };

  /**
   * Render badge or status
   */
  const renderBadge = () => {
    if (showStatus) {
      return (
        <View
          style={[
            styles.status,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: isOnline ? colors.success.main : colors.text.tertiary,
              borderWidth: 2,
              borderColor: colors.white,
            },
            getBadgePosition(),
          ]}
        />
      );
    }

    if (badge !== undefined && badge !== null) {
      return (
        <View
          style={[
            styles.badge,
            {
              minWidth: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: badgeColor,
            },
            getBadgePosition(),
          ]}>
          {typeof badge === 'number' ? (
            <Text style={[styles.badgeText, { fontSize: badgeSize * 0.6 }]}>
              {badge > 99 ? '99+' : badge}
            </Text>
          ) : badge === true ? null : (
            badge
          )}
        </View>
      );
    }

    return null;
  };

  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: bgColor,
      borderWidth,
      borderColor,
    },
    style,
  ];

  const content = (
    <>
      {renderContent()}
      {renderBadge()}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="imagebutton"
        accessibilityLabel={accessibilityLabel || name || 'Avatar'}
        testID={testID}
        style={containerStyle}
        {...props}>
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel || name || 'Avatar'}
      testID={testID}
      style={containerStyle}
      {...props}>
      {content}
    </View>
  );
};

// Avatar Group Component
export const AvatarGroup = ({
  avatars = [], // Array of { source, uri, name }
  max = 4,
  size = AVATAR_SIZES.MD,
  spacing = -8,
  style,
  ...props
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <View style={[styles.avatarGroup, style]} {...props}>
      {displayAvatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.avatarGroupItem,
            { marginLeft: index > 0 ? spacing : 0, zIndex: displayAvatars.length - index },
          ]}>
          <Avatar
            {...avatar}
            size={size}
            borderWidth={2}
            borderColor={colors.white}
          />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            styles.avatarGroupItem,
            { marginLeft: spacing, zIndex: 0 },
          ]}>
          <View
            style={[
              styles.container,
              styles.moreAvatar,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
              },
            ]}>
            <Text style={[styles.moreText, { fontSize: size * 0.35 }]}>
              +{remaining}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    ...typography.textStyles.labelLarge,
    textTransform: 'uppercase',
  },
  badge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    ...shadows.sm,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '600',
  },
  status: {
    position: 'absolute',
    ...shadows.sm,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroupItem: {
    ...shadows.sm,
  },
  moreAvatar: {
    backgroundColor: colors.background.tertiary,
    borderWidth: 2,
    borderColor: colors.white,
  },
  moreText: {
    ...typography.textStyles.labelMedium,
    color: colors.text.secondary,
  },
});

export default Avatar;