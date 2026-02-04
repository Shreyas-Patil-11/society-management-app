// // /**
// //  * Household Service
// //  * 
// //  * Handles all household-related API calls (family, helps, vehicles)
// //  * Currently uses mock data, ready for backend integration
// //  */

// // import { apiClient } from './api';
// // import { HOUSEHOLD_ENDPOINTS } from './api/endpoints';
// // import {
// //   familyMembers,
// //   domesticHelp,
// //   vehicles,
// //   entryLogs,
// //   getFamilyByResident,
// //   getHelpByResident,
// //   getVehiclesByResident,
// //   getEntryLogsByResident,
// //   getEntryLogsByHelp,
// // } from '../mock/household';
// // import { sleep, generateId } from '../utils/helpers';

// // /**
// //  * Get family members
// //  * 
// //  * @param {string} residentId - Resident ID
// //  * @returns {Promise<object>}
// //  */
// // export const getFamilyMembers = async (residentId = 'resident_001') => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.get(HOUSEHOLD_ENDPOINTS.FAMILY);

// //     await sleep(800);

// //     const data = getFamilyByResident(residentId);

// //     return {
// //       success: true,
// //       data,
// //     };
// //   } catch (error) {
// //     console.error('Get family members error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to get family members',
// //       data: [],
// //     };
// //   }
// // };

// // /**
// //  * Add family member
// //  * 
// //  * @param {object} memberData - Family member details
// //  * @returns {Promise<object>}
// //  */
// // export const addFamilyMember = async (memberData) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.post(HOUSEHOLD_ENDPOINTS.ADD_FAMILY, memberData);

// //     await sleep(1000);

// //     const newMember = {
// //       id: `family_${generateId()}`,
// //       residentId: 'resident_001',
// //       ...memberData,
// //       createdAt: new Date().toISOString(),
// //     };

// //     return {
// //       success: true,
// //       data: newMember,
// //       message: 'Family member added successfully',
// //     };
// //   } catch (error) {
// //     console.error('Add family member error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to add family member',
// //     };
// //   }
// // };

// // /**
// //  * Update family member
// //  * 
// //  * @param {string} memberId - Member ID
// //  * @param {object} updates - Updates
// //  * @returns {Promise<object>}
// //  */
// // export const updateFamilyMember = async (memberId, updates) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.put(HOUSEHOLD_ENDPOINTS.UPDATE_FAMILY(memberId), updates);

// //     await sleep(800);

// //     return {
// //       success: true,
// //       message: 'Family member updated',
// //     };
// //   } catch (error) {
// //     console.error('Update family member error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to update family member',
// //     };
// //   }
// // };

// // /**
// //  * Remove family member
// //  * 
// //  * @param {string} memberId - Member ID
// //  * @returns {Promise<object>}
// //  */
// // export const removeFamilyMember = async (memberId) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.delete(HOUSEHOLD_ENDPOINTS.REMOVE_FAMILY(memberId));

// //     await sleep(800);

// //     return {
// //       success: true,
// //       message: 'Family member removed',
// //     };
// //   } catch (error) {
// //     console.error('Remove family member error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to remove family member',
// //     };
// //   }
// // };

// // /**
// //  * Get domestic help list
// //  * 
// //  * @param {string} residentId - Resident ID
// //  * @returns {Promise<object>}
// //  */
// // export const getDomesticHelp = async (residentId = 'resident_001') => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.get(HOUSEHOLD_ENDPOINTS.HELPS);

// //     await sleep(800);

// //     const data = getHelpByResident(residentId);

// //     return {
// //       success: true,
// //       data,
// //     };
// //   } catch (error) {
// //     console.error('Get domestic help error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to get domestic help',
// //       data: [],
// //     };
// //   }
// // };

// // /**
// //  * Add domestic help
// //  * 
// //  * @param {object} helpData - Help details
// //  * @returns {Promise<object>}
// //  */
// // export const addDomesticHelp = async (helpData) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.post(HOUSEHOLD_ENDPOINTS.ADD_HELP, helpData);

// //     await sleep(1000);

// //     const newHelp = {
// //       id: `help_${generateId()}`,
// //       residentId: 'resident_001',
// //       ...helpData,
// //       isActive: true,
// //       createdAt: new Date().toISOString(),
// //     };

