// /**
//  * Application Configuration
//  * 
//  * This file contains all app-level configurations
//  * Environment variables are loaded from .env file
//  */

// // Import environment variables
// // Note: react-native-config reads from .env file
// // For now, we'll use placeholder values that will be replaced when backend is ready

// // API Configuration
// // export const API_CONFIG = {
// //   // Base URL - to be configured when backend is ready
// //   // import Config from 'react-native-config';
// //   // BASE_URL: Config.API_BASE_URL,
// //   BASE_URL: 'http://localhost:5000/api',
  
// //   // Request timeout in milliseconds
// //   TIMEOUT: 30000,
  
// //   // API Version
// //   VERSION: 'v1',
  
// //   // Headers
// //   DEFAULT_HEADERS: {
// //     'Content-Type': 'application/json',
// //     Accept: 'application/json',
// //   },
// // };

// import { ENV } from './env';

// export const API_CONFIG = {
//   BASE_URL: ENV.API_BASE_URL,
//   TIMEOUT: ENV.TIMEOUT,
//   DEFAULT_HEADERS: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// };

// // Authentication Configuration
// export const AUTH_CONFIG = {
//   // OTP length
//   OTP_LENGTH: 6,
  
//   // OTP resend timeout in seconds
//   OTP_RESEND_TIMEOUT: 30,
  
//   // Session timeout in minutes
//   SESSION_TIMEOUT: 30,
  
//   // Remember me duration in days
//   REMEMBER_ME_DURATION: 30,
  
//   // Token refresh threshold in minutes
//   TOKEN_REFRESH_THRESHOLD: 5,
// };

// // App Configuration
// export const APP_CONFIG = {
//   // App name
//   NAME: 'Society App',
  
//   // Version
//   VERSION: '1.0.0',
  
//   // Build number
//   BUILD_NUMBER: '1',
  
//   // Bundle ID / Package name
//   BUNDLE_ID: 'com.societyapp',
  
//   // Support email
//   SUPPORT_EMAIL: 'support@societyapp.com',
  
//   // Support phone
//   SUPPORT_PHONE: '+91 9876543210',
  
//   // Privacy policy URL
//   PRIVACY_POLICY_URL: 'https://societyapp.com/privacy',
  
//   // Terms of service URL
//   TERMS_URL: 'https://societyapp.com/terms',
  
//   // FAQ URL
//   FAQ_URL: 'https://societyapp.com/faq',
// };

// // Feature Flags
// export const FEATURES = {
//   // Enable OTP login
//   OTP_LOGIN: true,
  
//   // Enable email login
//   EMAIL_LOGIN: true,
  
//   // Enable biometric authentication
//   BIOMETRIC_AUTH: false,
  
//   // Enable push notifications
//   PUSH_NOTIFICATIONS: true,
  
//   // Enable in-app payments
//   IN_APP_PAYMENTS: true,
  
//   // Enable chat feature
//   CHAT: true,
  
//   // Enable community posts
//   COMMUNITY_POSTS: true,
  
//   // Enable amenity booking
//   AMENITY_BOOKING: true,
  
//   // Enable service booking
//   SERVICE_BOOKING: true,
  
//   // Enable offline mode for guards
//   GUARD_OFFLINE_MODE: true,
  
//   // Enable night mode auto-switch for guards
//   GUARD_AUTO_NIGHT_MODE: true,
  
//   // Enable emergency button for guards
//   GUARD_EMERGENCY: true,
// };

// // Pagination Configuration
// export const PAGINATION_CONFIG = {
//   // Default page size
//   DEFAULT_PAGE_SIZE: 20,
  
//   // Max page size
//   MAX_PAGE_SIZE: 100,
  
//   // Initial page
//   INITIAL_PAGE: 1,
// };

// // Cache Configuration
// export const CACHE_CONFIG = {
//   // Cache duration in minutes
//   DEFAULT_DURATION: 5,
  
//   // Maximum cache items
//   MAX_ITEMS: 100,
  
//   // Cache keys prefix
//   PREFIX: '@cache_',
// };

// // Image Configuration
// export const IMAGE_CONFIG = {
//   // Max image size in MB
//   MAX_SIZE: 5,
  
