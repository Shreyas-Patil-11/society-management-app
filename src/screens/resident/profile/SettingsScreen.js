// import React from 'react'
// import { View } from 'react-native'
// import { Text } from 'react-native-gesture-handler'

// const BookedAmenitiesScreen = () => {
//   return (
//     <View>
//         <Text>
//             BookedAmenitiesScreen
//         </Text>
//     </View>
//   )
// }

// export default BookedAmenitiesScreen


/**
 * Settings Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';

const SettingItem = ({ icon, label, type = 'arrow', value, onValueChange, onPress }) => (
  <TouchableOpacity 
    style={styles.item} 
    onPress={onPress} 
    disabled={type === 'switch'}
  >
    <Icon name={icon} size={24} color={colors.text.secondary} style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    {type === 'switch' ? (
      <Switch 
        value={value} 
        onValueChange={onValueChange}
        trackColor={{ false: colors.border.main, true: colors.primary.light }}
        thumbColor={value ? colors.primary.main : colors.white}
      />
    ) : (
      <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
    )}
  </TouchableOpacity>
);

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [guestAlerts, setGuestAlerts] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Settings" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.section}>
          <SettingItem 
            icon="notifications" 
            label="Push Notifications" 
            type="switch" 
            value={notifications} 
            onValueChange={setNotifications} 
          />
          <SettingItem 
            icon="person" 
            label="Guest Entry Alerts" 
            type="switch" 
            value={guestAlerts} 
            onValueChange={setGuestAlerts} 
          />
        </View>

        <Text style={styles.sectionHeader}>Security</Text>
        <View style={styles.section}>
          <SettingItem 
            icon="lock" 
            label="Change Password" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon="fingerprint" 
            label="Biometric Login" 
            type="switch" 
            value={biometric} 
            onValueChange={setBiometric} 
          />
        </View>

        <Text style={styles.sectionHeader}>Legal</Text>
        <View style={styles.section}>
          <SettingItem 
            icon="description" 
            label="Terms & Conditions" 
            onPress={() => navigation.navigate('TermsConditions')} 
          />
          <SettingItem 
            icon="privacy-tip" 
            label="Privacy Policy" 
            onPress={() => {}} 
          />
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
  sectionHeader: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    marginLeft: spacing.sm,
  },
  section: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  icon: {
    marginRight: spacing.md,
  },
  label: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
    flex: 1,
  },
});

export default SettingsScreen;