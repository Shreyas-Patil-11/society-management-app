/**
 * Validation Utilities
 */

import { REGEX, INPUT_LIMITS } from './constants';

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return REGEX.EMAIL.test(email.trim());
};

/**
 * Validate Indian phone number
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/\D/g, '');
  return REGEX.PHONE.test(cleanPhone);
};

/**
 * Validate OTP
 * @param {string} otp
 * @returns {boolean}
 */
export const isValidOTP = (otp) => {
  if (!otp || typeof otp !== 'string') return false;
  return REGEX.OTP.test(otp);
};

/**
 * Validate password strength
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return REGEX.PASSWORD.test(password);
};

/**
 * Validate vehicle number (Indian format)
 * @param {string} vehicleNumber
 * @returns {boolean}
 */
export const isValidVehicleNumber = (vehicleNumber) => {
  if (!vehicleNumber || typeof vehicleNumber !== 'string') return false;
  return REGEX.VEHICLE_NUMBER.test(vehicleNumber.toUpperCase().replace(/\s/g, ''));
};

/**
 * Check if string is empty or whitespace only
 * @param {string} value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Check if string has minimum length
 * @param {string} value
 * @param {number} minLength
 * @returns {boolean}
 */
export const hasMinLength = (value, minLength) => {
  if (!value || typeof value !== 'string') return false;
  return value.trim().length >= minLength;
};

/**
 * Check if string has maximum length
 * @param {string} value
 * @param {number} maxLength
 * @returns {boolean}
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value || typeof value !== 'string') return true;
  return value.trim().length <= maxLength;
};

/**
 * Validate name (letters and spaces only)
 * @param {string} name
 * @returns {boolean}
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > INPUT_LIMITS.NAME) return false;
  return /^[a-zA-Z\s]+$/.test(trimmed);
};

/**
 * Validate flat/apartment number
 * @param {string} flatNumber
 * @returns {boolean}
 */
export const isValidFlatNumber = (flatNumber) => {
  if (!flatNumber || typeof flatNumber !== 'string') return false;
  const trimmed = flatNumber.trim();
  return /^[A-Za-z0-9\-\/]+$/.test(trimmed);
};

/**
 * Get validation error message for email
 * @param {string} email
 * @returns {string|null}
 */
export const getEmailError = (email) => {
  if (isEmpty(email)) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return null;
};

/**
 * Get validation error message for phone
 * @param {string} phone
 * @returns {string|null}
 */
export const getPhoneError = (phone) => {
  if (isEmpty(phone)) return 'Phone number is required';
  if (!isValidPhone(phone)) return 'Please enter a valid 10-digit phone number';
  return null;
};

/**
 * Get validation error message for password
 * @param {string} password
 * @returns {string|null}
 */
export const getPasswordError = (password) => {
  if (isEmpty(password)) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  return null;
};

/**
 * Get validation error message for OTP
 * @param {string} otp
 * @returns {string|null}
 */
export const getOTPError = (otp) => {
  if (isEmpty(otp)) return 'OTP is required';
  if (!isValidOTP(otp)) return 'Please enter a valid 6-digit OTP';
  return null;
};

/**
 * Get validation error message for name
 * @param {string} name
 * @param {string} fieldName
 * @returns {string|null}
 */
export const getNameError = (name, fieldName = 'Name') => {
  if (isEmpty(name)) return `${fieldName} is required`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  if (!isValidName(name)) return `${fieldName} should contain only letters and spaces`;
  return null;
};

/**
 * Validate form fields
 * @param {object} fields - Object with field names and values
 * @param {object} rules - Object with field names and validation rules
 * @returns {object} - Object with field names and error messages
 */
export const validateForm = (fields, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = fields[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
};

/**
 * Check if form has any errors
 * @param {object} errors
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).some((key) => errors[key] !== null && errors[key] !== undefined);
};

export const validators = {
  isValidEmail,
  isValidPhone,
  isValidOTP,
  isValidPassword,
  isValidVehicleNumber,
  isEmpty,
  hasMinLength,
  hasMaxLength,
  isValidName,
  isValidFlatNumber,
  getEmailError,
  getPhoneError,
  getPasswordError,
  getOTPError,
  getNameError,
  validateForm,
  hasErrors,
};

export default validators;