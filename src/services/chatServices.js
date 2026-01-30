/**
 * Chat Service
 * 
 * Handles all chat-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { CHAT_ENDPOINTS } from './api/endpoints';
import {
  conversations,
  messages,
  getConversationsByUser,
  getMessagesByConversation,
  getTotalUnreadCount,
  getConversationById,
  findConversation,
  MESSAGE_STATUS,
} from '../mock/chats';
import { residents } from '../mock/users';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get all conversations
 * 
 * @param {string} userId - User ID
 * @returns {Promise<object>}
 */
export const getConversations = async (userId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(CHAT_ENDPOINTS.CONVERSATIONS);

    await sleep(800);

    const data = getConversationsByUser(userId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get conversations error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get conversations',
      data: [],
    };
  }
};

/**
 * Get conversation details
 * 
 * @param {string} conversationId - Conversation ID
 * @returns {Promise<object>}
 */
export const getConversationDetails = async (conversationId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(CHAT_ENDPOINTS.CONVERSATION_DETAILS(conversationId));

    await sleep(500);

    const conversation = getConversationById(conversationId);

    if (!conversation) {
      return {
        success: false,
        message: 'Conversation not found',
      };
    }

    return {
      success: true,
      data: conversation,
    };
  } catch (error) {
    console.error('Get conversation details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get conversation',
    };
  }
};

/**
 * Get messages for a conversation
 * 
 * @param {string} conversationId - Conversation ID
 * @param {object} options - Pagination options
 * @returns {Promise<object>}
 */
export const getMessages = async (conversationId, options = {}) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(CHAT_ENDPOINTS.MESSAGES(conversationId), { params: options });

    await sleep(600);

    const data = getMessagesByConversation(conversationId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get messages error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get messages',
      data: [],
    };
  }
};

/**
 * Send a message
 * 
 * @param {string} conversationId - Conversation ID
 * @param {string} content - Message content
 * @param {string} type - Message type (text, image, etc.)
 * @returns {Promise<object>}
 */
export const sendMessage = async (conversationId, content, type = 'text') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(CHAT_ENDPOINTS.SEND_MESSAGE(conversationId), { content, type });

    await sleep(500);

    const newMessage = {
      id: `msg_${generateId()}`,
      conversationId,
      senderId: 'resident_001',
      content,
      type,
      timestamp: new Date().toISOString(),
      status: MESSAGE_STATUS.SENT,
    };

    return {
      success: true,
      data: newMessage,
    };
  } catch (error) {
    console.error('Send message error:', error);
    return {
      success: false,
      message: error.message || 'Failed to send message',
    };
  }
};

/**
 * Mark conversation as read
 * 
 * @param {string} conversationId - Conversation ID
 * @returns {Promise<object>}
 */
export const markAsRead = async (conversationId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(CHAT_ENDPOINTS.MARK_READ(conversationId));

    await sleep(300);

    return {
      success: true,
      message: 'Marked as read',
    };
  } catch (error) {
    console.error('Mark as read error:', error);
    return {
      success: false,
      message: error.message || 'Failed to mark as read',
    };
  }
};

/**
 * Create or get conversation with another user
 * 
 * @param {string} otherUserId - Other user's ID
 * @returns {Promise<object>}
 */
export const createConversation = async (otherUserId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(CHAT_ENDPOINTS.CREATE_CONVERSATION, { userId: otherUserId });

    await sleep(800);

    // Check if conversation already exists
    const existingConv = findConversation('resident_001', otherUserId);
    
    if (existingConv) {
      return {
        success: true,
        data: existingConv,
        isExisting: true,
      };
    }

    // Get other user details
    const otherUser = residents.find(r => r.id === otherUserId);

    const newConversation = {
      id: `conv_${generateId()}`,
      participants: ['resident_001', otherUserId],
      participantDetails: {
        [otherUserId]: {
          id: otherUserId,
          name: otherUser?.name || 'Unknown',
          flat: otherUser?.flat || '',
          avatar: otherUser?.avatar || null,
          isOnline: false,
        },
      },
      lastMessage: null,
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newConversation,
      isExisting: false,
    };
  } catch (error) {
    console.error('Create conversation error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create conversation',
    };
  }
};

/**
 * Get total unread messages count
 * 
 * @param {string} userId - User ID
 * @returns {Promise<object>}
 */
export const getUnreadCount = async (userId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    const count = getTotalUnreadCount(userId);

    return {
      success: true,
      data: { count },
    };
  } catch (error) {
    console.error('Get unread count error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get unread count',
      data: { count: 0 },
    };
  }
};

/**
 * Toggle pin conversation
 * 
 * @param {string} conversationId - Conversation ID
 * @param {boolean} pin - True to pin, false to unpin
 * @returns {Promise<object>}
 */
export const togglePin = async (conversationId, pin = true) => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    return {
      success: true,
      message: pin ? 'Conversation pinned' : 'Conversation unpinned',
    };
  } catch (error) {
    console.error('Toggle pin error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update pin',
    };
  }
};

/**
 * Toggle mute conversation
 * 
 * @param {string} conversationId - Conversation ID
 * @param {boolean} mute - True to mute, false to unmute
 * @returns {Promise<object>}
 */
export const toggleMute = async (conversationId, mute = true) => {
  try {
    // TODO: Replace with actual API call

    await sleep(300);

    return {
      success: true,
      message: mute ? 'Conversation muted' : 'Conversation unmuted',
    };
  } catch (error) {
    console.error('Toggle mute error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update mute',
    };
  }
};

export const chatService = {
  getConversations,
  getConversationDetails,
  getMessages,
  sendMessage,
  markAsRead,
  createConversation,
  getUnreadCount,
  togglePin,
  toggleMute,
  MESSAGE_STATUS,
};

export default chatService;