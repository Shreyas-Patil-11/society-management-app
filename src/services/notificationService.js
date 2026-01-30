/**
 * Notification Service
 * 
 * Handles all notification-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { NOTIFICATION_ENDPOINTS } from './api/endpoints';
import {
  notifications,
  getNotifications as getMockNotifications,
  getUnreadNotifications,
  getUnreadCount as getMockUnreadCount,
  getNotificationsByType,
  NOTIFICATION_TYPES,
} from '../mock/notifications';
import { sleep } from '../utils/helpers';

/**
 * Get all notifications
 * 
 * @param {object} options - Pagination options
 * @returns {Promise<object>}
 */
export const getNotifications = async (options = {}) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(NOTIFICATION_ENDPOINTS.LIST, { params: options });

    await sleep(800);

    const data = getMockNotifications();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get notifications error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get notifications',
      data: [],
    };
  }
};

/**
 * Get unread notifications
 * 
 * @returns {Promise<object>}
 */
export const getUnread = async () => {
  try {
    // TODO: Replace with actual API call

    await sleep(600);

    const data = getUnreadNotifications();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get unread notifications error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get unread notifications',
      data: [],
    };
  }
};

/**
 * Get unread count
 * 
 * @returns {Promise<object>}
 */
export const getUnreadCount = async () => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    const count = getMockUnreadCount();

    return {
      success: true,
      data: { count },
    };
  } catch (error) {
    console.error('Get unread count error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get count',
      data: { count: 0 },
    };
  }
};

/**
 * Mark notification as read
 * 
 * @param {string} notificationId - Notification ID
 * @returns {Promise<object>}
 */
export const markAsRead = async (notificationId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(NOTIFICATION_ENDPOINTS.MARK_READ(notificationId));

    await sleep(300);

    return {
      success: true,
      message: 'Notification marked as read',
    };
  } catch (error) {
    console.error('Mark as read error:', error);
    return {
      success: false,
      message: error.message || 'Failed to mark as read',
    };
  }
};

/**
 * Mark all notifications as read
 * 
 * @returns {Promise<object>}
 */
export const markAllAsRead = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(NOTIFICATION_ENDPOINTS.MARK_ALL_READ);

    await sleep(500);

    return {
      success: true,
      message: 'All notifications marked as read',
    };
  } catch (error) {
    console.error('Mark all as read error:', error);
    return {
      success: false,
      message: error.message || 'Failed to mark all as read',
    };
  }
};

/**
 * Get notification settings
 * 
 * @returns {Promise<object>}
 */
export const getSettings = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(NOTIFICATION_ENDPOINTS.SETTINGS);

    await sleep(500);

    // Mock settings
    const settings = {
      visitors: true,
      payments: true,
      notices: true,
      complaints: true,
      amenities: true,
      community: true,
      security: true,
      marketing: false,
      sound: true,
      vibration: true,
    };

    return {
      success: true,
      data: settings,
    };
  } catch (error) {
    console.error('Get settings error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get settings',
    };
  }
};

/**
 * Update notification settings
 * 
 * @param {object} settings - Updated settings
 * @returns {Promise<object>}
 */
export const updateSettings = async (settings) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.put(NOTIFICATION_ENDPOINTS.UPDATE_SETTINGS, settings);

    await sleep(800);

    return {
      success: true,
      message: 'Settings updated',
    };
  } catch (error) {
    console.error('Update settings error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update settings',
    };
  }
};

/**
 * Register push notification token
 * 
 * @param {string} token - Push notification token
 * @param {string} platform - Platform (ios/android)
 * @returns {Promise<object>}
 */
export const registerToken = async (token, platform) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(NOTIFICATION_ENDPOINTS.REGISTER_TOKEN, { token, platform });

    await sleep(500);

    console.log(`[Mock] Push token registered: ${token} (${platform})`);

    return {
      success: true,
      message: 'Token registered',
    };
  } catch (error) {
    console.error('Register token error:', error);
    return {
      success: false,
      message: error.message || 'Failed to register token',
    };
  }
};

export const notificationService = {
  getNotifications,
  getUnread,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  getSettings,
  updateSettings,
  registerToken,
  NOTIFICATION_TYPES,
};

export default notificationService;