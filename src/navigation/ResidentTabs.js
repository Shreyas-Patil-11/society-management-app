

import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';

// Tab Screens
import HomeScreen from '../screens/resident/home/HomeScreen';
import ServicesScreen from '../screens/resident/services/ServicesScreen';
import ActivityScreen from '../screens/resident/community/ActivityScreen';

const Tab = createBottomTabNavigator();

const ResidentTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'ServicesTab') iconName = 'grid-view'; // Hub icon
          else if (route.name === 'CommunityTab') iconName = 'people';

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
        name="HomeTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Home' }}
      />
      
      <Tab.Screen 
        name="ServicesTab" 
        component={ServicesScreen} 
        options={{ tabBarLabel: 'Services' }}
      />
      
      <Tab.Screen 
        name="CommunityTab" 
        component={ActivityScreen} 
        options={{ tabBarLabel: 'Community' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.primary,
    borderTopWidth: 0,
    elevation: 20, // High elevation for floating effect
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
    transform: [{ scale: 1.1 }], // Subtle pop effect
  },
});

export default ResidentTabs;