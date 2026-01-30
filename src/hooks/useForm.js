/**
 * useForm Hook
 * 
 * Custom hook for form state management and validation
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * Hook for managing form state
 * @param {object} initialValues - Initial form values
 * @param {function} validate - Validation function
 * @param {function} onSubmit - Submit handler
 * @returns {object} Form state and handlers
 */
export const useForm = (initialValues = {}, validate = null, onSubmit = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handle field value change
   */
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  }, [errors]);

  /**
   * Handle field blur
   */
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: validationErrors[name],
        }));
      }
    }
  }, [values, validate]);

  /**
   * Set field value directly
   */
  const setFieldValue = useCallback((name, value) => {
    handleChange(name, value);
  }, [handleChange]);

  /**
   * Set field error directly
   */
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  /**
   * Set field touched directly
   */
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched,
    }));
  }, []);

  /**
   * Set multiple values at once
   */
  const setMultipleValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  /**
   * Validate all fields
   */
  const validateForm = useCallback(() => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    setIsSubmitted(true);

    const isValid = validateForm();

    if (!isValid) {
      return false;
    }

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        return true;
      } catch (error) {
        console.error('Form submission error:', error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    }

    return true;
  }, [values, validateForm, onSubmit]);

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, [initialValues]);

  /**
   * Check if form is valid
   */
  const isValid = useMemo(() => {
    if (!validate) return true;
    const validationErrors = validate(values);
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  /**
   * Check if form is dirty (has changes)
   */
  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  /**
   * Get field props for input component
   */
  const getFieldProps = useCallback((name) => ({
    value: values[name] || '',
    onChangeText: (value) => handleChange(name, value),
    onBlur: () => handleBlur(name),
    error: touched[name] ? errors[name] : null,
  }), [values, errors, touched, handleChange, handleBlur]);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    isValid,
    isDirty,

    // Handlers
    handleChange,
    handleBlur,
    handleSubmit,
    
    // Setters
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setMultipleValues,
    setValues,
    setErrors,
    
    // Utilities
    validateForm,
    resetForm,
    getFieldProps,
  };
};

export default useForm;