/**
 * Document Service
 * src/services/documentService.js
 * Connects to ReportController (GET /api/reports)
 */
import { apiClient } from './api/apiClient';

const REPORT_URL = '/reports'; // Adjust if your route is different

export const getDocuments = async () => {
  try {
    const result = await apiClient.get(REPORT_URL);
    if (result.success) {
      return { success: true, data: result.data || [] };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const documentService = {
  getDocuments,
};

export default documentService;