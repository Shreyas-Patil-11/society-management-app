/**
 * Guard Bottom Tab Navigator
 * * Main navigation for security staff
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';

// Tab Screens
import GuardHomeScreen from '../screens/guard/GuardHomeScreen';
import GuardVisitorsScreen from '../screens/guard/GuardVisitorsScreen';
import GuardSettingsScreen from '../screens/guard/GuardSettingsScreen';

const Tab = createBottomTabNavigator();

const GuardTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="GuardHomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'GuardHomeTab') iconName = 'security';
          else if (route.name === 'GuardLogTab') iconName = 'history';
          else if (route.name === 'GuardSettingsTab') iconName = 'settings';

          return (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Icon name={iconName} size={24} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen 
        name="GuardHomeTab" 
        component={GuardHomeScreen} 
        options={{ tabBarLabel: 'Home' }}
      />
      
      <Tab.Screen 
        name="GuardLogTab" 
        component={GuardVisitorsScreen} 
        options={{ tabBarLabel: 'Logs' }}
      />
      
      <Tab.Screen 
        name="GuardSettingsTab" 
        component={GuardSettingsScreen} 
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    paddingTop: 12,
  },
  tabBarLabel: {
    ...typography.textStyles.caption,
    fontSize: 11,
    fontWeight: '600',
  },
  iconContainer: {
    marginBottom: 4,
  },
  activeIconContainer: {
    transform: [{ scale: 1.1 }],
  },
});

export default GuardTabs;