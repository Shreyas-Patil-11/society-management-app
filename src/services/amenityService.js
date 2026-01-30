/**
 * Amenity Service
 * 
 * Handles all amenity booking-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { AMENITY_ENDPOINTS } from './api/endpoints';
import {
  amenities,
  amenityBookings,
  bookingHistory,
  getAmenitiesBySociety,
  getBookingsByResident,
  getUpcomingBookings,
  getAvailableSlots,
  BOOKING_STATUS,
  AMENITY_TYPES,
} from '../mock/amenities';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get all amenities
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getAmenities = async (societyId = 'society_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(AMENITY_ENDPOINTS.LIST);

    await sleep(800);

    const data = getAmenitiesBySociety(societyId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get amenities error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get amenities',
      data: [],
    };
  }
};

/**
 * Get amenity details
 * 
 * @param {string} amenityId - Amenity ID
 * @returns {Promise<object>}
 */
export const getAmenityDetails = async (amenityId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(AMENITY_ENDPOINTS.DETAILS(amenityId));

    await sleep(500);

    const amenity = amenities.find(a => a.id === amenityId);

    if (!amenity) {
      return {
        success: false,
        message: 'Amenity not found',
      };
    }

    return {
      success: true,
      data: amenity,
    };
  } catch (error) {
    console.error('Get amenity details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get amenity details',
    };
  }
};

/**
 * Get available time slots for an amenity
 * 
 * @param {string} amenityId - Amenity ID
 * @param {string} date - Date (YYYY-MM-DD)
 * @returns {Promise<object>}
 */
export const getSlots = async (amenityId, date) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(AMENITY_ENDPOINTS.SLOTS(amenityId), { params: { date } });

    await sleep(600);

    const slots = getAvailableSlots(amenityId, date);

    return {
      success: true,
      data: slots,
    };
  } catch (error) {
    console.error('Get slots error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get available slots',
      data: [],
    };
  }
};

/**
 * Book an amenity
 * 
 * @param {object} bookingData - Booking details
 * @returns {Promise<object>}
 */
export const bookAmenity = async (bookingData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(AMENITY_ENDPOINTS.BOOK, bookingData);

    await sleep(1200);

    const amenity = amenities.find(a => a.id === bookingData.amenityId);

    const newBooking = {
      id: `booking_${generateId()}`,
      ...bookingData,
      amenityName: amenity?.name || 'Unknown',
      status: amenity?.requiresApproval ? BOOKING_STATUS.PENDING : BOOKING_STATUS.CONFIRMED,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      confirmedAt: amenity?.requiresApproval ? null : new Date().toISOString(),
    };

    return {
      success: true,
      data: newBooking,
      message: amenity?.requiresApproval 
        ? 'Booking request submitted. Awaiting approval.'
        : 'Booking confirmed successfully',
    };
  } catch (error) {
    console.error('Book amenity error:', error);
    return {
      success: false,
      message: error.message || 'Failed to book amenity',
    };
  }
};

/**
 * Get user's bookings
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getMyBookings = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(AMENITY_ENDPOINTS.BOOKINGS);

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
 * Get upcoming bookings
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getUpcoming = async (residentId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(600);

    const data = getUpcomingBookings(residentId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get upcoming bookings error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get upcoming bookings',
      data: [],
    };
  }
};

/**
 * Cancel booking
 * 
 * @param {string} bookingId - Booking ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise<object>}
 */
export const cancelBooking = async (bookingId, reason = '') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(AMENITY_ENDPOINTS.CANCEL_BOOKING(bookingId), { reason });

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

export const amenityService = {
  getAmenities,
  getAmenityDetails,
  getSlots,
  bookAmenity,
  getMyBookings,
  getUpcoming,
  cancelBooking,
  BOOKING_STATUS,
  AMENITY_TYPES,
};

export default amenityService;