/**
 * Mock Amenities Data
 * 
 * Contains society amenities and bookings
 */

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Amenity types
export const AMENITY_TYPES = {
  CLUBHOUSE: 'clubhouse',
  GYM: 'gym',
  POOL: 'pool',
  TENNIS: 'tennis',
  BADMINTON: 'badminton',
  PARTY_HALL: 'party_hall',
  GUEST_ROOM: 'guest_room',
  PLAYGROUND: 'playground',
};

// Amenities available in society
export const amenities = [
  {
    id: 'amenity_001',
    societyId: 'society_001',
    type: AMENITY_TYPES.CLUBHOUSE,
    name: 'Society Clubhouse',
    description: 'Spacious clubhouse with AC, seating for 50 people, projector, and sound system. Perfect for parties and gatherings.',
    location: 'Near Tower A, Ground Floor',
    capacity: 50,
    pricePerHour: 500,
    pricePerDay: 3000,
    minBookingHours: 2,
    maxBookingHours: 8,
    images: [],
    rules: [
      'No smoking inside the premises',
      'Music should be stopped by 10 PM',
      'Cleaning charges extra if premises not cleaned',
      'Booking must be done 2 days in advance',
    ],
    timings: {
      open: '08:00',
      close: '22:00',
    },
    isAvailable: true,
    requiresApproval: false,
  },
  {
    id: 'amenity_002',
    societyId: 'society_001',
    type: AMENITY_TYPES.GYM,
    name: 'Fitness Center',
    description: 'Well-equipped gym with cardio machines, weights, and yoga area. Personal trainer available on request.',
    location: 'Tower B, Ground Floor',
    capacity: 20,
    pricePerHour: 0,
    pricePerDay: 0,
    images: [],
    rules: [
      'Proper gym attire required',
      'Wipe equipment after use',
      'No loud music without headphones',
      'Maximum 1 hour during peak hours',
    ],
    timings: {
      open: '05:00',
      close: '22:00',
    },
    isAvailable: true,
    requiresApproval: false,
    isFree: true,
  },
  {
    id: 'amenity_003',
    societyId: 'society_001',
    type: AMENITY_TYPES.POOL,
    name: 'Swimming Pool',
    description: 'Olympic size swimming pool with separate kids pool. Lifeguard on duty during operating hours.',
    location: 'Central Area, Near Clubhouse',
    capacity: 30,
    pricePerHour: 0,
    pricePerDay: 0,
    images: [],
    rules: [
      'Swimming cap mandatory',
      'Shower before entering pool',
      'No food or drinks near pool',
      'Children under 12 must be accompanied by adult',
    ],
    timings: {
      open: '06:00',
      close: '20:00',
    },
    isAvailable: true,
    requiresApproval: false,
    isFree: true,
    seasonalClosure: {
      from: 'December',
      to: 'February',
    },
  },
  {
    id: 'amenity_004',
    societyId: 'society_001',
    type: AMENITY_TYPES.TENNIS,
    name: 'Tennis Court',
    description: 'Professional synthetic tennis court with floodlights for evening play.',
    location: 'Sports Complex, East Side',
    capacity: 4,
    pricePerHour: 200,
    images: [],
    rules: [
      'Non-marking shoes only',
      'Book maximum 2 hours per day',
      'Cancel 2 hours before if not attending',
    ],
    timings: {
      open: '06:00',
      close: '21:00',
    },
    isAvailable: true,
    requiresApproval: false,
  },
  {
    id: 'amenity_005',
    societyId: 'society_001',
    type: AMENITY_TYPES.BADMINTON,
    name: 'Badminton Court',
    description: 'Indoor badminton court with wooden flooring and proper lighting.',
    location: 'Sports Complex, Indoor Hall',
    capacity: 4,
    pricePerHour: 150,
    images: [],
    rules: [
      'Non-marking shoes only',
      'Book maximum 2 hours per day',
      'Rackets and shuttles to be brought by players',
    ],
    timings: {
      open: '06:00',
      close: '22:00',
    },
    isAvailable: true,
    requiresApproval: false,
  },
  {
    id: 'amenity_006',
    societyId: 'society_001',
    type: AMENITY_TYPES.PARTY_HALL,
    name: 'Banquet Hall',
    description: 'Large banquet hall for weddings and big celebrations. Includes kitchen, stage, and parking for 30 cars.',
    location: 'Separate Building Near Main Gate',
    capacity: 200,
    pricePerHour: 2000,
    pricePerDay: 15000,
    minBookingHours: 4,
    images: [],
    rules: [
      'Booking must be done 7 days in advance',
      'Security deposit of ₹5000 required',
      'DJ/Music allowed till 10 PM only',
      'Catering from approved vendors only',
    ],
    timings: {
      open: '10:00',
      close: '23:00',
    },
    isAvailable: true,
    requiresApproval: true,
  },
  {
    id: 'amenity_007',
    societyId: 'society_001',
    type: AMENITY_TYPES.GUEST_ROOM,
    name: 'Guest Room',
    description: 'Furnished guest room for visitors with attached bathroom, AC, and TV. Max stay 3 nights.',
    location: 'Tower C, Ground Floor',
    capacity: 3,
    pricePerDay: 800,
    images: [],
    rules: [
      'Valid ID proof required for guests',
      'Check-in after 12 PM, Check-out before 11 AM',
      'Maximum 3 nights stay',
      'No cooking in the room',
    ],
    timings: {
      checkIn: '12:00',
      checkOut: '11:00',
    },
    isAvailable: true,
    requiresApproval: true,
    totalRooms: 2,
  },
];

