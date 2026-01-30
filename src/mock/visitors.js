/**
 * Mock Visitors Data
 * 
 * Contains visitor entries, pre-approvals, and gatepass data
 */

// Visitor types
export const VISITOR_TYPES = {
  GUEST: 'guest',
  DELIVERY: 'delivery',
  CAB: 'cab',
  SERVICE: 'service',
};

// Entry status
export const ENTRY_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  EXPIRED: 'expired',
};

// Current visitors (for resident view)
export const visitors = [
  {
    id: 'visitor_001',
    type: VISITOR_TYPES.GUEST,
    name: 'Rajesh Kumar',
    phone: '9898989898',
    vehicleNumber: 'DL 01 AB 1234',
    vehicleType: 'car',
    purpose: 'Family Visit',
    photo: null,
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_IN,
    checkInTime: '2024-01-15T10:30:00Z',
    checkOutTime: null,
    approvedBy: 'resident_001',
    approvedAt: '2024-01-15T10:28:00Z',
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T10:25:00Z',
  },
  {
    id: 'visitor_002',
    type: VISITOR_TYPES.DELIVERY,
    name: 'Delivery Person',
    phone: '9797979797',
    vehicleNumber: 'DL 02 CD 5678',
    vehicleType: 'bike',
    purpose: 'Amazon Delivery',
    company: 'Amazon',
    photo: null,
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_OUT,
    checkInTime: '2024-01-15T09:00:00Z',
    checkOutTime: '2024-01-15T09:15:00Z',
    approvedBy: 'resident_001',
    approvedAt: '2024-01-15T08:58:00Z',
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T08:55:00Z',
  },
  {
    id: 'visitor_003',
    type: VISITOR_TYPES.CAB,
    name: 'Driver',
    phone: '9696969696',
    vehicleNumber: 'DL 03 EF 9012',
    vehicleType: 'car',
    purpose: 'Uber Pickup',
    company: 'Uber',
    photo: null,
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.PENDING,
    checkInTime: null,
    checkOutTime: null,
    approvedBy: null,
    approvedAt: null,
    guardId: 'guard_001',
    gate: 'Main Gate',
    createdAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 'visitor_004',
    type: VISITOR_TYPES.SERVICE,
    name: 'Ravi Plumber',
    phone: '9595959595',
    vehicleNumber: null,
    vehicleType: null,
    purpose: 'Plumbing Work',
    company: 'Urban Company',
    photo: null,
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.APPROVED,
    checkInTime: null,
    checkOutTime: null,
    approvedBy: 'resident_001',
    approvedAt: '2024-01-15T08:00:00Z',
    guardId: null,
    gate: null,
    expectedTime: '2024-01-15T14:00:00Z',
    createdAt: '2024-01-14T20:00:00Z',
  },
];

// Visitor history
export const visitorHistory = [
  {
    id: 'visitor_h001',
    type: VISITOR_TYPES.GUEST,
    name: 'Pooja Sharma',
    phone: '9494949494',
    vehicleNumber: 'HR 26 AB 4567',
    purpose: 'Friend Visit',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_OUT,
    checkInTime: '2024-01-14T15:00:00Z',
    checkOutTime: '2024-01-14T19:30:00Z',
    createdAt: '2024-01-14T14:55:00Z',
  },
  {
    id: 'visitor_h002',
    type: VISITOR_TYPES.DELIVERY,
    name: 'Delivery Boy',
    phone: '9393939393',
    purpose: 'Swiggy Delivery',
    company: 'Swiggy',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_OUT,
    checkInTime: '2024-01-14T13:00:00Z',
    checkOutTime: '2024-01-14T13:10:00Z',
    createdAt: '2024-01-14T12:58:00Z',
  },
  {
    id: 'visitor_h003',
    type: VISITOR_TYPES.GUEST,
    name: 'Vikram Mehta',
    phone: '9292929292',
    vehicleNumber: 'DL 05 GH 7890',
    purpose: 'Business Meeting',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_OUT,
    checkInTime: '2024-01-13T10:00:00Z',
    checkOutTime: '2024-01-13T12:00:00Z',
    createdAt: '2024-01-13T09:55:00Z',
  },
  {
    id: 'visitor_h004',
    type: VISITOR_TYPES.SERVICE,
    name: 'AC Technician',
    phone: '9191919191',
    purpose: 'AC Service',
    company: 'LG Service',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_OUT,
    checkInTime: '2024-01-12T11:00:00Z',
    checkOutTime: '2024-01-12T13:30:00Z',
    createdAt: '2024-01-12T10:55:00Z',
  },
  {
    id: 'visitor_h005',
    type: VISITOR_TYPES.CAB,
    name: 'Ola Driver',
    phone: '9090909090',
    vehicleNumber: 'DL 10 XY 1234',
    purpose: 'Ola Cab',
    company: 'Ola',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    status: ENTRY_STATUS.CHECKED_OUT,
    checkInTime: '2024-01-11T08:00:00Z',
    checkOutTime: '2024-01-11T08:15:00Z',
    createdAt: '2024-01-11T07:55:00Z',
  },
];

