/**
 * Guard Service
 * 
 * Handles all guard-specific API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { GUARD_ENDPOINTS } from './api/endpoints';
import {
  gateEntries,
  preApprovedList,
  waitingList,
  todayEntryLog,
  guardMessages,
  getCurrentGateEntries,
  getTodayPreApproved,
  getWaitingVisitors,
  getCheckedInVisitors,
  getUnreadMessagesCount,
  checkPreApproval,
  ENTRY_TYPES,
  GUARD_ENTRY_STATUS,
} from '../mock/guardEntries';
import { buildings, getFlatsByBuilding, getFloorsByBuilding } from '../mock/buildings';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get current gate entries
 * 
 * @returns {Promise<object>}
 */
export const getGateEntries = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(GUARD_ENDPOINTS.GATE_ENTRIES);

    await sleep(800);

    const data = getCurrentGateEntries();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get gate entries error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get gate entries',
      data: [],
    };
  }
};

/**
 * Get pre-approved entries for today
 * 
 * @returns {Promise<object>}
 */
export const getPreApprovedEntries = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(GUARD_ENDPOINTS.PRE_APPROVED);

    await sleep(600);

    const data = getTodayPreApproved();

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
 * Get waiting visitors
 * 
 * @returns {Promise<object>}
 */
export const getWaitingList = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(GUARD_ENDPOINTS.WAITING_LIST);

    await sleep(600);

    const data = getWaitingVisitors();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get waiting list error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get waiting list',
      data: [],
    };
  }
};

/**
 * Get today's entry log
 * 
 * @returns {Promise<object>}
 */
export const getTodayLog = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(GUARD_ENDPOINTS.ENTRY_LOG);

    await sleep(800);

    return {
      success: true,
      data: todayEntryLog,
    };
  } catch (error) {
    console.error('Get today log error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get entry log',
      data: [],
    };
  }
};

/**
 * Create new entry
 * 
 * @param {object} entryData - Entry details
 * @returns {Promise<object>}
 */
export const createEntry = async (entryData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(GUARD_ENDPOINTS.CREATE_ENTRY, entryData);

    await sleep(1000);

    // Check for pre-approval
    const preApproved = checkPreApproval(entryData.visitorPhone, entryData.targetFlat);

    const newEntry = {
      id: `gentry_${generateId()}`,
      ...entryData,
      status: preApproved ? GUARD_ENTRY_STATUS.APPROVED : GUARD_ENTRY_STATUS.WAITING,
      preApproved: !!preApproved,
      guardId: 'guard_001',
      gate: 'Main Gate',
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newEntry,
      message: preApproved ? 'Entry pre-approved' : 'Entry created, waiting for approval',
    };
  } catch (error) {
    console.error('Create entry error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create entry',
    };
  }
};

/**
 * Call resident for approval
 * 
 * @param {string} entryId - Entry ID
 * @returns {Promise<object>}
 */
export const callResident = async (entryId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(GUARD_ENDPOINTS.CALL_RESIDENT(entryId));

    await sleep(1000);

    return {
      success: true,
      message: 'Calling resident...',
      data: {
        status: GUARD_ENTRY_STATUS.CALLING,
        callStartedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Call resident error:', error);
    return {
      success: false,
      message: error.message || 'Failed to call resident',
    };
  }
};

/**
 * Check in visitor
 * 
 * @param {string} entryId - Entry ID
 * @returns {Promise<object>}
 */
export const checkInVisitor = async (entryId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(GUARD_ENDPOINTS.CHECK_IN(entryId));

    await sleep(800);

    return {
      success: true,
      message: 'Visitor checked in',
      data: {
        status: GUARD_ENTRY_STATUS.CHECKED_IN,
        checkInTime: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Check in error:', error);
    return {
      success: false,
      message: error.message || 'Failed to check in visitor',
    };
  }
};

/**
 * Check out visitor
 * 
 * @param {string} entryId - Entry ID
 * @returns {Promise<object>}
 */
export const checkOutVisitor = async (entryId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(GUARD_ENDPOINTS.CHECK_OUT(entryId));

    await sleep(800);

    return {
      success: true,
      message: 'Visitor checked out',
      data: {
        status: GUARD_ENTRY_STATUS.CHECKED_OUT,
        checkOutTime: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Check out error:', error);
    return {
      success: false,
      message: error.message || 'Failed to check out visitor',
    };
  }
};

/**
 * Mark entry as not responded
 * 
 * @param {string} entryId - Entry ID
 * @returns {Promise<object>}
 */
export const markNotResponded = async (entryId) => {
  try {
    // TODO: Replace with actual API call

    await sleep(500);

    return {
      success: true,
      message: 'Marked as not responded',
      data: {
        status: GUARD_ENTRY_STATUS.NOT_RESPONDED,
      },
    };
  } catch (error) {
    console.error('Mark not responded error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update status',
    };
  }
};

/**
 * Get buildings list
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getBuildings = async (societyId = 'society_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(500);

    const data = buildings.filter(b => b.societyId === societyId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get buildings error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get buildings',
      data: [],
    };
  }
};

/**
 * Get floors for a building
 * 
 * @param {string} buildingId - Building ID
 * @returns {Promise<object>}
 */
export const getFloors = async (buildingId) => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    const data = getFloorsByBuilding(buildingId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get floors error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get floors',
      data: [],
    };
  }
};

/**
 * Get flats for a building
 * 
 * @param {string} buildingId - Building ID
 * @param {number} floor - Optional floor filter
 * @returns {Promise<object>}
 */
export const getFlats = async (buildingId, floor = null) => {
  try {
    // TODO: Replace with actual API call

    await sleep(400);

    let data = getFlatsByBuilding(buildingId);

    if (floor) {
      data = data.filter(f => f.floor === floor);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get flats error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get flats',
      data: [],
    };
  }
};

/**
 * Get guard messages
 * 
 * @returns {Promise<object>}
 */
export const getMessages = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(GUARD_ENDPOINTS.MESSAGES);

    await sleep(600);

    return {
      success: true,
      data: guardMessages,
    };
  } catch (error) {
    console.error('Get messages error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get messages',
      data: [],
    };
  }
};

/**
 * Get unread messages count
 * 
 * @returns {Promise<object>}
 */
export const getUnreadCount = async () => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    const count = getUnreadMessagesCount();

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
 * Trigger emergency alert
 * 
 * @param {object} emergencyData - Emergency details
 * @returns {Promise<object>}
 */
export const triggerEmergency = async (emergencyData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(GUARD_ENDPOINTS.EMERGENCY, emergencyData);

    await sleep(500);

    return {
      success: true,
      message: 'Emergency alert triggered',
      data: {
        id: `emergency_${generateId()}`,
        ...emergencyData,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Trigger emergency error:', error);
    return {
      success: false,
      message: error.message || 'Failed to trigger emergency',
    };
  }
};

export const guardService = {
  getGateEntries,
  getPreApprovedEntries,
  getWaitingList,
  getTodayLog,
  createEntry,
  callResident,
  checkInVisitor,
  checkOutVisitor,
  markNotResponded,
  getBuildings,
  getFloors,
  getFlats,
  getMessages,
  getUnreadCount,
  triggerEmergency,
  ENTRY_TYPES,
  GUARD_ENTRY_STATUS,
};

export default guardService;