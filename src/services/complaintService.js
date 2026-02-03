/**
 * Complaint Service
 * src/services/complaintService.js
 */
import { apiClient } from './api/apiClient';

const COMPLAINT_URL = '/complaints';

// Get complaints raised by the logged-in resident
export const getMyComplaints = async () => {
  try {
    const result = await apiClient.get(`${COMPLAINT_URL}/my`);
    if (result.success) {
      return { success: true, data: result.data || [] };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Create a new complaint
export const createComplaint = async (complaintData) => {
  try {
    // complaintData should contain: { title, description, society_id }
    const result = await apiClient.post(COMPLAINT_URL, complaintData);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const ComplaintService = {
  getMyComplaints,
  createComplaint,
};

export default ComplaintService;