// Pre-approved entries (gatepasses)
export const preApprovedEntries = [
  {
    id: 'preapprove_001',
    type: VISITOR_TYPES.GUEST,
    name: 'Sunil Kumar',
    phone: '9888888888',
    vehicleNumber: 'UP 14 AB 5678',
    purpose: 'Family Visit',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    validFrom: '2024-01-16T00:00:00Z',
    validUntil: '2024-01-16T23:59:59Z',
    status: 'active',
    isUsed: false,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'preapprove_002',
    type: VISITOR_TYPES.SERVICE,
    name: 'Electrician',
    phone: '9777777777',
    purpose: 'Electrical Work',
    company: 'Local Electrician',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    validFrom: '2024-01-17T09:00:00Z',
    validUntil: '2024-01-17T18:00:00Z',
    status: 'active',
    isUsed: false,
    createdAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 'preapprove_003',
    type: VISITOR_TYPES.DELIVERY,
    name: 'Any Delivery',
    phone: '',
    purpose: 'Expected Delivery',
    company: 'Flipkart',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    validFrom: '2024-01-15T00:00:00Z',
    validUntil: '2024-01-15T23:59:59Z',
    status: 'active',
    isUsed: false,
    createdAt: '2024-01-14T22:00:00Z',
  },
];

// Frequent visitors
export const frequentVisitors = [
  {
    id: 'frequent_001',
    name: 'Pooja Sharma',
    phone: '9494949494',
    relation: 'Friend',
    visitCount: 12,
    lastVisit: '2024-01-14T19:30:00Z',
    residentId: 'resident_001',
  },
  {
    id: 'frequent_002',
    name: 'Rajesh Kumar',
    phone: '9898989898',
    relation: 'Relative',
    visitCount: 8,
    lastVisit: '2024-01-15T10:30:00Z',
    residentId: 'resident_001',
  },
  {
    id: 'frequent_003',
    name: 'Vikram Mehta',
    phone: '9292929292',
    relation: 'Colleague',
    visitCount: 5,
    lastVisit: '2024-01-13T12:00:00Z',
    residentId: 'resident_001',
  },
];

// Get visitors by resident
export const getVisitorsByResident = (residentId) => {
  return visitors.filter(v => v.residentId === residentId);
};

// Get visitor history by resident
export const getVisitorHistoryByResident = (residentId) => {
  return visitorHistory.filter(v => v.residentId === residentId);
};

// Get pre-approved entries by resident
export const getPreApprovedByResident = (residentId) => {
  return preApprovedEntries.filter(e => e.residentId === residentId);
};

// Get pending visitors
export const getPendingVisitors = () => {
  return visitors.filter(v => v.status === ENTRY_STATUS.PENDING);
};

// Get checked-in visitors
export const getCheckedInVisitors = () => {
  return visitors.filter(v => v.status === ENTRY_STATUS.CHECKED_IN);
};

export default {
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
};