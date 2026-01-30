/**
 * Auth Stack Navigator
 * 
 * Handles all authentication-related screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import SelectSocietyScreen from '../screens/auth/SelectSocietyScreen';
import SecurityLoginScreen from '../screens/auth/SecurityLoginScreen';

const Stack = createNativeStackNavigator();

/**
 * Auth Stack Navigator
 */
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
        animation: 'slide_from_right',
      }}>
      {/* Splash Screen */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          animation: 'fade',
        }}
      />

      {/* Sign In Screen (Residents) */}
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          animation: 'fade',
        }}
      />

      {/* Sign Up Screen */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />

      {/* OTP Verification Screen */}
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
      />

      {/* Select Society Screen */}
      <Stack.Screen
        name="SelectSociety"
        component={SelectSocietyScreen}
      />

      {/* Security Login Screen (Guards) */}
      <Stack.Screen
        name="SecurityLogin"
        component={SecurityLoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;