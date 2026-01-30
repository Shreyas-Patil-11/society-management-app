/**
 * Mock Posts Data
 * 
 * Contains community posts, likes, and comments
 */

// Post types
export const POST_TYPES = {
  GENERAL: 'general',
  ANNOUNCEMENT: 'announcement',
  EVENT: 'event',
  MARKETPLACE: 'marketplace',
  RECOMMENDATION: 'recommendation',
  LOST_FOUND: 'lost_found',
  HELP: 'help',
};

export const posts = [
  {
    id: 'post_001',
    authorId: 'resident_003',
    authorName: 'Rahul Verma',
    authorFlat: 'A-302',
    authorAvatar: null,
    type: POST_TYPES.GENERAL,
    content: 'Beautiful sunset view from Tower A terrace today! 🌅 Love living in this society.',
    images: [],
    likes: 24,
    comments: 5,
    isLiked: true,
    createdAt: '2024-01-15T17:30:00Z',
  },
  {
    id: 'post_002',
    authorId: 'resident_004',
    authorName: 'Sneha Gupta',
    authorFlat: 'C-401',
    authorAvatar: null,
    type: POST_TYPES.MARKETPLACE,
    content: 'Selling my barely used treadmill. 1 year old, excellent condition. Bought for ₹45,000, selling for ₹25,000. DM if interested.',
    images: [],
    likes: 8,
    comments: 12,
    isLiked: false,
    price: 25000,
    createdAt: '2024-01-15T14:00:00Z',
  },
  {
    id: 'post_003',
    authorId: 'resident_002',
    authorName: 'Priya Patel',
    authorFlat: 'B-205',
    authorAvatar: null,
    type: POST_TYPES.RECOMMENDATION,
    content: 'Can anyone recommend a good maid for daily cleaning? Our current one is leaving. Need someone reliable for morning hours (8-10 AM).',
    images: [],
    likes: 3,
    comments: 8,
    isLiked: false,
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'post_004',
    authorId: 'resident_006',
    authorName: 'Anita Desai',
    authorFlat: 'A-501',
    authorAvatar: null,
    type: POST_TYPES.LOST_FOUND,
    content: '🔴 LOST: Gold bracelet with small diamond studs. Lost somewhere near the garden area yesterday evening. Has sentimental value. Please contact if found. Reward offered.',
    images: [],
    likes: 15,
    comments: 3,
    isLiked: true,
    isUrgent: true,
    createdAt: '2024-01-14T20:00:00Z',
  },
  {
    id: 'post_005',
    authorId: 'resident_007',
    authorName: 'Karan Malhotra',
    authorFlat: 'C-203',
    authorAvatar: null,
    type: POST_TYPES.EVENT,
    content: '🎸 Jamming session this Saturday at my place! If you play any instrument or just love music, you are welcome. Starting at 6 PM. BYOB 🍺',
    images: [],
    likes: 32,
    comments: 15,
    isLiked: true,
    eventDate: '2024-01-20T18:00:00Z',
    createdAt: '2024-01-14T12:00:00Z',
  },
  {
    id: 'post_006',
    authorId: 'resident_001',
    authorName: 'Amit Sharma',
    authorFlat: 'A-101',
    authorAvatar: null,
    type: POST_TYPES.HELP,
    content: 'Does anyone have a car jack I can borrow for a few hours? Need to change a flat tire. Will return immediately after use.',
    images: [],
    likes: 2,
    comments: 6,
    isLiked: false,
    createdAt: '2024-01-13T16:00:00Z',
  },
  {
    id: 'post_007',
    authorId: 'resident_008',
    authorName: 'Meera Reddy',
    authorFlat: 'B-304',
    authorAvatar: null,
    type: POST_TYPES.ANNOUNCEMENT,
    content: '📚 Starting a weekend book club! First meeting next Sunday at 4 PM in the clubhouse. We will be discussing "Atomic Habits". All book lovers welcome!',
    images: [],
    likes: 18,
    comments: 9,
    isLiked: true,
    createdAt: '2024-01-12T10:00:00Z',
  },
];

