

/**
 * OTP Verification Screen
 *
 * Verifies phone number with 6-digit OTP
 * Handles both login and registration flows
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

  const { showSuccess, showError } = useToast();
  const { verifyOTP, sendOTP, registerResident } = useAuth(); // ✅

  const {
    phone = '',
    isNewUser = false,
    userData = {},
    societyData = null,
    flatData = null,
  } = route.params || {};

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
      // ✅ DUMMY OTP VALIDATION
      // ---------------------------------------------------------
      let roleToLogin = 'resident';

      if (otp === '999999') {
        roleToLogin = 'guard';
      }

      if (roleToLogin === 'resident' && otp !== '123456') {
        showError('Invalid OTP (Use 123456)');
        shakeError();
        setOtp('');
        otpInputRef.current?.clear();
        return;
      }

      if (roleToLogin === 'guard' && otp !== '999999') {
        showError('Invalid OTP (Use 999999)');
        shakeError();
        setOtp('');
        otpInputRef.current?.clear();
        return;
      }

      showSuccess('OTP Verified Successfully!');

      // ---------------------------------------------------------
      // ✅ NEW USER REGISTRATION
      // ---------------------------------------------------------
      if (isNewUser) {
        if (!societyData?.id || !flatData?.id) {
          showError('Society / Flat details missing!');
          return;
        }

        if (!userData?.password) {
          showError('Password missing. Please sign up again.');
          return;
        }

        const registerPayload = {
          name: userData?.name,
          email: userData?.email,
          phone: phone,
          password: userData.password,
          role: 'RESIDENT',
          society_id: societyData.id,
          flat_id: flatData.id,
        };

        console.log('✅ Register Payload:', registerPayload);

        const registerRes = await registerResident(registerPayload);

        if (!registerRes.success) {
          showError(registerRes.message || 'Registration failed');
          return;
        }

        showSuccess('Registered successfully! Waiting for admin approval.');

        navigation.replace('ApprovalPending', {
          phone: phone,
          name: userData?.name,
        });

        return;
      }

      // ---------------------------------------------------------
      // ✅ EXISTING USER FLOW → redirect to Login
      // ---------------------------------------------------------
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
      return;
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
      await sendOTP(phone);
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

        <View style={styles.devNote}>
          <Text style={styles.devNoteText}>
            <Text style={{ fontWeight: 'bold' }}>Resident:</Text> 123456{'\n'}
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
