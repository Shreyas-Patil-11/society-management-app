// /**
//  * Auth Stack Navigator
//  * 
//  * Handles all authentication-related screens
//  */

// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { colors } from '../theme/colors';

// // Auth Screens
// import SplashScreen from '../screens/auth/SplashScreen';
// import SignInScreen from '../screens/auth/SignInScreen';
// import SignUpScreen from '../screens/auth/SignUpScreen';
// import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
// import SelectSocietyScreen from '../screens/auth/SelectSocietyScreen';
// import SecurityLoginScreen from '../screens/auth/SecurityLoginScreen';
// import SelectFlatScreen from '../screens/auth/SelectFlatScreen';
// import SelectBlockScreen from '../screens/auth/SelectBlockScreen';

// const Stack = createNativeStackNavigator();

// /**
//  * Auth Stack Navigator
//  */
// const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Splash"
//       screenOptions={{
//         headerShown: false,
//         contentStyle: {
//           backgroundColor: colors.background.primary,
//         },
//         animation: 'slide_from_right',
//       }}>
//       {/* Splash Screen */}
//       <Stack.Screen
//         name="Splash"
//         component={SplashScreen}
//         options={{
//           animation: 'fade',
//         }}
//       />

//       {/* Sign In Screen (Residents) */}
//       <Stack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={{
//           animation: 'fade',
//         }}
//       />

//       {/* Sign Up Screen */}
//       <Stack.Screen
//         name="SignUp"
//         component={SignUpScreen}
//       />

//       {/* OTP Verification Screen */}
//       <Stack.Screen
//         name="OTPVerification"
//         component={OTPVerificationScreen}
//       />

//       <Stack.Screen name="SelectFlat" component={SelectFlatScreen} />


//       {/* Select Society Screen */}
//       <Stack.Screen
//         name="SelectSociety"
//         component={SelectSocietyScreen}
//       />

//       {/* Security Login Screen (Guards) */}
//       <Stack.Screen
//         name="SecurityLogin"
//         component={SecurityLoginScreen}
//       />

//       <Stack.Screen name="SelectBlock" component={SelectBlockScreen} />
//       {/* <Stack.Screen name="SelectFlat" component={SelectFlatScreen} /> */}
//     </Stack.Navigator>
//   );
// };

// export default AuthStack;

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
import SelectFlatScreen from '../screens/auth/SelectFlatScreen';
import SelectBlockScreen from '../screens/auth/SelectBlockScreen';
<<<<<<< HEAD

// ✅ ADD THIS IMPORT
import ApprovalPendingScreen from '../screens/auth/ApprovalPendingScreen';
=======
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c

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
      }}
    >
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
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      {/* OTP Verification Screen */}
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />

      <Stack.Screen name="SelectFlat" component={SelectFlatScreen} />


      {/* Select Society Screen */}
      <Stack.Screen name="SelectSociety" component={SelectSocietyScreen} />

      {/* Select Block Screen */}
      <Stack.Screen name="SelectBlock" component={SelectBlockScreen} />

      {/* Select Flat Screen */}
      <Stack.Screen name="SelectFlat" component={SelectFlatScreen} />

      {/* ✅ Approval Pending Screen (NEW) */}
      <Stack.Screen
        name="ApprovalPending"
        component={ApprovalPendingScreen}
        options={{
          animation: 'fade',
        }}
      />

      {/* Security Login Screen (Guards) */}
<<<<<<< HEAD
      <Stack.Screen name="SecurityLogin" component={SecurityLoginScreen} />
=======
      <Stack.Screen
        name="SecurityLogin"
        component={SecurityLoginScreen}
      />

      <Stack.Screen name="SelectBlock" component={SelectBlockScreen} />
      {/* <Stack.Screen name="SelectFlat" component={SelectFlatScreen} /> */}
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
    </Stack.Navigator>
  );
};

export default AuthStack;
