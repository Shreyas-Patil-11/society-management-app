/**
 * Services Index
 * Central export for all services
 */

// API
export { apiClient, get, post, put, patch, del, uploadFile } from './api';
export { default as endpoints } from './api/endpoints';

// Auth
export { authService } from './authService';
export {
  loginWithEmail,
  sendOTP,
  verifyOTP,
  register,
  logout,
  refreshToken,
  forgotPassword,
  changePassword,
  getProfile,
  updateProfile,
} from './authService';

// Visitor
export { visitorService } from './visitorService';
export {
  getCurrentVisitors,
  getVisitorHistory,
  getPreApprovedEntries,
  preApproveVisitor,
  allowVisitor,
  rejectVisitor,
  cancelGatepass,
  getFrequentVisitors,
  quickAllow,
} from './visitorService';

// Payment
export { paymentService } from './paymentService';
export {
  getBills,
  getPendingBillsList,
  getBillDetails,
  getPaymentSummary,
  getPaymentHistoryList,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  makePayment,
  getReceipt,
} from './paymentService';

// Complaint
export { complaintService } from './complaintService';
export {
  getComplaints,
  getComplaintDetails,
  createComplaint,
  addComment as addComplaintComment,
  closeComplaint,
  reopenComplaint,
} from './complaintService';

// Notice
export { noticeService } from './noticeService';
export {
  getNotices,
  getNoticeDetails,
  markAsRead as markNoticeAsRead,
} from './noticeService';

// Amenity
export { amenityService } from './amenityService';
export {
  getAmenities,
  getAmenityDetails,
  getSlots,
  bookAmenity,
  getUpcoming as getUpcomingBookings,
  cancelBooking as cancelAmenityBooking,
} from './amenityService';

// Community
export { communityService } from './communityService';
export {
  getPosts,
  getPostDetails,
  createPost,
  toggleLike,
  addComment as addPostComment,
  deletePost,
  getMyPosts,
  getResidents,
  getResidentDetails,
} from './communityService';

// Chat
export { chatService } from './chatService';
export {
  getConversations,
  getConversationDetails,
  getMessages,
  sendMessage,
  markAsRead as markChatAsRead,
  createConversation,
} from './chatService';

// Service Booking
export { serviceBookingService } from './serviceBookingService';
export {
  getServices,
  getServiceDetails,
  bookService,
  getBookingHistory,
  cancelBooking as cancelServiceBooking,
  rateService,
} from './serviceBookingService';

// Household
export { householdService } from './householdService';
export {
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  removeFamilyMember,
  getDomesticHelp,
  addDomesticHelp,
  updateDomesticHelp,
  removeDomesticHelp,
  getVehicles,
  addVehicle,
  updateVehicle,
  removeVehicle,
  getEntryLogs,
} from './householdService';

// Guard
export { guardService } from './guardService';
export {
  getGateEntries,
  getWaitingList,
  getTodayLog,
  createEntry,
  callResident,
  checkInVisitor,
  checkOutVisitor,
  markNotResponded,
  triggerEmergency,
} from './guardService';

// Notification
export { notificationService } from './notificationService';
export {
  getNotifications,
  getUnread,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  registerToken,
} from './notificationService';

// Society
export { societyService } from './societyService';
export {
  getSocieties,
  searchSocieties,
  getSocietyDetails,
  joinSociety,
} from './societyService';

// Default export with all services
export default {
  auth: require('./authService').authService,
  visitor: require('./visitorService').visitorService,
  payment: require('./paymentService').paymentService,
  complaint: require('./complaintService').complaintService,
  notice: require('./noticeService').noticeService,
  amenity: require('./amenityService').amenityService,
  community: require('./communityService').communityService,
  chat: require('./chatService').chatService,
  serviceBooking: require('./serviceBookingService').serviceBookingService,
  household: require('./householdService').householdService,
  guard: require('./guardService').guardService,
  notification: require('./notificationService').notificationService,
  society: require('./societyService').societyService,
};