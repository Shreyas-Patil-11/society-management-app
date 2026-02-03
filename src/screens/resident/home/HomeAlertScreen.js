


/**
 * Emergency Alert Screen
 * * Allows residents to quickly trigger emergency alerts 
 * to security guards and family members.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import { useToast } from '../../../hooks/useToast';
import { shadows } from '../../../theme/shadows';

const EmergencyType = ({ icon, label, color, onPress, selected }) => (
  <TouchableOpacity 
    style={[
      styles.emergencyItem, 
      selected && { borderColor: color, borderWidth: 2, backgroundColor: color + '10' }
    ]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.emergencyIcon, { backgroundColor: color }]}>
      <Icon name={icon} size={32} color={colors.white} />
    </View>
    <Text style={styles.emergencyLabel}>{label}</Text>
  </TouchableOpacity>
);

const HomeAlertScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleTrigger = (type, label, color) => {
    setSelectedType(type);
    
    Alert.alert(
      `Confirm ${label} Alert`,
      'Are you sure you want to raise an emergency alert? Security will be notified immediately.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setSelectedType(null),
        },
        {
          text: 'YES, RAISE ALERT',
          style: 'destructive',
          onPress: () => sendAlert(type, label),
        },
      ]
    );
  };

  const sendAlert = (type, label) => {
    setIsCountingDown(true);
    Vibration.vibrate([0, 500, 200, 500]); // SOS pattern vibe
    
    // Simulate API call
    setTimeout(() => {
      setIsCountingDown(false);
      showSuccess(`${label} alert sent to Security!`);
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header title="Emergency Alert" />
      
      <View style={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.warningBox}>
          <Icon name="info" size={20} color={colors.warning.dark} style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Only use this in case of real emergency. False alarms may lead to penalties.
          </Text>
        </View>

        <Text style={styles.gridTitle}>Select Emergency Type</Text>

        <View style={styles.grid}>
          <EmergencyType 
            icon="local-fire-department" 
            label="Fire" 
            color="#EF4444" 
            onPress={() => handleTrigger('fire', 'Fire', '#EF4444')}
            selected={selectedType === 'fire'}
          />
          <EmergencyType 
            icon="medical-services" 
            label="Medical" 
            color="#3B82F6" 
            onPress={() => handleTrigger('medical', 'Medical', '#3B82F6')}
            selected={selectedType === 'medical'}
          />
          <EmergencyType 
            icon="security" 
            label="Security" 
            color="#1F2937" 
            onPress={() => handleTrigger('security', 'Security Threat', '#1F2937')}
            selected={selectedType === 'security'}
          />
          <EmergencyType 
            icon="elevator" 
            label="Lift Stuck" 
            color="#F59E0B" 
            onPress={() => handleTrigger('lift', 'Lift Stuck', '#F59E0B')}
            selected={selectedType === 'lift'}
          />
          <EmergencyType 
            icon="pets" 
            label="Animal" 
            color="#8B5CF6" 
            onPress={() => handleTrigger('animal', 'Animal Threat', '#8B5CF6')}
            selected={selectedType === 'animal'}
          />
          <EmergencyType 
            icon="support-agent" 
            label="Other" 
            color="#6B7280" 
            onPress={() => handleTrigger('other', 'Emergency', '#6B7280')}
            selected={selectedType === 'other'}
          />
        </View>

        {isCountingDown && (
          <View style={styles.sendingContainer}>
            <Text style={styles.sendingText}>Sending Alert...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: colors.warning.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.warning.light,
  },
  warningIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  warningText: {
    ...typography.textStyles.bodySmall,
    color: colors.warning.dark,
    flex: 1,
  },
  gridTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  emergencyItem: {
    width: '47%',
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  emergencyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  emergencyLabel: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  sendingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  sendingText: {
    ...typography.textStyles.h3,
    color: colors.error.main,
    marginTop: spacing.md,
  },
});

export default HomeAlertScreen;