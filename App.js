
// import React, { useEffect, useState, useRef } from 'react';
// import { StatusBar, LogBox, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { AuthProvider } from './src/context/AuthContext';
// import { ThemeProvider } from './src/context/ThemeContext';
// import { ToastProvider } from './src/context/ToastContext';
// import RootNavigator from './src/navigation/RootNavigator';
// import linking, { trackNavigation } from './src/navigation/linking';
// import { colors } from './src/theme';


// const App = () => {
//   const navigationRef = useRef(null);
//   const routeNameRef = useRef(null);

//   /**
//    * Handle navigation state change for analytics
//    */
//   const onNavigationStateChange = (state) => {
//     const previousRouteName = routeNameRef.current;
//     const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

//     if (previousRouteName !== currentRouteName) {
//       // Track screen view
//       trackNavigation(state);
//     }

//     // Save the current route name for later comparison
//     routeNameRef.current = currentRouteName;
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <ThemeProvider>
//           <AuthProvider>
//             <ToastProvider>
//               <NavigationContainer
//                 ref={navigationRef}
//                 linking={linking}
//                 onStateChange={onNavigationStateChange}
//                 onReady={() => {
//                   routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
//                 }}
//                 fallback={null}>
//                 <StatusBar
//                   barStyle="dark-content"
//                   backgroundColor={colors.background.primary}
//                   translucent={false}
//                 />
//                 {/* <Text>Hello World</Text> */}
//                 <RootNavigator />
//               </NavigationContainer>
//             </ToastProvider>
//           </AuthProvider>
//         </ThemeProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default App;


/**
 * Main Application Entry Point
 */

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Context Imports
// NOTE: We use { } because we exported them as 'export const AuthProvider'
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext'; 
import { ToastProvider } from './src/context/ToastContext';

// Navigation & Theme
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors'; // Importing directly from colors file is safer

// Ignore specific warnings (optional)
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Order of Providers matters! */}
        <ThemeProvider>
          <AuthProvider> 
            <ToastProvider>
              
              <NavigationContainer>
                <StatusBar
                  barStyle="dark-content"
                  backgroundColor={colors.background.primary}
                />
                <RootNavigator />
              </NavigationContainer>

            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;