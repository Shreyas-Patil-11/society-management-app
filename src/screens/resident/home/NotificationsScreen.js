/**
 * Notifications Center
 * * Central hub for all alerts (Gate, Admin, System)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const NOTIFICATIONS = [
  { id: '1', type: 'gate', title: 'Visitor Arrived', body: 'Zomato delivery is at the gate.', time: '2 min ago', read: false },
  { id: '2', type: 'admin', title: 'Water Supply Alert', body: 'Water supply will be cut off from 2pm to 4pm.', time: '2 hours ago', read: false },
  { id: '3', type: 'ticket', title: 'Ticket Resolved', body: 'Your plumbing issue #8823 has been marked resolved.', time: 'Yesterday', read: true },
  { id: '4', type: 'system', title: 'Maintenance Due', body: 'Please pay your monthly maintenance.', time: '2 days ago', read: true },
];

const NotificationItem = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'gate': return { name: 'security', color: colors.error.main };
      case 'admin': return { name: 'campaign', color: colors.primary.main };
      case 'ticket': return { name: 'handyman', color: colors.success.main };
      default: return { name: 'notifications', color: colors.text.secondary };
    }
  };

  const iconData = getIcon();

  return (
    <TouchableOpacity style={[styles.item, !item.read && styles.unreadItem]}>
      <View style={[styles.iconBox, { backgroundColor: iconData.color + '15' }]}>
        <Icon name={iconData.name} size={24} color={iconData.color} />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
      </View>
      {!item.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );
};

const NotificationsScreen = ({ navigation }) => {
  const [list, setList] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setList(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Notifications" 
        showBack 
        rightIcons={[{ icon: 'done-all', onPress: markAllRead }]} 
      />
      
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <NotificationItem item={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="notifications-none" size={60} color={colors.text.tertiary} />
            <Text style={styles.emptyText}>No new notifications</Text>
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
  list: {
    padding: spacing.md,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  unreadItem: {
    backgroundColor: '#F0F9FF', // Light blue tint
    borderLeftWidth: 3,
    borderLeftColor: colors.primary.main,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
    fontWeight: '600',
  },
  unreadTitle: {
    fontWeight: '700',
    color: colors.primary.dark,
  },
  time: {
    fontSize: 10,
    color: colors.text.tertiary,
  },
  body: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.main,
    marginLeft: spacing.sm,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.text.tertiary,
  },
});

export default NotificationsScreen;