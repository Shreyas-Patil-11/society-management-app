/**
 * Notice Service
 * 
 * Handles all notice-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { NOTICE_ENDPOINTS } from './api/endpoints';
import {
  notices,
  getNoticesBySociety,
  getPinnedNotices,
  getUnreadNoticesCount,
  getNoticesByType,
  NOTICE_TYPES,
  NOTICE_PRIORITY,
} from '../mock/notices';
import { sleep } from '../utils/helpers';

/**
 * Get all notices for society
 * 
 * @param {string} societyId - Society ID
 * @param {object} filters - Filter options
 * @returns {Promise<object>}
 */
export const getNotices = async (societyId = 'society_001', filters = {}) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(NOTICE_ENDPOINTS.LIST, { params: filters });

    await sleep(800);

    let data = getNoticesBySociety(societyId);

    // Apply filters
    if (filters.type) {
      data = data.filter(n => n.type === filters.type);
    }
    if (filters.priority) {
      data = data.filter(n => n.priority === filters.priority);
    }

    // Sort: pinned first, then by date
    data.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get notices error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get notices',
      data: [],
    };
  }
};

/**
 * Get notice details
 * 
 * @param {string} noticeId - Notice ID
 * @returns {Promise<object>}
 */
export const getNoticeDetails = async (noticeId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(NOTICE_ENDPOINTS.DETAILS(noticeId));

    await sleep(500);

    const notice = notices.find(n => n.id === noticeId);

    if (!notice) {
      return {
        success: false,
        message: 'Notice not found',
      };
    }

    return {
      success: true,
      data: notice,
    };
  } catch (error) {
    console.error('Get notice details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get notice details',
    };
  }
};

/**
 * Mark notice as read
 * 
 * @param {string} noticeId - Notice ID
 * @returns {Promise<object>}
 */
export const markAsRead = async (noticeId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(NOTICE_ENDPOINTS.MARK_READ(noticeId));

    await sleep(300);

    return {
      success: true,
      message: 'Notice marked as read',
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
 * Get pinned notices
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getPinned = async (societyId = 'society_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(500);

    const data = getPinnedNotices(societyId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get pinned notices error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get pinned notices',
      data: [],
    };
  }
};

/**
 * Get unread notices count
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getUnreadCount = async (societyId = 'society_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    const count = getUnreadNoticesCount(societyId);

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

export const noticeService = {
  getNotices,
  getNoticeDetails,
  markAsRead,
  getPinned,
  getUnreadCount,
  NOTICE_TYPES,
  NOTICE_PRIORITY,
};

export default noticeService;