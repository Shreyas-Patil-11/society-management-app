/**
 * Society Service
 * 
 * Handles all society-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api/apiClient';
import { SOCIETY_ENDPOINTS } from './api/endpoints';
import {
  societies,
  getSocietyById,
  searchSocieties as mockSearchSocieties,
} from '../mock/societies';
import {
  buildings,
  getBuildingsBySociety,
  getFlatsByBuilding,
} from '../mock/buildings';
import { sleep } from '../utils/helpers';

/**
 * Get all societies
 * 
 * @returns {Promise<object>}
 */
export const getSocieties = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SOCIETY_ENDPOINTS.LIST);

    await sleep(800);

    return {
      success: true,
      data: societies,
    };
  } catch (error) {
    console.error('Get societies error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get societies',
      data: [],
    };
  }
};

/**
 * Search societies
 * 
 * @param {string} query - Search query
 * @returns {Promise<object>}
 */
export const searchSocieties = async (query) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SOCIETY_ENDPOINTS.SEARCH, { params: { q: query } });

    await sleep(600);

    const data = mockSearchSocieties(query);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Search societies error:', error);
    return {
      success: false,
      message: error.message || 'Failed to search societies',
      data: [],
    };
  }
};

/**
 * Get society details
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getSocietyDetails = async (societyId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SOCIETY_ENDPOINTS.DETAILS(societyId));

    await sleep(500);

    const society = getSocietyById(societyId);

    if (!society) {
      return {
        success: false,
        message: 'Society not found',
      };
    }

    return {
      success: true,
      data: society,
    };
  } catch (error) {
    console.error('Get society details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get society details',
    };
  }
};

/**
 * Get buildings in a society
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getBuildings = async (societyId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SOCIETY_ENDPOINTS.BUILDINGS(societyId));

    await sleep(600);

    const data = getBuildingsBySociety(societyId);

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
 * Get flats in a building
 * 
 * @param {string} buildingId - Building ID
 * @returns {Promise<object>}
 */
export const getFlats = async (buildingId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SOCIETY_ENDPOINTS.FLATS(buildingId));

    await sleep(500);

    const data = getFlatsByBuilding(buildingId);

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
 * Join a society (request)
 * 
 * @param {object} joinData - Join request data
 * @returns {Promise<object>}
 */
export const joinSociety = async (joinData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(SOCIETY_ENDPOINTS.JOIN, joinData);

    await sleep(1200);

    return {
      success: true,
      message: 'Join request submitted. You will be notified once approved.',
    };
  } catch (error) {
    console.error('Join society error:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit join request',
    };
  }
};

export const societyService = {
  getSocieties,
  searchSocieties,
  getSocietyDetails,
  getBuildings,
  getFlats,
  joinSociety,
};

export default societyService;