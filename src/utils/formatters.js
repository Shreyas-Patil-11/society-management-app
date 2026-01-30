/**
 * Formatting Utilities
 */

/**
 * Format phone number with country code
 * @param {string} phone
 * @param {string} countryCode
 * @returns {string}
 */
export const formatPhoneNumber = (phone, countryCode = '+91') => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${countryCode} ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

/**
 * Format currency (Indian Rupees)
 * @param {number} amount
 * @param {boolean} showSymbol
 * @returns {string}
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (amount === null || amount === undefined) return '';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

/**
 * Format date to display format
 * @param {Date|string} date
 * @param {object} options
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  };
  
  return dateObj.toLocaleDateString('en-IN', defaultOptions);
};

/**
 * Format time
 * @param {Date|string} date
 * @param {boolean} use12Hour
 * @returns {string}
 */
export const formatTime = (date, use12Hour = true) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: use12Hour,
  });
};

/**
 * Format date and time
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return `${formatDate(date)}, ${formatTime(date)}`;
};

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 * @param {Date|string} date
 * @returns {string}
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  
  return formatDate(dateObj);
};

/**
 * Format flat/unit number
 * @param {string} building
 * @param {string} flat
 * @returns {string}
 */
export const formatFlatNumber = (building, flat) => {
  if (!building && !flat) return '';
  if (!building) return flat;
  if (!flat) return building;
  return `${building}-${flat}`;
};

/**
 * Format address
 * @param {object} address
 * @returns {string}
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.flat,
    address.building,
    address.society,
    address.street,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

/**
 * Capitalize first letter
 * @param {string} text
 * @returns {string}
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitalize each word
 * @param {string} text
 * @returns {string}
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Get initials from name
 * @param {string} name
 * @param {number} maxInitials
 * @returns {string}
 */
export const getInitials = (name, maxInitials = 2) => {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
  
  return initials;
};

/**
 * Format number with suffix (K, M, B)
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '';
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return num.toString();
};

/**
 * Format file size
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format duration in minutes to human readable
 * @param {number} minutes
 * @returns {string}
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes < 1) return '0 min';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
};

/**
 * Format vehicle number
 * @param {string} vehicleNumber
 * @returns {string}
 */
export const formatVehicleNumber = (vehicleNumber) => {
  if (!vehicleNumber) return '';
  
  const cleaned = vehicleNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  // Format: XX 00 XX 0000
  if (cleaned.length >= 9) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
  }
  
  return cleaned;
};

/**
 * Mask phone number (show last 4 digits)
 * @param {string} phone
 * @returns {string}
 */
export const maskPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 4) return phone;
  return `XXXXXX${cleaned.slice(-4)}`;
};

/**
 * Mask email
 * @param {string} email
 * @returns {string}
 */
export const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedLocal =
    local.length <= 2
      ? local
      : `${local.charAt(0)}${'*'.repeat(local.length - 2)}${local.charAt(local.length - 1)}`;
  
  return `${maskedLocal}@${domain}`;
};

export const formatters = {
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
};

export default formatters;