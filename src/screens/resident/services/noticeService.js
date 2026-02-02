/**
 * Notice Service
 * src/services/noticeService.js
 */
import { apiClient } from './api/apiClient';

const NOTICE_URL = '/notices';

export const getNotices = async () => {
  try {
    const result = await apiClient.get(NOTICE_URL);
    if (result.success) {
      return { success: true, data: result.data || [] };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const noticeService = {
  getNotices,
};

export default noticeService;