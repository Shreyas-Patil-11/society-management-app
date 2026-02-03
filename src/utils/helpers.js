
/**
 * Helper Utilities
 * src/utils/helpers.js
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';
import { AVATAR_COLORS } from './constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Get screen dimensions
 */
export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: SCREEN_WIDTH < 375,
  isMedium: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLarge: SCREEN_WIDTH >= 414,
};

/**
 * Check platform
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

/**
 * Get platform version
 */
export const platformVersion = Platform.Version;

/**
 * Responsive width based on design (375px base)
 * @param {number} width
 * @returns {number}
 */
export const wp = (width) => {
  const baseWidth = 375;
  return (width / baseWidth) * SCREEN_WIDTH;
};

/**
 * Responsive height based on design (812px base)
 * @param {number} height
 * @returns {number}
 */
export const hp = (height) => {
  const baseHeight = 812;
  return (height / baseHeight) * SCREEN_HEIGHT;
};

/**
 * Normalize size based on screen density
 * @param {number} size
 * @returns {number}
 */
export const normalize = (size) => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Generate unique ID
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate random color from avatar colors
 * @param {string} seed - Optional seed for consistent color
 * @returns {string}
 */
export const getAvatarColor = (seed) => {
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  }
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Throttle function
 * @param {Function} func
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Sleep/delay function
 * @param {number} ms
 * @returns {Promise}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if object is empty
 * @param {object} obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Deep clone object
 * @param {object} obj
 * @returns {object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Group array by key
 * @param {Array} array
 * @param {string} key
 * @returns {object}
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 * @param {Array} array
 * @param {string} key
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array}
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Remove duplicates from array
 * @param {Array} array
 * @param {string} key - Optional key for objects
 * @returns {Array}
 */
export const uniqueArray = (array, key) => {
  if (key) {
    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }
  return [...new Set(array)];
};

/**
 * Filter array by search query
 * @param {Array} array
 * @param {string} query
 * @param {string[]} keys - Keys to search in
 * @returns {Array}
 */
export const filterBySearch = (array, query, keys) => {
  if (!query || !query.trim()) return array;
  
  const searchQuery = query.toLowerCase().trim();
  
  return array.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery);
      }
      return false;
    });
  });
};

/**
 * Get status color
 * Updated to include Pre-Approved, Guest, Inside, etc.
 * @param {string} status
 * @returns {string}
 */
export const getStatusColor = (status) => {
  const statusColors = {
    // General
    pending: '#F59E0B',      // Orange
    approved: '#16A34A',     // Green
    rejected: '#DC2626',     // Red
    denied: '#DC2626',       // Red (Alias)
    in_progress: '#3B82F6',  // Blue
    completed: '#16A34A',    // Green
    cancelled: '#6B7280',    // Gray
    
    // Financial / Bills
    open: '#F59E0B',         // Orange
    closed: '#6B7280',       // Gray
    paid: '#16A34A',         // Green
    overdue: '#DC2626',      // Red
    partial: '#8B5CF6',      // Purple
    
    // Visitor / Gate
    pre_approved: '#4F46E5', // Indigo (Distinct Blue for Pre-Booked)
    expected: '#4F46E5',     // Indigo (Alias)
    guest: '#8B5CF6',        // Purple
    inside: '#10B981',       // Emerald Green (Active/Inside)
    left: '#9CA3AF',         // Gray (Exited)
    checked_in: '#10B981',   // Emerald Green
    checked_out: '#9CA3AF',  // Gray
  };
  
  return statusColors[status?.toLowerCase()] || '#6B7280';
};

/**
 * Get status label
 * Formats the status string into readable text
 * @param {string} status
 * @returns {string}
 */
export const getStatusLabel = (status) => {
  const statusLabels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    denied: 'Denied',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    open: 'Open',
    closed: 'Closed',
    paid: 'Paid',
    overdue: 'Overdue',
    partial: 'Partial',
    
    // Visitor Labels
    pre_approved: 'Pre-Approved',
    expected: 'Expected',
    guest: 'Guest',
    inside: 'Inside',
    left: 'Left',
    checked_in: 'Checked In',
    checked_out: 'Checked Out',
  };
  
  return statusLabels[status?.toLowerCase()] || status;
};

/**
 * Check if date is today
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isYesterday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check if date is in the past
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isPastDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return dateObj < now;
};

/**
 * Check if date is in the future
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isFutureDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return dateObj > now;
};

/**
 * Get days between two dates
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {number}
 */
export const getDaysBetween = (date1, date2) => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Add days to date
 * @param {Date|string} date
 * @param {number} days
 * @returns {Date}
 */
export const addDays = (date, days) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Get start of day
 * @param {Date|string} date
 * @returns {Date}
 */
export const startOfDay = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
};

/**
 * Get end of day
 * @param {Date|string} date
 * @returns {Date}
 */
export const endOfDay = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
};

/**
 * Check if it's night time (for guard night mode)
 * @returns {boolean}
 */
export const isNightTime = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6; // 7 PM to 6 AM
};

/**
 * Get greeting based on time of day
 * @returns {string}
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Parse query string to object
 * @param {string} queryString
 * @returns {object}
 */
export const parseQueryString = (queryString) => {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  
  return query;
};

/**
 * Object to query string
 * @param {object} obj
 * @returns {string}
 */
export const toQueryString = (obj) => {
  return Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};

/**
 * Pick specific keys from object
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**
 * Omit specific keys from object
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

/**
 * Safely get nested object value
 * @param {object} obj
 * @param {string} path - Dot notation path
 * @param {any} defaultValue
 * @returns {any}
 */
export const get = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
};

/**
 * Safely set nested object value
 * @param {object} obj
 * @param {string} path - Dot notation path
 * @param {any} value
 * @returns {object}
 */
export const set = (obj, path, value) => {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] ? { ...current[key] } : {};
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
};

/**
 * Compare two objects for equality
 * @param {object} obj1
 * @param {object} obj2
 * @returns {boolean}
 */
export const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Check if value is a valid number
 * @param {any} value
 * @returns {boolean}
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Clamp number between min and max
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Generate random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Shuffle array
 * @param {Array} array
 * @returns {Array}
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Chunk array into smaller arrays
 * @param {Array} array
 * @param {number} size
 * @returns {Array}
 */
export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Flatten nested array
 * @param {Array} array
 * @param {number} depth
 * @returns {Array}
 */
export const flattenArray = (array, depth = 1) => {
  return array.flat(depth);
};

/**
 * Create array of numbers
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {Array}
 */
export const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

/**
 * Get ordinal suffix for number (1st, 2nd, 3rd, etc.)
 * @param {number} num
 * @returns {string}
 */
export const getOrdinal = (num) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
};

/**
 * Convert hex color to rgba
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */
export const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Lighten or darken a color
 * @param {string} hex
 * @param {number} percent - Positive to lighten, negative to darken
 * @returns {string}
 */
export const adjustColor = (hex, percent) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const helpers = {
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
};

export default helpers;