/**
 * Async Storage Utility
 * Wrapper for @react-native-async-storage/async-storage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store a string value
 * @param {string} key - Storage key
 * @param {string} value - String value to store
 */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    return false;
  }
};

/**
 * Get a string value
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

/**
 * Store an object (JSON stringify)
 * @param {string} key - Storage key
 * @param {object} value - Object to store
 */
export const setObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error storing object ${key}:`, error);
    return false;
  }
};

/**
 * Get an object (JSON parse)
 * @param {string} key - Storage key
 * @returns {object|null} - Parsed object or null
 */
export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting object ${key}:`, error);
    return null;
  }
};

/**
 * Remove a specific item
 * @param {string} key - Storage key
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    return false;
  }
};

/**
 * Remove multiple items
 * @param {string[]} keys - Array of storage keys
 */
export const removeMultiple = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error removing multiple items:', error);
    return false;
  }
};

/**
 * Get multiple items
 * @param {string[]} keys - Array of storage keys
 * @returns {object} - Object with key-value pairs
 */
export const getMultiple = async (keys) => {
  try {
    const result = await AsyncStorage.multiGet(keys);
    const data = {};
    result.forEach(([key, value]) => {
      try {
        data[key] = value ? JSON.parse(value) : null;
      } catch {
        data[key] = value;
      }
    });
    return data;
  } catch (error) {
    console.error('Error getting multiple items:', error);
    return {};
  }
};

/**
 * Set multiple items
 * @param {Array<[string, any]>} keyValuePairs - Array of [key, value] pairs
 */
export const setMultiple = async (keyValuePairs) => {
  try {
    const pairs = keyValuePairs.map(([key, value]) => [
      key,
      typeof value === 'object' ? JSON.stringify(value) : String(value),
    ]);
    await AsyncStorage.multiSet(pairs);
    return true;
  } catch (error) {
    console.error('Error setting multiple items:', error);
    return false;
  }
};

/**
 * Clear all storage
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

/**
 * Get all keys
 * @returns {string[]} - Array of all storage keys
 */
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

/**
 * Check if a key exists
 * @param {string} key - Storage key
 * @returns {boolean}
 */
export const hasKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error(`Error checking key ${key}:`, error);
    return false;
  }
};

/**
 * Merge object with existing stored object
 * @param {string} key - Storage key
 * @param {object} value - Object to merge
 */
export const mergeItem = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error merging ${key}:`, error);
    return false;
  }
};

export const storage = {
  setItem,
  getItem,
  setObject,
  getObject,
  removeItem,
  removeMultiple,
  getMultiple,
  setMultiple,
  clearAll,
  getAllKeys,
  hasKey,
  mergeItem,
};

export default storage;