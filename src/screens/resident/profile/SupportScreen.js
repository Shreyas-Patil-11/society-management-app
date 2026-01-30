/**
 * Support Screen
 * * Contact details for society management
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

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';

const SupportScreen = ({ navigation }) => {
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@society.com');
  };

  return (
    <View style={styles.container}>
      <Header title="Help & Support" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroBox}>
          <Icon name="support-agent" size={60} color={colors.primary.main} />
          <Text style={styles.title}>How can we help?</Text>
          <Text style={styles.subtitle}>Our team is available 24/7 for emergencies</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.item} onPress={() => handleCall('9876543210')}>
            <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
              <Icon name="call" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Call Management</Text>
              <Text style={styles.value}>+91 98765 43210</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={() => handleCall('0221234567')}>
            <View style={[styles.iconBox, { backgroundColor: '#FEE2E2' }]}>
              <Icon name="security" size={24} color={colors.error.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Main Gate Security</Text>
              <Text style={styles.value}>022 1234 5678</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={handleEmail}>
            <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
              <Icon name="email" size={24} color="#D97706" />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Email Support</Text>
              <Text style={styles.value}>help@society.com</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqText}>How to invite a guest?</Text>
          <Icon name="chevron-right" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqText}>How to pay maintenance?</Text>
          <Icon name="chevron-right" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

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
  heroBox: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
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
  label: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  value: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.sm,
    marginLeft: 64,
  },
  faqTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  faqItem: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faqText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
  },
});

export default SupportScreen;