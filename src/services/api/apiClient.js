/**
 * API Client
 * 
 * Centralized HTTP client for making API requests
 * Currently returns mock data, ready for backend integration
 */

// import { API_CONFIG } from '../../config/appConfig';
// import { storage } from '../../utils/storage';
// import { STORAGE_KEYS } from '../../utils/constants';

// /**
//  * HTTP Methods
//  */
// export const HTTP_METHODS = {
//   GET: 'GET',
//   POST: 'POST',
//   PUT: 'PUT',
//   PATCH: 'PATCH',
//   DELETE: 'DELETE',
// };

// /**
//  * API Response Status
//  */
// export const API_STATUS = {
//   SUCCESS: 'success',
//   ERROR: 'error',
// };

// /**
//  * Create standard response object
//  */
// const createResponse = (success, data = null, message = '', error = null) => ({
//   success,
//   status: success ? API_STATUS.SUCCESS : API_STATUS.ERROR,
//   data,
//   message,
//   error,
//   timestamp: new Date().toISOString(),
// });

// /**
//  * Get authorization headers
//  */
// const getAuthHeaders = async () => {
//   const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * Handle API errors
//  */
// const handleApiError = (error) => {
//   console.error('API Error:', error);

//   if (error.response) {
//     // Server responded with error
//     const { status, data } = error.response;
    
//     switch (status) {
//       case 400:
//         return createResponse(false, null, data?.message || 'Bad Request', 'VALIDATION_ERROR');
//       case 401:
//         return createResponse(false, null, 'Session expired. Please login again.', 'UNAUTHORIZED');
//       case 403:
//         return createResponse(false, null, 'You do not have permission.', 'FORBIDDEN');
//       case 404:
//         return createResponse(false, null, 'Resource not found.', 'NOT_FOUND');
//       case 500:
//         return createResponse(false, null, 'Server error. Please try again later.', 'SERVER_ERROR');
//       default:
//         return createResponse(false, null, data?.message || 'Something went wrong.', 'UNKNOWN_ERROR');
//     }
//   }

//   if (error.request) {
//     // Network error
//     return createResponse(false, null, 'Network error. Please check your connection.', 'NETWORK_ERROR');
//   }

//   // Other errors
//   return createResponse(false, null, error.message || 'An unexpected error occurred.', 'UNKNOWN_ERROR');
// };

// /**
//  * Make API request
//  * 
//  * @param {string} url - API endpoint URL
//  * @param {object} options - Request options
//  * @returns {Promise<object>} - API response
//  */
// export const apiRequest = async (url, options = {}) => {
//   const {
//     method = HTTP_METHODS.GET,
//     data = null,
//     headers = {},
//     timeout = API_CONFIG.TIMEOUT,
//     requiresAuth = true,
//   } = options;

//   try {
//     // TODO: Uncomment when backend is ready
//     /*
//     const authHeaders = requiresAuth ? await getAuthHeaders() : {};
    
//     const config = {
//       method,
//       headers: {
//         ...API_CONFIG.DEFAULT_HEADERS,
//         ...authHeaders,
//         ...headers,
//       },
//       timeout,
//     };

//     if (data && (method === HTTP_METHODS.POST || method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH)) {
//       config.body = JSON.stringify(data);
//     }

//     const response = await fetch(url, config);
//     const responseData = await response.json();

//     if (!response.ok) {
//       throw { response: { status: response.status, data: responseData } };
//     }

//     return createResponse(true, responseData.data, responseData.message || 'Success');
//     */

//     // For now, simulate network delay and return mock success
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     console.log(`[API Mock] ${method} ${url}`, data);
    
//     return createResponse(true, null, 'Mock API call successful');
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// /**
//  * GET request
//  */
// export const get = async (url, options = {}) => {
//   return apiRequest(url, { ...options, method: HTTP_METHODS.GET });
// };

// /**
//  * POST request
//  */
// export const post = async (url, data, options = {}) => {
//   return apiRequest(url, { ...options, method: HTTP_METHODS.POST, data });
// };

// /**
//  * PUT request
//  */
// export const put = async (url, data, options = {}) => {
//   return apiRequest(url, { ...options, method: HTTP_METHODS.PUT, data });
// };

// /**
//  * PATCH request
//  */
// export const patch = async (url, data, options = {}) => {
//   return apiRequest(url, { ...options, method: HTTP_METHODS.PATCH, data });
// };

// /**
//  * DELETE request
//  */
// export const del = async (url, options = {}) => {
//   return apiRequest(url, { ...options, method: HTTP_METHODS.DELETE });
// };

