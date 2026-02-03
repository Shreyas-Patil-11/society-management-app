

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

export const changePassword = async (currentPassword, newPassword) => {
  try {
    // Backend Route: PUT /api/users/reset-password
    const response = await apiClient.put('/users/reset-password', {
      currentPassword,
      newPassword
    });

    if (response.success) {
      return { success: true, message: 'Password changed successfully' };
    }
    // Handle error messages from backend
    return { success: false, message: response.message || 'Failed to change password' };
  } catch (error) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const sendOTP = async (phone) => ({ success: true, message: 'OTP Sent' });
export const verifyOTP = async (phone, otp) => ({ success: true, message: 'Verified' });

export const authService = {
  loginWithEmail,
  sendOTP,
  verifyOTP,
  logout,
  changePassword,
};

export default authService;
