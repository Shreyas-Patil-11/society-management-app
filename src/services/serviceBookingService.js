/**
 * Service Booking Service
 * 
 * Handles all local service booking-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { SERVICE_ENDPOINTS } from './api/endpoints';
import {
  services,
  serviceBookings,
  serviceHistory,
  getAllServices,
  getServicesByCategory,
  getServiceById,
  getBookingsByResident,
  getServiceHistoryByResident,
  SERVICE_CATEGORIES,
  SERVICE_BOOKING_STATUS,
} from '../mock/services';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get all services
 * 
 * @param {string} category - Optional category filter
 * @returns {Promise<object>}
 */
export const getServices = async (category = null) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SERVICE_ENDPOINTS.LIST, { params: { category } });

    await sleep(800);

    const data = category 
      ? getServicesByCategory(category)
      : getAllServices();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get services error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get services',
      data: [],
    };
  }
};

/**
 * Get service details
 * 
 * @param {string} serviceId - Service ID
 * @returns {Promise<object>}
 */
export const getServiceDetails = async (serviceId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SERVICE_ENDPOINTS.DETAILS(serviceId));

    await sleep(500);

    const service = getServiceById(serviceId);

    if (!service) {
      return {
        success: false,
        message: 'Service not found',
      };
    }

    return {
      success: true,
      data: service,
    };
  } catch (error) {
    console.error('Get service details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get service details',
    };
  }
};

/**
 * Book a service
 * 
 * @param {object} bookingData - Booking details
 * @returns {Promise<object>}
 */
export const bookService = async (bookingData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(SERVICE_ENDPOINTS.BOOK, bookingData);

    await sleep(1200);

    const service = getServiceById(bookingData.serviceId);
    const provider = service?.providers.find(p => p.id === bookingData.providerId);

    const newBooking = {
      id: `sbooking_${generateId()}`,
      ...bookingData,
      serviceName: service?.name || 'Unknown',
      providerName: provider?.name || 'Unknown',
      providerPhone: provider?.phone || '',
      status: SERVICE_BOOKING_STATUS.PENDING,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      confirmedAt: null,
      completedAt: null,
    };

    return {
      success: true,
      data: newBooking,
      message: 'Service booking request submitted',
    };
  } catch (error) {
    console.error('Book service error:', error);
    return {
      success: false,
      message: error.message || 'Failed to book service',
    };
  }
};

/**
 * Get user's service bookings
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getMyBookings = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(SERVICE_ENDPOINTS.BOOKINGS);

    await sleep(800);

    const data = getBookingsByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get my bookings error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get bookings',
      data: [],
    };
  }
};

/**
 * Get service booking history
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getBookingHistory = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(800);

    const data = getServiceHistoryByResident(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get booking history error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get booking history',
      data: [],
    };
  }
};

/**
 * Cancel service booking
 * 
 * @param {string} bookingId - Booking ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise<object>}
 */
export const cancelBooking = async (bookingId, reason = '') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(SERVICE_ENDPOINTS.CANCEL_BOOKING(bookingId), { reason });

    await sleep(800);

    return {
      success: true,
      message: 'Booking cancelled successfully',
    };
  } catch (error) {
    console.error('Cancel booking error:', error);
    return {
      success: false,
      message: error.message || 'Failed to cancel booking',
    };
  }
};

/**
 * Rate and review service
 * 
 * @param {string} bookingId - Booking ID
 * @param {number} rating - Rating (1-5)
 * @param {string} review - Review text
 * @returns {Promise<object>}
 */
export const rateService = async (bookingId, rating, review = '') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(SERVICE_ENDPOINTS.RATE(bookingId), { rating, review });

    await sleep(800);

    return {
      success: true,
      message: 'Thank you for your feedback!',
    };
  } catch (error) {
    console.error('Rate service error:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit rating',
    };
  }
};

export const serviceBookingService = {
  getServices,
  getServiceDetails,
  bookService,
  getMyBookings,
  getBookingHistory,
  cancelBooking,
  rateService,
  SERVICE_CATEGORIES,
  SERVICE_BOOKING_STATUS,
};

export default serviceBookingService;