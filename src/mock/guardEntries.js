/**
 * Mock Guard Entries Data
 * 
 * Contains entry data for guard app - visitors at gate, waiting list, etc.
 */

// Entry types
export const ENTRY_TYPES = {
  GUEST: 'guest',
  DELIVERY: 'delivery',
  CAB: 'cab',
  SERVICE: 'service',
  STAFF: 'staff',
};

// Entry status
export const GUARD_ENTRY_STATUS = {
  WAITING: 'waiting',
  CALLING: 'calling',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  NOT_RESPONDED: 'not_responded',
  EXPIRED: 'expired',
};

// Current entries at gate (for guard)
export const gateEntries = [
  {
    id: 'gentry_001',
    type: ENTRY_TYPES.GUEST,
    visitorName: 'Rajesh Kumar',
    visitorPhone: '9898989898',
    vehicleNumber: 'DL 01 AB 1234',
    vehicleType: 'car',
    purpose: 'Family Visit',
    photo: null,
    targetFlat: 'A-101',
    targetBuilding: 'Tower A',
    targetResident: 'Amit Sharma',
    targetPhone: '9876543210',
    status: GUARD_ENTRY_STATUS.WAITING,
    preApproved: false,
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T11:00:00Z',
    callStartedAt: null,
    respondedAt: null,
  },
  {
    id: 'gentry_002',
    type: ENTRY_TYPES.DELIVERY,
    visitorName: 'Delivery Boy',
    visitorPhone: '9797979797',
    vehicleNumber: 'DL 02 CD 5678',
    vehicleType: 'bike',
    purpose: 'Amazon Delivery',
    company: 'Amazon',
    photo: null,
    targetFlat: 'B-205',
    targetBuilding: 'Tower B',
    targetResident: 'Priya Patel',
    targetPhone: '9876543211',
    status: GUARD_ENTRY_STATUS.CALLING,
    preApproved: false,
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T11:05:00Z',
    callStartedAt: '2024-01-15T11:06:00Z',
    respondedAt: null,
  },
  {
    id: 'gentry_003',
    type: ENTRY_TYPES.CAB,
    visitorName: 'Driver',
    visitorPhone: '9696969696',
    vehicleNumber: 'DL 10 XY 1234',
    vehicleType: 'car',
    purpose: 'Uber Pickup',
    company: 'Uber',
    photo: null,
    targetFlat: 'C-401',
    targetBuilding: 'Tower C',
    targetResident: 'Sneha Gupta',
    targetPhone: '9876543213',
    status: GUARD_ENTRY_STATUS.APPROVED,
    preApproved: false,
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T10:50:00Z',
    callStartedAt: '2024-01-15T10:51:00Z',
    respondedAt: '2024-01-15T10:52:00Z',
    approvedBy: 'resident_004',
  },
  {
    id: 'gentry_004',
    type: ENTRY_TYPES.SERVICE,
    visitorName: 'Ravi Kumar',
    visitorPhone: '9595959595',
    vehicleNumber: null,
    vehicleType: null,
    purpose: 'Plumbing Work',
    company: 'Urban Company',
    photo: null,
    targetFlat: 'A-302',
    targetBuilding: 'Tower A',
    targetResident: 'Rahul Verma',
    targetPhone: '9876543212',
    status: GUARD_ENTRY_STATUS.CHECKED_IN,
    preApproved: true,
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T10:00:00Z',
    callStartedAt: null,
    respondedAt: null,
    approvedBy: 'resident_003',
    checkInTime: '2024-01-15T10:05:00Z',
    checkOutTime: null,
  },
];

// Pre-approved entries (from resident app)
export const preApprovedList = [
  {
    id: 'preapp_001',
    type: ENTRY_TYPES.GUEST,
    visitorName: 'Sunil Kumar',
    visitorPhone: '9888888888',
    vehicleNumber: 'UP 14 AB 5678',
    purpose: 'Family Visit',
    targetFlat: 'A-101',
    targetBuilding: 'Tower A',
    targetResident: 'Amit Sharma',
    validFrom: '2024-01-16T00:00:00Z',
    validUntil: '2024-01-16T23:59:59Z',
    isUsed: false,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'preapp_002',
    type: ENTRY_TYPES.SERVICE,
    visitorName: 'Electrician',
    visitorPhone: '9777777777',
    vehicleNumber: null,
    purpose: 'Electrical Work',
    company: 'Local Electrician',
    targetFlat: 'A-101',
    targetBuilding: 'Tower A',
    targetResident: 'Amit Sharma',
    validFrom: '2024-01-17T09:00:00Z',
    validUntil: '2024-01-17T18:00:00Z',
    isUsed: false,
    createdAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 'preapp_003',
    type: ENTRY_TYPES.DELIVERY,
    visitorName: 'Any Delivery',
    visitorPhone: '',
    vehicleNumber: null,
    purpose: 'Flipkart Delivery',
    company: 'Flipkart',
    targetFlat: 'B-205',
    targetBuilding: 'Tower B',
    targetResident: 'Priya Patel',
    validFrom: '2024-01-15T00:00:00Z',
    validUntil: '2024-01-15T23:59:59Z',
    isUsed: false,
    createdAt: '2024-01-14T22:00:00Z',
  },
];

