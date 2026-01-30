/**
 * Input Component
 * 
 * Reusable text input with label, error, and icon support
 */

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';

const Input = forwardRef(({
  // Value
  value,
  onChangeText,
  defaultValue,
  
  // Label & Placeholder
  label,
  placeholder,
  floatingLabel = false,
  
  // Type
  type = 'text', // 'text', 'email', 'phone', 'password', 'number'
  secureTextEntry = false,
  
  // Icons
  leftIcon,
  rightIcon,
  onRightIconPress,
  
  // Validation
  error,
  touched = true,
  helperText,
  required = false,
  
  // States
  disabled = false,
  editable = true,
  
  // Styling
  containerStyle,
  inputStyle,
  labelStyle,
  
  // Behavior
  autoCapitalize,
  autoComplete,
  keyboardType,
  returnKeyType,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  
  // Events
  onFocus,
  onBlur,
  onSubmitEditing,
  
  // Accessibility
  accessibilityLabel,
  testID,
  
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry || type === 'password');
  const inputRef = useRef(null);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Expose focus/blur methods via ref
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
    isFocused: () => inputRef.current?.isFocused(),
  }));

  /**
   * Get keyboard type based on input type
   */
  const getKeyboardType = () => {
    if (keyboardType) return keyboardType;
    
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  };

  /**
   * Get auto capitalize based on input type
   */
  const getAutoCapitalize = () => {
    if (autoCapitalize) return autoCapitalize;
    
    switch (type) {
      case 'email':
      case 'password':
        return 'none';
      default:
        return 'sentences';
    }
  };

  /**
   * Handle focus event
   */
  const handleFocus = (e) => {
    setIsFocused(true);
    
    if (floatingLabel) {
      Animated.timing(animatedLabel, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    
    onFocus?.(e);
  };

  /**
   * Handle blur event
   */
  const handleBlur = (e) => {
    setIsFocused(false);
    
    if (floatingLabel && !value) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    
    onBlur?.(e);
  };

  /**
   * Toggle password visibility
   */
  const toggleSecure = () => {
    setIsSecure(!isSecure);
  };

  /**
   * Get border color based on state
   */
  const getBorderColor = () => {
    if (error && touched) return colors.error.main;
    if (isFocused) return colors.primary.main;
    if (disabled) return colors.border.light;
    return colors.border.main;
  };

  /**
   * Render label
   */
  const renderLabel = () => {
    if (!label) return null;

    if (floatingLabel) {
      const labelTop = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [14, -8],
      });

      const labelSize = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 12],
      });

      return (
        <Animated.Text
          style={[
            styles.floatingLabel,
            {
              top: labelTop,
              fontSize: labelSize,
              color: isFocused ? colors.primary.main : colors.text.secondary,
              backgroundColor: colors.background.primary,
            },
            error && touched && { color: colors.error.main },
            labelStyle,
          ]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Animated.Text>
      );
    }

    return (
      <Text
        style={[
          styles.label,
          error && touched && { color: colors.error.main },
          labelStyle,
        ]}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
    );
  };

  /**
   * Render helper text or error
   */
  const renderHelper = () => {
    if (error && touched) {
      return (
        <View style={styles.helperContainer}>
          <Icon name="error-outline" size={14} color={colors.error.main} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (helperText) {
      return <Text style={styles.helperText}>{helperText}</Text>;
    }

    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!floatingLabel && renderLabel()}
      
      <View
        style={[
          styles.inputContainer,
          { borderColor: getBorderColor() },
          isFocused && styles.inputFocused,
          disabled && styles.inputDisabled,
          multiline && { height: 'auto', minHeight: 48 * numberOfLines },
          error && touched && styles.inputError,
        ]}>
        {floatingLabel && renderLabel()}
        
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary.main : colors.icon.secondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          placeholder={floatingLabel ? '' : placeholder}
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry={isSecure}
          editable={!disabled && editable}
          keyboardType={getKeyboardType()}
          autoCapitalize={getAutoCapitalize()}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          accessibilityLabel={accessibilityLabel || label}
          testID={testID}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || type === 'password') && styles.inputWithRightIcon,
            multiline && styles.multilineInput,
            disabled && styles.disabledInput,
            inputStyle,
          ]}
          {...props}
        />
        
        {(type === 'password' || rightIcon) && (
          <TouchableOpacity
            onPress={type === 'password' ? toggleSecure : onRightIconPress}
            style={styles.rightIconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Icon
              name={
                type === 'password'
                  ? isSecure
                    ? 'visibility-off'
                    : 'visibility'
                  : rightIcon
              }
              size={20}
              color={colors.icon.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {renderHelper()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    ...typography.textStyles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  floatingLabel: {
    position: 'absolute',
    left: spacing.md,
    paddingHorizontal: spacing.xxs,
    zIndex: 1,
  },
  required: {
    color: colors.error.main,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.primary,
    minHeight: 48,
  },
  inputFocused: {
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: colors.background.tertiary,
    borderColor: colors.border.light,
  },
  inputError: {
    borderColor: colors.error.main,
  },
  input: {
    flex: 1,
    ...typography.textStyles.input,
    color: colors.text.primary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    height: '100%',
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: spacing.xs,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  disabledInput: {
    color: colors.text.disabled,
  },
  leftIcon: {
    marginLeft: spacing.md,
  },
  rightIconButton: {
    padding: spacing.md,
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  helperText: {
    ...typography.textStyles.inputError,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  errorText: {
    ...typography.textStyles.inputError,
    color: colors.error.main,
    marginLeft: spacing.xxs,
  },
});

export default Input;