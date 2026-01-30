/**
 * Security Login Screen
 * 
 * Dedicated login screen for security guards
 * Uses Employee ID + Password or Phone + OTP
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';

import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useForm } from '../../hooks/useForm';
import { isValidPhone } from '../../utils/validators';
import { USER_ROLES } from '../../utils/constants';

// Auth methods
const AUTH_METHODS = {
  EMPLOYEE_ID: 'employee_id',
  PHONE: 'phone',
};

const SecurityLoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signInWithEmail, sendOTP } = useAuth();
  const { showSuccess, showError } = useToast();

  // State
  const [authMethod, setAuthMethod] = useState(AUTH_METHODS.PHONE);
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const passwordRef = useRef(null);

  // Form for employee ID login
  const employeeForm = useForm(
    { employeeId: '', password: '' },
    (values) => {
      const errors = {};
      if (!values.employeeId) errors.employeeId = 'Employee ID is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    }
  );

  // Form for phone login
  const phoneForm = useForm(
    { phone: '' },
    (values) => {
      const errors = {};
      if (!values.phone) errors.phone = 'Phone number is required';
      else if (!isValidPhone(values.phone)) errors.phone = 'Invalid phone number';
      return errors;
    }
  );

  /**
   * Handle employee ID sign in
   */
  const handleEmployeeSignIn = async () => {
    Keyboard.dismiss();
    
    const isValid = employeeForm.validateForm();
    if (!isValid) return;

    setIsLoading(true);
    try {
      // Use employee ID as email for guard login
      const result = await signInWithEmail(
        employeeForm.values.employeeId,
        employeeForm.values.password,
        USER_ROLES.GUARD
      );

      if (result.success) {
        showSuccess('Welcome!');
        // Navigation is handled by RootNavigator
      } else {
        showError(result.message || 'Login failed');
      }
    } catch (error) {
      showError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle phone sign in (send OTP)
   */
  const handlePhoneSignIn = async () => {
    Keyboard.dismiss();

    const isValid = phoneForm.validateForm();
    if (!isValid) return;

    setIsLoading(true);
    try {
      const result = await sendOTP(phoneForm.values.phone);

      if (result.success) {
        showSuccess('OTP sent successfully');
        navigation.navigate('OTPVerification', {
          phone: phoneForm.values.phone,
          isGuard: true,
        });
      } else {
        showError(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      showError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render auth method tabs
   */
  const renderAuthMethodTabs = () => (
    <View style={styles.authMethodTabs}>
      <TouchableOpacity
        style={[
          styles.authMethodTab,
          authMethod === AUTH_METHODS.PHONE && styles.authMethodTabActive,
        ]}
        onPress={() => setAuthMethod(AUTH_METHODS.PHONE)}
        activeOpacity={0.7}>
        <Icon
          name="phone-android"
          size={20}
          color={authMethod === AUTH_METHODS.PHONE ? colors.primary.main : colors.text.secondary}
        />
        <Text
          style={[
            styles.authMethodTabText,
            authMethod === AUTH_METHODS.PHONE && styles.authMethodTabTextActive,
          ]}>
          Phone OTP
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.authMethodTab,
          authMethod === AUTH_METHODS.EMPLOYEE_ID && styles.authMethodTabActive,
        ]}
        onPress={() => setAuthMethod(AUTH_METHODS.EMPLOYEE_ID)}
        activeOpacity={0.7}>
        <Icon
          name="badge"
          size={20}
          color={authMethod === AUTH_METHODS.EMPLOYEE_ID ? colors.primary.main : colors.text.secondary}
        />
        <Text
          style={[
            styles.authMethodTabText,
            authMethod === AUTH_METHODS.EMPLOYEE_ID && styles.authMethodTabTextActive,
          ]}>
          Employee ID
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Render phone form
   */
  const renderPhoneForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Registered Mobile Number"
        placeholder="Enter your 10-digit mobile number"
        value={phoneForm.values.phone}
        onChangeText={(text) => phoneForm.handleChange('phone', text)}
        onBlur={() => phoneForm.handleBlur('phone')}
        error={phoneForm.touched.phone ? phoneForm.errors.phone : null}
        keyboardType="phone-pad"
        maxLength={10}
        leftIcon="phone"
        returnKeyType="done"
        onSubmitEditing={handlePhoneSignIn}
      />

      <Button
        title="Get OTP"
        onPress={handlePhoneSignIn}
        loading={isLoading}
        fullWidth
        style={styles.submitButton}
      />
    </View>
  );

  /**
   * Render employee ID form
   */
  const renderEmployeeForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Employee ID"
        placeholder="Enter your employee ID"
        value={employeeForm.values.employeeId}
        onChangeText={(text) => employeeForm.handleChange('employeeId', text)}
        onBlur={() => employeeForm.handleBlur('employeeId')}
        error={employeeForm.touched.employeeId ? employeeForm.errors.employeeId : null}
        autoCapitalize="characters"
        leftIcon="badge"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <Input
        ref={passwordRef}
        label="Password"
        placeholder="Enter your password"
        value={employeeForm.values.password}
        onChangeText={(text) => employeeForm.handleChange('password', text)}
        onBlur={() => employeeForm.handleBlur('password')}
        error={employeeForm.touched.password ? employeeForm.errors.password : null}
        type="password"
        leftIcon="lock"
        returnKeyType="done"
        onSubmitEditing={handleEmployeeSignIn}
      />

      <Button
        title="Sign In"
        onPress={handleEmployeeSignIn}
        loading={isLoading}
        fullWidth
        style={styles.submitButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        showBack
        title=""
        backgroundColor="transparent"
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + spacing.xl },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon name="security" size={40} color={colors.white} />
            </View>
            <Text style={styles.title}>Security Login</Text>
            <Text style={styles.subtitle}>
              Sign in with your registered credentials
            </Text>
          </View>

          {/* Auth Method Tabs */}
          {renderAuthMethodTabs()}

          {/* Form */}
          {authMethod === AUTH_METHODS.PHONE ? renderPhoneForm() : renderEmployeeForm()}

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <Icon name="info-outline" size={18} color={colors.text.tertiary} />
            <Text style={styles.helpText}>
              Contact your society admin if you're having trouble logging in.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.guard.nightMode,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  authMethodTabs: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.xl,
  },
  authMethodTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  authMethodTabActive: {
    backgroundColor: colors.background.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  authMethodTabText: {
    ...typography.textStyles.labelMedium,
    color: colors.text.secondary,
  },
  authMethodTabTextActive: {
    color: colors.primary.main,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    gap: spacing.sm,
  },
  helpText: {
    ...typography.textStyles.bodySmall,
    color: colors.text.tertiary,
    flex: 1,
  },
});

export default SecurityLoginScreen;