/**
 * My Bookings Screen
 * * View Upcoming and Past amenity reservations.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import StatusBadge from '../../../components/common/StatusBadge';

const BOOKINGS = [
  { id: '1', amenity: 'Tennis Court', date: '25 Oct', time: '06:00 PM', status: 'upcoming', code: 'TC-101' },
  { id: '2', amenity: 'Club House', date: '28 Oct', time: '02:00 PM', status: 'upcoming', code: 'CH-202' },
  { id: '3', amenity: 'Swimming Pool', date: '20 Oct', time: '07:00 AM', status: 'completed', code: 'SP-303' },
  { id: '4', amenity: 'Guest Room', date: '15 Oct', time: '10:00 AM', status: 'cancelled', code: 'GR-404' },
];

const BookingCard = ({ item, onCancel }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Icon 
          name={item.amenity.includes('Tennis') ? 'sports-tennis' : item.amenity.includes('Pool') ? 'pool' : 'event'} 
          size={24} 
          color={colors.primary.main} 
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.amenity}</Text>
        <Text style={styles.sub}>{item.date} • {item.time}</Text>
        <Text style={styles.code}>Ref: {item.code}</Text>
      </View>
      <StatusBadge status={item.status === 'upcoming' ? 'info' : item.status === 'completed' ? 'success' : 'error'} label={item.status} size="small" />
    </View>

    {item.status === 'upcoming' && (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(item.id)}>
          <Text style={styles.cancelText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const MyBookingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming | history
  const [data, setData] = useState(BOOKINGS);

  const handleCancel = (id) => {
    Alert.alert('Cancel Booking', 'Are you sure?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, Cancel', style: 'destructive', onPress: () => {
          setData(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
      }},
    ]);
  };

  const filteredData = activeTab === 'upcoming' 
    ? data.filter(b => b.status === 'upcoming')
    : data.filter(b => b.status !== 'upcoming');

  return (
    <View style={styles.container}>
      <Header title="My Bookings" showBack />
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
        renderItem={({ item }) => <BookingCard item={item} onCancel={handleCancel} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    padding: spacing.xs,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTab: {
    backgroundColor: colors.primary.light,
  },
  tabText: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.primary.dark,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
  },
  sub: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  code: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: 4,
    fontFamily: 'monospace',
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    alignItems: 'flex-end',
  },
  cancelBtn: {
    paddingHorizontal: spacing.sm,
  },
  cancelText: {
    ...typography.textStyles.caption,
    color: colors.error.main,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: colors.text.tertiary,
  },
});

export default MyBookingsScreen;