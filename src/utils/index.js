/**
 * Utils Index - Central export for all utilities
 */

import storage from './storage';
import validators from './validators';
import formatters from './formatters';
import helpers from './helpers';
import constants from './constants';

// Named exports from storage
export {
  setItem,
  getItem,
  setObject,
  getObject,
  removeItem,
  removeMultiple,
  getMultiple,
  setMultiple,
  clearAll,
  getAllKeys,
  hasKey,
  mergeItem,
} from './storage';

// Named exports from validators
export {
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
} from './validators';

// Named exports from formatters
export {
  formatPhoneNumber,
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  getRelativeTime,
  formatFlatNumber,
  formatAddress,
  truncateText,
  capitalize,
  capitalizeWords,
  getInitials,
  formatNumber,
  formatFileSize,
  formatDuration,
  formatVehicleNumber,
  maskPhoneNumber,
  maskEmail,
} from './formatters';

// Named exports from helpers
export {
  screen,
  isIOS,
  isAndroid,
  platformVersion,
  wp,
  hp,
  normalize,
  generateId,
  getAvatarColor,
  debounce,
  throttle,
  sleep,
  isEmptyObject,
  deepClone,
  groupBy,
  sortBy,
  uniqueArray,
  filterBySearch,
  getStatusColor,
  getStatusLabel,
  isToday,
  isYesterday,
  isPastDate,
  isFutureDate,
  getDaysBetween,
  addDays,
  startOfDay,
  endOfDay,
  isNightTime,
  getGreeting,
  parseQueryString,
  toQueryString,
  pick,
  omit,
  get,
  set,
  isEqual,
  isNumber,
  clamp,
  randomBetween,
  shuffleArray,
  chunkArray,
  flattenArray,
  range,
  getOrdinal,
  hexToRgba,
  adjustColor,
} from './helpers';

// Named exports from constants
export {
  APP_INFO,
  STORAGE_KEYS,
  USER_ROLES,
  VISITOR_TYPES,
  ENTRY_STATUS,
  COMPLAINT_STATUS,
  PAYMENT_STATUS,
  BOOKING_STATUS,
  NOTICE_TYPES,
  COMPLAINT_CATEGORIES,
  AMENITY_TYPES,
  SERVICE_TYPES,
  VEHICLE_TYPES,
  RELATIONSHIP_TYPES,
  HELP_TYPES,
  DELIVERY_COMPANIES,
  CAB_COMPANIES,
  SERVICE_COMPANIES,
  TIMEOUTS,
  PAGINATION,
  INPUT_LIMITS,
  REGEX,
  DATE_FORMATS,
  AVATAR_COLORS,
} from './constants';

// Default exports
export { storage, validators, formatters, helpers, constants };

export default {
  storage,
  validators,
  formatters,
  helpers,
  constants,
};