//   // Allowed image types
//   ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
  
//   // Image quality for compression (0-1)
//   COMPRESSION_QUALITY: 0.8,
  
//   // Thumbnail size
//   THUMBNAIL_SIZE: {
//     width: 150,
//     height: 150,
//   },
  
//   // Avatar size
//   AVATAR_SIZE: {
//     width: 200,
//     height: 200,
//   },
// };

// // Animation Configuration
// export const ANIMATION_CONFIG = {
//   // Default animation duration
//   DURATION: 300,
  
//   // Fast animation
//   FAST: 150,
  
//   // Slow animation
//   SLOW: 500,
  
//   // Spring animation config
//   SPRING: {
//     damping: 15,
//     stiffness: 150,
//     mass: 1,
//   },
// };

// // Guard Specific Configuration
// export const GUARD_CONFIG = {
//   // Entry ring timeout in seconds
//   RING_TIMEOUT: 60,
  
//   // Auto-decline after no response
//   AUTO_DECLINE_AFTER: 120,
  
//   // Night mode start hour (24h format)
//   NIGHT_MODE_START: 19,
  
//   // Night mode end hour (24h format)
//   NIGHT_MODE_END: 6,
  
//   // Maximum offline entries before sync required
//   MAX_OFFLINE_ENTRIES: 50,
  
//   // Emergency button long press duration in ms
//   EMERGENCY_LONG_PRESS: 2000,
// };

// // Notification Configuration
// export const NOTIFICATION_CONFIG = {
//   // Notification channels (Android)
//   CHANNELS: {
//     DEFAULT: {
//       id: 'default',
//       name: 'Default',
//       description: 'Default notifications',
//     },
//     VISITOR: {
//       id: 'visitor',
//       name: 'Visitor Alerts',
//       description: 'Notifications for visitor entries',
//     },
//     PAYMENT: {
//       id: 'payment',
//       name: 'Payment Reminders',
//       description: 'Payment due date reminders',
//     },
//     EMERGENCY: {
//       id: 'emergency',
//       name: 'Emergency Alerts',
//       description: 'Emergency notifications',
//     },
//     COMMUNITY: {
//       id: 'community',
//       name: 'Community Updates',
//       description: 'Community posts and updates',
//     },
//   },
// };

// // Error Messages
// export const ERROR_MESSAGES = {
//   NETWORK: 'Please check your internet connection and try again.',
//   SERVER: 'Something went wrong. Please try again later.',
//   SESSION_EXPIRED: 'Your session has expired. Please login again.',
//   UNAUTHORIZED: 'You are not authorized to perform this action.',
//   NOT_FOUND: 'The requested resource was not found.',
//   VALIDATION: 'Please check your input and try again.',
//   UNKNOWN: 'An unexpected error occurred.',
// };

// // Success Messages
// export const SUCCESS_MESSAGES = {
//   LOGIN: 'Login successful!',
//   LOGOUT: 'Logged out successfully.',
//   OTP_SENT: 'OTP sent successfully.',
//   PROFILE_UPDATED: 'Profile updated successfully.',
//   PASSWORD_CHANGED: 'Password changed successfully.',
//   COMPLAINT_SUBMITTED: 'Complaint submitted successfully.',
//   BOOKING_CONFIRMED: 'Booking confirmed successfully.',
//   PAYMENT_SUCCESS: 'Payment successful!',
//   VISITOR_APPROVED: 'Visitor approved.',
//   VISITOR_REJECTED: 'Visitor rejected.',
// };

// export default {
//   API_CONFIG,
//   AUTH_CONFIG,
//   APP_CONFIG,
//   FEATURES,
//   PAGINATION_CONFIG,
//   CACHE_CONFIG,
//   IMAGE_CONFIG,
//   ANIMATION_CONFIG,
//   GUARD_CONFIG,
//   NOTIFICATION_CONFIG,
//   ERROR_MESSAGES,
//   SUCCESS_MESSAGES,
// };


/**
 * App Configuration
 * frontend/src/config/appConfig.js
 */

