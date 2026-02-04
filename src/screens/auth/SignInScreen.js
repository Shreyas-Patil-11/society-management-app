
/**
 * Sign In Screen
 * src/screens/auth/SignInScreen.js
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
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const [authMethod, setAuthMethod] = useState('phone');
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);

  const phoneForm = useForm({ phone: '' }, values => {
    const errors = {};
    if (!values.phone) errors.phone = 'Phone number is required';
    else if (!isValidPhone(values.phone)) errors.phone = 'Invalid phone number';
    return errors;
  });

  const emailForm = useForm({ email: '', password: '' }, values => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    else if (!isValidEmail(values.email)) errors.email = 'Invalid email format';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  });

  const handlePhoneSignIn = async () => {
    Keyboard.dismiss();
    if (!phoneForm.validateForm()) return;

    setIsLoading(true);
    try {
      const result = await sendOTP(phoneForm.values.phone);

      if (result.success) {
        showSuccess('OTP sent successfully');
        navigation.navigate('OTPVerification', {
          phone: phoneForm.values.phone,
          isLogin: true,
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

  const handleEmailSignIn = async () => {
    Keyboard.dismiss();
    if (!emailForm.validateForm()) return;

    setIsLoading(true);
    try {
      const result = await signInWithEmail(
        emailForm.values.email,
        emailForm.values.password
      );

      console.log('EMAIL LOGIN RESULT ===>', result);

      // ✅ success
      if (result?.success === true) {
        showSuccess('Welcome back!');
        return;
      }

      // ✅ USER NOT FOUND => POPUP then redirect to signup
      if (result?.success === false && result?.code === 'USER_NOT_FOUND') {
        Alert.alert(
          'Account not found',
          'This email is not registered. Please create a new account.',
          [
            {
              text: 'Register',
              onPress: () =>
                navigation.navigate('SignUp', { email: emailForm.values.email }),
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return;
      }

      if (result?.success === false && result?.code === "APPROVAL_PENDING") {
  navigation.replace("ApprovalPending", {
    phone: result?.data?.user?.phone || "",
    name: result?.data?.user?.name || "",
  });
  return;
}


      // ❌ other errors
      showError(result?.message || 'Login failed');
    } catch (error) {
      showError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.xxxl,
            paddingBottom: insets.bottom + spacing.xl,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="apartment" size={40} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, authMethod === 'phone' && styles.activeTab]}
            onPress={() => setAuthMethod('phone')}
          >
            <Icon
              name="phone"
              size={20}
              color={
                authMethod === 'phone'
                  ? colors.primary.main
                  : colors.text.tertiary
              }
            />
            <Text
              style={[
                styles.tabText,
                authMethod === 'phone' && styles.activeTabText,
              ]}
            >
              Mobile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, authMethod === 'email' && styles.activeTab]}
            onPress={() => setAuthMethod('email')}
          >
            <Icon
              name="email"
              size={20}
              color={
                authMethod === 'email'
                  ? colors.primary.main
                  : colors.text.tertiary
              }
            />
            <Text
              style={[
                styles.tabText,
                authMethod === 'email' && styles.activeTabText,
              ]}
            >
              Email
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {authMethod === 'email' ? (
            <View>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={emailForm.values.email}
                onChangeText={text => emailForm.handleChange('email', text)}
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
                onChangeText={text => emailForm.handleChange('password', text)}
                onBlur={() => emailForm.handleBlur('password')}
                error={
                  emailForm.touched.password ? emailForm.errors.password : null
                }
                type="password"
                leftIcon="lock"
                returnKeyType="done"
                onSubmitEditing={handleEmailSignIn}
              />

              <Button
                title="Sign In"
                onPress={handleEmailSignIn}
                loading={isLoading}
                fullWidth
                style={styles.submitButton}
              />
            </View>
          ) : (
            <View>
              <Input
                label="Mobile Number"
                placeholder="Enter registered mobile number"
                value={phoneForm.values.phone}
                onChangeText={text => phoneForm.handleChange('phone', text)}
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
          )}
        </View>

        <Divider text="OR" style={styles.divider} />

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
  container: { flex: 1, backgroundColor: colors.background.primary },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.xl },
  header: { alignItems: 'center', marginBottom: spacing.xl },
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
  activeTabText: { color: colors.primary.main },
  formContainer: { marginBottom: spacing.lg },
  submitButton: { marginTop: spacing.sm },
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
