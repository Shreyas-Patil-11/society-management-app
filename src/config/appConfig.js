<<<<<<< HEAD

=======
/
>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c
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