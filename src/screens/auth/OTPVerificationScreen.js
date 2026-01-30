
/**
 * OTP Verification Screen
 *
 * Verifies phone number with 6-digit OTP
 * Handles both login and registration flows
 * Role is determined by backend (or mock logic) after verification
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

import Button from '../../components/common/Button';
import OTPInput from '../../components/common/OTPInput';
import Header from '../../components/common/Header';

import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useCountdown } from '../../hooks/useCountdown';
import { formatPhoneNumber } from '../../utils/formatters';

const OTPVerificationScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  
  // Get verifyOTP from AuthContext
  const { verifyOTP, sendOTP } = useAuth();
  const { showSuccess, showError } = useToast();

  const { phone = '', isNewUser = false, userData = {} } = route.params || {};

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const otpInputRef = useRef(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const countdown = useCountdown(30, () => {});

  useEffect(() => {
    countdown.start();
  }, []);

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * Handle OTP verification
   */
  const handleVerify = async () => {
    Keyboard.dismiss();

    if (otp.length !== 6) {
      showError('Please enter complete OTP');
      shakeError();
      return;
    }

    setIsLoading(true);

    try {
      // ---------------------------------------------------------
      // 1. DETERMINE ROLE (MOCK LOGIC)
      // ---------------------------------------------------------
      let roleToLogin = 'resident'; // Default role

      // If Guard OTP is used, switch role
      if (otp === '999999') {
        roleToLogin = 'guard'; 
      }

      // ---------------------------------------------------------
      // 2. CALL CONTEXT
      // We pass the role to verifyOTP. The Context will save this
      // token and role to AsyncStorage.
      // ---------------------------------------------------------
      const result = await verifyOTP(phone, otp, roleToLogin);

      if (result.success) {
        showSuccess('Login Successful!');
        
        // ---------------------------------------------------------
        // 3. NAVIGATION HANDLING
        // The RootNavigator watches AuthContext state. 
        // Once verifyOTP updates 'isAuthenticated' to true, 
        // the app will AUTOMATICALLY switch to the correct Dashboard.
        // We only need to manually handle the "Select Society" edge case.
        // ---------------------------------------------------------

        if (isNewUser && !result.data?.user?.societyId) {
          navigation.replace('SelectSociety', {
            userData: { ...userData, phone },
          });
        } 
        
      } else {
        showError(result.message || 'Invalid OTP');
        shakeError();
        setOtp('');
        otpInputRef.current?.clear();
      }
    } catch (error) {
      console.error(error);
      showError('Something went wrong. Please try again.');
      shakeError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPComplete = code => {
    setOtp(code);
    setTimeout(() => {
      if (code.length === 6) {
        handleVerify();
      }
    }, 300);
  };

  const handleResend = async () => {
    if (countdown.isRunning) return;
    setIsResending(true);

    try {
      // Simulate Resend
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('OTP Resent Successfully');
      countdown.restart();
    } catch (e) {
      showError('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const handleChangePhone = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header showBack title="" />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="sms" size={40} color={colors.primary.main} />
        </View>

        <Text style={styles.title}>Verify Your Phone</Text>
        <Text style={styles.subtitle}>We've sent a 6-digit OTP to</Text>

        <View style={styles.phoneContainer}>
          <Text style={styles.phoneNumber}>{formatPhoneNumber(phone)}</Text>
          <TouchableOpacity
            onPress={handleChangePhone}
            style={styles.changeButton}
          >
            <Icon name="edit" size={18} color={colors.primary.main} />
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.otpContainer,
            { transform: [{ translateX: shakeAnimation }] },
          ]}
        >
          <OTPInput
            ref={otpInputRef}
            length={6}
            value={otp}
            onChangeText={setOtp}
            onComplete={handleOTPComplete}
            autoFocus
          />
        </Animated.View>

        {/* Dev Note for Role Switching */}
        <View style={styles.devNote}>
          <Text style={styles.devNoteText}>
            <Text style={{ fontWeight: 'bold' }}>Resident:</Text> Any code (e.g., 123456){'\n'}
            <Text style={{ fontWeight: 'bold' }}>Guard:</Text> 999999
          </Text>
        </View>

        <View style={styles.resendContainer}>
          {countdown.isRunning ? (
            <Text style={styles.timerText}>
              Resend OTP in{' '}
              <Text style={styles.timerValue}>{countdown.formatted}</Text>
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handleResend}
              disabled={isResending}
              style={styles.resendButton}
            >
              {isResending ? (
                <Text style={styles.resendingText}>Sending...</Text>
              ) : (
                <>
                  <Icon name="refresh" size={18} color={colors.primary.main} />
                  <Text style={styles.resendText}>Resend OTP</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>

        <Button
          title="Verify & Continue"
          onPress={handleVerify}
          loading={isLoading}
          disabled={otp.length !== 6}
          fullWidth
          style={styles.verifyButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { flex: 1, paddingHorizontal: spacing.xl, alignItems: 'center' },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  title: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },
  phoneNumber: { ...typography.textStyles.h4, color: colors.text.primary },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  changeText: {
    ...typography.textStyles.labelMedium,
    color: colors.primary.main,
    marginLeft: spacing.xxs,
  },
  otpContainer: { width: '100%', marginBottom: spacing.xl },
  devNote: {
    backgroundColor: colors.background.secondary,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
    width: '100%',
  },
  devNoteText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  resendContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  timerValue: { color: colors.primary.main, fontWeight: '600' },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  resendText: {
    ...typography.textStyles.labelLarge,
    color: colors.primary.main,
    marginLeft: spacing.xs,
  },
  resendingText: {
    ...typography.textStyles.labelMedium,
    color: colors.text.secondary,
  },
  verifyButton: { marginBottom: spacing.xl },
});

export default OTPVerificationScreen;