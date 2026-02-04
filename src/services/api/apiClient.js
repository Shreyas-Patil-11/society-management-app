
/**
 * API Client
 * src/services/api/apiClient.js
 * FIXED: Handles both Full URLs (from endpoints.js) and Relative Paths (from new services)
 */

import { API_CONFIG } from '../../config/appConfig';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Helper to handle errors
const handleApiError = (error) => {
  console.error('[API Error]', error);
  if (error.response) {
    return { success: false, status: error.response.status, message: error.response.data?.message || 'Server Error' };
  }
  return { success: false, message: error.message || 'Network Error' };
};

export const apiRequest = async (endpoint, options = {}) => {
  const { method = HTTP_METHODS.GET, data = null, requiresAuth = true } = options;

  let url;

  // FIX: Check if endpoint is already a full URL
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    url = endpoint;
  } else {
    // If relative path, prepend Base URL
    const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ''); 
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    url = `${baseUrl}${path}`;
  }

  try {
    // 2. Get Token
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (requiresAuth) {
      const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. Configure Request
    const config = { method, headers };
    if (data) config.body = JSON.stringify(data);

    console.log(`[API CLIENT] ${method}: ${url}`);

    // 4. Execute Fetch
    const response = await fetch(url, config);
    const responseData = await response.json().catch(() => ({})); 

    if (!response.ok) {
      throw { response: { status: response.status, data: responseData } };
    }

    return { success: true, data: responseData };

  } catch (error) {
    return handleApiError(error);
  }
};

// Convenience methods
export const apiClient = {
  get: (url) => apiRequest(url, { method: HTTP_METHODS.GET }),
  post: (url, data) => apiRequest(url, { method: HTTP_METHODS.POST, data }),
  put: (url, data) => apiRequest(url, { method: HTTP_METHODS.PUT, data }),
  delete: (url) => apiRequest(url, { method: HTTP_METHODS.DELETE }),
};

export default apiClient;