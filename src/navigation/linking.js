/**
 * Navigation Linking Configuration
 * 
 * Deep linking and URL configuration for the app
 * Used for handling notifications, external links, etc.
 */

import { Linking } from 'react-native';

/**
 * Linking configuration
 */
const linking = {
  prefixes: [
    'societyapp://',
    'https://societyapp.com',
    'https://www.societyapp.com',
  ],

  config: {
    screens: {
      // Auth Stack
      Auth: {
        screens: {
          Splash: 'splash',
          SignIn: 'login',
          SignUp: 'register',
          OTPVerification: 'verify-otp',
          SelectSociety: 'select-society',
        },
      },

      // Resident Stack
      Resident: {
        screens: {
          ResidentTabs: {
            screens: {
              HomeTab: 'home',
              VisitorsTab: 'visitors',
              PayTab: 'payments',
              CommunityTab: 'community',
              ProfileTab: 'profile',
            },
          },

          // Home screens
          HomeAlert: 'home/alert/:visitorId',
          AllowGuest: 'home/allow-guest',
          AllowCab: 'home/allow-cab',
          AllowDelivery: 'home/allow-delivery',
          AllowServiceman: 'home/allow-serviceman',
          Gatepass: 'home/gatepass',
          EntryCall: 'home/entry-call/:entryId',

          // HelpDesk
          HelpDesk: 'helpdesk',
          RaiseComplaint: 'helpdesk/raise',
          ComplaintInfo: 'helpdesk/complaint/:complaintId',

          // Notices
          NoticeBoard: 'notices',

          // Payments
          PaymentMethods: 'payments/methods',
          PaymentReceipt: 'payments/receipt/:paymentId',

          // Amenities
          BookedAmenities: 'amenities/booked',
          SelectAmenity: 'amenities/select',
          AmenitiesPayment: 'amenities/payment/:bookingId',

          // Community
          Posts: 'community/posts',
          CreatePost: 'community/posts/create',
          Chat: 'community/chat',
          Residents: 'community/residents',
          Chatting: 'community/chat/:conversationId',

          // Services
          Services: 'services',
          BookService: 'services/book/:serviceId',
          MyBookings: 'services/bookings',

          // Profile
          MyPosts: 'profile/posts',
          Household: 'profile/household',
          AddFamily: 'profile/household/add-family',
          AddHelps: 'profile/household/add-helps',
          AddVehicle: 'profile/household/add-vehicle',
          AddEntries: 'profile/household/entries',
          Notifications: 'notifications',
          Settings: 'settings',
          Support: 'support',
          TermsConditions: 'terms',
        },
      },

      // Guard Stack
      Guard: {
        screens: {
          GuardSplash: 'guard/splash',
          SecurityLogin: 'guard/login',
          GuardHome: 'guard/home',
          PreApproveEntry: 'guard/pre-approve',
          GuestEntry: 'guard/entry/guest',
          DeliveryEntry: 'guard/entry/delivery',
          DeliveryCompany: 'guard/entry/delivery/company',
          ServicemanEntry: 'guard/entry/serviceman',
          ServiceCompany: 'guard/entry/serviceman/company',
          CabEntry: 'guard/entry/cab',
          CabCompany: 'guard/entry/cab/company',
          SelectBuilding: 'guard/select-building',
          SelectFlat: 'guard/select-flat/:buildingId',
          ConfirmSelection: 'guard/confirm',
          Ringing: 'guard/ringing/:entryId',
          Allowed: 'guard/allowed/:entryId',
          Declined: 'guard/declined/:entryId',
          NotResponded: 'guard/not-responded/:entryId',
          GuardVisitors: 'guard/visitors',
          Waiting: 'guard/waiting',
          GuardSettings: 'guard/settings',
          GuardSupport: 'guard/support',
          NewMessagePopup: 'guard/message/:messageId',
          RecentMessages: 'guard/messages',
        },
      },
    },
  },

  /**
   * Custom function to get the initial URL
   */
  async getInitialURL() {
    // First, check if the app was opened via a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // If not, check for notification data
    // TODO: Handle notification deep links here
    // const notification = await getInitialNotification();
    // if (notification?.data?.url) {
    //   return notification.data.url;
    // }

    return null;
  },

  /**
   * Custom function to subscribe to incoming links
   */
  subscribe(listener) {
    // Listen for incoming links
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    // TODO: Listen for notification opens
    // const notificationSubscription = onNotificationOpen(notification => {
    //   if (notification?.data?.url) {
    //     listener(notification.data.url);
    //   }
    // });

    return () => {
      linkingSubscription.remove();
      // notificationSubscription.remove();
    };
  },
};

/**
 * Navigation state persistence config
 */
export const navigationStatePersistence = {
  /**
   * Whether to persist navigation state
   * Disable in production for security
   */
  enabled: __DEV__,

  /**
   * Storage key for navigation state
   */
  storageKey: '@navigation_state',
};

/**
 * Get path from state
 * Useful for analytics and logging
 */
export const getPathFromState = (state) => {
  if (!state || !state.routes) {
    return '/';
  }

  const route = state.routes[state.index];

  if (route.state) {
    return getPathFromState(route.state);
  }

  return `/${route.name}${route.params ? `?${JSON.stringify(route.params)}` : ''}`;
};

/**
 * Navigation analytics helper
 */
export const trackNavigation = (state) => {
  const path = getPathFromState(state);
  
  // TODO: Track with analytics service
  if (__DEV__) {
    console.log('[Navigation]', path);
  }
};

export default linking;