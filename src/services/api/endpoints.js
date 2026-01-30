/**
 * API Endpoints Configuration
 * 
 * All API endpoint URLs are defined here
 * These will be used when backend is connected
 */

// Base URL from environment
// import Config from 'react-native-config';
import { API_CONFIG } from '../../config/appConfig';

// Use Config.API_BASE_URL if available, otherwise fallback to Android Emulator localhost
const BASE_URL = API_CONFIG.BASE_URL || 'http://10.0.3.216:5000/api';

// const BASE_URL = 'http://localhost:5000/api'; // This will not work on Android Emulator

/**
 * Authentication Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  LOGIN_OTP: `${BASE_URL}/auth/login/otp`,
  SEND_OTP: `${BASE_URL}/auth/otp/send`,
  VERIFY_OTP: `${BASE_URL}/auth/otp/verify`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
};

/**
 * User/Profile Endpoints
 */
export const USER_ENDPOINTS = {
  PROFILE: `${BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${BASE_URL}/user/profile/update`,
  UPDATE_AVATAR: `${BASE_URL}/user/profile/avatar`,
  DELETE_ACCOUNT: `${BASE_URL}/user/delete`,
};

/**
 * Society Endpoints
 */
export const SOCIETY_ENDPOINTS = {
  LIST: `${BASE_URL}/societies`,
  SEARCH: `${BASE_URL}/societies/search`,
  DETAILS: (id) => `${BASE_URL}/societies/${id}`,
  BUILDINGS: (id) => `${BASE_URL}/societies/${id}/buildings`,
  FLATS: (buildingId) => `${BASE_URL}/buildings/${buildingId}/flats`,
  JOIN: `${BASE_URL}/societies/join`,
};

/**
 * Visitor Endpoints
 */
export const VISITOR_ENDPOINTS = {
  LIST: `${BASE_URL}/visitors`,
  HISTORY: `${BASE_URL}/visitors/history`,
  DETAILS: (id) => `${BASE_URL}/visitors/${id}`,
  PRE_APPROVE: `${BASE_URL}/visitors/pre-approve`,
  PRE_APPROVED_LIST: `${BASE_URL}/visitors/pre-approved`,
  ALLOW: (id) => `${BASE_URL}/visitors/${id}/allow`,
  REJECT: (id) => `${BASE_URL}/visitors/${id}/reject`,
  FREQUENT: `${BASE_URL}/visitors/frequent`,
  GATEPASS: `${BASE_URL}/visitors/gatepass`,
  GATEPASS_CREATE: `${BASE_URL}/visitors/gatepass/create`,
  GATEPASS_CANCEL: (id) => `${BASE_URL}/visitors/gatepass/${id}/cancel`,
};

/**
 * Payment Endpoints
 */
export const PAYMENT_ENDPOINTS = {
  BILLS: `${BASE_URL}/payments/bills`,
  BILL_DETAILS: (id) => `${BASE_URL}/payments/bills/${id}`,
  PENDING_BILLS: `${BASE_URL}/payments/bills/pending`,
  HISTORY: `${BASE_URL}/payments/history`,
  PAY: `${BASE_URL}/payments/pay`,
  METHODS: `${BASE_URL}/payments/methods`,
  ADD_METHOD: `${BASE_URL}/payments/methods/add`,
  REMOVE_METHOD: (id) => `${BASE_URL}/payments/methods/${id}/remove`,
  RECEIPT: (id) => `${BASE_URL}/payments/${id}/receipt`,
  SUMMARY: `${BASE_URL}/payments/summary`,
};

/**
 * Complaint Endpoints
 */
export const COMPLAINT_ENDPOINTS = {
  LIST: `${BASE_URL}/complaints`,
  CREATE: `${BASE_URL}/complaints/create`,
  DETAILS: (id) => `${BASE_URL}/complaints/${id}`,
  UPDATE: (id) => `${BASE_URL}/complaints/${id}/update`,
  CLOSE: (id) => `${BASE_URL}/complaints/${id}/close`,
  REOPEN: (id) => `${BASE_URL}/complaints/${id}/reopen`,
  COMMENTS: (id) => `${BASE_URL}/complaints/${id}/comments`,
  ADD_COMMENT: (id) => `${BASE_URL}/complaints/${id}/comments/add`,
};

