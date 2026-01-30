/**
 * useNetwork Hook
 * 
 * Custom hook for monitoring network connectivity
 */

import { useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * Hook to monitor network connectivity
 * @returns {object} Network state and utilities
 */
export const useNetwork = () => {
  const [networkState, setNetworkState] = useState({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
    isWifi: false,
    isCellular: false,
    details: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch current network state
   */
  const fetchNetworkState = useCallback(async () => {
    try {
      const state = await NetInfo.fetch();
      updateNetworkState(state);
    } catch (error) {
      console.error('Error fetching network state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update network state
   * @param {object} state - Network state from NetInfo
   */
  const updateNetworkState = (state) => {
    setNetworkState({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? false,
      type: state.type,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
      details: state.details,
    });
  };

  /**
   * Subscribe to network changes
   */
  useEffect(() => {
    // Initial fetch
    fetchNetworkState();

    // Subscribe to changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      updateNetworkState(state);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [fetchNetworkState]);

  /**
   * Refresh network state
   */
  const refresh = useCallback(() => {
    setIsLoading(true);
    fetchNetworkState();
  }, [fetchNetworkState]);

  /**
   * Check if network is available for API calls
   */
  const isOnline = networkState.isConnected && networkState.isInternetReachable;

  /**
   * Get connection quality indicator
   * @returns {string} 'good' | 'fair' | 'poor' | 'offline'
   */
  const getConnectionQuality = useCallback(() => {
    if (!networkState.isConnected) return 'offline';
    if (!networkState.isInternetReachable) return 'poor';
    if (networkState.isWifi) return 'good';
    if (networkState.isCellular) {
      const details = networkState.details;
      if (details?.cellularGeneration === '4g' || details?.cellularGeneration === '5g') {
        return 'good';
      }
      if (details?.cellularGeneration === '3g') {
        return 'fair';
      }
      return 'poor';
    }
    return 'fair';
  }, [networkState]);

  return {
    ...networkState,
    isOnline,
    isLoading,
    refresh,
    connectionQuality: getConnectionQuality(),
  };
};

/**
 * Hook that triggers callback when network status changes
 * @param {function} onOnline - Callback when coming online
 * @param {function} onOffline - Callback when going offline
 */
export const useNetworkEffect = (onOnline, onOffline) => {
  const { isOnline } = useNetwork();
  const [wasOnline, setWasOnline] = useState(isOnline);

  useEffect(() => {
    if (isOnline && !wasOnline) {
      // Just came online
      onOnline?.();
    } else if (!isOnline && wasOnline) {
      // Just went offline
      onOffline?.();
    }
    setWasOnline(isOnline);
  }, [isOnline, wasOnline, onOnline, onOffline]);
};

export default useNetwork;