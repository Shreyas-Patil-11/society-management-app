/**
 * Community Service
 * 
 * Handles all community/social-related API calls
 * Currently uses mock data, ready for backend integration
 */

import { apiClient } from './api';
import { COMMUNITY_ENDPOINTS } from './api/endpoints';
import {
  posts,
  postComments,
  getAllPosts,
  getPostsByType,
  getPostsByAuthor,
  getCommentsByPost,
  POST_TYPES,
} from '../mock/posts';
import { residents } from '../mock/users';
import { sleep, generateId } from '../utils/helpers';

/**
 * Get all posts
 * 
 * @param {object} filters - Filter options
 * @returns {Promise<object>}
 */
export const getPosts = async (filters = {}) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(COMMUNITY_ENDPOINTS.POSTS, { params: filters });

    await sleep(800);

    let data = getAllPosts();

    // Apply filters
    if (filters.type) {
      data = data.filter(p => p.type === filters.type);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get posts error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get posts',
      data: [],
    };
  }
};

/**
 * Get post details
 * 
 * @param {string} postId - Post ID
 * @returns {Promise<object>}
 */
export const getPostDetails = async (postId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(COMMUNITY_ENDPOINTS.POST_DETAILS(postId));

    await sleep(500);

    const post = posts.find(p => p.id === postId);

    if (!post) {
      return {
        success: false,
        message: 'Post not found',
      };
    }

    const comments = getCommentsByPost(postId);

    return {
      success: true,
      data: {
        ...post,
        comments,
      },
    };
  } catch (error) {
    console.error('Get post details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get post details',
    };
  }
};

/**
 * Create a new post
 * 
 * @param {object} postData - Post details
 * @returns {Promise<object>}
 */
export const createPost = async (postData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(COMMUNITY_ENDPOINTS.CREATE_POST, postData);

    await sleep(1200);

    const newPost = {
      id: `post_${generateId()}`,
      authorId: 'resident_001',
      authorName: 'Amit Sharma',
      authorFlat: 'A-101',
      authorAvatar: null,
      ...postData,
      likes: 0,
      comments: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newPost,
      message: 'Post created successfully',
    };
  } catch (error) {
    console.error('Create post error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create post',
    };
  }
};

/**
 * Like/Unlike a post
 * 
 * @param {string} postId - Post ID
 * @param {boolean} like - True to like, false to unlike
 * @returns {Promise<object>}
 */
export const toggleLike = async (postId, like = true) => {
  try {
    // TODO: Replace with actual API call
    // const endpoint = like ? COMMUNITY_ENDPOINTS.LIKE_POST(postId) : COMMUNITY_ENDPOINTS.UNLIKE_POST(postId);
    // const response = await apiClient.post(endpoint);

    await sleep(300);

    return {
      success: true,
      message: like ? 'Post liked' : 'Post unliked',
    };
  } catch (error) {
    console.error('Toggle like error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update like',
    };
  }
};

/**
 * Add comment to post
 * 
 * @param {string} postId - Post ID
 * @param {string} content - Comment content
 * @returns {Promise<object>}
 */
export const addComment = async (postId, content) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.post(COMMUNITY_ENDPOINTS.ADD_COMMENT(postId), { content });

    await sleep(800);

    const newComment = {
      id: `pcomment_${generateId()}`,
      postId,
      authorId: 'resident_001',
      authorName: 'Amit Sharma',
      authorFlat: 'A-101',
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newComment,
      message: 'Comment added',
    };
  } catch (error) {
    console.error('Add comment error:', error);
    return {
      success: false,
      message: error.message || 'Failed to add comment',
    };
  }
};

/**
 * Delete post
 * 
 * @param {string} postId - Post ID
 * @returns {Promise<object>}
 */
export const deletePost = async (postId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.delete(COMMUNITY_ENDPOINTS.DELETE_POST(postId));

    await sleep(800);

    return {
      success: true,
      message: 'Post deleted',
    };
  } catch (error) {
    console.error('Delete post error:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete post',
    };
  }
};

/**
 * Get my posts
 * 
 * @param {string} authorId - Author ID
 * @returns {Promise<object>}
 */
export const getMyPosts = async (authorId = 'resident_001') => {
  try {
    // TODO: Replace with actual API call

    await sleep(600);

    const data = getPostsByAuthor(authorId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get my posts error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get my posts',
      data: [],
    };
  }
};

/**
 * Get residents list
 * 
 * @param {string} societyId - Society ID
 * @returns {Promise<object>}
 */
export const getResidents = async (societyId = 'society_001') => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(COMMUNITY_ENDPOINTS.RESIDENTS);

    await sleep(800);

    // Filter residents by society (mock)
    const data = residents
      .filter(r => r.societyId === societyId)
      .map(r => ({
        id: r.id,
        name: r.name,
        flat: r.flat,
        building: r.building,
        avatar: r.avatar,
        phone: r.phone,
      }));

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get residents error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get residents',
      data: [],
    };
  }
};

/**
 * Get resident details
 * 
 * @param {string} residentId - Resident ID
 * @returns {Promise<object>}
 */
export const getResidentDetails = async (residentId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(COMMUNITY_ENDPOINTS.RESIDENT_DETAILS(residentId));

    await sleep(500);

    const resident = residents.find(r => r.id === residentId);

    if (!resident) {
      return {
        success: false,
        message: 'Resident not found',
      };
    }

    // Return limited info for privacy
    return {
      success: true,
      data: {
        id: resident.id,
        name: resident.name,
        flat: resident.flat,
        building: resident.building,
        avatar: resident.avatar,
        moveInDate: resident.moveInDate,
      },
    };
  } catch (error) {
    console.error('Get resident details error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get resident details',
    };
  }
};

export const communityService = {
  getPosts,
  getPostDetails,
  createPost,
  toggleLike,
  addComment,
  deletePost,
  getMyPosts,
  getResidents,
  getResidentDetails,
  POST_TYPES,
};

export default communityService;