/**
 * Notice Endpoints
 */
export const NOTICE_ENDPOINTS = {
  LIST: `${BASE_URL}/notices`,
  DETAILS: (id) => `${BASE_URL}/notices/${id}`,
  MARK_READ: (id) => `${BASE_URL}/notices/${id}/read`,
};

/**
 * Amenity Endpoints
 */
export const AMENITY_ENDPOINTS = {
  LIST: `${BASE_URL}/amenities`,
  DETAILS: (id) => `${BASE_URL}/amenities/${id}`,
  SLOTS: (id) => `${BASE_URL}/amenities/${id}/slots`,
  BOOK: `${BASE_URL}/amenities/book`,
  BOOKINGS: `${BASE_URL}/amenities/bookings`,
  BOOKING_DETAILS: (id) => `${BASE_URL}/amenities/bookings/${id}`,
  CANCEL_BOOKING: (id) => `${BASE_URL}/amenities/bookings/${id}/cancel`,
};

/**
 * Community Endpoints
 */
export const COMMUNITY_ENDPOINTS = {
  POSTS: `${BASE_URL}/community/posts`,
  CREATE_POST: `${BASE_URL}/community/posts/create`,
  POST_DETAILS: (id) => `${BASE_URL}/community/posts/${id}`,
  DELETE_POST: (id) => `${BASE_URL}/community/posts/${id}/delete`,
  LIKE_POST: (id) => `${BASE_URL}/community/posts/${id}/like`,
  UNLIKE_POST: (id) => `${BASE_URL}/community/posts/${id}/unlike`,
  COMMENTS: (id) => `${BASE_URL}/community/posts/${id}/comments`,
  ADD_COMMENT: (id) => `${BASE_URL}/community/posts/${id}/comments/add`,
  RESIDENTS: `${BASE_URL}/community/residents`,
  RESIDENT_DETAILS: (id) => `${BASE_URL}/community/residents/${id}`,
};

/**
 * Chat Endpoints
 */
export const CHAT_ENDPOINTS = {
  CONVERSATIONS: `${BASE_URL}/chat/conversations`,
  CONVERSATION_DETAILS: (id) => `${BASE_URL}/chat/conversations/${id}`,
  MESSAGES: (id) => `${BASE_URL}/chat/conversations/${id}/messages`,
  SEND_MESSAGE: (id) => `${BASE_URL}/chat/conversations/${id}/send`,
  MARK_READ: (id) => `${BASE_URL}/chat/conversations/${id}/read`,
  CREATE_CONVERSATION: `${BASE_URL}/chat/conversations/create`,
};

/**
 * Service Endpoints
 */
export const SERVICE_ENDPOINTS = {
  LIST: `${BASE_URL}/services`,
  DETAILS: (id) => `${BASE_URL}/services/${id}`,
  PROVIDERS: (id) => `${BASE_URL}/services/${id}/providers`,
  BOOK: `${BASE_URL}/services/book`,
  BOOKINGS: `${BASE_URL}/services/bookings`,
  BOOKING_DETAILS: (id) => `${BASE_URL}/services/bookings/${id}`,
  CANCEL_BOOKING: (id) => `${BASE_URL}/services/bookings/${id}/cancel`,
  RATE: (id) => `${BASE_URL}/services/bookings/${id}/rate`,
};

/**
 * Household Endpoints
 */
