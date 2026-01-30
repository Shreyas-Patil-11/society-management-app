

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
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// FOR CLI:
import Icon from 'react-native-vector-icons/MaterialIcons';
// --------------------------------------------------------------------------

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Divider from '../../components/common/Divider';

import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useForm } from '../../hooks/useForm';
import { isValidEmail, isValidPhone } from '../../utils/validators';

const SignInScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signInWithEmail, sendOTP } = useAuth();
  const { showSuccess, showError } = useToast();

  // State
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' or 'email'
  const [isLoading, setIsLoading] = useState(false);

  // Refs for focusing next input
  const passwordRef = useRef(null);

  // --- FORM 1: PHONE ---
  const phoneForm = useForm(
    { phone: '' },
    (values) => {
      const errors = {};
      if (!values.phone) errors.phone = 'Phone number is required';
      else if (!isValidPhone(values.phone)) errors.phone = 'Invalid phone number';
      return errors;
    }
  );

  // --- FORM 2: EMAIL ---
  const emailForm = useForm(
    { email: '', password: '' },
    (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Email is required';
      else if (!isValidEmail(values.email)) errors.email = 'Invalid email format';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    }
  );

  /**
   * Handle Phone + OTP Flow
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
          isLogin: true 
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
   * Handle Email + Password Flow
   */
  // const handleEmailSignIn = async () => {
  //   Keyboard.dismiss();
  //   const isValid = emailForm.validateForm();
  //   if (!isValid) return;

  //   setIsLoading(true);
  //   try {
  //     // Logic: The backend should return the user object with the role inside it
  //     const result = await signInWithEmail(emailForm.values.email, emailForm.values.password);

  //     if (result.success) {
  //       showSuccess('Welcome back!');
  //       // NOTE: Usually AuthContext detects the login and RootNavigator switches stacks.
  //       // If not, we show this alert:
  //       Alert.alert('Under Development', 'Login Successful. Redirecting to Dashboard...');
  //     } else {
  //       showError(result.message || 'Invalid email or password');
  //     }
  //   } catch (error) {
  //     showError('Something went wrong. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleEmailSignIn = async () => {
  Keyboard.dismiss();
  const isValid = emailForm.validateForm();
  if (!isValid) return;

  setIsLoading(true);
  try {
    const result = await signInWithEmail(
      emailForm.values.email,
      emailForm.values.password
    );

    if (result.success) {
      showSuccess('Welcome back!');

      navigation.reset({
        index: 0,
        routes: [{ name: 'ResidentTabs' }],
      });
    } else {
      showError(result.message || 'Invalid email or password');
    }
  } catch (error) {
    showError('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="apartment" size={40} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* --- TABS SWITCHER --- */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, authMethod === 'phone' && styles.activeTab]}
            onPress={() => setAuthMethod('phone')}
          >
            <Icon 
              name="phone" 
              size={20} 
              color={authMethod === 'phone' ? colors.primary.main : colors.text.tertiary} 
            />
            <Text style={[styles.tabText, authMethod === 'phone' && styles.activeTabText]}>
              Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, authMethod === 'email' && styles.activeTab]}
            onPress={() => setAuthMethod('email')}
          >
            <Icon 
              name="phone-android" 
              size={20} 
              color={authMethod === 'email' ? colors.primary.main : colors.text.tertiary} 
            />
            <Text style={[styles.tabText, authMethod === 'email' && styles.activeTabText]}>
              Mobile
            </Text>
          </TouchableOpacity>

          
        </View>

        {/* --- FORM AREA --- */}
        <View style={styles.formContainer}>
          
          {authMethod === 'phone' ?  (
            /* EMAIL FORM */
            <View>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={emailForm.values.email}
                onChangeText={(text) => emailForm.handleChange('email', text)}
                onBlur={() => emailForm.handleBlur('email')}
                error={emailForm.touched.email ? emailForm.errors.email : null}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <Input
                ref={passwordRef}
                label="Password"
                placeholder="Enter your password"
                value={emailForm.values.password}
                onChangeText={(text) => emailForm.handleChange('password', text)}
                onBlur={() => emailForm.handleBlur('password')}
                error={emailForm.touched.password ? emailForm.errors.password : null}
                type="password"
                leftIcon="lock"
                returnKeyType="done"
                onSubmitEditing={handleEmailSignIn}
              />
              
              {/* Forgot Password Link */}
              <TouchableOpacity 
                style={styles.forgotPassContainer}
                onPress={() => Alert.alert('Under Development', 'Forgot Password Flow')}
              >
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                onPress={handleEmailSignIn}
                loading={isLoading}
                fullWidth
                style={styles.submitButton}
              />
            </View>
          ):(
            /* PHONE FORM */
            <View>
              <Input
                label="Mobile Number"
                placeholder="Enter registered mobile number"
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
          ) }

        </View>

        {/* Divider */}
        <Divider text="OR" style={styles.divider} />

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>New Resident? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Create Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.xl },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary.background,
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
  // TABS STYLES
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: 4,
    marginBottom: spacing.xl,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md - 2,
    gap: 8,
  },
  activeTab: {
    backgroundColor: colors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    ...typography.textStyles.labelMedium,
    color: colors.text.tertiary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.primary.main,
  },
  // FORM STYLES
  formContainer: { marginBottom: spacing.lg },
  submitButton: { marginTop: spacing.sm },
  forgotPassContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    marginTop: -spacing.sm,
  },
  forgotPassText: {
    ...typography.textStyles.labelMedium,
    color: colors.primary.main,
  },
  divider: { marginVertical: spacing.lg },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  signUpText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  signUpLink: {
    ...typography.textStyles.labelLarge,
    color: colors.primary.main,
  },
});

export default SignInScreen;
