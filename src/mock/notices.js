/**
 * Mock Notices Data
 * 
 * Contains society notices and announcements
 */

// Notice types
export const NOTICE_TYPES = {
  GENERAL: 'general',
  EMERGENCY: 'emergency',
  MAINTENANCE: 'maintenance',
  EVENT: 'event',
  MEETING: 'meeting',
  RULES: 'rules',
};

// Notice priority
export const NOTICE_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const notices = [
  {
    id: 'notice_001',
    societyId: 'society_001',
    type: NOTICE_TYPES.EMERGENCY,
    priority: NOTICE_PRIORITY.URGENT,
    title: 'Water Supply Disruption',
    content: 'Due to maintenance work on the main water line, there will be no water supply tomorrow from 10 AM to 4 PM. Please store sufficient water for your needs. We apologize for the inconvenience.',
    author: 'Society Management',
    authorRole: 'admin',
    attachments: [],
    isRead: false,
    isPinned: true,
    publishedAt: '2024-01-15T08:00:00Z',
    expiresAt: '2024-01-17T00:00:00Z',
    createdAt: '2024-01-15T07:30:00Z',
  },
  {
    id: 'notice_002',
    societyId: 'society_001',
    type: NOTICE_TYPES.EVENT,
    priority: NOTICE_PRIORITY.MEDIUM,
    title: 'Republic Day Celebration',
    content: 'Join us for the Republic Day celebration on 26th January at 8:00 AM in the society garden. Flag hoisting ceremony will be followed by cultural programs and refreshments. All residents are cordially invited.',
    author: 'Cultural Committee',
    authorRole: 'committee',
    attachments: [],
    isRead: false,
    isPinned: true,
    publishedAt: '2024-01-14T10:00:00Z',
    expiresAt: '2024-01-27T00:00:00Z',
    createdAt: '2024-01-14T09:30:00Z',
  },
  {
    id: 'notice_003',
    societyId: 'society_001',
    type: NOTICE_TYPES.MEETING,
    priority: NOTICE_PRIORITY.HIGH,
    title: 'Annual General Meeting',
    content: 'The Annual General Meeting for FY 2023-24 will be held on 28th January 2024 at 5:00 PM in the Clubhouse. Agenda includes annual accounts review, budget approval for next year, and election of new committee members. Attendance is mandatory for all flat owners.',
    author: 'Society Secretary',
    authorRole: 'admin',
    attachments: [
      { name: 'AGM_Agenda.pdf', url: '#', size: '245 KB' },
      { name: 'Annual_Report.pdf', url: '#', size: '1.2 MB' },
    ],
    isRead: true,
    isPinned: false,
    publishedAt: '2024-01-12T14:00:00Z',
    expiresAt: '2024-01-29T00:00:00Z',
    createdAt: '2024-01-12T13:30:00Z',
  },
  {
    id: 'notice_004',
    societyId: 'society_001',
    type: NOTICE_TYPES.MAINTENANCE,
    priority: NOTICE_PRIORITY.MEDIUM,
    title: 'Elevator Maintenance Schedule',
    content: 'Routine maintenance of elevators in Tower A and Tower B will be conducted on 20th January from 9 AM to 1 PM. During this time, one elevator in each tower will remain operational. Please plan your movements accordingly.',
    author: 'Maintenance Team',
    authorRole: 'admin',
    attachments: [],
    isRead: true,
    isPinned: false,
    publishedAt: '2024-01-10T11:00:00Z',
    expiresAt: '2024-01-21T00:00:00Z',
    createdAt: '2024-01-10T10:30:00Z',
  },
  {
    id: 'notice_005',
    societyId: 'society_001',
    type: NOTICE_TYPES.RULES,
    priority: NOTICE_PRIORITY.MEDIUM,
    title: 'Updated Parking Rules',
    content: 'As per the decision in the last committee meeting, new parking rules will be effective from 1st February 2024. Key changes include: 1) No parking in visitor slots for more than 4 hours. 2) Second vehicle parking charges revised to ₹3000/quarter. 3) Electric vehicle charging stations installed in basement 2.',
    author: 'Society Management',
    authorRole: 'admin',
    attachments: [
      { name: 'Parking_Rules_2024.pdf', url: '#', size: '180 KB' },
    ],
    isRead: false,
    isPinned: false,
    publishedAt: '2024-01-08T09:00:00Z',
    expiresAt: null,
    createdAt: '2024-01-08T08:30:00Z',
  },
  {
    id: 'notice_006',
    societyId: 'society_001',
    type: NOTICE_TYPES.GENERAL,
    priority: NOTICE_PRIORITY.LOW,
    title: 'New Gym Equipment Added',
    content: 'We are happy to announce that new gym equipment has been added to the society gym. New additions include: Treadmill (2), Cross Trainer (1), Multi-gym station, and Yoga mats. All residents are welcome to use these facilities.',
    author: 'Amenities Committee',
    authorRole: 'committee',
    attachments: [],
    isRead: true,
    isPinned: false,
    publishedAt: '2024-01-05T15:00:00Z',
    expiresAt: null,
    createdAt: '2024-01-05T14:30:00Z',
  },
  {
    id: 'notice_007',
    societyId: 'society_001',
    type: NOTICE_TYPES.EVENT,
    priority: NOTICE_PRIORITY.LOW,
    title: 'Weekend Cricket Tournament',
    content: 'A friendly cricket tournament is being organized this weekend (20-21 Jan) at the society playground. Teams of 8 players each. Register your team by 18th January. Entry fee: ₹500 per team. Prizes for winners!',
    author: 'Sports Committee',
    authorRole: 'committee',
    attachments: [],
    isRead: false,
    isPinned: false,
    publishedAt: '2024-01-13T12:00:00Z',
    expiresAt: '2024-01-22T00:00:00Z',
    createdAt: '2024-01-13T11:30:00Z',
  },
];

// Get notices by society
export const getNoticesBySociety = (societyId) => {
  return notices.filter(notice => notice.societyId === societyId);
};

// Get pinned notices
export const getPinnedNotices = (societyId) => {
  return notices.filter(notice => notice.societyId === societyId && notice.isPinned);
};

// Get unread notices count
export const getUnreadNoticesCount = (societyId) => {
  return notices.filter(notice => notice.societyId === societyId && !notice.isRead).length;
};

// Get notices by type
export const getNoticesByType = (societyId, type) => {
  return notices.filter(notice => notice.societyId === societyId && notice.type === type);
};

export default {
  notices,
  NOTICE_TYPES,
  NOTICE_PRIORITY,
  getNoticesBySociety,
  getPinnedNotices,
  getUnreadNoticesCount,
  getNoticesByType,
};