/**
 * useStorage Hook
 * 
 * Custom hook for async storage operations with state management
 */

import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

/**
 * Hook to manage a value in async storage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if not found in storage
 * @returns {[any, function, boolean, function]} - [value, setValue, isLoading, removeValue]
 */
export const useStorage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load value from storage
   */
  useEffect(() => {
    loadStoredValue();
  }, [key]);

  /**
   * Load stored value
   */
  const loadStoredValue = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const value = await storage.getObject(key);
      
      if (value !== null) {
        setStoredValue(value);
      } else {
        setStoredValue(initialValue);
      }
    } catch (err) {
      console.error(`Error loading ${key} from storage:`, err);
      setError(err);
      setStoredValue(initialValue);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Set value in storage and state
   * @param {any} value - Value to store
   */
  const setValue = useCallback(async (value) => {
    try {
      setError(null);
      
      // Allow value to be a function for updates based on previous value
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to storage
      if (valueToStore === null || valueToStore === undefined) {
        await storage.removeItem(key);
      } else {
        await storage.setObject(key, valueToStore);
      }
      
      return true;
    } catch (err) {
      console.error(`Error saving ${key} to storage:`, err);
      setError(err);
      return false;
    }
  }, [key, storedValue]);

  /**
   * Remove value from storage
   */
  const removeValue = useCallback(async () => {
    try {
      setError(null);
      await storage.removeItem(key);
      setStoredValue(initialValue);
      return true;
    } catch (err) {
      console.error(`Error removing ${key} from storage:`, err);
      setError(err);
      return false;
    }
  }, [key, initialValue]);

  /**
   * Refresh value from storage
   */
  const refresh = useCallback(() => {
    loadStoredValue();
  }, [key]);

  return {
    value: storedValue,
    setValue,
    isLoading,
    error,
    removeValue,
    refresh,
  };
};

/**
 * Hook to manage a string value in async storage
 * @param {string} key - Storage key
 * @param {string} initialValue - Initial value
 * @returns {object} Storage operations
 */
export const useStorageString = (key, initialValue = '') => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      setIsLoading(true);
      const value = await storage.getItem(key);
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (err) {
      console.error(`Error loading ${key}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const setValue = useCallback(async (value) => {
    try {
      setStoredValue(value);
      await storage.setItem(key, value);
      return true;
    } catch (err) {
      console.error(`Error saving ${key}:`, err);
      return false;
    }
  }, [key]);

  const removeValue = useCallback(async () => {
    try {
      await storage.removeItem(key);
      setStoredValue(initialValue);
      return true;
    } catch (err) {
      console.error(`Error removing ${key}:`, err);
      return false;
    }
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    isLoading,
    removeValue,
  };
};

/**
 * Hook to manage a boolean value in async storage
 * @param {string} key - Storage key
 * @param {boolean} initialValue - Initial value
 * @returns {object} Storage operations
 */
export const useStorageBoolean = (key, initialValue = false) => {
  const { value, setValue, isLoading, removeValue } = useStorageString(
    key,
    initialValue.toString()
  );

  const boolValue = value === 'true';

  const setBoolValue = useCallback(async (newValue) => {
    return setValue(newValue.toString());
  }, [setValue]);

  const toggle = useCallback(async () => {
    return setBoolValue(!boolValue);
  }, [boolValue, setBoolValue]);

  return {
    value: boolValue,
    setValue: setBoolValue,
    toggle,
    isLoading,
    removeValue,
  };
};

export default useStorage;