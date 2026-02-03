
/**
 * Payment Service
 * src/services/paymentService.js
 * Connected to Backend API
 */
import { apiClient } from './api/apiClient';

const BILLS_URL = '/bills';
const PAYMENTS_URL = '/payments';

// 1. Get My Bills
export const getMyBills = async () => {
  try {
    const result = await apiClient.get(`${BILLS_URL}/resident`);
    if (result.success) {
      return { success: true, data: result.data || [] };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 2. Make Payment
export const makePayment = async (paymentData) => {
  try {
    // Payload: { bill_id, amount, payment_mode }
    const result = await apiClient.post(PAYMENTS_URL, paymentData);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 3. Get Receipt Details
export const getReceipt = async (paymentId) => {
  try {
    const result = await apiClient.get(`${PAYMENTS_URL}/${paymentId}`);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const paymentService = {
  getMyBills,
  makePayment,
  getReceipt
};

export default paymentService;