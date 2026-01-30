/**
 * Root Navigator
 * 
 * Main navigation container that handles:
 * - Authentication state
 * - Role-based navigation (Resident vs Guard)
 * - Loading states
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';

import AuthStack from './AuthStack';
import ResidentStack from './ResidentStack';
import GuardStack from './GuardStack';

import { USER_ROLES } from '../utils/constants';

const Stack = createNativeStackNavigator();

/**
 * Loading Screen Component
 */
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primary.main} />
  </View>
);

/**
 * Root Navigator Component
 */
const RootNavigator = () => {
  const { isLoading, isAuthenticated, role } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      {!isAuthenticated ? (
        // Not authenticated - show auth screens
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      ) : role === USER_ROLES.GUARD ? (
        // Authenticated as Guard
        <Stack.Screen
          name="Guard"
          component={GuardStack}
        />
      ) : (
        // Authenticated as Resident (default)
        <Stack.Screen
          name="Resident"
          component={ResidentStack}
        />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});

export default RootNavigator;