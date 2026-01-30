/**
 * OTP Input Component
 * 
 * Multi-digit OTP input with auto-focus and validation
 */

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';

const OTPInput = forwardRef(({
  // Configuration
  length = 6,
  value = '',
  onChangeText,
  onComplete,
  
  // Validation
  error,
  
  // States
  disabled = false,
  autoFocus = true,
  
  // Styling
  containerStyle,
  inputStyle,
  
  // Accessibility
  accessibilityLabel = 'OTP Input',
  testID,
  
  ...props
}, ref) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(autoFocus ? 0 : -1);
  const inputRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Sync external value with internal state
  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const paddedArray = [...valueArray, ...Array(length - valueArray.length).fill('')];
      setOtp(paddedArray);
    }
  }, [value, length]);

  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    focus: () => inputRefs.current[0]?.focus(),
    blur: () => Keyboard.dismiss(),
    clear: () => {
      setOtp(Array(length).fill(''));
      onChangeText?.('');
      inputRefs.current[0]?.focus();
    },
    getValue: () => otp.join(''),
  }));

  /**
   * Handle digit input
   */
  const handleChange = (text, index) => {
    if (disabled) return;

    // Allow only digits
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChangeText?.(otpString);

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits entered
    if (otpString.length === length && !otpString.includes('')) {
      onComplete?.(otpString);
      Keyboard.dismiss();
    }
  };

  /**
   * Handle backspace
   */
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChangeText?.(newOtp.join(''));
      }
    }
  };

  /**
   * Handle paste
   */
  const handlePaste = (text) => {
    const digits = text.replace(/[^0-9]/g, '').slice(0, length);
    if (digits.length > 0) {
      const newOtp = [...digits.split(''), ...Array(length - digits.length).fill('')];
      setOtp(newOtp);
      onChangeText?.(digits);

      if (digits.length === length) {
        onComplete?.(digits);
        Keyboard.dismiss();
      } else {
        inputRefs.current[digits.length]?.focus();
      }
    }
  };

  /**
   * Handle focus
   */
  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  /**
   * Handle blur
   */
  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  /**
   * Get input style based on state
   */
  const getInputStyle = (index) => {
    const isFocused = focusedIndex === index;
    const hasValue = !!otp[index];
    const hasError = !!error;

    return [
      styles.input,
      isFocused && styles.inputFocused,
      hasValue && styles.inputFilled,
      hasError && styles.inputError,
      disabled && styles.inputDisabled,
      inputStyle,
    ];
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <View style={styles.inputsContainer}>
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onChange={(e) => {
                // Handle paste on Android
                const text = e.nativeEvent.text;
                if (text.length > 1) {
                  handlePaste(text);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              editable={!disabled}
              selectTextOnFocus
              caretHidden
              accessibilityLabel={`${accessibilityLabel} digit ${index + 1}`}
              style={getInputStyle(index)}
              {...props}
            />
          ))}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  input: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.border.main,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.primary,
    textAlign: 'center',
    ...typography.textStyles.h2,
    color: colors.text.primary,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: colors.primary.main,
  },
  inputFilled: {
    borderColor: colors.primary.light,
    backgroundColor: colors.primary.background,
  },
  inputError: {
    borderColor: colors.error.main,
  },
  inputDisabled: {
    backgroundColor: colors.background.tertiary,
    borderColor: colors.border.light,
    color: colors.text.disabled,
  },
  errorText: {
    ...typography.textStyles.inputError,
    color: colors.error.main,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

export default OTPInput;