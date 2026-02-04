
/**
 * Guard Stack Navigator
 * 
 * Contains all screens accessible to guard users
 * Uses GuardTabs (bottom tabs) which contains GuardHome, GuardVisitors, GuardSettings
 * Removed duplicate stack screens: GuardHome, GuardVisitors, GuardSettings
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';

// Guard Screens
import GuardSplashScreen from '../screens/guard/GuardSplashScreen';
import SecurityLoginScreen from '../screens/guard/SecurityLoginScreen';

// ❌ Removed duplicate GuardHomeScreen import
// import GuardHomeScreen from '../screens/guard/GuardHomeScreen';

import PreApproveEntryScreen from '../screens/guard/PreApproveEntryScreen';
import GuestEntryScreen from '../screens/guard/GuestEntryScreen';
import SelectBuildingScreen from '../screens/guard/SelectBuildingScreen';
import SelectFlatScreen from '../screens/guard/SelectFlatScreen';
import ConfirmSelectionScreen from '../screens/guard/ConfirmSelectionScreen';
import RingingScreen from '../screens/guard/RingingScreen';
import AllowedScreen from '../screens/guard/AllowedScreen';
import DeclinedScreen from '../screens/guard/DeclinedScreen';
import NotRespondedScreen from '../screens/guard/NotRespondedScreen';
import DeliveryEntryScreen from '../screens/guard/DeliveryEntryScreen';
import DeliveryCompanyScreen from '../screens/guard/DeliveryCompanyScreen';
import ServicemanEntryScreen from '../screens/guard/ServicemanEntryScreen';
import ServiceCompanyScreen from '../screens/guard/ServiceCompanyScreen';
import CabEntryScreen from '../screens/guard/CabEntryScreen';
import CabCompanyScreen from '../screens/guard/CabCompanyScreen';

// ❌ Removed duplicate GuardVisitorsScreen import
// import GuardVisitorsScreen from '../screens/guard/GuardVisitorsScreen';

import WaitingScreen from '../screens/guard/WaitingScreen';

// ❌ Removed duplicate GuardSettingsScreen import
// import GuardSettingsScreen from '../screens/guard/GuardSettingsScreen';

import NewMessagePopupScreen from '../screens/guard/NewMessagePopupScreen';
import RecentMessagesScreen from '../screens/guard/RecentMessagesScreen';
import GuardSupportScreen from '../screens/guard/GuardSupportScreen';
import ChangePasswordScreen from '../screens/guard/ChangePasswordScreen';

import GuardTabs from '../navigation/GuardTabs';

const Stack = createNativeStackNavigator();

/**
 * Default screen options
 */
const defaultScreenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: colors.background.primary,
  },
  animation: 'slide_from_right',
};

/**
 * Modal screen options
 */
const modalScreenOptions = {
  ...defaultScreenOptions,
  presentation: 'modal',
  animation: 'slide_from_bottom',
};

/**
 * Full screen modal options (for status screens)
 */
const fullScreenModalOptions = {
  ...defaultScreenOptions,
  presentation: 'fullScreenModal',
  animation: 'fade',
};

/**
 * Guard Stack Navigator
 */
const GuardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GuardTabs"
      screenOptions={defaultScreenOptions}
    >
      {/* This "GuardTabs" screen contains GuardHome, GuardVisitors, and GuardSettings */}
      <Stack.Screen name="GuardTabs" component={GuardTabs} />

      {/* ==================== MAIN SCREENS ==================== */}

      <Stack.Screen
        name="GuardSplash"
        component={GuardSplashScreen}
        options={{
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="SecurityLogin"
        component={SecurityLoginScreen}
      />

     <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

      {/* --- DELETED DUPLICATE GuardHome --- */}

      {/* ==================== ENTRY SCREENS ==================== */}

      <Stack.Screen
        name="PreApproveEntry"
        component={PreApproveEntryScreen}
      />

      <Stack.Screen
        name="GuestEntry"
        component={GuestEntryScreen}
      />

      <Stack.Screen
        name="DeliveryEntry"
        component={DeliveryEntryScreen}
      />

      <Stack.Screen
        name="DeliveryCompany"
        component={DeliveryCompanyScreen}
      />

      <Stack.Screen
        name="ServicemanEntry"
        component={ServicemanEntryScreen}
      />

      <Stack.Screen
        name="ServiceCompany"
        component={ServiceCompanyScreen}
      />

      <Stack.Screen
        name="CabEntry"
        component={CabEntryScreen}
      />

      <Stack.Screen
        name="CabCompany"
        component={CabCompanyScreen}
      />

      {/* ==================== SELECTION SCREENS ==================== */}

      <Stack.Screen
        name="SelectBuilding"
        component={SelectBuildingScreen}
      />

      <Stack.Screen
        name="SelectFlat"
        component={SelectFlatScreen}
      />

      <Stack.Screen
        name="ConfirmSelection"
        component={ConfirmSelectionScreen}
      />

      {/* ==================== STATUS SCREENS ==================== */}

      <Stack.Screen
        name="Ringing"
        component={RingingScreen}
        options={fullScreenModalOptions}
      />

      <Stack.Screen
        name="Allowed"
        component={AllowedScreen}
        options={fullScreenModalOptions}
      />

      <Stack.Screen
        name="Declined"
        component={DeclinedScreen}
        options={fullScreenModalOptions}
      />

      {/* <Stack.Screen
        name="NotResponded"
        component={NotRespondedScreen}
        options={fullScreenModalOptions}
      /> */}

      {/* ==================== VISITOR MANAGEMENT ==================== */}

      {/* --- DELETED DUPLICATE GuardVisitors --- */}

      <Stack.Screen
        name="Waiting"
        component={WaitingScreen}
      />

      {/* ==================== SETTINGS & SUPPORT ==================== */}

      {/* --- DELETED DUPLICATE GuardSettings --- */}

      <Stack.Screen
        name="GuardSupport"
        component={GuardSupportScreen}
      />

      {/* ==================== MESSAGES ==================== */}

      <Stack.Screen
        name="NewMessagePopup"
        component={NewMessagePopupScreen}
        options={modalScreenOptions}
      />

      <Stack.Screen
        name="RecentMessages"
        component={RecentMessagesScreen}
      />
    </Stack.Navigator>
  );
};

export default GuardStack;
