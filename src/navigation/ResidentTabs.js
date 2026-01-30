// // /**
// //  * Resident Bottom Tab Navigator
// //  * 
// //  * Main navigation for resident users with 5 tabs:
// //  * - Home
// //  * - Visitors
// //  * - Pay
// //  * - Community
// //  * - Profile
// //  */

// // import React from 'react';
// // import { View, Text, StyleSheet, Platform } from 'react-native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Icon from 'react-native-vector-icons/MaterialIcons';

// // import { colors } from '../theme/colors';
// // import { typography } from '../theme/typography';
// // import { spacing } from '../theme/spacing';
// // import { shadows } from '../theme/shadows';

// // // Tab Screens
// // import HomeScreen from '../screens/resident/home/HomeScreen';
// // import VisitorsScreen from '../screens/resident/home/GatepassScreen';
// // import PaymentsScreen from '../screens/resident/payments/PaymentsScreen';
// // import ActivityScreen from '../screens/resident/community/ActivityScreen';
// // import ProfileScreen from '../screens/resident/profile/ProfileScreen';

// // const Tab = createBottomTabNavigator();

// // /**
// //  * Tab Bar Icon Component
// //  */
// // const TabBarIcon = ({ name, focused, color, size }) => {
// //   return (
// //     <View style={styles.iconContainer}>
// //       <Icon name={name} size={size} color={color} />
// //       {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
// //     </View>
// //   );
// // };

// // /**
// //  * Get icon name for each tab
// //  */
// // const getTabIcon = (routeName) => {
// //   switch (routeName) {
// //     case 'HomeTab':
// //       return 'home';
// //     case 'VisitorsTab':
// //       return 'people';
// //     case 'PayTab':
// //       return 'account-balance-wallet';
// //     case 'CommunityTab':
// //       return 'forum';
// //     case 'ProfileTab':
// //       return 'person';
// //     default:
// //       return 'home';
// //   }
// // };

// // /**
// //  * Resident Tabs Navigator
// //  */
// // const ResidentTabs = () => {
// //   return (
// //     <Tab.Navigator
// //       initialRouteName="HomeTab"
// //       screenOptions={({ route }) => ({
// //         headerShown: false,
// //         tabBarIcon: ({ focused, color, size }) => (
// //           <TabBarIcon
// //             name={getTabIcon(route.name)}
// //             focused={focused}
// //             color={color}
// //             size={24}
// //           />
// //         ),
// //         tabBarActiveTintColor: colors.primary.main,
// //         tabBarInactiveTintColor: colors.text.tertiary,
// //         tabBarStyle: styles.tabBar,
// //         tabBarLabelStyle: styles.tabBarLabel,
// //         tabBarHideOnKeyboard: true,
// //         tabBarAllowFontScaling: false,
// //       })}>
// //       {/* Home Tab */}
// //       <Tab.Screen
// //         name="HomeTab"
// //         component={HomeScreen}
// //         options={{
// //           tabBarLabel: 'Home',
// //           tabBarAccessibilityLabel: 'Home Tab',
// //         }}
// //       />

// //       {/* Visitors Tab */}
// //       <Tab.Screen
// //         name="VisitorsTab"
// //         component={VisitorsScreen}
// //         options={{
// //           tabBarLabel: 'Visitors',
// //           tabBarAccessibilityLabel: 'Visitors Tab',
// //         }}
// //       />

// //       {/* Pay Tab */}
// //       <Tab.Screen
// //         name="PayTab"
// //         component={PaymentsScreen}
// //         options={{
// //           tabBarLabel: 'Pay',
// //           tabBarAccessibilityLabel: 'Payments Tab',
// //         }}
// //       />

// //       {/* Community Tab */}
// //       <Tab.Screen
// //         name="CommunityTab"
// //         component={ActivityScreen}
// //         options={{
// //           tabBarLabel: 'Community',
// //           tabBarAccessibilityLabel: 'Community Tab',
// //         }}
// //       />

