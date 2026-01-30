/**
 * Mock Services Data
 * 
 * Contains local services and booking information
 */

// Service categories
export const SERVICE_CATEGORIES = {
  PLUMBER: 'plumber',
  ELECTRICIAN: 'electrician',
  CARPENTER: 'carpenter',
  PAINTER: 'painter',
  CLEANER: 'cleaner',
  PEST_CONTROL: 'pest_control',
  AC_REPAIR: 'ac_repair',
  APPLIANCE: 'appliance',
};

// Booking status
export const SERVICE_BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Available services
export const services = [
  {
    id: 'service_001',
    category: SERVICE_CATEGORIES.PLUMBER,
    name: 'Plumbing Services',
    description: 'Expert plumbing services for all your needs - leakage repair, pipe fitting, tap installation, and more.',
    icon: 'plumbing',
    providers: [
      {
        id: 'provider_001',
        name: 'Ram Plumbing Works',
        rating: 4.5,
        reviews: 128,
        experience: '10+ years',
        priceRange: '₹300 - ₹2000',
        availability: 'Mon-Sat, 8 AM - 8 PM',
        phone: '9888111222',
        isVerified: true,
      },
      {
        id: 'provider_002',
        name: 'Quick Fix Plumbers',
        rating: 4.2,
        reviews: 85,
        experience: '5+ years',
        priceRange: '₹250 - ₹1500',
        availability: 'All days, 9 AM - 6 PM',
        phone: '9888111223',
        isVerified: true,
      },
    ],
  },
  {
    id: 'service_002',
    category: SERVICE_CATEGORIES.ELECTRICIAN,
    name: 'Electrical Services',
    description: 'Professional electricians for wiring, fan installation, switchboard repair, and electrical maintenance.',
    icon: 'electrical-services',
    providers: [
      {
        id: 'provider_003',
        name: 'Sharma Electrical',
        rating: 4.7,
        reviews: 200,
        experience: '15+ years',
        priceRange: '₹200 - ₹3000',
        availability: 'Mon-Sat, 9 AM - 7 PM',
        phone: '9888111224',
        isVerified: true,
      },
      {
        id: 'provider_004',
        name: 'PowerUp Electricals',
        rating: 4.4,
        reviews: 120,
        experience: '8+ years',
        priceRange: '₹250 - ₹2500',
        availability: 'All days, 8 AM - 9 PM',
        phone: '9888111225',
        isVerified: true,
      },
    ],
  },
  {
    id: 'service_003',
    category: SERVICE_CATEGORIES.CARPENTER,
    name: 'Carpentry Services',
    description: 'Skilled carpenters for furniture repair, woodwork, door fitting, and custom furniture.',
    icon: 'carpenter',
    providers: [
      {
        id: 'provider_005',
        name: 'WoodCraft Solutions',
        rating: 4.6,
        reviews: 95,
        experience: '12+ years',
        priceRange: '₹500 - ₹5000',
        availability: 'Mon-Sat, 10 AM - 6 PM',
        phone: '9888111226',
        isVerified: true,
      },
    ],
  },
  {
    id: 'service_004',
    category: SERVICE_CATEGORIES.CLEANER,
    name: 'House Cleaning',
    description: 'Professional cleaning services - deep cleaning, regular cleaning, bathroom cleaning, kitchen cleaning.',
    icon: 'cleaning-services',
    providers: [
      {
        id: 'provider_006',
        name: 'SparkleClean Services',
        rating: 4.8,
        reviews: 250,
        experience: '7+ years',
        priceRange: '₹500 - ₹3000',
        availability: 'All days, 7 AM - 7 PM',
        phone: '9888111227',
        isVerified: true,
      },
      {
        id: 'provider_007',
        name: 'Urban Company',
        rating: 4.5,
        reviews: 500,
        experience: '5+ years',
        priceRange: '₹600 - ₹4000',
        availability: 'All days, 8 AM - 8 PM',
        phone: '9888111228',
        isVerified: true,
        isPartner: true,
      },
    ],
  },
  {
    id: 'service_005',
    category: SERVICE_CATEGORIES.AC_REPAIR,
    name: 'AC Repair & Service',
    description: 'AC installation, repair, gas refilling, and annual maintenance services for all brands.',
    icon: 'ac-unit',
    providers: [
      {
        id: 'provider_008',
        name: 'CoolTech AC Services',
        rating: 4.4,
        reviews: 180,
        experience: '10+ years',
        priceRange: '₹400 - ₹5000',
        availability: 'Mon-Sat, 9 AM - 7 PM',
        phone: '9888111229',
        isVerified: true,
      },
    ],
  },
  {
    id: 'service_006',
    category: SERVICE_CATEGORIES.PEST_CONTROL,
    name: 'Pest Control',
    description: 'Complete pest control solutions - cockroaches, termites, bed bugs, mosquitoes, and rodents.',
    icon: 'pest-control',
    providers: [
      {
        id: 'provider_009',
        name: 'PestFree India',
        rating: 4.6,
        reviews: 150,
        experience: '15+ years',
        priceRange: '₹1000 - ₹8000',
        availability: 'All days, 9 AM - 6 PM',
        phone: '9888111230',
        isVerified: true,
      },
    ],
  },
  {
    id: 'service_007',
    category: SERVICE_CATEGORIES.PAINTER,
    name: 'Painting Services',
    description: 'Interior and exterior painting, texture painting, waterproofing, and wall design.',
    icon: 'format-paint',
    providers: [
      {
        id: 'provider_010',
        name: 'ColorWorld Painters',
        rating: 4.5,
        reviews: 110,
        experience: '12+ years',
        priceRange: '₹15 - ₹25 per sq ft',
        availability: 'Mon-Sat, 8 AM - 6 PM',
        phone: '9888111231',
        isVerified: true,
      },
    ],
  },
  {
    id: 'service_008',
    category: SERVICE_CATEGORIES.APPLIANCE,
    name: 'Appliance Repair',
    description: 'Repair services for washing machine, refrigerator, microwave, water purifier, and more.',
    icon: 'kitchen',
    providers: [
      {
        id: 'provider_011',
        name: 'FixIt Appliances',
        rating: 4.3,
        reviews: 200,
        experience: '8+ years',
        priceRange: '₹300 - ₹3000',
        availability: 'Mon-Sat, 9 AM - 7 PM',
        phone: '9888111232',
        isVerified: true,
      },
    ],
  },
];