// Post comments
export const postComments = [
  {
    id: 'pcomment_001',
    postId: 'post_001',
    authorId: 'resident_002',
    authorName: 'Priya Patel',
    authorFlat: 'B-205',
    content: 'Amazing view! I should visit the terrace more often.',
    likes: 3,
    createdAt: '2024-01-15T17:45:00Z',
  },
    {
    id: 'pcomment_002',
    postId: 'post_001',
    authorId: 'resident_004',
    authorName: 'Sneha Gupta',
    authorFlat: 'C-401',
    content: 'One of the best things about this society! 😍',
    likes: 2,
    createdAt: '2024-01-15T17:50:00Z',
  },
  {
    id: 'pcomment_003',
    postId: 'post_002',
    authorId: 'resident_001',
    authorName: 'Amit Sharma',
    authorFlat: 'A-101',
    content: 'Is it still available? Which brand is it?',
    likes: 0,
    createdAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'pcomment_004',
    postId: 'post_002',
    authorId: 'resident_004',
    authorName: 'Sneha Gupta',
    authorFlat: 'C-401',
    content: '@Amit Sharma Yes, it\'s available. It\'s a Powermax TDM-100S. DM me for more details.',
    likes: 1,
    createdAt: '2024-01-15T14:45:00Z',
  },
  {
    id: 'pcomment_005',
    postId: 'post_003',
    authorId: 'resident_006',
    authorName: 'Anita Desai',
    authorFlat: 'A-501',
    content: 'I can share the contact of my maid. She has a sister looking for work. Very reliable family.',
    likes: 4,
    createdAt: '2024-01-15T09:30:00Z',
  },
  {
    id: 'pcomment_006',
    postId: 'post_003',
    authorId: 'resident_002',
    authorName: 'Priya Patel',
    authorFlat: 'B-205',
    content: '@Anita Desai That would be great! Please share the number.',
    likes: 0,
    createdAt: '2024-01-15T09:45:00Z',
  },
  {
    id: 'pcomment_007',
    postId: 'post_005',
    authorId: 'resident_001',
    authorName: 'Amit Sharma',
    authorFlat: 'A-101',
    content: 'Count me in! I play guitar 🎸',
    likes: 3,
    createdAt: '2024-01-14T12:30:00Z',
  },
  {
    id: 'pcomment_008',
    postId: 'post_005',
    authorId: 'resident_003',
    authorName: 'Rahul Verma',
    authorFlat: 'A-302',
    content: 'I\'ll bring my keyboard! This is going to be fun!',
    likes: 2,
    createdAt: '2024-01-14T13:00:00Z',
  },
  {
    id: 'pcomment_009',
    postId: 'post_006',
    authorId: 'resident_007',
    authorName: 'Karan Malhotra',
    authorFlat: 'C-203',
    content: 'I have one. You can pick it up from my flat anytime.',
    likes: 1,
    createdAt: '2024-01-13T16:15:00Z',
  },
  {
    id: 'pcomment_010',
    postId: 'post_006',
    authorId: 'resident_001',
    authorName: 'Amit Sharma',
    authorFlat: 'A-101',
    content: '@Karan Malhotra Thanks a lot! Coming over now.',
    likes: 0,
    createdAt: '2024-01-13T16:20:00Z',
  },
];

// Get all posts
export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Get posts by type
export const getPostsByType = (type) => {
  return posts.filter(p => p.type === type);
};

// Get posts by author
export const getPostsByAuthor = (authorId) => {
  return posts.filter(p => p.authorId === authorId);
};

// Get comments for a post
export const getCommentsByPost = (postId) => {
  return postComments.filter(c => c.postId === postId);
};

// Get user's liked posts
export const getLikedPosts = () => {
  return posts.filter(p => p.isLiked);
};

export default {
  posts,
  postComments,
  POST_TYPES,
  getAllPosts,
  getPostsByType,
  getPostsByAuthor,
  getCommentsByPost,
  getLikedPosts,
};