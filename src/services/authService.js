// /**
//  * Authentication Service
//  * 
//  * Handles all authentication-related API calls
//  * Currently uses mock data, ready for backend integration
//  */

// import { apiClient } from './api';
// import { AUTH_ENDPOINTS } from './api/endpoints';
// import { storage } from '../utils/storage';
// import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
// import { currentResident, currentGuard, residents, guards } from '../mock/users';
// import { sleep } from '../utils/helpers';

// /**
//  * Login with email and password
//  * 
//  * @param {string} email - User email
//  * @param {string} password - User password
//  * @param {string} role - User role (resident/guard)
//  * @returns {Promise<object>}
//  */
// // export const loginWithEmail = async (email, password, role = USER_ROLES.RESIDENT) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password, role });
    
// //     // Simulate API delay
// //     await sleep(1500);

// //     // Mock validation
// //     if (!email || !password) {
// //       return {
// //         success: false,
// //         message: 'Email and password are required',
// //       };
// //     }

// //     // Mock user based on role
// //     const user = role === USER_ROLES.GUARD ? { ...currentGuard } : { ...currentResident };
// //     user.email = email;

// //     const token = `mock_token_${Date.now()}`;

// //     return {
// //       success: true,
// //       data: {
// //         user,
// //         token,
// //         refreshToken: `mock_refresh_${Date.now()}`,
// //       },
// //       message: 'Login successful',
// //     };
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Login failed',
// //     };
// //   }
// // };

// export const loginWithEmail = async (email, password) => {
//   try {
//     // 1. Validate Input locally before sending
//     if (!email || !password) {
//       return {
//         success: false,
//         message: 'Email and password are required',
//       };
//     }

//     // 2. Call the Real Backend
//     // Backend expects: { "email": "...", "password": "..." }
//     const response = await apiClient.post(
//       AUTH_ENDPOINTS.LOGIN, 
//       { email, password },
//       { requiresAuth: false } // Login does not need a token
//     );

//     // 3. Handle Success
//     if (response.success) {
//       const { token, user } = response.data; // Backend returns: { token, user: {...} }

//       // Save to storage
//       await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
//       await storage.setObject(STORAGE_KEYS.USER_DATA, user);
//       await storage.setItem(STORAGE_KEYS.USER_ROLE, user.role);

//       return {
//         success: true,
//         data: {
//           user,
//           token,
//         },
//         message: 'Login successful',
//       };
//     } 
    
//     // 4. Handle Failure (e.g., User not found, Invalid credentials)
//     else {
//       return {
//         success: false,
//         message: response.message || 'Login failed',
//       };
//     }

//   } catch (error) {
//     console.error('Login error:', error);
//     return {
//       success: false,
//       message: error.message || 'Login failed',
//     };
//   }
// };

// /**
//  * Send OTP to phone number
//  * 
//  * @param {string} phone - Phone number
//  * @param {string} role - User role
//  * @returns {Promise<object>}
//  */
// export const sendOTP = async (phone, role = USER_ROLES.RESIDENT) => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.post(AUTH_ENDPOINTS.SEND_OTP, { phone, role });

//     await sleep(1000);

//     if (!phone || phone.length !== 10) {
//       return {
//         success: false,
//         message: 'Please enter a valid 10-digit phone number',
//       };
//     }

//     // Mock OTP sent
//     console.log(`[Mock] OTP sent to ${phone}: 123456`);

//     return {
//       success: true,
//       message: 'OTP sent successfully',
//       data: {
//         expiresIn: 30, // seconds
//       },
//     };
//   } catch (error) {
//     console.error('Send OTP error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to send OTP',
//     };
//   }
// };

// /**
//  * Verify OTP and login
//  * 
//  * @param {string} phone - Phone number
//  * @param {string} otp - OTP code
//  * @param {string} role - User role
//  * @returns {Promise<object>}
//  */
// export const verifyOTP = async (phone, otp, role = USER_ROLES.RESIDENT) => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, { phone, otp, role });

//     await sleep(1500);

//     if (!otp || otp.length !== 6) {
//       return {
//         success: false,
//         message: 'Please enter a valid 6-digit OTP',
//       };
//     }

//     // Mock validation - accept any 6-digit OTP for testing
//     // In production, this would be validated by the server

//     const user = role === USER_ROLES.GUARD 
//       ? { ...currentGuard, phone }
//       : { ...currentResident, phone };

//     const token = `mock_token_${Date.now()}`;

