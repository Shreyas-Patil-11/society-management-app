/**
 * Notifications Screen
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const NOTIFICATIONS = [
  { id: '1', title: 'Entry Approved', message: 'Rohan (Delivery) has entered.', time: '2 mins ago', icon: 'check-circle', color: colors.success.main },
  { id: '2', title: 'Maintenance Bill', message: 'Bill for Oct 2023 generated.', time: '5 hours ago', icon: 'receipt', color: colors.warning.main },
  { id: '3', title: 'Notice Board', message: 'Diwali celebration meeting on Sunday.', time: '1 day ago', icon: 'campaign', color: colors.info.main },
];

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" showBack />
      
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
              <Icon name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
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
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  message: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  time: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
});

export default NotificationsScreen;