// Bookings
export const amenityBookings = [
  {
    id: 'booking_001',
    amenityId: 'amenity_001',
    amenityName: 'Society Clubhouse',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    date: '2024-01-20',
    startTime: '18:00',
    endTime: '22:00',
    duration: 4,
    purpose: 'Birthday Party',
    guestCount: 30,
    totalAmount: 2500,
    status: BOOKING_STATUS.CONFIRMED,
    paymentStatus: 'pending',
    createdAt: '2024-01-10T14:00:00Z',
    confirmedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 'booking_002',
    amenityId: 'amenity_004',
    amenityName: 'Tennis Court',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    date: '2024-01-16',
    startTime: '07:00',
    endTime: '08:00',
    duration: 1,
    purpose: 'Practice',
    guestCount: 2,
    totalAmount: 200,
    status: BOOKING_STATUS.CONFIRMED,
    paymentStatus: 'paid',
    createdAt: '2024-01-14T20:00:00Z',
    confirmedAt: '2024-01-14T20:00:00Z',
  },
  {
    id: 'booking_003',
    amenityId: 'amenity_005',
    amenityName: 'Badminton Court',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    date: '2024-01-18',
    startTime: '19:00',
    endTime: '21:00',
    duration: 2,
    purpose: 'Evening Game',
    guestCount: 4,
    totalAmount: 300,
    status: BOOKING_STATUS.PENDING,
    paymentStatus: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    confirmedAt: null,
  },
];

// Booking history
export const bookingHistory = [
  {
    id: 'booking_h001',
    amenityId: 'amenity_004',
    amenityName: 'Tennis Court',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    date: '2024-01-12',
    startTime: '07:00',
    endTime: '08:00',
    duration: 1,
    totalAmount: 200,
    status: BOOKING_STATUS.COMPLETED,
    paymentStatus: 'paid',
  },
  {
    id: 'booking_h002',
    amenityId: 'amenity_002',
    amenityName: 'Fitness Center',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    date: '2024-01-10',
    startTime: '06:00',
    endTime: '07:00',
    duration: 1,
    totalAmount: 0,
    status: BOOKING_STATUS.COMPLETED,
    paymentStatus: 'na',
  },
];

// Get amenities by society
export const getAmenitiesBySociety = (societyId) => {
  return amenities.filter(a => a.societyId === societyId);
};

// Get bookings by resident
export const getBookingsByResident = (residentId) => {
  return amenityBookings.filter(b => b.residentId === residentId);
};

// Get upcoming bookings
export const getUpcomingBookings = (residentId) => {
  const today = new Date().toISOString().split('T')[0];
  return amenityBookings.filter(b => 
    b.residentId === residentId && 
    b.date >= today &&
    b.status !== BOOKING_STATUS.CANCELLED
  );
};

// Get available slots for an amenity on a date
export const getAvailableSlots = (amenityId, date) => {
  const amenity = amenities.find(a => a.id === amenityId);
  if (!amenity) return [];

  const booked = amenityBookings.filter(b => 
    b.amenityId === amenityId && 
    b.date === date &&
    b.status !== BOOKING_STATUS.CANCELLED
  );

  // Generate available slots
  const slots = [];
  const openHour = parseInt(amenity.timings.open.split(':')[0]);
  const closeHour = parseInt(amenity.timings.close.split(':')[0]);

  for (let hour = openHour; hour < closeHour; hour++) {
    const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
    const isBooked = booked.some(b => {
      const startHour = parseInt(b.startTime.split(':')[0]);
      const endHour = parseInt(b.endTime.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });

    slots.push({
      time: timeSlot,
      available: !isBooked,
    });
  }

  return slots;
};

export default {
  amenities,
  amenityBookings,
  bookingHistory,
  BOOKING_STATUS,
  AMENITY_TYPES,
  getAmenitiesBySociety,
  getBookingsByResident,
  getUpcomingBookings,
  getAvailableSlots,
};