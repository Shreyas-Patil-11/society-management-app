/**
 * Guard Support Screen
 * * Emergency contacts for security staff
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Header from '../../components/common/Header';

const CONTACTS = [
  { id: '1', name: 'Security Supervisor', phone: '9876543210', icon: 'security' },
  { id: '2', name: 'Society Manager', phone: '9876543210', icon: 'person' },
  { id: '3', name: 'Main Gate Landline', phone: '02212345678', icon: 'call' },
  { id: '4', name: 'Emergency - Police', phone: '100', icon: 'local-police', color: colors.error.main },
  { id: '5', name: 'Emergency - Fire', phone: '101', icon: 'local-fire-department', color: colors.error.main },
];

const GuardSupportScreen = ({ navigation }) => {
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Support & Emergency" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Important Contacts</Text>
        
        {CONTACTS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            onPress={() => handleCall(item.phone)}
          >
            <View style={[styles.iconBox, { backgroundColor: (item.color || colors.primary.main) + '15' }]}>
              <Icon name={item.icon} size={24} color={item.color || colors.primary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <View style={styles.callBtn}>
              <Icon name="call" size={20} color={colors.white} />
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.noteBox}>
          <Icon name="info" size={20} color={colors.text.secondary} />
          <Text style={styles.noteText}>
            For app technical issues, please contact the System Administrator.
          </Text>
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
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  phone: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    gap: spacing.sm,
  },
  noteText: {
    flex: 1,
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
});

export default GuardSupportScreen;