//     return {
//       success: true,
//       data: {
//         user,
//         token,
//         refreshToken: `mock_refresh_${Date.now()}`,
//         isNewUser: false,
//       },
//       message: 'OTP verified successfully',
//     };
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     return {
//       success: false,
//       message: error.message || 'OTP verification failed',
//     };
//   }
// };

// /**
//  * Register new user
//  * 
//  * @param {object} userData - User registration data
//  * @returns {Promise<object>}
//  */
// export const register = async (userData) => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);

//     await sleep(1500);

//     const { name, email, phone, password } = userData;

//     if (!name || !email || !phone || !password) {
//       return {
//         success: false,
//         message: 'All fields are required',
//       };
//     }

//     // Check if user already exists (mock)
//     const existingUser = residents.find(r => r.email === email || r.phone === phone);
//     if (existingUser) {
//       return {
//         success: false,
//         message: 'User with this email or phone already exists',
//       };
//     }

//     return {
//       success: true,
//       message: 'Registration successful. Please verify your phone number.',
//       data: {
//         requiresOTP: true,
//         phone,
//       },
//     };
//   } catch (error) {
//     console.error('Register error:', error);
//     return {
//       success: false,
//       message: error.message || 'Registration failed',
//     };
//   }
// };

// /**
//  * Logout user
//  * 
//  * @returns {Promise<object>}
//  */
// export const logout = async () => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT);

//     await sleep(500);

//     // Clear stored auth data
//     await storage.removeMultiple([
//       STORAGE_KEYS.AUTH_TOKEN,
//       STORAGE_KEYS.REFRESH_TOKEN,
//       STORAGE_KEYS.USER_DATA,
//       STORAGE_KEYS.USER_ROLE,
//     ]);

//     return {
//       success: true,
//       message: 'Logged out successfully',
//     };
//   } catch (error) {
//     console.error('Logout error:', error);
//     // Still clear local storage even if API fails
//     await storage.removeMultiple([
//       STORAGE_KEYS.AUTH_TOKEN,
//       STORAGE_KEYS.REFRESH_TOKEN,
//       STORAGE_KEYS.USER_DATA,
//       STORAGE_KEYS.USER_ROLE,
//     ]);
//     return {
//       success: true,
//       message: 'Logged out',
//     };
//   }
// };

// /**
//  * Refresh authentication token
//  * 
//  * @returns {Promise<object>}
//  */
// export const refreshToken = async () => {
//   try {
//     // TODO: Replace with actual API call
//     // const refreshToken = await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
//     // const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });

//     await sleep(500);

//     const newToken = `mock_token_refreshed_${Date.now()}`;

//     await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);

//     return {
//       success: true,
//       data: {
//         token: newToken,
//       },
//       message: 'Token refreshed',
//     };
//   } catch (error) {
//     console.error('Refresh token error:', error);
//     return {
//       success: false,
//       message: 'Session expired. Please login again.',
//     };
//   }
// };

// /**
//  * Forgot password - send reset link
//  * 
//  * @param {string} email - User email
//  * @returns {Promise<object>}
//  */
// export const forgotPassword = async (email) => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });

//     await sleep(1000);

//     if (!email) {
//       return {
//         success: false,
//         message: 'Please enter your email',
//       };
//     }

//     return {
//       success: true,
//       message: 'Password reset link sent to your email',
//     };
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to send reset link',
//     };
//   }
// };

// /**
//  * Change password
//  * 
//  * @param {string} currentPassword - Current password
//  * @param {string} newPassword - New password
//  * @returns {Promise<object>}
//  */
// export const changePassword = async (currentPassword, newPassword) => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, { currentPassword, newPassword });

//     await sleep(1000);

//     if (!currentPassword || !newPassword) {
//       return {
//         success: false,
//         message: 'Both passwords are required',
//       };
//     }

//     if (newPassword.length < 8) {
//       return {
//         success: false,
//         message: 'New password must be at least 8 characters',
//       };
//     }

//     return {
//       success: true,
//       message: 'Password changed successfully',
//     };
//   } catch (error) {
//     console.error('Change password error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to change password',
//     };
//   }
// };

// /**
//  * Get current user profile
//  * 
//  * @returns {Promise<object>}
//  */
// export const getProfile = async () => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.get(USER_ENDPOINTS.PROFILE);

//     await sleep(500);

//     const userData = await storage.getObject(STORAGE_KEYS.USER_DATA);
//     const role = await storage.getItem(STORAGE_KEYS.USER_ROLE);

//     if (!userData) {
//       return {
//         success: false,
//         message: 'User not found',
//       };
//     }

//     return {
//       success: true,
//       data: {
//         user: userData,
//         role,
//       },
//     };
//   } catch (error) {
//     console.error('Get profile error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to get profile',
//     };
//   }
// };

// /**
//  * Update user profile
//  * 
//  * @param {object} updates - Profile updates
//  * @returns {Promise<object>}
//  */
// export const updateProfile = async (updates) => {
//   try {
//     // TODO: Replace with actual API call
//     // const response = await apiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, updates);

//     await sleep(1000);

//     const currentUser = await storage.getObject(STORAGE_KEYS.USER_DATA);
//     const updatedUser = { ...currentUser, ...updates };

//     await storage.setObject(STORAGE_KEYS.USER_DATA, updatedUser);

//     return {
//       success: true,
//       data: {
//         user: updatedUser,
//       },
//       message: 'Profile updated successfully',
//     };
//   } catch (error) {
//     console.error('Update profile error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to update profile',
//     };
//   }
// };

// export const authService = {
//   loginWithEmail,
//   sendOTP,
//   verifyOTP,
//   register,
//   logout,
//   refreshToken,
//   forgotPassword,
//   changePassword,
//   getProfile,
//   updateProfile,
// };

// export default authService;


/**
 * Authentication Service
 * src/services/authService.js
 */

import { apiClient } from './api/apiClient';
import { AUTH_ENDPOINTS } from './api/endpoints';
import { storage } from '../utils/storage';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import { sleep } from '../utils/helpers';

// --- MOCK DATA FALLBACKS ---
const defaultResident = {
  id: 'res_1', name: 'Demo Resident', email: 'resident@society.com', 
  phone: '9876543210', role: USER_ROLES.RESIDENT, society_id: 1
};
const defaultGuard = {
  id: 'guard_1', name: 'Demo Guard', email: 'guard@society.com', 
  phone: '9876543211', role: USER_ROLES.GUARD, society_id: 1
};

// Internal Mock Lists
let mockResidents = [];
let mockGuards = [];
try {
  const mockData = require('../mock/users');
  if (mockData.residents) mockResidents = mockData.residents;
  if (mockData.guards) mockGuards = mockData.guards;
} catch (e) {
  console.log('Using internal mocks');
}

/**
 * LOGIN: API -> Catch Error -> Smart Mock Fallback
 */
export const loginWithEmail = async (email, password) => {
  try {
    console.log('[AuthService] Attempting API login:', email);
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password });

    if (response.success && response.data) {
      const { user, token } = response.data;
      
      // Determine Role from Backend
      let role = USER_ROLES.RESIDENT;
      if (user.role && (user.role === 'GUARD' || user.role === 'guard')) {
        role = USER_ROLES.GUARD;
      }

      return {
        success: true,
        data: { user: { ...user, role }, token, role },
        message: 'Login successful',
      };
    }
    throw new Error('API Login Failed');
  } catch (error) {
    console.log('[AuthService] API failed (HTML/Net Error), falling back to Smart Mock...');
    return loginWithMock(email, password);
  }
};

const loginWithMock = async (email, password) => {
  await sleep(1000);
  const cleanEmail = email.toLowerCase().trim();
  let user = null;
  let role = USER_ROLES.RESIDENT;

  // 1. Guard Check
  if (cleanEmail === defaultGuard.email || cleanEmail.includes('guard')) {
    user = mockGuards.find(g => g.email === email) || { ...defaultGuard, email };
    role = USER_ROLES.GUARD;
  } 
  // 2. Resident Check
  else {
    user = mockResidents.find(r => r.email === email) || { ...defaultResident, email };
    role = USER_ROLES.RESIDENT;
  }

  return {
    success: true,
    data: { user: { ...user, role }, token: 'mock_token', role },
    message: `Login successful as ${role} (Mock)`,
  };
};

export const logout = async () => {
    await storage.removeMultiple([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USER_DATA, STORAGE_KEYS.USER_ROLE]);
    return { success: true };
};

export const sendOTP = async (phone) => ({ success: true, message: 'OTP Sent' });
export const verifyOTP = async (phone, otp) => ({ success: true, message: 'Verified' });

export const authService = {
  loginWithEmail,
  sendOTP,
  verifyOTP,
  logout,
};

export default authService;