// //       {/* Profile Tab */}
// //       <Tab.Screen
// //         name="ProfileTab"
// //         component={ProfileScreen}
// //         options={{
// //           tabBarLabel: 'Profile',
// //           tabBarAccessibilityLabel: 'Profile Tab',
// //         }}
// //       />
// //     </Tab.Navigator>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   tabBar: {
// //     backgroundColor: colors.background.primary,
// //     borderTopWidth: 1,
// //     borderTopColor: colors.border.light,
// //     paddingTop: spacing.xs,
// //     paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
// //     height: Platform.OS === 'ios' ? 85 : 65,
// //     ...shadows.sm,
// //   },
// //   tabBarLabel: {
// //     ...typography.textStyles.tabLabel,
// //     marginTop: spacing.xxs,
// //   },
// //   iconContainer: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   activeIndicator: {
// //     position: 'absolute',
// //     bottom: -8,
// //     width: 4,
// //     height: 4,
// //     borderRadius: 2,
// //   },
// // });

// // export default ResidentTabs;

// /**
//  * Resident Bottom Tab Navigator
//  *
//  * TEMP CONFIG:
//  * ✅ Only Home tab visible after login
//  * ❌ Visitors, Pay, Community, Profile are COMMENTED
//  */

// import React from 'react';
// import { View, StyleSheet, Platform } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../theme/colors';
// import { typography } from '../theme/typography';
// import { spacing } from '../theme/spacing';
// import { shadows } from '../theme/shadows';

// // ✅ ACTIVE TAB SCREEN
// import HomeScreen from '../screens/resident/home/HomeScreen';

// // ❌ COMMENTED TABS (enable later)
// import GatepassScreen from '../screens/resident/home/GatepassScreen';
// import PaymentsScreen from '../screens/resident/payments/PaymentsScreen';
// import ActivityScreen from '../screens/resident/community/ActivityScreen';
// import ProfileScreen from '../screens/resident/profile/ProfileScreen';

// const Tab = createBottomTabNavigator();

// /**
//  * Tab Bar Icon Component
//  */
// const TabBarIcon = ({ name, focused, color }) => (
//   <View style={styles.iconContainer}>
//     <Icon name={name} size={24} color={color} />
//     {focused && (
//       <View
//         style={[styles.activeIndicator, { backgroundColor: color }]}
//       />
//     )}
//   </View>
// );

// /**
//  * Icon resolver
//  */
// const getTabIcon = (routeName) => {
//   switch (routeName) {
//     case 'HomeTab':
//       return 'home';
//     default:
//       return 'home';
//   }
// };

// /**
//  * Resident Tabs Navigator
//  */
// const ResidentTabs = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeTab"
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color }) => (
//           <TabBarIcon
//             name={getTabIcon(route.name)}
//             focused={focused}
//             color={color}
//           />
//         ),
//         tabBarActiveTintColor: colors.primary.main,
//         tabBarInactiveTintColor: colors.text.tertiary,
//         tabBarStyle: styles.tabBar,
//         tabBarLabelStyle: styles.tabBarLabel,
//         tabBarHideOnKeyboard: true,
//       })}
//     >
//       {/* ✅ HOME TAB (ONLY VISIBLE TAB) */}
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarAccessibilityLabel: 'Home Tab',
//         }}
//       />

      
//       {/* ❌ VISITORS TAB */}
//       <Tab.Screen
//         name="VisitorsTab"
//         component={GatepassScreen}
//         options={{ tabBarLabel: 'Visitors' }}
//       />
     

      
//       {/* ❌ PAY TAB
//       <Tab.Screen
//         name="PayTab"
//         component={PaymentsScreen}
//         options={{ tabBarLabel: 'Pay' }}
//       /> */}
     

      
//       {/* ❌ COMMUNITY TAB */}
//       <Tab.Screen
//         name="CommunityTab"
//         component={ActivityScreen}
//         options={{ tabBarLabel: 'Community' }}
//       />
     

      
//       <Tab.Screen
//         name="ProfileTab"
//         component={ProfileScreen}
//         options={{ tabBarLabel: 'Profile' }}
//       />
     
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: colors.background.primary,
//     borderTopWidth: 1,
//     borderTopColor: colors.border.light,
//     paddingTop: spacing.xs,
//     paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
//     height: Platform.OS === 'ios' ? 85 : 65,
//     ...shadows.sm,
//   },
//   tabBarLabel: {
//     ...typography.textStyles.tabLabel,
//     marginTop: spacing.xxs,
//   },
//   iconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activeIndicator: {
//     position: 'absolute',
//     bottom: -8,
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//   },
// });

// export default ResidentTabs;


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