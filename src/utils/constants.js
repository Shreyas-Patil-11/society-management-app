/**
 * Application Constants
 */

// App Information
export const APP_INFO = {
  NAME: 'Society App',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_DATA: '@user_data',
  USER_ROLE: '@user_role',
  SOCIETY_ID: '@society_id',
  SOCIETY_DATA: '@society_data',
  THEME_MODE: '@theme_mode',
  ONBOARDING_COMPLETE: '@onboarding_complete',
  NOTIFICATION_TOKEN: '@notification_token',
  LANGUAGE: '@language',
  LAST_SYNC: '@last_sync',
  OFFLINE_ENTRIES: '@offline_entries',
};

// User Roles
export const USER_ROLES = {
  RESIDENT: 'resident',
  GUARD: 'guard',
  ADMIN: 'admin',
};

// Visitor Types
export const VISITOR_TYPES = {
  GUEST: 'guest',
  DELIVERY: 'delivery',
  CAB: 'cab',
  SERVICE: 'service',
};

// Entry Status
export const ENTRY_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
};

// Complaint Status
export const COMPLAINT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REOPENED: 'reopened',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  PARTIAL: 'partial',
  FAILED: 'failed',
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Notice Types
export const NOTICE_TYPES = {
  GENERAL: 'general',
  EMERGENCY: 'emergency',
  MAINTENANCE: 'maintenance',
  EVENT: 'event',
  MEETING: 'meeting',
};

// Complaint Categories
export const COMPLAINT_CATEGORIES = [
  { id: 'maintenance', label: 'Maintenance', icon: 'build' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'cleanliness', label: 'Cleanliness', icon: 'cleaning-services' },
  { id: 'parking', label: 'Parking', icon: 'local-parking' },
  { id: 'noise', label: 'Noise', icon: 'volume-up' },
  { id: 'water', label: 'Water Supply', icon: 'water-drop' },
  { id: 'electricity', label: 'Electricity', icon: 'bolt' },
  { id: 'elevator', label: 'Elevator', icon: 'elevator' },
  { id: 'garden', label: 'Garden/Landscaping', icon: 'park' },
  { id: 'other', label: 'Other', icon: 'more-horiz' },
];

// Amenity Types
export const AMENITY_TYPES = [
  { id: 'clubhouse', label: 'Clubhouse', icon: 'home' },
  { id: 'gym', label: 'Gym', icon: 'fitness-center' },
  { id: 'pool', label: 'Swimming Pool', icon: 'pool' },
  { id: 'tennis', label: 'Tennis Court', icon: 'sports-tennis' },
  { id: 'badminton', label: 'Badminton Court', icon: 'sports' },
  { id: 'party_hall', label: 'Party Hall', icon: 'celebration' },
  { id: 'guest_room', label: 'Guest Room', icon: 'bed' },
  { id: 'playground', label: 'Playground', icon: 'child-care' },
];

// Service Types
export const SERVICE_TYPES = [
  { id: 'plumber', label: 'Plumber', icon: 'plumbing' },
  { id: 'electrician', label: 'Electrician', icon: 'electrical-services' },
  { id: 'carpenter', label: 'Carpenter', icon: 'carpenter' },
  { id: 'painter', label: 'Painter', icon: 'format-paint' },
  { id: 'cleaner', label: 'House Cleaning', icon: 'cleaning-services' },
  { id: 'pest_control', label: 'Pest Control', icon: 'pest-control' },
  { id: 'ac_repair', label: 'AC Repair', icon: 'ac-unit' },
  { id: 'appliance', label: 'Appliance Repair', icon: 'kitchen' },
];

// Vehicle Types
export const VEHICLE_TYPES = [
  { id: 'car', label: 'Car', icon: 'directions-car' },
  { id: 'bike', label: 'Bike', icon: 'two-wheeler' },
  { id: 'bicycle', label: 'Bicycle', icon: 'pedal-bike' },
  { id: 'scooter', label: 'Scooter', icon: 'electric-scooter' },
];

// Relationship Types
export const RELATIONSHIP_TYPES = [
  { id: 'spouse', label: 'Spouse' },
  { id: 'parent', label: 'Parent' },
  { id: 'child', label: 'Child' },
  { id: 'sibling', label: 'Sibling' },
  { id: 'relative', label: 'Relative' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'other', label: 'Other' },
];

// Help Types (Domestic Staff)
export const HELP_TYPES = [
  { id: 'maid', label: 'Maid', icon: 'cleaning-services' },
  { id: 'cook', label: 'Cook', icon: 'restaurant' },
  { id: 'driver', label: 'Driver', icon: 'directions-car' },
  { id: 'nanny', label: 'Nanny', icon: 'child-care' },
  { id: 'gardener', label: 'Gardener', icon: 'yard' },
  { id: 'watchman', label: 'Watchman', icon: 'security' },
  { id: 'other', label: 'Other', icon: 'person' },
];

// Delivery Companies
export const DELIVERY_COMPANIES = [
  { id: 'amazon', name: 'Amazon', icon: 'shopping-cart' },
  { id: 'flipkart', name: 'Flipkart', icon: 'shopping-bag' },
  { id: 'swiggy', name: 'Swiggy', icon: 'restaurant' },
  { id: 'zomato', name: 'Zomato', icon: 'fastfood' },
  { id: 'dunzo', name: 'Dunzo', icon: 'delivery-dining' },
  { id: 'bigbasket', name: 'BigBasket', icon: 'shopping-basket' },
  { id: 'delhivery', name: 'Delhivery', icon: 'local-shipping' },
  { id: 'bluedart', name: 'BlueDart', icon: 'local-shipping' },
  { id: 'fedex', name: 'FedEx', icon: 'local-shipping' },
  { id: 'other', name: 'Other', icon: 'inventory' },
];

// Cab Companies
export const CAB_COMPANIES = [
  { id: 'uber', name: 'Uber', icon: 'local-taxi' },
  { id: 'ola', name: 'Ola', icon: 'local-taxi' },
  { id: 'rapido', name: 'Rapido', icon: 'two-wheeler' },
  { id: 'other', name: 'Other', icon: 'directions-car' },
];

// Service Companies
export const SERVICE_COMPANIES = [
  { id: 'urban_company', name: 'Urban Company', icon: 'home-repair-service' },
  { id: 'housejoy', name: 'Housejoy', icon: 'home-repair-service' },
  { id: 'mr_right', name: 'Mr. Right', icon: 'handyman' },
  { id: 'other', name: 'Other', icon: 'engineering' },
];

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  API_REQUEST: 30000,
  OTP_RESEND: 30000,
  SPLASH_SCREEN: 2000,
  TOAST_DURATION: 3000,
  DEBOUNCE: 500,
  ENTRY_RING: 60000, // 1 minute for guard to wait for response
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
};

// Input Limits
export const INPUT_LIMITS = {
  NAME: 50,
  EMAIL: 100,
  PHONE: 10,
  OTP: 6,
  PASSWORD: 50,
  ADDRESS: 200,
  DESCRIPTION: 500,
  COMMENT: 300,
  TITLE: 100,
  VEHICLE_NUMBER: 15,
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  OTP: /^\d{6}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  VEHICLE_NUMBER: /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  DISPLAY_WITH_TIME: 'DD MMM YYYY, hh:mm A',
  TIME_ONLY: 'hh:mm A',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss',
};

// Default Avatar Colors
export const AVATAR_COLORS = [
  '#2563EB', // Blue
  '#16A34A', // Green
  '#DC2626', // Red
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#EC4899', // Pink
  '#F97316', // Orange
];

export default {
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
};