// Service bookings
export const serviceBookings = [
  {
    id: 'sbooking_001',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    serviceId: 'service_001',
    serviceName: 'Plumbing Services',
    providerId: 'provider_001',
    providerName: 'Ram Plumbing Works',
    providerPhone: '9888111222',
    issue: 'Water leakage in kitchen sink',
    description: 'There is continuous dripping from the kitchen sink pipe. Need urgent repair.',
    preferredDate: '2024-01-17',
    preferredTime: '10:00 AM - 12:00 PM',
    status: SERVICE_BOOKING_STATUS.CONFIRMED,
    estimatedCost: '₹500 - ₹800',
    actualCost: null,
    rating: null,
    review: null,
    createdAt: '2024-01-15T09:00:00Z',
    confirmedAt: '2024-01-15T10:00:00Z',
    completedAt: null,
  },
  {
    id: 'sbooking_002',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    serviceId: 'service_004',
    serviceName: 'House Cleaning',
    providerId: 'provider_006',
    providerName: 'SparkleClean Services',
    providerPhone: '9888111227',
    issue: 'Deep cleaning',
    description: 'Full house deep cleaning including kitchen and bathrooms.',
    preferredDate: '2024-01-20',
    preferredTime: '09:00 AM - 01:00 PM',
    status: SERVICE_BOOKING_STATUS.PENDING,
    estimatedCost: '₹2000 - ₹2500',
    actualCost: null,
    rating: null,
    review: null,
    createdAt: '2024-01-15T11:00:00Z',
    confirmedAt: null,
    completedAt: null,
  },
];

// Past service bookings
export const serviceHistory = [
  {
    id: 'sbooking_h001',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    serviceId: 'service_002',
    serviceName: 'Electrical Services',
    providerId: 'provider_003',
    providerName: 'Sharma Electrical',
    issue: 'Fan not working',
    description: 'Ceiling fan in bedroom making noise and not rotating properly.',
    preferredDate: '2024-01-10',
    preferredTime: '02:00 PM - 04:00 PM',
    status: SERVICE_BOOKING_STATUS.COMPLETED,
    estimatedCost: '₹300 - ₹500',
    actualCost: 450,
    rating: 5,
    review: 'Excellent service! Fixed the fan quickly and also checked other fans for free.',
    createdAt: '2024-01-08T10:00:00Z',
    confirmedAt: '2024-01-08T11:00:00Z',
    completedAt: '2024-01-10T15:30:00Z',
  },
  {
    id: 'sbooking_h002',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    serviceId: 'service_005',
    serviceName: 'AC Repair & Service',
    providerId: 'provider_008',
    providerName: 'CoolTech AC Services',
    issue: 'AC not cooling',
    description: 'Split AC in living room not cooling properly. Might need gas refilling.',
    preferredDate: '2024-01-05',
    preferredTime: '10:00 AM - 12:00 PM',
    status: SERVICE_BOOKING_STATUS.COMPLETED,
    estimatedCost: '₹1500 - ₹2500',
    actualCost: 2000,
    rating: 4,
    review: 'Good service. AC is working fine now. Gas refilling done.',
    createdAt: '2024-01-03T14:00:00Z',
    confirmedAt: '2024-01-03T15:00:00Z',
    completedAt: '2024-01-05T11:45:00Z',
  },
];

// Get all services
export const getAllServices = () => {
  return services;
};

// Get services by category
export const getServicesByCategory = (category) => {
  return services.filter(s => s.category === category);
};

// Get service by ID
export const getServiceById = (serviceId) => {
  return services.find(s => s.id === serviceId);
};

// Get bookings by resident
export const getBookingsByResident = (residentId) => {
  return serviceBookings.filter(b => b.residentId === residentId);
};

// Get service history by resident
export const getServiceHistoryByResident = (residentId) => {
  return serviceHistory.filter(b => b.residentId === residentId);
};

export default {
  services,
  serviceBookings,
  serviceHistory,
  SERVICE_CATEGORIES,
  SERVICE_BOOKING_STATUS,
  getAllServices,
  getServicesByCategory,
  getServiceById,
  getBookingsByResident,
  getServiceHistoryByResident,
};