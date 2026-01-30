/**
 * Visitor Service
 * 
 * Handles all visitor-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { VISITOR_ENDPOINTS } from './api/endpoints';
import {
  visitors,
  visitorHistory,
  preApprovedEntries,
  frequentVisitors,
  getVisitorsByResident,
  getVisitorHistoryByResident,
  getPreApprovedByResident,
  VISITOR_TYPES,
  ENTRY_STATUS,
} from '../mock/visitors';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get current visitors
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getCurrentVisitors = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(VISITOR_ENDPOINTS.LIST);

    await sleep(800);

    const data = getVisitorsByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get visitors error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get visitors',
      data: [],
    };
  }
};

/**
 * Get visitor history
 * 
 * @param {string} residentId - Resident ID
 * @param {object} filters - Filter options
 * @returns {Promise<object>}
 */
export const getVisitorHistory = async (residentId = 'resident_001', filters = {}) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(VISITOR_ENDPOINTS.HISTORY, { params: filters });

    await sleep(800);

    let data = getVisitorHistoryByResident(residentId);

    // Apply filters
    if (filters.type) {
      data = data.filter(v => v.type === filters.type);
    }
    if (filters.startDate) {
      data = data.filter(v => new Date(v.createdAt) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      data = data.filter(v => new Date(v.createdAt) <= new Date(filters.endDate));
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get visitor history error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get visitor history',
      data: [],
    };
  }
};

/**
 * Get pre-approved entries
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getPreApprovedEntries = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(VISITOR_ENDPOINTS.PRE_APPROVED_LIST);

    await sleep(600);

    const data = getPreApprovedByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get pre-approved entries error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get pre-approved entries',
      data: [],
    };
  }
};

/**
 * Pre-approve a visitor (create gatepass)
 * 
 * @param {object} visitorData - Visitor details
 * @returns {Promise<object>}
 */
export const preApproveVisitor = async (visitorData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(VISITOR_ENDPOINTS.PRE_APPROVE, visitorData);

    await sleep(1000);

    const newEntry = {
      id: `preapprove_${generateId()}`,
      ...visitorData,
      status: 'active',
      isUsed: false,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newEntry,
      message: 'Visitor pre-approved successfully',
    };
  } catch (error) {
    console.error('Pre-approve visitor error:', error);
    return {
      success: false,
      message: error.message || 'Failed to pre-approve visitor',
    };
  }
};

/**
 * Allow visitor entry
 * 
 * @param {string} visitorId - Visitor ID
 * @returns {Promise<object>}
 */
export const allowVisitor = async (visitorId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(VISITOR_ENDPOINTS.ALLOW(visitorId));

    await sleep(800);

    return {
      success: true,
      message: 'Visitor allowed',
    };
  } catch (error) {
    console.error('Allow visitor error:', error);
    return {
      success: false,
      message: error.message || 'Failed to allow visitor',
    };
  }
};

/**
 * Reject visitor entry
 * 
 * @param {string} visitorId - Visitor ID
 * @param {string} reason - Rejection reason
 * @returns {Promise<object>}
 */
export const rejectVisitor = async (visitorId, reason = '') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(VISITOR_ENDPOINTS.REJECT(visitorId), { reason });

    await sleep(800);

    return {
      success: true,
      message: 'Visitor rejected',
    };
  } catch (error) {
    console.error('Reject visitor error:', error);
    return {
      success: false,
      message: error.message || 'Failed to reject visitor',
    };
  }
};

/**
 * Cancel gatepass
 * 
 * @param {string} gatepassId - Gatepass ID
 * @returns {Promise<object>}
 */
export const cancelGatepass = async (gatepassId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(VISITOR_ENDPOINTS.GATEPASS_CANCEL(gatepassId));

    await sleep(800);

    return {
      success: true,
      message: 'Gatepass cancelled',
    };
  } catch (error) {
    console.error('Cancel gatepass error:', error);
    return {
      success: false,
      message: error.message || 'Failed to cancel gatepass',
    };
  }
};

/**
 * Get frequent visitors
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getFrequentVisitors = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(VISITOR_ENDPOINTS.FREQUENT);

    await sleep(600);

    const data = frequentVisitors.filter(v => v.residentId === residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get frequent visitors error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get frequent visitors',
      data: [],
    };
  }
};

/**
 * Quick allow - allow with just phone number (for frequent visitors)
 * 
 * @param {string} phone - Visitor phone number
 * @param {string} type - Visitor type
 * @returns {Promise<object>}
 */
export const quickAllow = async (phone, type = VISITOR_TYPES.GUEST) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(VISITOR_ENDPOINTS.PRE_APPROVE, { phone, type, quickAllow: true });

    await sleep(800);

    const entry = {
      id: `quick_${generateId()}`,
      phone,
      type,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours
      status: 'active',
      isUsed: false,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: entry,
      message: 'Quick allow entry created',
    };
  } catch (error) {
    console.error('Quick allow error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create quick allow entry',
    };
  }
};

export const visitorService = {
  getCurrentVisitors,
  getVisitorHistory,
  getPreApprovedEntries,
  preApproveVisitor,
  allowVisitor,
  rejectVisitor,
  cancelGatepass,
  getFrequentVisitors,
  quickAllow,
  VISITOR_TYPES,
  ENTRY_STATUS,
};

export default visitorService;