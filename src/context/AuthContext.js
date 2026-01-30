
/**
 * Authentication Context
 * Manages user authentication state, login/logout,
 * and role-based access control.
 */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  USER_ROLE: '@user_role',
  SOCIETY_DATA: '@society_data',
};

export const USER_ROLES = {
  RESIDENT: 'resident',
  GUARD: 'guard',
};

// Create context
export const AuthContext = createContext(null);

// Initial auth state
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

  /**
   * Load auth state on app start
   */
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

      const data = {};
      values.forEach(([key, value]) => {
        data[key] = value;
      });

      const token = data[STORAGE_KEYS.AUTH_TOKEN];
      const user = data[STORAGE_KEYS.USER_DATA]
        ? JSON.parse(data[STORAGE_KEYS.USER_DATA])
        : null;
      const role = data[STORAGE_KEYS.USER_ROLE];
      const society = data[STORAGE_KEYS.SOCIETY_DATA]
        ? JSON.parse(data[STORAGE_KEYS.SOCIETY_DATA])
        : null;

      const shouldAuthenticate =
        !!token &&
        !!user &&
        !!role &&
        (role === USER_ROLES.GUARD || !!society);

      setAuthState({
        isLoading: false,
        isAuthenticated: shouldAuthenticate,
        user,
        role,
        token,
        society,
      });
    } catch (error) {
      console.error('Error loading auth state:', error);
      setAuthState({
        ...initialState,
        isLoading: false,
      });
    }
  };

  /**
   * Email / password login
   */
  const signInWithEmail = useCallback(
    async (email, password, role = USER_ROLES.RESIDENT) => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const mockUser =
        role === USER_ROLES.GUARD
          ? {
              id: 'guard_001',
              name: 'Ramesh Kumar',
              email,
              phone: '9876543210',
              employeeId: 'SEC-2024-001',
            }
          : {
              id: 'resident_001',
              name: 'Amit Sharma',
              email,
              phone: '9876543210',
              societyId: 'society_001',
            };

      const mockToken = 'mock_jwt_' + Date.now();
      const mockSociety = {
        id: 'society_001',
        name: 'Green Valley Apartments',
      };

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, mockToken],
        [STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser)],
        [STORAGE_KEYS.USER_ROLE, role],
        [STORAGE_KEYS.SOCIETY_DATA, JSON.stringify(mockSociety)],
      ]);

      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        user: mockUser,
        role,
        token: mockToken,
        society: mockSociety,
      });

      return { success: true };
    },
    []
  );

  /**
   * Verify OTP
   * Society already known → authenticate immediately
   */
  const verifyOTP = useCallback(
    async (
      phone,
      otp,
      role = USER_ROLES.RESIDENT,
      isNewUser = false,
      societyData = null
    ) => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!otp || otp.length !== 6) {
        throw new Error('Invalid OTP');
      }

      // Createing  user
      const mockUser = {
        id: isNewUser ? 'resident_new_001' : 'resident_001',
        name: 'Resident Name',
        phone,
        societyId: societyData ? societyData.id : 'society_001',
      };

      const mockToken = 'mock_jwt_' + Date.now();

      const finalSociety =
        role === USER_ROLES.GUARD
          ? null
          : societyData || {
              id: 'society_001',
              name: 'Green Valley Apartments',
            };

      // Build storage payload safely
      const storagePairs = [
        [STORAGE_KEYS.AUTH_TOKEN, mockToken],
        [STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser)],
        [STORAGE_KEYS.USER_ROLE, role],
      ];

      if (finalSociety) {
        storagePairs.push([
          STORAGE_KEYS.SOCIETY_DATA,
          JSON.stringify(finalSociety),
        ]);
      }

      await AsyncStorage.multiSet(storagePairs);

      // Authenticate immediately
      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        user: mockUser,
        role,
        token: mockToken,
        society: finalSociety,
      });

      return { success: true };
    },
    []
  );

  /**
   * Sign out
   */
  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.USER_ROLE,
        STORAGE_KEYS.SOCIETY_DATA,
      ]);
    } finally {
      setAuthState({
        ...initialState,
        isLoading: false,
      });
    }
  }, []);

  // Helpers
  const isResident = useMemo(
    () => authState.role === USER_ROLES.RESIDENT,
    [authState.role]
  );
  const isGuard = useMemo(
    () => authState.role === USER_ROLES.GUARD,
    [authState.role]
  );

  const sendOTP = async () => ({ success: true });

  const value = useMemo(
    () => ({
      ...authState,
      isResident,
      isGuard,
      signInWithEmail,
      verifyOTP,
      signOut,
      sendOTP,
    }),
    [
      authState,
      isResident,
      isGuard,
      signInWithEmail,
      verifyOTP,
      signOut,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

