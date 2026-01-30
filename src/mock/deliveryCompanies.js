/**
 * Mock Delivery, Cab, and Service Companies Data
 * 
 * Contains common delivery, cab, and service provider companies
 */

// Delivery Companies
export const deliveryCompanies = [
  {
    id: 'del_amazon',
    name: 'Amazon',
    icon: 'shopping-cart',
    color: '#FF9900',
    isPopular: true,
  },
  {
    id: 'del_flipkart',
    name: 'Flipkart',
    icon: 'shopping-bag',
    color: '#2874F0',
    isPopular: true,
  },
  {
    id: 'del_swiggy',
    name: 'Swiggy',
    icon: 'restaurant',
    color: '#FC8019',
    isPopular: true,
  },
  {
    id: 'del_zomato',
    name: 'Zomato',
    icon: 'fastfood',
    color: '#E23744',
    isPopular: true,
  },
  {
    id: 'del_dunzo',
    name: 'Dunzo',
    icon: 'delivery-dining',
    color: '#00D290',
    isPopular: true,
  },
  {
    id: 'del_bigbasket',
    name: 'BigBasket',
    icon: 'shopping-basket',
    color: '#84C225',
    isPopular: true,
  },
  {
    id: 'del_blinkit',
    name: 'Blinkit',
    icon: 'bolt',
    color: '#F8CB46',
    isPopular: true,
  },
  {
    id: 'del_zepto',
    name: 'Zepto',
    icon: 'flash-on',
    color: '#8025FB',
    isPopular: true,
  },
  {
    id: 'del_delhivery',
    name: 'Delhivery',
    icon: 'local-shipping',
    color: '#E41E26',
    isPopular: false,
  },
  {
    id: 'del_bluedart',
    name: 'BlueDart',
    icon: 'local-shipping',
    color: '#003399',
    isPopular: false,
  },
  {
    id: 'del_dtdc',
    name: 'DTDC',
    icon: 'local-shipping',
    color: '#ED1C24',
    isPopular: false,
  },
  {
    id: 'del_fedex',
    name: 'FedEx',
    icon: 'local-shipping',
    color: '#4D148C',
    isPopular: false,
  },
  {
    id: 'del_ecom',
    name: 'Ecom Express',
    icon: 'local-shipping',
    color: '#0066B3',
    isPopular: false,
  },
  {
    id: 'del_meesho',
    name: 'Meesho',
    icon: 'shopping-bag',
    color: '#F43397',
    isPopular: false,
  },
  {
    id: 'del_myntra',
    name: 'Myntra',
    icon: 'checkroom',
    color: '#FF3F6C',
    isPopular: false,
  },
  {
    id: 'del_ajio',
    name: 'Ajio',
    icon: 'checkroom',
    color: '#3E3E3F',
    isPopular: false,
  },
  {
    id: 'del_other',
    name: 'Other',
    icon: 'inventory',
    color: '#6B7280',
    isPopular: false,
  },
];

// Cab Companies
export const cabCompanies = [
  {
    id: 'cab_uber',
    name: 'Uber',
    icon: 'local-taxi',
    color: '#000000',
    isPopular: true,
  },
  {
    id: 'cab_ola',
    name: 'Ola',
    icon: 'local-taxi',
    color: '#1C8D73',
    isPopular: true,
  },
  {
    id: 'cab_rapido',
    name: 'Rapido',
    icon: 'two-wheeler',
    color: '#FFCC00',
    isPopular: true,
  },
  {
    id: 'cab_indrive',
    name: 'inDrive',
    icon: 'local-taxi',
    color: '#00C853',
    isPopular: false,
  },
  {
    id: 'cab_meru',
    name: 'Meru Cabs',
    icon: 'local-taxi',
    color: '#007A3D',
    isPopular: false,
  },
  {
    id: 'cab_private',
    name: 'Private Cab',
    icon: 'directions-car',
    color: '#6B7280',
    isPopular: false,
  },
  {
    id: 'cab_other',
    name: 'Other',
    icon: 'directions-car',
    color: '#6B7280',
    isPopular: false,
  },
];

// Service Companies
export const serviceCompanies = [
  {
    id: 'svc_urban',
    name: 'Urban Company',
    icon: 'home-repair-service',
    color: '#7B2D82',
    isPopular: true,
  },
  {
    id: 'svc_housejoy',
    name: 'Housejoy',
    icon: 'home-repair-service',
    color: '#FF6B00',
    isPopular: true,
  },
  {
    id: 'svc_noBroker',
    name: 'NoBroker',
    icon: 'handyman',
    color: '#FF5A5F',
    isPopular: false,
  },
  {
    id: 'svc_local_plumber',
    name: 'Local Plumber',
    icon: 'plumbing',
    color: '#2196F3',
    isPopular: false,
  },
  {
    id: 'svc_local_electrician',
    name: 'Local Electrician',
    icon: 'electrical-services',
    color: '#FFC107',
    isPopular: false,
  },
  {
    id: 'svc_local_carpenter',
    name: 'Local Carpenter',
    icon: 'carpenter',
    color: '#8D6E63',
    isPopular: false,
  },
  {
    id: 'svc_ac_service',
    name: 'AC Service',
    icon: 'ac-unit',
    color: '#00BCD4',
    isPopular: false,
  },
  {
    id: 'svc_pest_control',
    name: 'Pest Control',
    icon: 'pest-control',
    color: '#4CAF50',
    isPopular: false,
  },
  {
    id: 'svc_other',
    name: 'Other',
    icon: 'engineering',
    color: '#6B7280',
    isPopular: false,
  },
];

// Get popular companies
export const getPopularDeliveryCompanies = () => {
  return deliveryCompanies.filter(c => c.isPopular);
};

export const getPopularCabCompanies = () => {
  return cabCompanies.filter(c => c.isPopular);
};

export const getPopularServiceCompanies = () => {
  return serviceCompanies.filter(c => c.isPopular);
};

// Search companies
export const searchDeliveryCompanies = (query) => {
  if (!query) return deliveryCompanies;
  return deliveryCompanies.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const searchCabCompanies = (query) => {
  if (!query) return cabCompanies;
  return cabCompanies.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const searchServiceCompanies = (query) => {
  if (!query) return serviceCompanies;
  return serviceCompanies.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );
};

export default {
  deliveryCompanies,
  cabCompanies,
  serviceCompanies,
  getPopularDeliveryCompanies,
  getPopularCabCompanies,
  getPopularServiceCompanies,
  searchDeliveryCompanies,
  searchCabCompanies,
  searchServiceCompanies,
};