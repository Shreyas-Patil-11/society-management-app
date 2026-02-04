

// /**
//  * Authentication Service (DATABASE ONLY)
//  * src/services/authService.js
//  */

// import { apiClient } from './api/apiClient';
// import { AUTH_ENDPOINTS } from './api/endpoints';
// import { storage } from '../utils/storage';
// import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';

// export const loginWithEmail = async (email, password) => {
//   try {
//     const cleanEmail = (email || '').toLowerCase().trim();

//     const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, {
//       email: cleanEmail,
//       password,
//     });

//     if (response?.success === false) {
//       const msg = (response?.message || '').toLowerCase();

//       if (
//         response?.status === 404 ||
//         response?.statusCode === 404 ||
//         msg.includes('user not found') ||
//         msg.includes('email not found') ||
//         msg.includes('not registered') ||
//         msg.includes('does not exist')
//       ) {
//         return {
//           success: false,
//           code: 'USER_NOT_FOUND',
//           message: response?.message || 'User not found',
//         };
//       }

//       if (
//         response?.status === 401 ||
//         response?.statusCode === 401 ||
//         msg.includes('invalid password') ||
//         msg.includes('wrong password')
//       ) {
//         return {
//           success: false,
//           code: 'INVALID_PASSWORD',
//           message: response?.message || 'Invalid password',
//         };
//       }

//       return {
//         success: false,
//         code: response?.code || 'LOGIN_FAILED',
//         message: response?.message || 'Login failed',
//       };
//     }

//     if (response?.success && response?.data) {
//       const { user, token } = response.data;

//       if (!user || !token) {
//         return {
//           success: false,
//           code: 'INVALID_RESPONSE',
//           message: 'Invalid server response',
//         };
//       }

//       let role = USER_ROLES.RESIDENT;
//       if (user?.role && (user.role === 'guard' || user.role === 'GUARD')) {
//         role = USER_ROLES.GUARD;
//       }

//       return {
//         success: true,
//         data: {
//           user: { ...user, role },
//           token,
//           role,
//         },
//         message: 'Login successful',
//       };
//     }

//     return {
//       success: false,
//       code: 'LOGIN_FAILED',
//       message: 'Login failed',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       code: 'NETWORK_ERROR',
//       message: error?.message || 'Network error',
//     };
//   }
// };

// export const logout = async () => {
//   await storage.removeMultiple([
//     STORAGE_KEYS.AUTH_TOKEN,
//     STORAGE_KEYS.USER_DATA,
//     STORAGE_KEYS.USER_ROLE,
//     STORAGE_KEYS.SOCIETY_DATA,
//   ]);
//   return { success: true };
// };

// export const changePassword = async (currentPassword, newPassword) => {
//   try {
//     const response = await apiClient.put('/users/reset-password', {
//       currentPassword,
//       newPassword,
//     });

//     if (response.success) {
//       return { success: true, message: 'Password changed successfully' };
//     }

//     return {
//       success: false,
//       message: response.message || 'Failed to change password',
//     };
//   } catch (error) {
//     return { success: false, message: error.message || 'Network error' };
//   }
// };

// //
// // ✅ OTP FLOW
// //
// export const sendOTP = async phone => {
//   try {
//     const response = await apiClient.post('/auth/send-otp', { phone });

//     if (response?.success) {
//       return { success: true, message: response?.message || 'OTP sent' };
//     }

//     return {
//       success: false,
//       message: response?.message || 'Failed to send OTP',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error?.message || 'Network error',
//     };
//   }
// };

// export const verifyOTP = async (phone, otp, role) => {
//   try {
//     const response = await apiClient.post('/auth/verify-otp', {
//       phone,
//       otp,
//       role, // optional, depends on backend
//     });

//     if (response?.success && response?.data) {
//       return {
//         success: true,
//         data: response.data,
//         message: response?.message || 'OTP verified',
//       };
//     }

//     return {
//       success: false,
//       message: response?.message || 'Invalid OTP',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error?.message || 'Network error',
//     };
//   }
// };

// //
// // ✅ REGISTER RESIDENT FLOW
// //
// export const registerResident = async payload => {
//   try {
//     const response = await apiClient.post('/auth/register-resident', payload);

//     /**
//      * ✅ Expected backend response format should be like:
//      * {
//      *   success: true,
//      *   data: { user: {...}, token: "...", role: "resident" }
//      * }
//      */
//     if (response?.success && response?.data) {
//       let role = USER_ROLES.RESIDENT;