// //     return {
// //       success: true,
// //       data: newHelp,
// //       message: 'Domestic help added successfully',
// //     };
// //   } catch (error) {
// //     console.error('Add domestic help error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to add domestic help',
// //     };
// //   }
// // };

// // /**
// //  * Update domestic help
// //  * 
// //  * @param {string} helpId - Help ID
// //  * @param {object} updates - Updates
// //  * @returns {Promise<object>}
// //  */
// // export const updateDomesticHelp = async (helpId, updates) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.put(HOUSEHOLD_ENDPOINTS.UPDATE_HELP(helpId), updates);

// //     await sleep(800);

// //     return {
// //       success: true,
// //       message: 'Domestic help updated',
// //     };
// //   } catch (error) {
// //     console.error('Update domestic help error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to update domestic help',
// //     };
// //   }
// // };

// // /**
// //  * Remove domestic help
// //  * 
// //  * @param {string} helpId - Help ID
// //  * @returns {Promise<object>}
// //  */
// // export const removeDomesticHelp = async (helpId) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.delete(HOUSEHOLD_ENDPOINTS.REMOVE_HELP(helpId));

// //     await sleep(800);

// //     return {
// //       success: true,
// //       message: 'Domestic help removed',
// //     };
// //   } catch (error) {
// //     console.error('Remove domestic help error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to remove domestic help',
// //     };
// //   }
// // };

// // /**
// //  * Get vehicles
// //  * 
// //  * @param {string} residentId - Resident ID
// //  * @returns {Promise<object>}
// //  */
// // export const getVehicles = async (residentId = 'resident_001') => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.get(HOUSEHOLD_ENDPOINTS.VEHICLES);

// //     await sleep(800);

// //     const data = getVehiclesByResident(residentId);

// //     return {
// //       success: true,
// //       data,
// //     };
// //   } catch (error) {
// //     console.error('Get vehicles error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to get vehicles',
// //       data: [],
// //     };
// //   }
// // };

// // /**
// //  * Add vehicle
// //  * 
// //  * @param {object} vehicleData - Vehicle details
// //  * @returns {Promise<object>}
// //  */
// // export const addVehicle = async (vehicleData) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.post(HOUSEHOLD_ENDPOINTS.ADD_VEHICLE, vehicleData);

// //     await sleep(1000);

// //     const newVehicle = {
// //       id: `vehicle_${generateId()}`,
// //       residentId: 'resident_001',
// //       ...vehicleData,
// //       isActive: true,
// //       createdAt: new Date().toISOString(),
// //     };

// //     return {
// //       success: true,
// //       data: newVehicle,
// //       message: 'Vehicle added successfully',
// //     };
// //   } catch (error) {
// //     console.error('Add vehicle error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to add vehicle',
// //     };
// //   }
// // };

// // /**
// //  * Update vehicle
// //  * 
// //  * @param {string} vehicleId - Vehicle ID
// //  * @param {object} updates - Updates
// //  * @returns {Promise<object>}
// //  */
// // export const updateVehicle = async (vehicleId, updates) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.put(HOUSEHOLD_ENDPOINTS.UPDATE_VEHICLE(vehicleId), updates);

// //     await sleep(800);

// //     return {
// //       success: true,
// //       message: 'Vehicle updated',
// //     };
// //   } catch (error) {
// //     console.error('Update vehicle error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to update vehicle',
// //     };
// //   }
// // };

// // /**
// //  * Remove vehicle
// //  * 
// //  * @param {string} vehicleId - Vehicle ID
// //  * @returns {Promise<object>}
// //  */
// // export const removeVehicle = async (vehicleId) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.delete(HOUSEHOLD_ENDPOINTS.REMOVE_VEHICLE(vehicleId));

// //     await sleep(800);

// //     return {
// //       success: true,
// //       message: 'Vehicle removed',
// //     };
// //   } catch (error) {
// //     console.error('Remove vehicle error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to remove vehicle',
// //     };
// //   }
// // };

// // /**
// //  * Get entry logs
// //  * 
// //  * @param {string} residentId - Resident ID
// //  * @param {object} filters - Filter options
// //  * @returns {Promise<object>}
// //  */
// // export const getEntryLogs = async (residentId = 'resident_001', filters = {}) => {
// //   try {
// //     // TODO: Replace with actual API call
// //     // const response = await apiClient.get(HOUSEHOLD_ENDPOINTS.ENTRY_LOGS, { params: filters });

// //     await sleep(800);

