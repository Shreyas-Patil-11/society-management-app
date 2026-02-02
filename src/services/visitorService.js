

import { apiClient } from './api/apiClient';

const VISITOR_URL = '/visitors';
const FLAT_URL = '/flats';

// 1. Get Dashboard Visitors
export const getSocietyVisitors = async () => {
  try {
    const result = await apiClient.get(VISITOR_URL);
    if (result.success) {
      return { success: true, data: result.data || [] };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 2. Mark Exit
export const markVisitorExit = async (visitorId) => {
  try {
    const result = await apiClient.put(`${VISITOR_URL}/exit/${visitorId}`);
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 3. Get Blocks (For Manual Entry)
export const getSocietyBlocks = async () => {
  try {
    const result = await apiClient.get(`${VISITOR_URL}/block`);
    if (result.success) return { success: true, data: result.data || [] };
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 4. Get Flats (For Manual Entry)
export const getFlatsByBlock = async (blockId) => {
  try {
    // Matches backend route: GET /api/flats/:blockId
    const result = await apiClient.get(`${FLAT_URL}/${blockId}`);
    if (result.success) return { success: true, data: result.data || [] };
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 5. Add Visitor (For Manual Entry)
export const addVisitor = async (visitorData) => {
  try {
    const result = await apiClient.post(VISITOR_URL, visitorData);
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getResidentVisitors = async () => {
  try {
    // Calls endpoint: /api/visitors/resident
    const response = await apiClient.get(`${VISITOR_URL}/resident`);

    if (response.success) {
      return {
        success: true,
        data: response.data || [],
      };
    }
    return { success: false, message: response.message, data: [] };
  } catch (error) {
    console.error('Fetch resident visitors error:', error);
    return { success: false, message: 'Failed to fetch visitors', data: [] };
  }
};

// Default export for backward compatibility
const visitorService = {
  getSocietyVisitors,
  markVisitorExit,
  getSocietyBlocks,
  getFlatsByBlock,
  addVisitor,
  getResidentVisitors
};

export default visitorService;