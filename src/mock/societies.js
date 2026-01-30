/**
 * Mock Societies Data
 * 
 * Contains sample society/apartment complex data
 */

export const societies = [
  {
    id: 'society_001',
    name: 'Green Valley Apartments',
    address: 'Plot 42, Sector 50',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122018',
    country: 'India',
    totalBuildings: 3,
    totalFlats: 150,
    totalResidents: 420,
    amenities: ['gym', 'pool', 'clubhouse', 'playground', 'garden'],
    establishedYear: 2015,
    managementContact: '9876543200',
    managementEmail: 'admin@greenvalley.com',
    logo: null,
    images: [],
    isActive: true,
    createdAt: '2015-06-01T10:00:00Z',
  },
  {
    id: 'society_002',
    name: 'Sunrise Heights',
    address: '123, MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    totalBuildings: 5,
    totalFlats: 250,
    totalResidents: 680,
    amenities: ['gym', 'pool', 'clubhouse', 'tennis', 'badminton'],
    establishedYear: 2018,
    managementContact: '9876543201',
    managementEmail: 'admin@sunriseheights.com',
    logo: null,
    images: [],
    isActive: true,
    createdAt: '2018-03-15T10:00:00Z',
  },
  {
    id: 'society_003',
    name: 'Royal Residency',
    address: 'Jubilee Hills, Road No. 5',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    country: 'India',
    totalBuildings: 2,
    totalFlats: 80,
    totalResidents: 220,
    amenities: ['gym', 'clubhouse', 'garden'],
    establishedYear: 2020,
    managementContact: '9876543202',
    managementEmail: 'admin@royalresidency.com',
    logo: null,
    images: [],
    isActive: true,
    createdAt: '2020-01-20T10:00:00Z',
  },
  {
    id: 'society_004',
    name: 'Palm Grove Villas',
    address: 'Whitefield Main Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    country: 'India',
    totalBuildings: 8,
    totalFlats: 400,
    totalResidents: 1100,
    amenities: ['gym', 'pool', 'clubhouse', 'tennis', 'badminton', 'playground', 'garden', 'party_hall'],
    establishedYear: 2012,
    managementContact: '9876543203',
    managementEmail: 'admin@palmgrove.com',
    logo: null,
    images: [],
    isActive: true,
    createdAt: '2012-08-10T10:00:00Z',
  },
];

// Current society (for testing)
export const currentSociety = societies[0];

// Get society by ID
export const getSocietyById = (id) => {
  return societies.find(society => society.id === id);
};

// Search societies
export const searchSocieties = (query) => {
  const lowerQuery = query.toLowerCase();
  return societies.filter(society => 
    society.name.toLowerCase().includes(lowerQuery) ||
    society.city.toLowerCase().includes(lowerQuery) ||
    society.address.toLowerCase().includes(lowerQuery)
  );
};

export default {
  societies,
  currentSociety,
  getSocietyById,
  searchSocieties,
};