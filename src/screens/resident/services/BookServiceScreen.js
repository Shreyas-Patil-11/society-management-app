/**
 * Book Service / Helper Profile
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';

const BookServiceScreen = ({ navigation, route }) => {
  const { helper } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${helper.phone}`);
  };

  return (
    <View style={styles.container}>
      <Header title={helper.name} showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Icon name="person" size={60} color={colors.white} />
          </View>
          <Text style={styles.name}>{helper.name}</Text>
          <Text style={styles.type}>{helper.type}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Icon name="star" size={20} color="#F59E0B" />
              <Text style={styles.statText}>{helper.rating} Rating</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Icon name="work" size={20} color={colors.primary.main} />
              <Text style={styles.statText}>5 Years Exp</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Experienced {helper.type.toLowerCase()} working in this society for over 5 years. 
            Reliable and verified by security.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}><Text style={styles.tagText}>Morning</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Evening</Text></View>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Call Now" 
          icon="call" 
          onPress={handleCall} 
        />
      </View>
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
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
  },
  type: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border.light,
    marginHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  aboutText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  tagText: {
    ...typography.textStyles.caption,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default BookServiceScreen;