/**
 * Emergency SOS Screen
 * * 5-second countdown triggers panic alert to Guards & Family
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';

const EmergencyScreen = ({ navigation }) => {
  const [status, setStatus] = useState('counting'); // counting | sent | cancelled
  const [count, setCount] = useState(5);

  useEffect(() => {
    let timer;
    if (status === 'counting' && count > 0) {
      timer = setTimeout(() => setCount(c => c - 1), 1000);
    } else if (count === 0 && status === 'counting') {
      triggerSOS();
    }
    return () => clearTimeout(timer);
  }, [count, status]);

  const triggerSOS = () => {
    setStatus('sent');
    Vibration.vibrate([0, 500, 200, 500]); // Vibrate pattern
    // API Call to notify guards would happen here
  };

  const handleCancel = () => {
    setStatus('cancelled');
    navigation.goBack();
  };

  if (status === 'sent') {
    return (
      <View style={[styles.container, styles.sentContainer]}>
        <View style={styles.iconBox}>
          <Icon name="check-circle" size={80} color={colors.white} />
        </View>
        <Text style={styles.title}>SOS SENT</Text>
        <Text style={styles.subtitle}>
          Security and your emergency contacts have been alerted. Help is on the way.
        </Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMERGENCY</Text>
      <Text style={styles.subtitle}>Sending alert in</Text>
      
      <View style={styles.countCircle}>
        <Text style={styles.countText}>{count}</Text>
      </View>

      <Text style={styles.warningText}>
        This will alert Main Gate Security and your listed family members.
      </Text>

      <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
        <Icon name="close" size={32} color={colors.white} />
        <Text style={styles.cancelText}>CANCEL REQUEST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.error.main,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  sentContainer: {
    backgroundColor: colors.success.main,
  },
  title: {
    ...typography.textStyles.h1,
    color: colors.white,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.textStyles.bodyLarge,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  countCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  countText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: colors.white,
  },
  warningText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 60,
  },
  cancelBtn: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 30,
  },
  cancelText: {
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
    fontSize: 16,
  },
  iconBox: {
    marginBottom: spacing.lg,
  },
  closeBtn: {
    marginTop: spacing.xxl,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 30,
  },
  closeText: {
    color: colors.success.main,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EmergencyScreen;