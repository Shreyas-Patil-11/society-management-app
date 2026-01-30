/**
 * useCountdown Hook
 * 
 * Custom hook for countdown timer (OTP resend, etc.)
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for countdown timer
 * @param {number} initialSeconds - Initial countdown seconds
 * @param {function} onComplete - Callback when countdown completes
 * @returns {object} Countdown state and controls
 */
export const useCountdown = (initialSeconds = 30, onComplete = null) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  /**
   * Clear interval
   */
  const clearCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Start countdown
   */
  const start = useCallback((startSeconds = initialSeconds) => {
    clearCountdown();
    setSeconds(startSeconds);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearCountdown();
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialSeconds, onComplete, clearCountdown]);

  /**
   * Stop countdown
   */
  const stop = useCallback(() => {
    clearCountdown();
    setIsRunning(false);
  }, [clearCountdown]);

  /**
   * Reset countdown
   */
  const reset = useCallback((resetSeconds = initialSeconds) => {
    clearCountdown();
    setSeconds(resetSeconds);
    setIsRunning(false);
  }, [initialSeconds, clearCountdown]);

  /**
   * Restart countdown
   */
  const restart = useCallback((restartSeconds = initialSeconds) => {
    start(restartSeconds);
  }, [initialSeconds, start]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => clearCountdown();
  }, [clearCountdown]);

  /**
   * Format seconds to MM:SS
   */
  const formatted = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return {
    seconds,
    formatted,
    isRunning,
    isComplete: seconds === 0 && !isRunning,
    start,
    stop,
    reset,
    restart,
  };
};

export default useCountdown;