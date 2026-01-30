/**
 * Navigation Index
 * Central export for all navigation components and utilities
 */

export { default as RootNavigator } from './RootNavigator';
export { default as AuthStack } from './AuthStack';
export { default as ResidentTabs } from './ResidentTabs';
export { default as ResidentStack } from './ResidentStack';
export { default as GuardStack } from './GuardStack';
export { 
  default as linking, 
  navigationStatePersistence, 
  getPathFromState, 
  trackNavigation 
} from './linking';

/**
 * Screen names constants for type-safety
 */
export const SCREENS = {
  // Auth
  AUTH: {
    SPLASH: 'Splash',
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
    OTP_VERIFICATION: 'OTPVerification',
    SELECT_SOCIETY: 'SelectSociety',
  },

  // Resident Tabs
  RESIDENT_TABS: {
    HOME: 'HomeTab',
    VISITORS: 'VisitorsTab',
    PAY: 'PayTab',
    COMMUNITY: 'CommunityTab',
    PROFILE: 'ProfileTab',
  },

  // Resident Screens
  RESIDENT: {
    // Home
    HOME_ALERT: 'HomeAlert',
    ALLOW_GUEST: 'AllowGuest',
    ALLOW_CAB: 'AllowCab',
    ALLOW_DELIVERY: 'AllowDelivery',
    ALLOW_SERVICEMAN: 'AllowServiceman',
    GATEPASS: 'Gatepass',
    ENTRY_CALL: 'EntryCall',

    // HelpDesk
    HELP_DESK: 'HelpDesk',
    RAISE_COMPLAINT: 'RaiseComplaint',
    COMPLAINT_INFO: 'ComplaintInfo',

    // Notices
    NOTICE_BOARD: 'NoticeBoard',

    // Payments
    PAYMENT_METHODS: 'PaymentMethods',
    PAYMENT_RECEIPT: 'PaymentReceipt',

    // Amenities
    BOOKED_AMENITIES: 'BookedAmenities',
    SELECT_AMENITY: 'SelectAmenity',
    AMENITIES_PAYMENT: 'AmenitiesPayment',

    // Community
    POSTS: 'Posts',
    CREATE_POST: 'CreatePost',
    CHAT: 'Chat',
    RESIDENTS: 'Residents',
    CHATTING: 'Chatting',

    // Services
    SERVICES: 'Services',
    BOOK_SERVICE: 'BookService',
    MY_BOOKINGS: 'MyBookings',

    // Profile
    MY_POSTS: 'MyPosts',
    HOUSEHOLD: 'Household',
    ADD_FAMILY: 'AddFamily',
    ADD_HELPS: 'AddHelps',
    ADD_VEHICLE: 'AddVehicle',
    ADD_ENTRIES: 'AddEntries',
    NOTIFICATIONS: 'Notifications',
    SETTINGS: 'Settings',
    SUPPORT: 'Support',
    TERMS_CONDITIONS: 'TermsConditions',
  },

  // Guard Screens
  GUARD: {
    SPLASH: 'GuardSplash',
    SECURITY_LOGIN: 'SecurityLogin',
    HOME: 'GuardHome',
    PRE_APPROVE_ENTRY: 'PreApproveEntry',
    GUEST_ENTRY: 'GuestEntry',
    SELECT_BUILDING: 'SelectBuilding',
    SELECT_FLAT: 'SelectFlat',
    CONFIRM_SELECTION: 'ConfirmSelection',
    RINGING: 'Ringing',
    ALLOWED: 'Allowed',
    DECLINED: 'Declined',
    NOT_RESPONDED: 'NotResponded',
    DELIVERY_ENTRY: 'DeliveryEntry',
    DELIVERY_COMPANY: 'DeliveryCompany',
    SERVICEMAN_ENTRY: 'ServicemanEntry',
    SERVICE_COMPANY: 'ServiceCompany',
    CAB_ENTRY: 'CabEntry',
    CAB_COMPANY: 'CabCompany',
    VISITORS: 'GuardVisitors',
    WAITING: 'Waiting',
    SETTINGS: 'GuardSettings',
    NEW_MESSAGE_POPUP: 'NewMessagePopup',
    RECENT_MESSAGES: 'RecentMessages',
    SUPPORT: 'GuardSupport',
  },
};

/**
 * Navigation helper functions
 */
export const navigationHelpers = {
  /**
   * Navigate to a screen with params
   * @param {object} navigation - Navigation object
   * @param {string} screenName - Screen name
   * @param {object} params - Screen params
   */
  navigateTo: (navigation, screenName, params = {}) => {
    navigation.navigate(screenName, params);
  },

  /**
   * Replace current screen
   * @param {object} navigation - Navigation object
   * @param {string} screenName - Screen name
   * @param {object} params - Screen params
   */
  replaceTo: (navigation, screenName, params = {}) => {
    navigation.replace(screenName, params);
  },

  /**
   * Go back
   * @param {object} navigation - Navigation object
   */
  goBack: (navigation) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  },

  /**
   * Reset to a screen (clear stack)
   * @param {object} navigation - Navigation object
   * @param {string} screenName - Screen name
   * @param {object} params - Screen params
   */
  resetTo: (navigation, screenName, params = {}) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  },

  /**
   * Navigate to tab
   * @param {object} navigation - Navigation object
   * @param {string} tabName - Tab name
   */
  navigateToTab: (navigation, tabName) => {
    navigation.navigate('ResidentTabs', {
      screen: tabName,
    });
  },
};