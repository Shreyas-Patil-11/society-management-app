/**
 * Generic Success Screen
 * * Used for Payment, Booking, and Ticket success states.
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Button from '../../../components/common/Button';

const PaymentSuccessScreen = ({ navigation, route }) => {
  const { 
    title = 'Success!', 
    message = 'Operation completed successfully.',
    nextRoute = 'Home'
  } = route.params || {};

  // Simple scale animation
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconBox, { transform: [{ scale: scaleAnim }] }]}>
        <Icon name="check" size={60} color={colors.white} />
      </Animated.View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.footer}>
        <Button 
          title="Done" 
          style={styles.btn}
          onPress={() => navigation.navigate(nextRoute)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.success.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    elevation: 5,
    shadowColor: colors.success.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  btn: {
    width: '100%',
  },
});

export default PaymentSuccessScreen;