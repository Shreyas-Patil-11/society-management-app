/**
 * Mock Chats Data
 * 
 * Contains chat conversations and messages
 */

// Message status
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
};

// Conversations
export const conversations = [
  {
    id: 'conv_001',
    participants: ['resident_001', 'resident_002'],
    participantDetails: {
      resident_002: {
        id: 'resident_002',
        name: 'Priya Patel',
        flat: 'B-205',
        avatar: null,
        isOnline: true,
      },
    },
    lastMessage: {
      content: 'Sure, I\'ll send it over in 5 mins',
      senderId: 'resident_002',
      timestamp: '2024-01-15T16:30:00Z',
    },
    unreadCount: 2,
    isPinned: false,
    isMuted: false,
    updatedAt: '2024-01-15T16:30:00Z',
  },
  {
    id: 'conv_002',
    participants: ['resident_001', 'resident_003'],
    participantDetails: {
      resident_003: {
        id: 'resident_003',
        name: 'Rahul Verma',
        flat: 'A-302',
        avatar: null,
        isOnline: false,
        lastSeen: '2024-01-15T14:00:00Z',
      },
    },
    lastMessage: {
      content: 'Thanks for the help yesterday!',
      senderId: 'resident_001',
      timestamp: '2024-01-15T10:15:00Z',
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    updatedAt: '2024-01-15T10:15:00Z',
  },
  {
    id: 'conv_003',
    participants: ['resident_001', 'resident_007'],
    participantDetails: {
      resident_007: {
        id: 'resident_007',
        name: 'Karan Malhotra',
        flat: 'C-203',
        avatar: null,
        isOnline: true,
      },
    },
    lastMessage: {
      content: 'See you at the jamming session!',
      senderId: 'resident_007',
      timestamp: '2024-01-14T20:00:00Z',
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    updatedAt: '2024-01-14T20:00:00Z',
  },
  {
    id: 'conv_004',
    participants: ['resident_001', 'resident_004'],
    participantDetails: {
      resident_004: {
        id: 'resident_004',
        name: 'Sneha Gupta',
        flat: 'C-401',
        avatar: null,
        isOnline: false,
        lastSeen: '2024-01-15T12:00:00Z',
      },
    },
    lastMessage: {
      content: 'Is the treadmill still available?',
      senderId: 'resident_001',
      timestamp: '2024-01-15T14:35:00Z',
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    updatedAt: '2024-01-15T14:35:00Z',
  },
  {
    id: 'conv_005',
    participants: ['resident_001', 'resident_006'],
    participantDetails: {
      resident_006: {
        id: 'resident_006',
        name: 'Anita Desai',
        flat: 'A-501',
        avatar: null,
        isOnline: false,
        lastSeen: '2024-01-14T22:00:00Z',
      },
    },
    lastMessage: {
      content: 'I hope you find the bracelet soon',
      senderId: 'resident_001',
      timestamp: '2024-01-14T21:00:00Z',
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    updatedAt: '2024-01-14T21:00:00Z',
  },
];

// Messages for conversations
export const messages = {
  conv_001: [
    {
      id: 'msg_001_001',
      conversationId: 'conv_001',
      senderId: 'resident_001',
      content: 'Hi Priya! Do you have the recipe for that pasta you made last week?',
      timestamp: '2024-01-15T16:00:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_001_002',
      conversationId: 'conv_001',
      senderId: 'resident_002',
      content: 'Hey! Yes, I do. It\'s a simple white sauce pasta.',
      timestamp: '2024-01-15T16:05:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_001_003',
      conversationId: 'conv_001',
      senderId: 'resident_001',
      content: 'Can you share the recipe?',
      timestamp: '2024-01-15T16:10:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_001_004',
      conversationId: 'conv_001',
      senderId: 'resident_002',
      content: 'Sure, I\'ll send it over in 5 mins',
      timestamp: '2024-01-15T16:30:00Z',
      status: MESSAGE_STATUS.DELIVERED,
    },
  ],
  conv_002: [
    {
      id: 'msg_002_001',
      conversationId: 'conv_002',
      senderId: 'resident_003',
      content: 'Hey Amit, are you home? I need to borrow a screwdriver.',
      timestamp: '2024-01-14T18:00:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_002_002',
      conversationId: 'conv_002',
      senderId: 'resident_001',
      content: 'Yes, I\'m home. Come on over!',
      timestamp: '2024-01-14T18:05:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_002_003',
      conversationId: 'conv_002',
      senderId: 'resident_003',
      content: 'Coming now. Thanks!',
      timestamp: '2024-01-14T18:07:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_002_004',
      conversationId: 'conv_002',
      senderId: 'resident_001',
      content: 'Thanks for the help yesterday!',
      timestamp: '2024-01-15T10:15:00Z',
      status: MESSAGE_STATUS.DELIVERED,
    },
  ],
  conv_003: [
    {
      id: 'msg_003_001',
      conversationId: 'conv_003',
      senderId: 'resident_001',
      content: 'Hey Karan! Saw your post about the jamming session. I\'d love to join!',
      timestamp: '2024-01-14T12:30:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_003_002',
      conversationId: 'conv_003',
      senderId: 'resident_007',
      content: 'Awesome! What do you play?',
      timestamp: '2024-01-14T12:45:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_003_003',
      conversationId: 'conv_003',
      senderId: 'resident_001',
      content: 'I play guitar. Mostly acoustic.',
      timestamp: '2024-01-14T13:00:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_003_004',
      conversationId: 'conv_003',
      senderId: 'resident_007',
      content: 'Perfect! We need a guitarist. See you at the jamming session!',
      timestamp: '2024-01-14T20:00:00Z',
      status: MESSAGE_STATUS.READ,
    },
  ],
  conv_004: [
    {
      id: 'msg_004_001',
      conversationId: 'conv_004',
      senderId: 'resident_001',
      content: 'Hi Sneha, saw your post about the treadmill.',
      timestamp: '2024-01-15T14:30:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_004_002',
      conversationId: 'conv_004',
      senderId: 'resident_001',
      content: 'Is the treadmill still available?',
      timestamp: '2024-01-15T14:35:00Z',
      status: MESSAGE_STATUS.DELIVERED,
    },
  ],
  conv_005: [
    {
      id: 'msg_005_001',
      conversationId: 'conv_005',
      senderId: 'resident_001',
      content: 'Hi Anita, I saw your post about the lost bracelet.',
      timestamp: '2024-01-14T20:30:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_005_002',
      conversationId: 'conv_005',
      senderId: 'resident_001',
      content: 'I\'ll keep an eye out for it during my evening walks.',
      timestamp: '2024-01-14T20:32:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_005_003',
      conversationId: 'conv_005',
      senderId: 'resident_006',
      content: 'Thank you so much! It has a lot of sentimental value.',
      timestamp: '2024-01-14T20:45:00Z',
      status: MESSAGE_STATUS.READ,
    },
    {
      id: 'msg_005_004',
      conversationId: 'conv_005',
      senderId: 'resident_001',
      content: 'I hope you find the bracelet soon',
      timestamp: '2024-01-14T21:00:00Z',
      status: MESSAGE_STATUS.READ,
    },
  ],
};

// Get conversations for a user
export const getConversationsByUser = (userId) => {
  return conversations
    .filter(c => c.participants.includes(userId))
    .sort((a, b) => {
      // Pinned first, then by date
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
};

// Get messages for a conversation
export const getMessagesByConversation = (conversationId) => {
  return messages[conversationId] || [];
};

// Get unread count for a user
export const getTotalUnreadCount = (userId) => {
  return conversations
    .filter(c => c.participants.includes(userId))
    .reduce((total, c) => total + c.unreadCount, 0);
};

// Get conversation by ID
export const getConversationById = (conversationId) => {
  return conversations.find(c => c.id === conversationId);
};

// Find or create conversation between two users
export const findConversation = (userId1, userId2) => {
  return conversations.find(c => 
    c.participants.includes(userId1) && c.participants.includes(userId2)
  );
};

export default {
  conversations,
  messages,
  MESSAGE_STATUS,
  getConversationsByUser,
  getMessagesByConversation,
  getTotalUnreadCount,
  getConversationById,
  findConversation,
};