// Change this URL to your local IP address or hosted backend URL
// For Android Emulator use: 'http://10.0.2.2:5000/api'
// For Physical Device use: 'http://YOUR_LOCAL_IP:5000/api'
export const ENV = {
  // API_BASE_URL: 'http://10.0.3.216:5000/api',
  API_BASE_URL: 'http://10.0.2.2:5000/api',
  // API_BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 15000,
};

export const API_CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  TIMEOUT: ENV.TIMEOUT,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Authentication Configuration
export const AUTH_CONFIG = {
  OTP_LENGTH: 6,
  OTP_RESEND_TIMEOUT: 30,
  SESSION_TIMEOUT: 30,
  REMEMBER_ME_DURATION: 30,
  TOKEN_REFRESH_THRESHOLD: 5,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Society App',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  BUNDLE_ID: 'com.societyapp',
  SUPPORT_EMAIL: 'support@societyapp.com',
  SUPPORT_PHONE: '+91 9876543210',
  PRIVACY_POLICY_URL: 'https://societyapp.com/privacy',
  TERMS_URL: 'https://societyapp.com/terms',
  FAQ_URL: 'https://societyapp.com/faq',
};

export const FEATURES = {
  OTP_LOGIN: true,
  EMAIL_LOGIN: true,
  BIOMETRIC_AUTH: false,
  PUSH_NOTIFICATIONS: true,
  IN_APP_PAYMENTS: true,
  CHAT: true,
  COMMUNITY_POSTS: true,
  AMENITY_BOOKING: true,
  SERVICE_BOOKING: true,
  GUARD_OFFLINE_MODE: true,
  GUARD_AUTO_NIGHT_MODE: true,
  GUARD_EMERGENCY: true,
};

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  INITIAL_PAGE: 1,
};

export const CACHE_CONFIG = {
  DEFAULT_DURATION: 5,
  MAX_ITEMS: 100,
  PREFIX: '@cache_',
};

export const IMAGE_CONFIG = {
  MAX_SIZE: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
  COMPRESSION_QUALITY: 0.8,
  THUMBNAIL_SIZE: { width: 150, height: 150 },
  AVATAR_SIZE: { width: 200, height: 200 },
};

export const ANIMATION_CONFIG = {
  DURATION: 300,
  FAST: 150,
  SLOW: 500,
  SPRING: { damping: 15, stiffness: 150, mass: 1 },
};

export const GUARD_CONFIG = {
  RING_TIMEOUT: 60,
  AUTO_DECLINE_AFTER: 120,
  NIGHT_MODE_START: 19,
  NIGHT_MODE_END: 6,
  MAX_OFFLINE_ENTRIES: 50,
  EMERGENCY_LONG_PRESS: 2000,
};

export const NOTIFICATION_CONFIG = {
  CHANNELS: {
    DEFAULT: { id: 'default', name: 'Default', description: 'Default notifications' },
    VISITOR: { id: 'visitor', name: 'Visitor Alerts', description: 'Notifications for visitor entries' },
    PAYMENT: { id: 'payment', name: 'Payment Reminders', description: 'Payment due date reminders' },
    EMERGENCY: { id: 'emergency', name: 'Emergency Alerts', description: 'Emergency notifications' },
    COMMUNITY: { id: 'community', name: 'Community Updates', description: 'Community posts and updates' },
  },
};

export const ERROR_MESSAGES = {
  NETWORK: 'Please check your internet connection and try again.',
  SERVER: 'Something went wrong. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  UNKNOWN: 'An unexpected error occurred.',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  LOGOUT: 'Logged out successfully.',
  OTP_SENT: 'OTP sent successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  COMPLAINT_SUBMITTED: 'Complaint submitted successfully.',
  BOOKING_CONFIRMED: 'Booking confirmed successfully.',
  PAYMENT_SUCCESS: 'Payment successful!',
  VISITOR_APPROVED: 'Visitor approved.',
  VISITOR_REJECTED: 'Visitor rejected.',
};

export default {
  API_CONFIG,
  AUTH_CONFIG,
  APP_CONFIG,
  FEATURES,
  PAGINATION_CONFIG,
  CACHE_CONFIG,
  IMAGE_CONFIG,
  ANIMATION_CONFIG,
  GUARD_CONFIG,
  NOTIFICATION_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};