/**
 * Complaint Service
 * 
 * Handles all complaint/helpdesk-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { COMPLAINT_ENDPOINTS } from './api/endpoints';
import {
  complaints,
  complaintComments,
  getComplaintsByResident,
  getComplaintsByStatus,
  getOpenComplaintsCount,
  getCommentsByComplaint,
  COMPLAINT_STATUS,
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITY,
} from '../mock/complaints';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get all complaints for resident
 * 
 * @param {string} residentId - Resident ID
 * @param {object} filters - Filter options
 * @returns {Promise<object>}
 */
export const getComplaints = async (residentId = 'resident_001', filters = {}) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(COMPLAINT_ENDPOINTS.LIST, { params: filters });

    await sleep(800);

    let data = getComplaintsByResident(residentId);

    // Apply filters
    if (filters.status) {
      data = data.filter(c => c.status === filters.status);
    }
    if (filters.category) {
      data = data.filter(c => c.category === filters.category);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get complaints error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get complaints',
      data: [],
    };
  }
};

/**
 * Get complaint details
 * 
 * @param {string} complaintId - Complaint ID
 * @returns {Promise<object>}
 */
export const getComplaintDetails = async (complaintId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(COMPLAINT_ENDPOINTS.DETAILS(complaintId));

    await sleep(600);

    const complaint = complaints.find(c => c.id === complaintId);

    if (!complaint) {
      return {
        success: false,
        message: 'Complaint not found',
      };
    }

    const comments = getCommentsByComplaint(complaintId);

    return {
      success: true,
      data: {
        ...complaint,
        comments,
      },
    };
  } catch (error) {
    console.error('Get complaint details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get complaint details',
    };
  }
};

/**
 * Create new complaint
 * 
 * @param {object} complaintData - Complaint details
 * @returns {Promise<object>}
 */
export const createComplaint = async (complaintData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(COMPLAINT_ENDPOINTS.CREATE, complaintData);

    await sleep(1200);

    const newComplaint = {
      id: `complaint_${generateId()}`,
      ...complaintData,
      status: COMPLAINT_STATUS.OPEN,
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolvedAt: null,
    };

    return {
      success: true,
      data: newComplaint,
      message: 'Complaint submitted successfully',
    };
  } catch (error) {
    console.error('Create complaint error:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit complaint',
    };
  }
};

/**
 * Add comment to complaint
 * 
 * @param {string} complaintId - Complaint ID
 * @param {string} content - Comment content
 * @returns {Promise<object>}
 */
export const addComment = async (complaintId, content) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(COMPLAINT_ENDPOINTS.ADD_COMMENT(complaintId), { content });

    await sleep(800);

    const newComment = {
      id: `comment_${generateId()}`,
      complaintId,
      userId: 'resident_001',
      userName: 'Amit Sharma',
      userRole: 'resident',
      content,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newComment,
      message: 'Comment added',
    };
  } catch (error) {
    console.error('Add comment error:', error);
    return {
      success: false,
      message: error.message || 'Failed to add comment',
    };
  }
};

/**
 * Close complaint
 * 
 * @param {string} complaintId - Complaint ID
 * @param {string} feedback - Closing feedback
 * @returns {Promise<object>}
 */
export const closeComplaint = async (complaintId, feedback = '') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(COMPLAINT_ENDPOINTS.CLOSE(complaintId), { feedback });

    await sleep(800);

    return {
      success: true,
      message: 'Complaint closed',
    };
  } catch (error) {
    console.error('Close complaint error:', error);
    return {
      success: false,
      message: error.message || 'Failed to close complaint',
    };
  }
};

/**
 * Reopen complaint
 * 
 * @param {string} complaintId - Complaint ID
 * @param {string} reason - Reason for reopening
 * @returns {Promise<object>}
 */
export const reopenComplaint = async (complaintId, reason) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(COMPLAINT_ENDPOINTS.REOPEN(complaintId), { reason });

    await sleep(800);

    return {
      success: true,
      message: 'Complaint reopened',
    };
  } catch (error) {
    console.error('Reopen complaint error:', error);
    return {
      success: false,
      message: error.message || 'Failed to reopen complaint',
    };
  }
};

/**
 * Get open complaints count
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getOpenCount = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    const count = getOpenComplaintsCount(residentId);

    return {
      success: true,
      data: { count },
    };
  } catch (error) {
    console.error('Get open count error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get count',
      data: { count: 0 },
    };
  }
};

export const complaintService = {
  getComplaints,
  getComplaintDetails,
  createComplaint,
  addComment,
  closeComplaint,
  reopenComplaint,
  getOpenCount,
  COMPLAINT_STATUS,
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITY,
};

export default complaintService;