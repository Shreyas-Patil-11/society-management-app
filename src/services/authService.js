

// /**
//  * Authentication Service
//  * src/services/authService.js
//  */

// import { apiClient } from './api/apiClient';
// import { AUTH_ENDPOINTS } from './api/endpoints';
// import { storage } from '../utils/storage';
// import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
// import { sleep } from '../utils/helpers';

// // --- MOCK DATA FALLBACKS ---
// const defaultResident = {
//   id: 'res_1', name: 'Demo Resident', email: 'resident@society.com', 
//   phone: '9876543210', role: USER_ROLES.RESIDENT, society_id: 1
// };
// const defaultGuard = {
//   id: 'guard_1', name: 'Demo Guard', email: 'guard@society.com', 
//   phone: '9876543211', role: USER_ROLES.GUARD, society_id: 1
// };

// // Internal Mock Lists
// let mockResidents = [];
// let mockGuards = [];
// try {
//   const mockData = require('../mock/users');
//   if (mockData.residents) mockResidents = mockData.residents;
//   if (mockData.guards) mockGuards = mockData.guards;
// } catch (e) {
//   console.log('Using internal mocks');
// }

// /**
//  * LOGIN: API -> Catch Error -> Smart Mock Fallback
//  */
// export const loginWithEmail = async (email, password) => {
//   try {
//     console.log('[AuthService] Attempting API login:', email);
//     const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password });

//     if (response.success && response.data) {
//       const { user, token } = response.data;
      
//       // Determine Role from Backend
//       let role = USER_ROLES.RESIDENT;
//       if (user.role && (user.role === 'GUARD' || user.role === 'guard')) {
//         role = USER_ROLES.GUARD;
//       }

//       return {
//         success: true,
//         data: { user: { ...user, role }, token, role },
//         message: 'Login successful',
//       };
//     }
//     throw new Error('API Login Failed');
//   } catch (error) {
//     console.log('[AuthService] API failed (HTML/Net Error), falling back to Smart Mock...');
//     return loginWithMock(email, password);
//   }
// };

// const loginWithMock = async (email, password) => {
//   await sleep(1000);
//   const cleanEmail = email.toLowerCase().trim();
//   let user = null;
//   let role = USER_ROLES.RESIDENT;

//   // 1. Guard Check
//   if (cleanEmail === defaultGuard.email || cleanEmail.includes('guard')) {
//     user = mockGuards.find(g => g.email === email) || { ...defaultGuard, email };
//     role = USER_ROLES.GUARD;
//   } 
//   // 2. Resident Check
//   else {
//     user = mockResidents.find(r => r.email === email) || { ...defaultResident, email };
//     role = USER_ROLES.RESIDENT;
//   }

//   return {
//     success: true,
//     data: { user: { ...user, role }, token: 'mock_token', role },
//     message: `Login successful as ${role} (Mock)`,
//   };
// };

// export const logout = async () => {
//     await storage.removeMultiple([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USER_DATA, STORAGE_KEYS.USER_ROLE]);
//     return { success: true };
// };

// export const sendOTP = async (phone) => ({ success: true, message: 'OTP Sent' });
// export const verifyOTP = async (phone, otp) => ({ success: true, message: 'Verified' });

// export const authService = {
//   loginWithEmail,
//   sendOTP,
//   verifyOTP,
//   logout,
// };

// export default authService;


/**
 * Authentication Service (DATABASE ONLY)
 * src/services/authService.js
 */

import { apiClient } from './api/apiClient';
import { AUTH_ENDPOINTS } from './api/endpoints';
import { storage } from '../utils/storage';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';

export const loginWithEmail = async (email, password) => {
  try {
    const cleanEmail = (email || '').toLowerCase().trim();

    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, {
      email: cleanEmail,
      password,
    });

    // ✅ if apiClient returns this type:
    // { success:false, message:"User not found", status:404 }
    if (response?.success === false) {
      const msg = (response?.message || '').toLowerCase();

      // ✅ Map backend not found -> USER_NOT_FOUND
      if (
        response?.status === 404 ||
        response?.statusCode === 404 ||
        msg.includes('user not found') ||
        msg.includes('email not found') ||
        msg.includes('not registered') ||
        msg.includes('does not exist')
      ) {
        return {
          success: false,
          code: 'USER_NOT_FOUND',
          message: response?.message || 'User not found',
        };
      }

      // ✅ Invalid password / unauthorized
      if (
        response?.status === 401 ||
        response?.statusCode === 401 ||
        msg.includes('invalid password') ||
        msg.includes('wrong password')
      ) {
        return {
          success: false,
          code: 'INVALID_PASSWORD',
          message: response?.message || 'Invalid password',
        };
      }

      return {
        success: false,
        code: response?.code || 'LOGIN_FAILED',
        message: response?.message || 'Login failed',
      };
    }

    // ✅ Success
    if (response?.success && response?.data) {
      const { user, token } = response.data;

      if (!user || !token) {
        return {
          success: false,
          code: 'INVALID_RESPONSE',
          message: 'Invalid server response',
        };
      }

      // determine role
      let role = USER_ROLES.RESIDENT;
      if (user?.role && (user.role === 'guard' || user.role === 'GUARD')) {
        role = USER_ROLES.GUARD;
      }

      return {
        success: true,
        data: {
          user: { ...user, role },
          token,
          role,
        },
        message: 'Login successful',
      };
    }

    return {
      success: false,
      code: 'LOGIN_FAILED',
      message: 'Login failed',
    };
  } catch (error) {
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: error?.message || 'Network error',
    };
  }
};

export const logout = async () => {
  await storage.removeMultiple([
    STORAGE_KEYS.AUTH_TOKEN,
    STORAGE_KEYS.USER_DATA,
    STORAGE_KEYS.USER_ROLE,
    STORAGE_KEYS.SOCIETY_DATA,
  ]);
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
