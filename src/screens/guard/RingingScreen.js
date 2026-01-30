/**
 * Ringing Screen (Simulation)
 * * Shows while waiting for resident approval.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';

const RingingScreen = ({ navigation, route }) => {
  const { visitorName, flatNo } = route.params;
  const [status, setStatus] = useState('Calling...');

  // Animation for pulsing effect
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Pulse Animation Loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Simulate Resident Response
    const timer = setTimeout(() => {
      // 70% chance of approval for demo
      const isApproved = Math.random() > 0.3;
      
      if (isApproved) {
        navigation.replace('Allowed', { visitorName, flatNo });
      } else {
        navigation.replace('Declined', { visitorName, flatNo });
      }
    }, 4000); // 4 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
        <View style={styles.iconCircle}>
          <Icon name="notifications-active" size={60} color={colors.white} />
        </View>
      </View>

      <Text style={styles.statusText}>{status}</Text>
      <Text style={styles.flatText}>{flatNo}</Text>
      <Text style={styles.visitorText}>Request for: {visitorName}</Text>

      <Button 
        title="Cancel Request" 
        variant="text" 
        style={styles.cancelBtn}
        labelStyle={{ color: colors.white }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main, // Blue background
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  pulseCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  statusText: {
    ...typography.textStyles.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  flatText: {
    ...typography.textStyles.h1,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  visitorText: {
    ...typography.textStyles.bodyLarge,
    color: 'rgba(255,255,255,0.8)',
  },
  cancelBtn: {
    position: 'absolute',
    bottom: 50,
  },
});

export default RingingScreen;