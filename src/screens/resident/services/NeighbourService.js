/**
 * Neighbour Service
 * src/services/neighbourService.js
 * Logic: Fetches all flats in the block, then filters for (Current-1) and (Current+1).
 */

import { apiClient } from './api/apiClient';

// Endpoint used: GET /api/flats/:blockId
const FLAT_URL = '/flats'; 

/**
 * Get Neighbors (Previous and Next Flat)
 * @param {string|number} blockId - The ID of the block the user belongs to
 * @param {string|number} currentFlatNumber - The user's flat number (e.g., "102")
 */
export const getMyNeighbours = async (blockId, currentFlatNumber) => {
  try {
    // 1. Fetch all flats in the block to check who lives where
    const response = await apiClient.get(`${FLAT_URL}/${blockId}`);

    if (!response.success) {
      return { success: false, message: response.message || 'Failed to fetch neighbors' };
    }

    const allFlats = response.data || [];
    const myFlatNum = parseInt(currentFlatNumber);

    // Validation: Ensure we have a valid number to calculate -1 / +1
    if (isNaN(myFlatNum)) {
      return { success: false, message: 'Invalid flat number format' };
    }

    // 2. Calculate target flat numbers
    const prevFlatNum = myFlatNum - 1;
    const nextFlatNum = myFlatNum + 1;

    // 3. Filter: Find flats that match (n-1) OR (n+1)
    // AND ensure those flats actually have a resident (Resident object is not null)
    const neighbors = allFlats.filter(flat => {
      const fNum = parseInt(flat.flat_number);
      const hasResident = flat.Resident && flat.Resident.name; // Check if occupied
      
      // The Logic: Add if it is Before OR After
      return hasResident && (fNum === prevFlatNum || fNum === nextFlatNum);
    });
    // 4. Sort numeric (e.g., show 101 first, then 103)
    neighbors.sort((a, b) => parseInt(a.flat_number) - parseInt(b.flat_number));

    return { success: true, data: neighbors };

  } catch (error) {
    console.error('Neighbour fetch error:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

const NeighbourService = {
  getMyNeighbours,
};

export default NeighbourService;