//       if (response?.data?.user?.role) {
//         const r = response.data.user.role;
//         if (r === 'guard' || r === 'GUARD') role = USER_ROLES.GUARD;
//       }

//       return {
//         success: true,
//         data: {
//           user: { ...response.data.user, role },
//           token: response.data.token,
//           role,
//         },
//         message: response?.message || 'Registration successful',
//       };
//     }

//     return {
//       success: false,
//       message: response?.message || 'Registration failed',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error?.message || 'Network error',
//     };
//   }
// };

// export const authService = {
//   loginWithEmail,
//   sendOTP,
//   verifyOTP,
//   logout,
//   changePassword,
//   registerResident,
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

<<<<<<< HEAD
    // ✅ Failure Handling
=======
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
    if (response?.success === false) {
      const msg = (response?.message || '').toLowerCase();

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

<<<<<<< HEAD
    // ✅ Success Handling
=======
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
    if (response?.success && response?.data) {
      const { user, token } = response.data;

      if (!user || !token) {
        return {
          success: false,
          code: 'INVALID_RESPONSE',
          message: 'Invalid server response',
        };
      }

<<<<<<< HEAD
      // ✅ Role detection
=======
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
      let role = USER_ROLES.RESIDENT;
      if (user?.role && (user.role === 'guard' || user.role === 'GUARD')) {
        role = USER_ROLES.GUARD;
      }

      /**
       * ✅ NEW: Handle approval pending / inactive residents
       * Backend can return either:
       * - is_active: false
       * - active: false
       * - status: "PENDING" / "INACTIVE" / "NOT_APPROVED"
       */
      const isInactive =
        user?.is_active === false ||
        user?.active === false ||
        user?.status === 'INACTIVE' ||
        user?.status === 'PENDING' ||
        user?.status === 'NOT_APPROVED';

      // ✅ Only residents should go to approval pending
      if (role === USER_ROLES.RESIDENT && isInactive) {
        return {
          success: false,
          code: 'APPROVAL_PENDING',
          message: 'Your account is pending approval.',
          data: {
            user: { ...user, role },
          },
        };
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
    const response = await apiClient.put('/users/reset-password', {
      currentPassword,
      newPassword,
    });

    if (response.success) {
      return { success: true, message: 'Password changed successfully' };
    }

    return {
      success: false,
      message: response.message || 'Failed to change password',
    };
  } catch (error) {
    return { success: false, message: error.message || 'Network error' };
  }
};

//
// ✅ OTP FLOW
//
export const sendOTP = async phone => {
  try {
    const response = await apiClient.post('/auth/send-otp', { phone });

    if (response?.success) {
      return { success: true, message: response?.message || 'OTP sent' };
    }

    return {
      success: false,
      message: response?.message || 'Failed to send OTP',
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || 'Network error',
    };
  }
};

export const verifyOTP = async (phone, otp, role) => {
  try {
    const response = await apiClient.post('/auth/verify-otp', {
      phone,
      otp,
<<<<<<< HEAD
      role,
=======
      role, // optional, depends on backend
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
    });

    if (response?.success && response?.data) {
      return {
        success: true,
        data: response.data,
        message: response?.message || 'OTP verified',
      };
    }

    return {
      success: false,
      message: response?.message || 'Invalid OTP',
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || 'Network error',
    };
  }
};

//
// ✅ REGISTER RESIDENT FLOW
//
export const registerResident = async payload => {
  try {
    const response = await apiClient.post('/auth/register-resident', payload);

<<<<<<< HEAD
=======
    /**
     * ✅ Expected backend response format should be like:
     * {
     *   success: true,
     *   data: { user: {...}, token: "...", role: "resident" }
     * }
     */
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
    if (response?.success && response?.data) {
      let role = USER_ROLES.RESIDENT;

      if (response?.data?.user?.role) {
        const r = response.data.user.role;
        if (r === 'guard' || r === 'GUARD') role = USER_ROLES.GUARD;
      }

      return {
        success: true,
        data: {
          user: { ...response.data.user, role },
          token: response.data.token,
          role,
        },
        message: response?.message || 'Registration successful',
      };
    }

    return {
      success: false,
      message: response?.message || 'Registration failed',
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || 'Network error',
    };
  }
};

export const authService = {
  loginWithEmail,
  sendOTP,
  verifyOTP,
  logout,
  changePassword,
  registerResident,
};

export default authService;
