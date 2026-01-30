/**
 * Services Hub Screen
 * * Central hub for all utility features:
 * - Payments
 * - Helpdesk
 * - Amenities
 * - Bookings
 * - Directory
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { shadows } from '../../../theme/shadows';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const GAP = spacing.md;
const ITEM_WIDTH = (width - (spacing.lg * 2) - (GAP * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

const SERVICE_ITEMS = [
  { 
    id: 'payments', 
    label: 'Payments', 
    icon: 'account-balance-wallet', 
    color: colors.primary.main, 
    route: 'PaymentMethods',
    desc: 'Pay maintenance & bills' 
  },
  { 
    id: 'helpdesk', 
    label: 'Helpdesk', 
    icon: 'support-agent', 
    color: colors.error.main, 
    route: 'HelpDesk',
    desc: 'Complaints & suggestions' 
  },
  { 
    id: 'amenities', 
    label: 'Amenities', 
    icon: 'pool', 
    color: colors.info.main, 
    route: 'SelectAmenity',
    desc: 'Book clubhouse, court' 
  },
  { 
    id: 'bookings', 
    label: 'My Bookings', 
    icon: 'event-available', 
    color: colors.secondary.main, 
    route: 'MyBookings',
    desc: 'Track your reservations' 
  },
  { 
    id: 'directory', 
    label: 'Residents', 
    icon: 'contacts', 
    color: colors.success.main, 
    route: 'Residents',
    desc: 'Find neighbors' 
  },
  { 
    id: 'documents', 
    label: 'Documents', 
    icon: 'description', 
    color: colors.warning.dark, 
    route: 'Settings', // Placeholder
    desc: 'Society rules & forms' 
  },
];

const ServiceCard = ({ item, navigation }) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={() => navigation.navigate(item.route)}
    activeOpacity={0.8}
  >
    <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
      <Icon name={item.icon} size={32} color={item.color} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.label}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
    </View>
    <Icon name="chevron-right" size={20} color={colors.text.tertiary} style={styles.arrow} />
  </TouchableOpacity>
);

const ServicesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Header title="Services" showBack={false} />
      
      <ScrollView 
        contentContainerStyle={[
          styles.grid, 
          { paddingBottom: insets.bottom + 100 } // Extra padding for tab bar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeader}>Utilities</Text>
        
        <View style={styles.row}>
          {SERVICE_ITEMS.map((item) => (
            <ServiceCard key={item.id} item={item} navigation={navigation} />
          ))}
        </View>

        {/* Banner for Paid Services (Maid, Cook, etc.) */}
        <Text style={[styles.sectionHeader, { marginTop: spacing.xl }]}>Local Services</Text>
        <TouchableOpacity 
          style={styles.banner}
          onPress={() => navigation.navigate('Services')} // Leads to Daily Help list
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Find Daily Help</Text>
            <Text style={styles.bannerSubtitle}>Maids, Cooks, Drivers & more</Text>
            <View style={styles.chip}>
              <Text style={styles.chipText}>View All</Text>
            </View>
          </View>
          <Icon name="cleaning-services" size={60} color={colors.white} style={{ opacity: 0.8 }} />
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
  grid: {
    padding: spacing.lg,
  },
  sectionHeader: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: GAP,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardDesc: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  arrow: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  banner: {
    backgroundColor: colors.primary.dark,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.md,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    ...typography.textStyles.h3,
    color: colors.white,
    marginBottom: 4,
  },
  bannerSubtitle: {
    ...typography.textStyles.bodyMedium,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  chipText: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.primary.dark,
  },
});

export default ServicesScreen;