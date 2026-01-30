/**
 * Waiting Approval Screen
 * * Simulates real-time polling for resident action
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';

const WaitingScreen = ({ navigation, route }) => {
  const { visitorName, flatNo } = route.params || { visitorName: 'Visitor', flatNo: 'Unknown' };
  const [seconds, setSeconds] = useState(0);

  // Disable hardware back button during wait
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  // Timer & Simulation
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);

    // Mock Response after 5 seconds
    const mockResponse = setTimeout(() => {
      // Randomly Approve or Reject
      const isApproved = Math.random() > 0.3; 
      if (isApproved) {
        navigation.replace('Allowed', { visitorName, flatNo });
      } else {
        navigation.replace('Declined', { visitorName, flatNo });
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(mockResponse);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size={60} color={colors.white} style={styles.loader} />
        
        <Text style={styles.title}>Waiting for Approval</Text>
        <Text style={styles.subtitle}>Notification sent to {flatNo}</Text>
        
        <View style={styles.timerBox}>
          <Icon name="timer" size={20} color={colors.text.secondary} />
          <Text style={styles.timerText}>00:0{seconds}</Text>
        </View>

        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Visitor:</Text>
          <Text style={styles.detailValue}>{visitorName}</Text>
        </View>
      </View>

      <Button 
        title="Call Resident" 
        icon="call" 
        style={styles.btn}
        labelStyle={{ color: colors.primary.main }}
        variant="secondary"
        onPress={() => {}} // In real app, trigger phone dialer
      />
      
      <Button 
        title="Cancel Entry" 
        variant="text" 
        style={styles.cancelBtn}
        labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    marginTop: 80,
  },
  loader: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.textStyles.h2,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.textStyles.bodyMedium,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xl,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.xl,
  },
  timerText: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
    marginLeft: spacing.xs,
    fontVariant: ['tabular-nums'],
  },
  detailsBox: {
    alignItems: 'center',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  detailValue: {
    ...typography.textStyles.h3,
    color: colors.white,
    marginTop: 4,
  },
  btn: {
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  cancelBtn: {
    marginBottom: spacing.lg,
  },
});

export default WaitingScreen;