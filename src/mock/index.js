/**
 * Mock Data Index
 * Central export for all mock data
 */

// Users
export {
  residents,
  guards,
  currentResident,
  currentGuard,
  getUserById,
  getResidentByFlat,
} from './users';

// Societies
export {
  societies,
  currentSociety,
  getSocietyById,
  searchSocieties,
} from './societies';

// Buildings
export {
  buildings,
  flats,
  getBuildingById,
  getBuildingsBySociety,
  getFlatsByBuilding,
  getFlatByNumber,
  getFloorsByBuilding,
  getFlatsByFloor,
} from './buildings';

// Visitors
export {
  visitors,
  visitorHistory,
  preApprovedEntries,
  frequentVisitors,
  VISITOR_TYPES,
  ENTRY_STATUS,
  getVisitorsByResident,
  getVisitorHistoryByResident,
  getPreApprovedByResident,
  getPendingVisitors,
  getCheckedInVisitors,
} from './visitors';

// Bills & Payments
export {
  bills,
  paymentHistory,
  paymentMethods,
  paymentSummary,
  PAYMENT_STATUS,
  BILL_TYPES,
  getBillsByResident,
  getPendingBills,
  getPaymentHistoryByResident,
  getPaymentMethodsByResident,
} from './bills';

// Notices
export {
  notices,
  NOTICE_TYPES,
  NOTICE_PRIORITY,
  getNoticesBySociety,
  getPinnedNotices,
  getUnreadNoticesCount,
  getNoticesByType,
} from './notices';

// Complaints
export {
  complaints,
  complaintComments,
  COMPLAINT_STATUS,
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITY,
  getComplaintsByResident,
  getComplaintsByStatus,
  getOpenComplaintsCount,
  getCommentsByComplaint,
} from './complaints';

// Amenities
export {
  amenities,
  amenityBookings,
  bookingHistory as amenityBookingHistory,
  BOOKING_STATUS,
  AMENITY_TYPES,
  getAmenitiesBySociety,
  getBookingsByResident as getAmenityBookingsByResident,
  getUpcomingBookings,
  getAvailableSlots,
} from './amenities';

// Posts
export {
  posts,
  postComments,
  POST_TYPES,
  getAllPosts,
  getPostsByType,
  getPostsByAuthor,
  getCommentsByPost,
  getLikedPosts,
} from './posts';

// Chats
export {
  conversations,
  messages,
  MESSAGE_STATUS,
  getConversationsByUser,
  getMessagesByConversation,
  getTotalUnreadCount,
  getConversationById,
  findConversation,
} from './chats';

// Services
export {
  services,
  serviceBookings,
  serviceHistory,
  SERVICE_CATEGORIES,
  SERVICE_BOOKING_STATUS,
  getAllServices,
  getServicesByCategory,
  getServiceById,
  getBookingsByResident as getServiceBookingsByResident,
  getServiceHistoryByResident,
} from './services';

// Household
export {
  familyMembers,
  domesticHelp,
  vehicles,
  entryLogs,
  getFamilyByResident,
  getHelpByResident,
  getVehiclesByResident,
  getEntryLogsByResident,
  getEntryLogsByHelp,
} from './household';

// Guard Entries
export {
  gateEntries,
  preApprovedList,
  waitingList,
  todayEntryLog,
  guardMessages,
  ENTRY_TYPES,
  GUARD_ENTRY_STATUS,
  getCurrentGateEntries,
  getTodayPreApproved,
  getWaitingVisitors,
  getCheckedInVisitors as getGuardCheckedInVisitors,
  getUnreadMessagesCount,
  checkPreApproval,
} from './guardEntries';

// Companies
export {
  deliveryCompanies,
  cabCompanies,
  serviceCompanies,
  getPopularDeliveryCompanies,
  getPopularCabCompanies,
  getPopularServiceCompanies,
  searchDeliveryCompanies,
  searchCabCompanies,
  searchServiceCompanies,
} from './deliveryCompanies';

// Notifications
export {
  notifications,
  NOTIFICATION_TYPES,
  getNotifications,
  getUnreadNotifications,
  getUnreadCount,
  getNotificationsByType,
} from './notifications';

// Default export with all mock data modules
export default {
  users: require('./users'),
  societies: require('./societies'),
  buildings: require('./buildings'),
  visitors: require('./visitors'),
  bills: require('./bills'),
  notices: require('./notices'),
  complaints: require('./complaints'),
  amenities: require('./amenities'),
  posts: require('./posts'),
  chats: require('./chats'),
  services: require('./services'),
  household: require('./household'),
  guardEntries: require('./guardEntries'),
  companies: require('./deliveryCompanies'),
  notifications: require('./notifications'),
};