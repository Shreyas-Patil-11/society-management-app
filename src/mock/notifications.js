/**
 * Mock Notifications Data
 * 
 * Contains user notifications
 */

// Notification types
export const NOTIFICATION_TYPES = {
  VISITOR: 'visitor',
  PAYMENT: 'payment',
  NOTICE: 'notice',
  COMPLAINT: 'complaint',
  AMENITY: 'amenity',
  SERVICE: 'service',
  COMMUNITY: 'community',
  SECURITY: 'security',
  SYSTEM: 'system',
};

export const notifications = [
  {
    id: 'notif_001',
    type: NOTIFICATION_TYPES.VISITOR,
    title: 'Visitor at Gate',
    body: 'Rajesh Kumar is waiting at the main gate',
    data: {
      visitorId: 'gentry_001',
      visitorName: 'Rajesh Kumar',
    },
    icon: 'person',
    color: '#8B5CF6',
    isRead: false,
    createdAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 'notif_002',
    type: NOTIFICATION_TYPES.PAYMENT,
    title: 'Payment Due Reminder',
    body: 'Your maintenance payment of ₹5,500 is due on 31st January',
    data: {
      billId: 'bill_001',
      amount: 5500,
    },
    icon: 'payment',
    color: '#F59E0B',
    isRead: false,
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'notif_003',
    type: NOTIFICATION_TYPES.NOTICE,
    title: 'New Society Notice',
    body: 'Water Supply Disruption tomorrow from 10 AM to 4 PM',
    data: {
      noticeId: 'notice_001',
    },
    icon: 'campaign',
    color: '#DC2626',
    isRead: true,
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: 'notif_004',
    type: NOTIFICATION_TYPES.COMPLAINT,
    title: 'Complaint Update',
    body: 'Your complaint about water pressure has been assigned to maintenance team',
    data: {
      complaintId: 'complaint_001',
    },
    icon: 'support-agent',
    color: '#3B82F6',
    isRead: true,
    createdAt: '2024-01-14T11:00:00Z',
  },
  {
    id: 'notif_005',
    type: NOTIFICATION_TYPES.AMENITY,
    title: 'Booking Confirmed',
    body: 'Your clubhouse booking for 20th January is confirmed',
    data: {
      bookingId: 'booking_001',
    },
    icon: 'event-available',
    color: '#16A34A',
    isRead: true,
    createdAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 'notif_006',
    type: NOTIFICATION_TYPES.COMMUNITY,
    title: 'New Comment',
    body: 'Priya Patel commented on your post',
    data: {
      postId: 'post_001',
      commentId: 'pcomment_001',
    },
    icon: 'comment',
    color: '#0EA5E9',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'notif_007',
    type: NOTIFICATION_TYPES.SERVICE,
    title: 'Service Booking Confirmed',
    body: 'Plumber visit scheduled for 17th January, 10 AM - 12 PM',
    data: {
      bookingId: 'sbooking_001',
    },
    icon: 'build',
    color: '#8B5CF6',
    isRead: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'notif_008',
    type: NOTIFICATION_TYPES.VISITOR,
    title: 'Delivery Completed',
    body: 'Amazon delivery has been completed',
    data: {
      visitorId: 'visitor_002',
    },
    icon: 'check-circle',
    color: '#16A34A',
    isRead: true,
    createdAt: '2024-01-15T09:15:00Z',
  },
  {
    id: 'notif_009',
    type: NOTIFICATION_TYPES.SECURITY,
    title: 'Maid Entry',
    body: 'Sunita Devi checked in at 8:05 AM',
    data: {
      helpId: 'help_001',
    },
    icon: 'login',
    color: '#6B7280',
    isRead: true,
    createdAt: '2024-01-15T08:05:00Z',
  },
  {
    id: 'notif_010',
    type: NOTIFICATION_TYPES.PAYMENT,
    title: 'Payment Overdue',
    body: 'Parking charges of ₹3,150 are overdue. Please pay immediately.',
    data: {
      billId: 'bill_003',
      amount: 3150,
    },
    icon: 'warning',
    color: '#DC2626',
    isRead: false,
    createdAt: '2024-01-16T00:00:00Z',
  },
];

// Get notifications for user
export const getNotifications = () => {
  return notifications.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
};

// Get unread notifications
export const getUnreadNotifications = () => {
  return notifications.filter(n => !n.isRead);
};

// Get unread count
export const getUnreadCount = () => {
  return notifications.filter(n => !n.isRead).length;
};

// Get notifications by type
export const getNotificationsByType = (type) => {
  return notifications.filter(n => n.type === type);
};

export default {
  notifications,
  NOTIFICATION_TYPES,
  getNotifications,
  getUnreadNotifications,
  getUnreadCount,
  getNotificationsByType,
};