// Waiting list (visitors waiting for approval)
export const waitingList = [
  {
    id: 'gentry_001',
    type: ENTRY_TYPES.GUEST,
    visitorName: 'Rajesh Kumar',
    visitorPhone: '9898989898',
    vehicleNumber: 'DL 01 AB 1234',
    targetFlat: 'A-101',
    targetBuilding: 'Tower A',
    targetResident: 'Amit Sharma',
    waitingSince: '2024-01-15T11:00:00Z',
    attempts: 0,
  },
  {
    id: 'gentry_002',
    type: ENTRY_TYPES.DELIVERY,
    visitorName: 'Delivery Boy',
    visitorPhone: '9797979797',
    company: 'Amazon',
    targetFlat: 'B-205',
    targetBuilding: 'Tower B',
    targetResident: 'Priya Patel',
    waitingSince: '2024-01-15T11:05:00Z',
    attempts: 1,
    lastAttemptAt: '2024-01-15T11:06:00Z',
  },
];

// Today's entry log (for guard)
export const todayEntryLog = [
  {
    id: 'log_001',
    type: ENTRY_TYPES.STAFF,
    visitorName: 'Sunita Devi',
    purpose: 'Maid',
    targetFlat: 'A-101',
    targetBuilding: 'Tower A',
    checkInTime: '2024-01-15T08:05:00Z',
    checkOutTime: '2024-01-15T10:10:00Z',
    status: GUARD_ENTRY_STATUS.CHECKED_OUT,
  },
  {
    id: 'log_002',
    type: ENTRY_TYPES.DELIVERY,
    visitorName: 'Swiggy Delivery',
    company: 'Swiggy',
    targetFlat: 'B-304',
    targetBuilding: 'Tower B',
    checkInTime: '2024-01-15T09:30:00Z',
    checkOutTime: '2024-01-15T09:35:00Z',
    status: GUARD_ENTRY_STATUS.CHECKED_OUT,
  },
  {
    id: 'log_003',
    type: ENTRY_TYPES.SERVICE,
    visitorName: 'Ravi Kumar',
    company: 'Urban Company',
    purpose: 'Plumbing Work',
    targetFlat: 'A-302',
    targetBuilding: 'Tower A',
    checkInTime: '2024-01-15T10:05:00Z',
    checkOutTime: null,
    status: GUARD_ENTRY_STATUS.CHECKED_IN,
  },
  {
    id: 'log_004',
    type: ENTRY_TYPES.GUEST,
    visitorName: 'Vikram Mehta',
    targetFlat: 'C-203',
    targetBuilding: 'Tower C',
    checkInTime: '2024-01-15T10:30:00Z',
    checkOutTime: null,
    status: GUARD_ENTRY_STATUS.CHECKED_IN,
  },
  {
    id: 'log_005',
    type: ENTRY_TYPES.CAB,
    visitorName: 'Ola Driver',
    company: 'Ola',
    vehicleNumber: 'DL 05 AB 1234',
    targetFlat: 'A-501',
    targetBuilding: 'Tower A',
    checkInTime: '2024-01-15T08:00:00Z',
    checkOutTime: '2024-01-15T08:10:00Z',
    status: GUARD_ENTRY_STATUS.CHECKED_OUT,
  },
];

// Recent messages from residents
export const guardMessages = [
  {
    id: 'gmsg_001',
    fromResident: 'Amit Sharma',
    fromFlat: 'A-101',
    message: 'Expecting a guest named Sunil around 3 PM. Please allow entry.',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
  },
  {
    id: 'gmsg_002',
    fromResident: 'Priya Patel',
    fromFlat: 'B-205',
    message: 'Flipkart delivery expected today. Please check OTP before allowing.',
    timestamp: '2024-01-15T09:00:00Z',
    isRead: true,
  },
  {
    id: 'gmsg_003',
    fromResident: 'Rahul Verma',
    fromFlat: 'A-302',
    message: 'Urban Company serviceman coming for plumbing. Pre-approved.',
    timestamp: '2024-01-15T08:30:00Z',
    isRead: true,
  },
];

// Get current gate entries
export const getCurrentGateEntries = () => {
  return gateEntries.filter(e => 
    e.status === GUARD_ENTRY_STATUS.WAITING || 
    e.status === GUARD_ENTRY_STATUS.CALLING ||
    e.status === GUARD_ENTRY_STATUS.APPROVED
  );
};

// Get pre-approved entries for today
export const getTodayPreApproved = () => {
  const today = new Date().toISOString().split('T')[0];
  return preApprovedList.filter(e => {
    const validFrom = e.validFrom.split('T')[0];
    const validUntil = e.validUntil.split('T')[0];
    return validFrom <= today && validUntil >= today && !e.isUsed;
  });
};

// Get waiting visitors
export const getWaitingVisitors = () => {
  return gateEntries.filter(e => e.status === GUARD_ENTRY_STATUS.WAITING);
};

// Get checked-in visitors
export const getCheckedInVisitors = () => {
  return gateEntries.filter(e => e.status === GUARD_ENTRY_STATUS.CHECKED_IN);
};

// Get unread messages count
export const getUnreadMessagesCount = () => {
  return guardMessages.filter(m => !m.isRead).length;
};

// Check if visitor is pre-approved
export const checkPreApproval = (phone, flat) => {
  const today = new Date().toISOString();
  return preApprovedList.find(e => 
    e.visitorPhone === phone && 
    e.targetFlat === flat &&
    e.validFrom <= today &&
    e.validUntil >= today &&
    !e.isUsed
  );
};

export default {
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
  getCheckedInVisitors,
  getUnreadMessagesCount,
  checkPreApproval,
};