// /**
//  * Upload file
//  */
// export const uploadFile = async (url, file, options = {}) => {
//   try {
//     // TODO: Implement file upload when backend is ready
//     /*
//     const formData = new FormData();
//     formData.append('file', {
//       uri: file.uri,
//       type: file.type,
//       name: file.name,
//     });

//     const authHeaders = await getAuthHeaders();
    
//     const response = await fetch(url, {
//       method: HTTP_METHODS.POST,
//       headers: {
//         ...authHeaders,
//         'Content-Type': 'multipart/form-data',
//         ...options.headers,
//       },
//       body: formData,
//     });

//     const responseData = await response.json();
    
//     if (!response.ok) {
//       throw { response: { status: response.status, data: responseData } };
//     }

//     return createResponse(true, responseData.data, 'File uploaded successfully');
//     */

//     await new Promise(resolve => setTimeout(resolve, 1000));
//     console.log('[API Mock] File upload:', file);
    
//     return createResponse(true, { url: 'https://example.com/uploaded-file.jpg' }, 'File uploaded successfully');
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// export const apiClient = {
//   request: apiRequest,
//   get,
//   post,
//   put,
//   patch,
//   delete: del,
//   uploadFile,
//   HTTP_METHODS,
//   API_STATUS,
// };

// export default apiClient;

/**
 * API Client
 * src/services/api/apiClient.js
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

export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const createResponse = (success, data = null, message = '', error = null) => ({
  success,
  status: success ? API_STATUS.SUCCESS : API_STATUS.ERROR,
  data,
  message,
  error,
  timestamp: new Date().toISOString(),
});

const getAuthHeaders = async () => {
  const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleApiError = (error) => {
  console.error('API Error:', error);

  // Handle Abort/Timeout errors explicitly
  if (error.name === 'AbortError' || error.message === 'Aborted') {
    return createResponse(false, null, 'Request timed out. Server unreachable.', 'TIMEOUT_ERROR');
  }

  // Server responded with error status
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400: return createResponse(false, null, data?.message || 'Bad Request', 'VALIDATION_ERROR');
      case 401: return createResponse(false, null, 'Session expired.', 'UNAUTHORIZED');
      case 403: return createResponse(false, null, 'Permission denied.', 'FORBIDDEN');
      case 404: return createResponse(false, null, 'Resource not found.', 'NOT_FOUND');
      case 500: return createResponse(false, null, 'Server error.', 'SERVER_ERROR');
      default: return createResponse(false, null, data?.message || 'Unknown error.', 'UNKNOWN_ERROR');
    }
  }

  // Network or other errors
  return createResponse(false, null, error.message || 'Network error.', 'NETWORK_ERROR');
};

export const apiRequest = async (url, options = {}) => {
  const {
    method = HTTP_METHODS.GET,
    data = null,
    headers = {},
    timeout = 50000, // Default 10 seconds timeout
    requiresAuth = true,
  } = options;

  // AbortController for Timeout Handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const authHeaders = requiresAuth ? await getAuthHeaders() : {};
    
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...authHeaders,
        ...headers,
      },
      signal: controller.signal, // Attach signal
    };

    if (data && [HTTP_METHODS.POST, HTTP_METHODS.PUT, HTTP_METHODS.PATCH].includes(method)) {
      config.body = JSON.stringify(data);
    }

    // EXECUTE FETCH
    console.log(`[API CLIENT] Sending ${method} request to: ${url}`);
    console.log('[API CLIENT] Data:', data);
    const response = await fetch(url, config);
    clearTimeout(timeoutId); // Clear timeout on response

    // Parse JSON
    const responseData = await response.json();

    if (!response.ok) {
      throw { response: { status: response.status, data: responseData } };
    }

    return createResponse(true, responseData, 'Success');

  } catch (error) {
    clearTimeout(timeoutId); // Ensure timeout is cleared
    return handleApiError(error);
  }
};

export const get = (url, options = {}) => apiRequest(url, { ...options, method: HTTP_METHODS.GET });
export const post = (url, data, options = {}) => apiRequest(url, { ...options, method: HTTP_METHODS.POST, data });
export const put = (url, data, options = {}) => apiRequest(url, { ...options, method: HTTP_METHODS.PUT, data });
export const patch = (url, data, options = {}) => apiRequest(url, { ...options, method: HTTP_METHODS.PATCH, data });
export const del = (url, options = {}) => apiRequest(url, { ...options, method: HTTP_METHODS.DELETE });

export const apiClient = {
  request: apiRequest,
  get,
  post,
  put,
  patch,
  delete: del,
  HTTP_METHODS,
  API_STATUS,
};

export default apiClient;