// //     let data = getEntryLogsByResident(residentId);

// //     // Apply filters
// //     if (filters.helpId) {
// //       data = data.filter(e => e.helpId === filters.helpId);
// //     }
// //     if (filters.date) {
// //       data = data.filter(e => e.entryTime.startsWith(filters.date));
// //     }

// //     return {
// //       success: true,
// //       data,
// //     };
// //   } catch (error) {
// //     console.error('Get entry logs error:', error);
// //     return {
// //       success: false,
// //       message: error.message || 'Failed to get entry logs',
// //       data: [],
// //     };
// //   }
// // };

// // export const householdService = {
// //   // Family
// //   getFamilyMembers,
// //   addFamilyMember,
// //   updateFamilyMember,
// //   removeFamilyMember,
// //   // Domestic Help
// //   getDomesticHelp,
// //   addDomesticHelp,
// //   updateDomesticHelp,
// //   removeDomesticHelp,
// //   // Vehicles
// //   getVehicles,
// //   addVehicle,
// //   updateVehicle,
// //   removeVehicle,
// //   // Entry Logs
// //   getEntryLogs,
// // };

// // export default householdService;


// import { apiClient } from './api/apiClient';
// import { HOUSEHOLD_ENDPOINTS } from './api/endpoints';

// /**
//  * Get all household members (Family + Help)
//  */
// export const getHouseholdMembers = async () => {
//   try {
//     const response = await apiClient.get(HOUSEHOLD_ENDPOINTS.BASE);
//     const data = response.data || response;
    
//     return {
//       success: true,
//       data: Array.isArray(data) ? data : [],
//     };
//   } catch (error) {
//     console.error('Get household error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to load household members',
//       data: [],
//     };
//   }
// };

// /**
//  * Add a new member (Family or Help)
//  * @param {Object} memberData - { name, phone, relation, work }
//  */
// export const addHouseholdMember = async (memberData) => {
//   try {
//     const response = await apiClient.post(HOUSEHOLD_ENDPOINTS.BASE, memberData);
    
//     return {
//       success: true,
//       data: response.data || response,
//       message: 'Member added successfully',
//     };
//   } catch (error) {
//     console.error('Add member error:', error);
//     return {
//       success: false,
//       message: error.message || 'Failed to add member',
//     };
//   }
// };

// /**
//  * Remove a member
//  */
// export const removeHouseholdMember = async (memberId) => {
//   try {
//     await apiClient.delete(HOUSEHOLD_ENDPOINTS.REMOVE(memberId));
//     return {
//       success: true,
//       message: 'Member removed successfully',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message || 'Failed to remove member',
//     };
//   }
// };

// export const householdService = {
//   getHouseholdMembers,
//   addHouseholdMember,
//   removeHouseholdMember,
// };

// export default householdService;

import { apiClient } from './api/apiClient';
import { HOUSEHOLD_ENDPOINTS } from './api/endpoints';

/**
 * Get all household members
 */
export const getHouseholdMembers = async () => {
  try {
    const response = await apiClient.get(HOUSEHOLD_ENDPOINTS.BASE);
    const data = response.data || response;
    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    };
  } catch (error) {
    console.error('Get household error:', error);
    return {
      success: false,
      message: error.message || 'Failed to load household members',
      data: [],
    };
  }
};

/**
 * Add a new member
 */
export const addHouseholdMember = async (memberData) => {
  try {
    const response = await apiClient.post(HOUSEHOLD_ENDPOINTS.BASE, memberData);
    return {
      success: true,
      data: response.data || response,
      message: 'Member added successfully',
    };
  } catch (error) {
    console.error('Add member error:', error);
    return {
      success: false,
      message: error.message || 'Failed to add member',
    };
  }
};

/**
 * Remove a member
 * Uses the corrected DELETE endpoint
 */
export const removeHouseholdMember = async (memberId) => {
  try {
    // ✅ This now calls: DELETE http://.../api/household/123
    await apiClient.delete(HOUSEHOLD_ENDPOINTS.REMOVE(memberId));
    return {
      success: true,
      message: 'Member removed successfully',
    };
  } catch (error) {
    console.error('Remove member error:', error);
    return {
      success: false,
      message: error.message || 'Failed to remove member',
    };
  }
};

export const householdService = {
  getHouseholdMembers,
  addHouseholdMember,
  removeHouseholdMember,
};

export default householdService;