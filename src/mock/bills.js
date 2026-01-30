/**
 * Mock Bills/Payments Data
 * 
 * Contains maintenance bills and payment records
 */

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  PARTIAL: 'partial',
};

// Bill types
export const BILL_TYPES = {
  MAINTENANCE: 'maintenance',
  WATER: 'water',
  ELECTRICITY: 'electricity',
  PARKING: 'parking',
  AMENITY: 'amenity',
  PENALTY: 'penalty',
  OTHER: 'other',
};

// Bills/Dues
export const bills = [
  {
    id: 'bill_001',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    type: BILL_TYPES.MAINTENANCE,
    title: 'Monthly Maintenance',
    description: 'Maintenance charges for January 2024',
    amount: 5500,
    dueDate: '2024-01-31T23:59:59Z',
    billDate: '2024-01-01T00:00:00Z',
    status: PAYMENT_STATUS.PENDING,
    paidAmount: 0,
    paidDate: null,
    invoiceNumber: 'INV-2024-001-A101',
    breakdown: [
      { label: 'Society Maintenance', amount: 4000 },
      { label: 'Sinking Fund', amount: 500 },
      { label: 'Water Charges', amount: 500 },
      { label: 'Common Electricity', amount: 500 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'bill_002',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    type: BILL_TYPES.MAINTENANCE,
    title: 'Monthly Maintenance',
    description: 'Maintenance charges for December 2023',
    amount: 5500,
    dueDate: '2023-12-31T23:59:59Z',
    billDate: '2023-12-01T00:00:00Z',
    status: PAYMENT_STATUS.PAID,
    paidAmount: 5500,
    paidDate: '2023-12-28T14:30:00Z',
    invoiceNumber: 'INV-2023-012-A101',
    transactionId: 'TXN123456789',
    paymentMethod: 'upi',
    breakdown: [
      { label: 'Society Maintenance', amount: 4000 },
      { label: 'Sinking Fund', amount: 500 },
      { label: 'Water Charges', amount: 500 },
      { label: 'Common Electricity', amount: 500 },
    ],
    createdAt: '2023-12-01T00:00:00Z',
  },
  {
    id: 'bill_003',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    type: BILL_TYPES.PARKING,
    title: 'Extra Parking Charges',
    description: 'Additional parking slot charges for Q1 2024',
    amount: 3000,
    dueDate: '2024-01-15T23:59:59Z',
    billDate: '2024-01-01T00:00:00Z',
    status: PAYMENT_STATUS.OVERDUE,
    paidAmount: 0,
    paidDate: null,
    invoiceNumber: 'INV-2024-PKG-001-A101',
    penalty: 150,
    breakdown: [
      { label: 'Parking Slot P-A-13', amount: 3000 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'bill_004',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    building: 'Tower A',
    type: BILL_TYPES.AMENITY,
    title: 'Clubhouse Booking',
    description: 'Clubhouse booking for party on 20th Jan',
    amount: 2500,
    dueDate: '2024-01-20T23:59:59Z',
    billDate: '2024-01-10T00:00:00Z',
    status: PAYMENT_STATUS.PENDING,
    paidAmount: 0,
    paidDate: null,
    invoiceNumber: 'INV-2024-AMN-001-A101',
    breakdown: [
      { label: 'Clubhouse Rental (4 hours)', amount: 2000 },
      { label: 'Cleaning Charges', amount: 500 },
    ],
    createdAt: '2024-01-10T00:00:00Z',
  },
];

// Payment history
export const paymentHistory = [
  {
    id: 'payment_001',
    billId: 'bill_002',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    amount: 5500,
    paymentMethod: 'upi',
    paymentDetails: {
      upiId: 'user@paytm',
      transactionId: 'TXN123456789',
    },
    status: 'success',
    paidAt: '2023-12-28T14:30:00Z',
    receiptNumber: 'RCP-2023-12-001',
    createdAt: '2023-12-28T14:30:00Z',
  },
  {
    id: 'payment_002',
    billId: 'bill_old_001',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    amount: 5500,
    paymentMethod: 'card',
    paymentDetails: {
      cardLast4: '4242',
      cardBrand: 'Visa',
      transactionId: 'TXN987654321',
    },
    status: 'success',
    paidAt: '2023-11-25T10:15:00Z',
    receiptNumber: 'RCP-2023-11-001',
    createdAt: '2023-11-25T10:15:00Z',
  },
  {
    id: 'payment_003',
    billId: 'bill_old_002',
    residentId: 'resident_001',
    flatNumber: 'A-101',
    amount: 5500,
    paymentMethod: 'netbanking',
    paymentDetails: {
      bankName: 'HDFC Bank',
      transactionId: 'TXN456789123',
    },
    status: 'success',
    paidAt: '2023-10-30T16:45:00Z',
    receiptNumber: 'RCP-2023-10-001',
    createdAt: '2023-10-30T16:45:00Z',
  },
];

// Payment methods saved by user
export const paymentMethods = [
  {
    id: 'method_001',
    residentId: 'resident_001',
    type: 'upi',
    label: 'Paytm UPI',
    details: {
      upiId: 'user@paytm',
    },
    isDefault: true,
    createdAt: '2023-06-15T10:00:00Z',
  },
  {
    id: 'method_002',
    residentId: 'resident_001',
    type: 'card',
    label: 'HDFC Credit Card',
    details: {
      cardLast4: '4242',
      cardBrand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2025',
    },
    isDefault: false,
    createdAt: '2023-08-20T14:30:00Z',
  },
  {
    id: 'method_003',
    residentId: 'resident_001',
    type: 'netbanking',
    label: 'ICICI Netbanking',
    details: {
      bankName: 'ICICI Bank',
    },
    isDefault: false,
    createdAt: '2023-09-10T11:00:00Z',
  },
];

// Payment summary for dashboard
export const paymentSummary = {
  residentId: 'resident_001',
  totalDue: 11150,
  overdue: 3150,
  dueThisMonth: 8000,
  lastPaymentDate: '2023-12-28T14:30:00Z',
  lastPaymentAmount: 5500,
};

// Get bills by resident
export const getBillsByResident = (residentId) => {
  return bills.filter(bill => bill.residentId === residentId);
};

// Get pending bills
export const getPendingBills = (residentId) => {
  return bills.filter(bill => 
    bill.residentId === residentId && 
    (bill.status === PAYMENT_STATUS.PENDING || bill.status === PAYMENT_STATUS.OVERDUE)
  );
};

// Get payment history by resident
export const getPaymentHistoryByResident = (residentId) => {
  return paymentHistory.filter(payment => payment.residentId === residentId);
};

// Get payment methods by resident
export const getPaymentMethodsByResident = (residentId) => {
  return paymentMethods.filter(method => method.residentId === residentId);
};

export default {
  bills,
  paymentHistory,
  paymentMethods,
  paymentSummary,
  PAYMENT_STATUS,
  BILL_TYPES,
  getBillsByResident,
  getPendingBills,
  getPaymentHistoryByResident,
  getPaymentMethodsByResident,
};