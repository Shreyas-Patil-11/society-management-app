/**
 * Payment Service
 * 
 * Handles all payment-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { PAYMENT_ENDPOINTS } from './api/endpoints';
import {
  bills,
  paymentHistory,
  paymentMethods,
  paymentSummary,
  getBillsByResident,
  getPendingBills,
  getPaymentHistoryByResident,
  getPaymentMethodsByResident,
  PAYMENT_STATUS,
  BILL_TYPES,
} from '../mock/bills';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get all bills for resident
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getBills = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.BILLS);

    await sleep(800);

    const data = getBillsByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get bills error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get bills',
      data: [],
    };
  }
};

/**
 * Get pending bills
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getPendingBillsList = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.PENDING_BILLS);

    await sleep(600);

    const data = getPendingBills(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get pending bills error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get pending bills',
      data: [],
    };
  }
};

/**
 * Get bill details
 * 
 * @param {string} billId - Bill ID
 * @returns {Promise<object>}
 */
export const getBillDetails = async (billId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.BILL_DETAILS(billId));

    await sleep(500);

    const bill = bills.find(b => b.id === billId);

    if (!bill) {
      return {
        success: false,
        message: 'Bill not found',
      };
    }

    return {
      success: true,
      data: bill,
    };
  } catch (error) {
    console.error('Get bill details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get bill details',
    };
  }
};

/**
 * Get payment summary
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getPaymentSummary = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.SUMMARY);

    await sleep(500);

    return {
      success: true,
      data: paymentSummary,
    };
  } catch (error) {
    console.error('Get payment summary error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get payment summary',
    };
  }
};

/**
 * Get payment history
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getPaymentHistoryList = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.HISTORY);

    await sleep(600);

    const data = getPaymentHistoryByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get payment history error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get payment history',
      data: [],
    };
  }
};

/**
 * Get saved payment methods
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getPaymentMethods = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.METHODS);

    await sleep(500);

    const data = getPaymentMethodsByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get payment methods error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get payment methods',
      data: [],
    };
  }
};

/**
 * Add payment method
 * 
 * @param {object} methodData - Payment method details
 * @returns {Promise<object>}
 */
export const addPaymentMethod = async (methodData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(PAYMENT_ENDPOINTS.ADD_METHOD, methodData);

    await sleep(1000);

    const newMethod = {
      id: `method_${generateId()}`,
      ...methodData,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newMethod,
      message: 'Payment method added successfully',
    };
  } catch (error) {
    console.error('Add payment method error:', error);
    return {
      success: false,
      message: error.message || 'Failed to add payment method',
    };
  }
};

/**
 * Remove payment method
 * 
 * @param {string} methodId - Method ID
 * @returns {Promise<object>}
 */
export const removePaymentMethod = async (methodId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.delete(PAYMENT_ENDPOINTS.REMOVE_METHOD(methodId));

    await sleep(800);

    return {
      success: true,
      message: 'Payment method removed',
    };
  } catch (error) {
    console.error('Remove payment method error:', error);
    return {
      success: false,
      message: error.message || 'Failed to remove payment method',
    };
  }
};

/**
 * Make payment
 * 
 * @param {object} paymentData - Payment details
 * @returns {Promise<object>}
 */
export const makePayment = async (paymentData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(PAYMENT_ENDPOINTS.PAY, paymentData);

    await sleep(2000);

    const { billId, amount, paymentMethod } = paymentData;

    // Simulate payment processing
    const payment = {
      id: `payment_${generateId()}`,
      billId,
      amount,
      paymentMethod,
      status: 'success',
      transactionId: `TXN${Date.now()}`,
      receiptNumber: `RCP-${new Date().getFullYear()}-${generateId().slice(0, 6)}`,
      paidAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: payment,
      message: 'Payment successful',
    };
  } catch (error) {
    console.error('Make payment error:', error);
    return {
      success: false,
      message: error.message || 'Payment failed',
    };
  }
};

/**
 * Get payment receipt
 * 
 * @param {string} paymentId - Payment ID
 * @returns {Promise<object>}
 */
export const getReceipt = async (paymentId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(PAYMENT_ENDPOINTS.RECEIPT(paymentId));

    await sleep(500);

    const payment = paymentHistory.find(p => p.id === paymentId);

    if (!payment) {
      return {
        success: false,
        message: 'Receipt not found',
      };
    }

    return {
      success: true,
      data: {
        ...payment,
        societyName: 'Green Valley Apartments',
        societyAddress: 'Plot 42, Sector 50, Gurugram',
        societyGST: 'GST123456789',
      },
    };
  } catch (error) {
    console.error('Get receipt error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get receipt',
    };
  }
};

export const paymentService = {
  getBills,
  getPendingBillsList,
  getBillDetails,
  getPaymentSummary,
  getPaymentHistoryList,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  makePayment,
  getReceipt,
  PAYMENT_STATUS,
  BILL_TYPES,
};

export default paymentService;