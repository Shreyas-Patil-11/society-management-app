/**
 * Mock Complaints Data
 * 
 * Contains helpdesk complaints and their comments
 */

// Complaint status
export const COMPLAINT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REOPENED: 'reopened',
};

// Complaint categories
export const COMPLAINT_CATEGORIES = {
  MAINTENANCE: 'maintenance',
  SECURITY: 'security',
  CLEANLINESS: 'cleanliness',
  PARKING: 'parking',
  NOISE: 'noise',
  WATER: 'water',
  ELECTRICITY: 'electricity',
  ELEVATOR: 'elevator',
  GARDEN: 'garden',
  OTHER: 'other',
};

// Complaint priority
export const COMPLAINT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const complaints = [
  {
    id: 'complaint_001',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    societyId: 'society_001',
    category: COMPLAINT_CATEGORIES.WATER,
    priority: COMPLAINT_PRIORITY.HIGH,
    title: 'Low Water Pressure in Bathroom',
    description: 'The water pressure in the master bathroom has been very low for the past 3 days. It takes a long time to fill the bucket and shower is almost unusable. Please look into this urgently.',
    status: COMPLAINT_STATUS.IN_PROGRESS,
    assignedTo: 'Maintenance Team',
    attachments: [
      { name: 'water_pressure_video.mp4', url: '#', type: 'video' },
    ],
    createdAt: '2024-01-13T09:30:00Z',
    updatedAt: '2024-01-14T11:00:00Z',
    resolvedAt: null,
    estimatedResolution: '2024-01-16T18:00:00Z',
  },
  {
    id: 'complaint_002',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    societyId: 'society_001',
    category: COMPLAINT_CATEGORIES.ELEVATOR,
    priority: COMPLAINT_PRIORITY.MEDIUM,
    title: 'Elevator Making Strange Noise',
    description: 'Elevator 2 in Tower A is making a grinding noise when moving between floors 3 and 4. It seems to be getting worse. Please inspect before it becomes a safety issue.',
    status: COMPLAINT_STATUS.OPEN,
    assignedTo: null,
    attachments: [],
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    resolvedAt: null,
    estimatedResolution: null,
  },
  {
    id: 'complaint_003',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    societyId: 'society_001',
    category: COMPLAINT_CATEGORIES.CLEANLINESS,
    priority: COMPLAINT_PRIORITY.LOW,
    title: 'Garbage Not Collected on Time',
    description: 'For the past week, the garbage collection from our floor has been delayed. The garbage is usually collected by 8 AM but now it happens only after 11 AM causing bad smell in the corridor.',
    status: COMPLAINT_STATUS.RESOLVED,
    assignedTo: 'Housekeeping',
    attachments: [],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T10:30:00Z',
    resolvedAt: '2024-01-12T10:30:00Z',
    resolution: 'Garbage collection schedule has been revised. Morning collection will now happen between 7-8 AM.',
    estimatedResolution: null,
  },
  {
    id: 'complaint_004',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    societyId: 'society_001',
    category: COMPLAINT_CATEGORIES.SECURITY,
    priority: COMPLAINT_PRIORITY.HIGH,
    title: 'CCTV Not Working in Parking Area',
    description: 'I noticed that the CCTV camera near parking slot P-A-12 seems to be not working. The LED light is off and the camera position has shifted. This is a security concern.',
    status: COMPLAINT_STATUS.RESOLVED,
    assignedTo: 'Security Team',
    attachments: [
      { name: 'cctv_issue.jpg', url: '#', type: 'image' },
    ],
    createdAt: '2024-01-08T20:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z',
    resolvedAt: '2024-01-10T14:00:00Z',
    resolution: 'CCTV camera has been repaired and repositioned. All cameras in parking area are now functional.',
    estimatedResolution: null,
  },
  {
    id: 'complaint_005',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    societyId: 'society_001',
    category: COMPLAINT_CATEGORIES.NOISE,
    priority: COMPLAINT_PRIORITY.MEDIUM,
    title: 'Construction Noise from Flat Above',
    description: 'There is ongoing renovation work in flat A-201 that starts early morning at 7 AM. As per society rules, construction work should not start before 9 AM. Please enforce the rules.',
    status: COMPLAINT_STATUS.CLOSED,
    assignedTo: 'Society Management',
    attachments: [],
    createdAt: '2024-01-05T07:30:00Z',
    updatedAt: '2024-01-07T16:00:00Z',
    resolvedAt: '2024-01-07T16:00:00Z',
    resolution: 'Resident of A-201 has been informed about the construction timing rules. They have agreed to start work only after 9 AM.',
    estimatedResolution: null,
  },
];

// Complaint comments/updates
export const complaintComments = [
  {
    id: 'comment_001',
    complaintId: 'complaint_001',
    userId: 'admin_001',
    userName: 'Society Admin',
    userRole: 'admin',
    content: 'We have received your complaint and assigned it to the maintenance team. A plumber will visit your flat tomorrow between 10 AM - 12 PM.',
    createdAt: '2024-01-13T11:00:00Z',
  },
  {
    id: 'comment_002',
    complaintId: 'complaint_001',
    userId: 'resident_001',
    userName: 'Amit Sharma',
    userRole: 'resident',
    content: 'Thank you for the quick response. I will be available during that time.',
    createdAt: '2024-01-13T11:30:00Z',
  },
  {
    id: 'comment_003',
    complaintId: 'complaint_001',
    userId: 'admin_001',
    userName: 'Society Admin',
    userRole: 'admin',
    content: 'Update: The plumber visited and identified a blockage in the pipeline. Cleaning work is in progress. Expected to be completed by tomorrow evening.',
    createdAt: '2024-01-14T11:00:00Z',
  },
  {
    id: 'comment_004',
    complaintId: 'complaint_003',
    userId: 'admin_001',
    userName: 'Housekeeping Supervisor',
    userRole: 'admin',
    content: 'We apologize for the inconvenience. The delay was due to staff shortage. We have revised the schedule and added an additional staff member for Tower A.',
    createdAt: '2024-01-11T09:00:00Z',
  },
  {
    id: 'comment_005',
    complaintId: 'complaint_003',
    userId: 'resident_001',
    userName: 'Amit Sharma',
    userRole: 'resident',
    content: 'The garbage is now being collected on time. Thank you for resolving this.',
    createdAt: '2024-01-12T08:30:00Z',
  },
];

// Get complaints by resident
export const getComplaintsByResident = (residentId) => {
  return complaints.filter(c => c.residentId === residentId);
};

// Get complaints by status
export const getComplaintsByStatus = (residentId, status) => {
  return complaints.filter(c => c.residentId === residentId && c.status === status);
};

// Get open complaints count
export const getOpenComplaintsCount = (residentId) => {
  return complaints.filter(c => 
    c.residentId === residentId && 
    (c.status === COMPLAINT_STATUS.OPEN || c.status === COMPLAINT_STATUS.IN_PROGRESS)
  ).length;
};

// Get comments for a complaint
export const getCommentsByComplaint = (complaintId) => {
  return complaintComments.filter(c => c.complaintId === complaintId);
};

export default {
  complaints,
  complaintComments,
  COMPLAINT_STATUS,
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITY,
  getComplaintsByResident,
  getComplaintsByStatus,
  getOpenComplaintsCount,
  getCommentsByComplaint,
};