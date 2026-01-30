/**
 * Floating Action Button (FAB) Component
 * * Used for primary actions like "Add" or "Create"
 * * Floats at the bottom right of the screen
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';

const FloatingActionButton = ({ onPress, icon = 'add', color = colors.primary.main, size = 56 }) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={[
          styles.button,
          { 
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
          }
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Icon name={icon} size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    zIndex: 999,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg, // Use large shadow for floating effect
    elevation: 6,  // Android shadow
  },
});

export default FloatingActionButton;