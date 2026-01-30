/**
 * useRefresh Hook
 * 
 * Custom hook for pull-to-refresh functionality
 */

import { useState, useCallback } from 'react';

/**
 * Hook for managing refresh state
 * @param {function} onRefresh - Async function to call on refresh
 * @param {number} minimumDuration - Minimum refresh duration in ms
 * @returns {object} Refresh state and handler
 */
export const useRefresh = (onRefresh, minimumDuration = 1000) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    
    const startTime = Date.now();
    
    try {
      await onRefresh?.();
    } catch (error) {
      console.error('Refresh error:', error);
    }
    
    // Ensure minimum refresh duration for better UX
    const elapsed = Date.now() - startTime;
    if (elapsed < minimumDuration) {
      await new Promise(resolve => setTimeout(resolve, minimumDuration - elapsed));
    }
    
    setIsRefreshing(false);
  }, [onRefresh, minimumDuration]);

  return {
    isRefreshing,
    onRefresh: handleRefresh,
  };
};

export default useRefresh;