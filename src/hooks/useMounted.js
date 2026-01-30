/**
 * useMounted Hook
 * 
 * Custom hook to track if component is mounted
 * Useful for preventing state updates on unmounted components
 */

import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook to check if component is mounted
 * @returns {function} Function that returns true if mounted
 */
export const useMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};

/**
 * Hook to run callback only when mounted
 * @returns {function} Safe setState that only runs when mounted
 */
export const useSafeState = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const isMounted = useMounted();

  const setSafeState = useCallback((value) => {
    if (isMounted()) {
      setState(value);
    }
  }, [isMounted]);

  return [state, setSafeState];
};

import { useState } from 'react';

export default useMounted;