export const HOUSEHOLD_ENDPOINTS = {
  FAMILY: `${BASE_URL}/household/family`,
  ADD_FAMILY: `${BASE_URL}/household/family/add`,
  UPDATE_FAMILY: (id) => `${BASE_URL}/household/family/${id}/update`,
  REMOVE_FAMILY: (id) => `${BASE_URL}/household/family/${id}/remove`,
  HELPS: `${BASE_URL}/household/helps`,
  ADD_HELP: `${BASE_URL}/household/helps/add`,
  UPDATE_HELP: (id) => `${BASE_URL}/household/helps/${id}/update`,
  REMOVE_HELP: (id) => `${BASE_URL}/household/helps/${id}/remove`,
  VEHICLES: `${BASE_URL}/household/vehicles`,
  ADD_VEHICLE: `${BASE_URL}/household/vehicles/add`,
  UPDATE_VEHICLE: (id) => `${BASE_URL}/household/vehicles/${id}/update`,
  REMOVE_VEHICLE: (id) => `${BASE_URL}/household/vehicles/${id}/remove`,
  ENTRY_LOGS: `${BASE_URL}/household/entry-logs`,
};

/**
 * Guard Endpoints
 */
export const GUARD_ENDPOINTS = {
  LOGIN: `${BASE_URL}/guard/login`,
  DASHBOARD: `${BASE_URL}/guard/dashboard`,
  GATE_ENTRIES: `${BASE_URL}/guard/entries`,
  ENTRY_DETAILS: (id) => `${BASE_URL}/guard/entries/${id}`,
  CREATE_ENTRY: `${BASE_URL}/guard/entries/create`,
  CALL_RESIDENT: (id) => `${BASE_URL}/guard/entries/${id}/call`,
  APPROVE_ENTRY: (id) => `${BASE_URL}/guard/entries/${id}/approve`,
  REJECT_ENTRY: (id) => `${BASE_URL}/guard/entries/${id}/reject`,
  CHECK_IN: (id) => `${BASE_URL}/guard/entries/${id}/check-in`,
  CHECK_OUT: (id) => `${BASE_URL}/guard/entries/${id}/check-out`,
  PRE_APPROVED: `${BASE_URL}/guard/pre-approved`,
  WAITING_LIST: `${BASE_URL}/guard/waiting`,
  ENTRY_LOG: `${BASE_URL}/guard/entry-log`,
  MESSAGES: `${BASE_URL}/guard/messages`,
  EMERGENCY: `${BASE_URL}/guard/emergency`,
};

/**
 * Notification Endpoints
 */
export const NOTIFICATION_ENDPOINTS = {
  LIST: `${BASE_URL}/notifications`,
  MARK_READ: (id) => `${BASE_URL}/notifications/${id}/read`,
  MARK_ALL_READ: `${BASE_URL}/notifications/read-all`,
  SETTINGS: `${BASE_URL}/notifications/settings`,
  UPDATE_SETTINGS: `${BASE_URL}/notifications/settings/update`,
  REGISTER_TOKEN: `${BASE_URL}/notifications/register-token`,
};

/**
 * Support Endpoints
 */
export const SUPPORT_ENDPOINTS = {
  FAQ: `${BASE_URL}/support/faq`,
  SUBMIT_TICKET: `${BASE_URL}/support/ticket`,
  TICKETS: `${BASE_URL}/support/tickets`,
  TICKET_DETAILS: (id) => `${BASE_URL}/support/tickets/${id}`,
};

export default {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  SOCIETY: SOCIETY_ENDPOINTS,
  VISITOR: VISITOR_ENDPOINTS,
  PAYMENT: PAYMENT_ENDPOINTS,
  COMPLAINT: COMPLAINT_ENDPOINTS,
  NOTICE: NOTICE_ENDPOINTS,
  AMENITY: AMENITY_ENDPOINTS,
  COMMUNITY: COMMUNITY_ENDPOINTS,
  CHAT: CHAT_ENDPOINTS,
  SERVICE: SERVICE_ENDPOINTS,
  HOUSEHOLD: HOUSEHOLD_ENDPOINTS,
  GUARD: GUARD_ENDPOINTS,
  NOTIFICATION: NOTIFICATION_ENDPOINTS,
  SUPPORT: SUPPORT_ENDPOINTS,
};