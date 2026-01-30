/**
 * Hooks Index - Central export for all custom hooks
 */

// Core hooks
export { useAuth } from './useAuth';
export { useTheme, useThemedStyles } from './useTheme';
export { useToast } from './useToast';

// Storage hooks
export { useStorage, useStorageString, useStorageBoolean } from './useStorage';

// Network hooks
export { useNetwork, useNetworkEffect } from './useNetwork';

// Utility hooks
export { useDebounce, useDebouncedCallback, useDebouncedSearch } from './useDebounce';
export { useForm } from './useForm';
export { useRefresh } from './useRefresh';
export { useCountdown } from './useCountdown';
export { useKeyboard } from './useKeyboard';
export { useMounted, useSafeState } from './useMounted';
export { useHaptic, HAPTIC_TYPES } from './useHaptic';

// Default export with all hooks
export default {
  useAuth: require('./useAuth').useAuth,
  useTheme: require('./useTheme').useTheme,
  useThemedStyles: require('./useTheme').useThemedStyles,
  useToast: require('./useToast').useToast,
  useStorage: require('./useStorage').useStorage,
  useStorageString: require('./useStorage').useStorageString,
  useStorageBoolean: require('./useStorage').useStorageBoolean,
  useNetwork: require('./useNetwork').useNetwork,
  useNetworkEffect: require('./useNetwork').useNetworkEffect,
  useDebounce: require('./useDebounce').useDebounce,
  useDebouncedCallback: require('./useDebounce').useDebouncedCallback,
  useDebouncedSearch: require('./useDebounce').useDebouncedSearch,
  useForm: require('./useForm').useForm,
  useRefresh: require('./useRefresh').useRefresh,
  useCountdown: require('./useCountdown').useCountdown,
  useKeyboard: require('./useKeyboard').useKeyboard,
  useMounted: require('./useMounted').useMounted,
  useSafeState: require('./useMounted').useSafeState,
  useHaptic: require('./useHaptic').useHaptic,
};