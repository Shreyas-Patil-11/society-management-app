/**
 * useToast Hook
 * 
 * Custom hook for accessing toast context
 */

import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * Hook to access toast context
 * @returns {object} Toast context value
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export default useToast;