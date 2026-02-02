

// /**
//  * Authentication Context
//  * src/context/AuthContext.js
//  */

// import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { authService } from '../services/authService'; // Import the service
// import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';

// export const AuthContext = createContext(null);

// const initialState = {
//   isLoading: true,
//   isAuthenticated: false,
//   user: null,
//   role: null,
//   token: null,
//   society: null,
// };

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState(initialState);

//   // Load auth state on app start
//   useEffect(() => {
//     loadAuthState();
//   }, []);

//   const loadAuthState = async () => {
//     try {
//       const values = await AsyncStorage.multiGet([
//         STORAGE_KEYS.AUTH_TOKEN,
//         STORAGE_KEYS.USER_DATA,
//         STORAGE_KEYS.USER_ROLE,
//         STORAGE_KEYS.SOCIETY_DATA,
//       ]);

//       const data = Object.fromEntries(values);
      
//       const token = data[STORAGE_KEYS.AUTH_TOKEN];
//       const user = data[STORAGE_KEYS.USER_DATA] ? JSON.parse(data[STORAGE_KEYS.USER_DATA]) : null;
//       const role = data[STORAGE_KEYS.USER_ROLE];
//       const society = data[STORAGE_KEYS.SOCIETY_DATA] ? JSON.parse(data[STORAGE_KEYS.SOCIETY_DATA]) : null;

//       if (token && user && role) {
//         setAuthState({
//           isLoading: false,
//           isAuthenticated: true,
//           user,
//           role,
//           token,
//           society,
//         });
//       } else {
//         setAuthState(prev => ({ ...prev, isLoading: false }));
//       }
//     } catch (error) {
//       console.error('Error loading auth state:', error);
//       setAuthState(prev => ({ ...prev, isLoading: false }));
//     }
//   };

//   /**
//    * LOGIN FUNCTION
//    * Now delegates strictly to authService
//    */
//   const signInWithEmail = useCallback(async (email, password) => {
//     try {
//       // 1. Call Service (Handles API vs Mock internally)
//       const result = await authService.loginWithEmail(email, password);

//       if (result.success) {
//         const { user, token, role } = result.data;
        
//         // 2. Determine Society (Safe Fallback)
//         // If backend provides society info in user object, use it. Otherwise mock it.
//         const society = user.society || { id: 'society_001', name: 'Green Valley Apartments' };

//         // 3. Save to Storage
//         await AsyncStorage.multiSet([
//           [STORAGE_KEYS.AUTH_TOKEN, token],
//           [STORAGE_KEYS.USER_DATA, JSON.stringify(user)],
//           [STORAGE_KEYS.USER_ROLE, role], // CRITICAL: Save the detected role
//           [STORAGE_KEYS.SOCIETY_DATA, JSON.stringify(society)],
//         ]);

//         // 4. Update State (Triggers RootNavigator)
//         setAuthState({
//           isLoading: false,
//           isAuthenticated: true,
//           user,
//           role, // CRITICAL: Set the detected role
//           token,
//           society,
//         });

//         return { success: true };
//       } else {
//         return { success: false, message: result.message };
//       }
//     } catch (error) {
//       return { success: false, message: error.message || 'Login failed' };
//     }
//   }, []);

//   const signOut = useCallback(async () => {
//     await authService.logout();
//     setAuthState({ ...initialState, isLoading: false });
//   }, []);

//   // Helpers
//   const isResident = authState.role === USER_ROLES.RESIDENT;
//   const isGuard = authState.role === USER_ROLES.GUARD;
//   const sendOTP = authService.sendOTP;

//   const value = useMemo(() => ({
//     ...authState,
//     isResident,
//     isGuard,
//     signInWithEmail,
//     signOut,
//     sendOTP,
//   }), [authState, isResident, isGuard, signInWithEmail, signOut]);

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


/**
 * Authentication Context
 * src/context/AuthContext.js
 */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';

export const AuthContext = createContext(null);

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  role: null,
  token: null,
  society: null,
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  // Load auth state on app start
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.USER_ROLE,
        STORAGE_KEYS.SOCIETY_DATA,
      ]);

      const data = Object.fromEntries(values);

      const token = data[STORAGE_KEYS.AUTH_TOKEN];
      const user = data[STORAGE_KEYS.USER_DATA]
        ? JSON.parse(data[STORAGE_KEYS.USER_DATA])
        : null;
      const role = data[STORAGE_KEYS.USER_ROLE];
      const society = data[STORAGE_KEYS.SOCIETY_DATA]
        ? JSON.parse(data[STORAGE_KEYS.SOCIETY_DATA])
        : null;

      if (token && user && role) {
        setAuthState({
          isLoading: false,
          isAuthenticated: true,
          user,
          role,
          token,
          society,
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * ✅ Email Login (DB ONLY)
   */
  const signInWithEmail = useCallback(async (email, password) => {
    try {
      const result = await authService.loginWithEmail(email, password);

      // ✅ success
      if (result.success) {
        const { user, token, role } = result.data;

        const society = user?.society || null;

        const storagePairs = [
          [STORAGE_KEYS.AUTH_TOKEN, token],
          [STORAGE_KEYS.USER_DATA, JSON.stringify(user)],
          [STORAGE_KEYS.USER_ROLE, role],
        ];

        if (society) {
          storagePairs.push([
            STORAGE_KEYS.SOCIETY_DATA,
            JSON.stringify(society),
          ]);
        }

        await AsyncStorage.multiSet(storagePairs);

        setAuthState({
          isLoading: false,
          isAuthenticated: true,
          user,
          role,
          token,
          society,
        });

        return { success: true };
      }

      // ✅ IMPORTANT: return BOTH message and code
      return {
        success: false,
        message: result?.message || 'Login failed',
        code: result?.code || null,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Login failed',
        code: 'UNKNOWN_ERROR',
      };
    }
  }, []);

  /**
   * Sign out
   */
  const signOut = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setAuthState({ ...initialState, isLoading: false });
    }
  }, []);

  // Helpers
  const isResident = authState.role === USER_ROLES.RESIDENT;
  const isGuard = authState.role === USER_ROLES.GUARD;

  const sendOTP = authService.sendOTP;
  const verifyOTP = authService.verifyOTP;

  const value = useMemo(
    () => ({
      ...authState,
      isResident,
      isGuard,
      signInWithEmail,
      signOut,
      sendOTP,
      verifyOTP,
    }),
    [authState, isResident, isGuard, signInWithEmail, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
