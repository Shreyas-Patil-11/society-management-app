
/**
 * Guard Settings & Shift Management
 * * Manage Duty Status, Shift Handovers, and App Preferences.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const GuardSettingsScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const { showSuccess } = useToast();

  const [isOnDuty, setIsOnDuty] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);

  const handleDutyToggle = val => {
    if (!val) {
      Alert.alert(
        'Go Off Duty?',
        'You will stop receiving visitor alerts. Confirm?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Go Off Duty',
            style: 'destructive',
            onPress: () => {
              setIsOnDuty(false);
              showSuccess('You are now Off Duty');
            },
          },
        ],
      );
    } else {
      setIsOnDuty(true);
      showSuccess('You are now On Duty');
    }
  };

  const handleShiftHandover = () => {
    Alert.alert(
      'Shift Handover',
      'Are you handing over the charge to the next guard?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Handover',
          onPress: () => {
            showSuccess('Shift Handover Logged');
            // Logic to logout or reset logs could go here
          },
        },
      ],
    );
  };

  const SettingItem = ({
    icon,
    label,
    type,
    value,
    onToggle,
    onPress,
    color,
  }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      disabled={type === 'toggle'}
    >
      <View style={styles.itemLeft}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: (color || colors.primary.main) + '15' },
          ]}
        >
          <Icon name={icon} size={22} color={color || colors.primary.main} />
        </View>
        <Text style={styles.itemLabel}>{label}</Text>
      </View>

      {type === 'toggle' ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ true: colors.primary.main, false: colors.border.main }}
          thumbColor={colors.white}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Settings & Shift" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0) || 'G'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'Ramesh Kumar'}</Text>
            <Text style={styles.role}>Main Gate Security</Text>
            <View style={styles.statusRow}>
              <StatusBadge
                status={isOnDuty ? 'approved' : 'rejected'}
                label={isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
                size="small"
              />
              <Text style={styles.shiftText}> • Morning Shift (6AM - 2PM)</Text>
            </View>
          </View>
        </View>

        {/* Shift Management Section */}
        <Text style={styles.sectionTitle}>SHIFT MANAGEMENT</Text>
        <View style={styles.card}>
          <View style={styles.dutyRow}>
            <View>
              <Text style={styles.dutyLabel}>Duty Status</Text>
              <Text style={styles.dutySub}>Toggle to receive alerts</Text>
            </View>
            <Switch
              value={isOnDuty}
              onValueChange={handleDutyToggle}
              trackColor={{
                true: colors.success.main,
                false: colors.border.main,
              }}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.handoverBtn}
            onPress={handleShiftHandover}
          >
            <Icon name="history-edu" size={20} color={colors.primary.main} />
            <Text style={styles.handoverText}>Log Shift Handover</Text>
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <Text style={styles.sectionTitle}>APP SETTINGS</Text>
        <View style={styles.card}>
          <SettingItem
            icon="notifications"
            label="Push Notifications"
            type="toggle"
            value={notifEnabled}
            onToggle={setNotifEnabled}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="lock"
            label="Change PIN / Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="help-outline"
            label="Help & Support"
            onPress={() => navigation.navigate('GuardSupport')}
          />
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            icon="logout"
            onPress={signOut}
            // 1. Set background to RED
            style={{
              backgroundColor: colors.error.main,
              borderColor: colors.error.main,
            }}
            // 2. Set text/icon color to WHITE
            textStyle={{ color: colors.white }}
          />
          <Text style={styles.version}>Version 1.0.0 (Build 45)</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    padding: spacing.lg,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.textStyles.h3,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
  },
  role: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  shiftText: {
    fontSize: 11,
    color: colors.text.tertiary,
  },
  sectionTitle: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
    elevation: 1,
  },
  dutyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  dutyLabel: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  dutySub: {
    fontSize: 11,
    color: colors.text.tertiary,
  },
  handoverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  handoverText: {
    marginLeft: spacing.sm,
    color: colors.primary.main,
    fontWeight: '600',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  itemLabel: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginLeft: 50,
  },
  logoutContainer: {
    marginTop: spacing.md,
  },
  version: {
    textAlign: 'center',
    marginTop: spacing.lg,
    color: colors.text.tertiary,
    fontSize: 11,
  },
});

export default GuardSettingsScreen;
