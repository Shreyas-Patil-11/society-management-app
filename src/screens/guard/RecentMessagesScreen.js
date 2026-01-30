/**
 * Guard Messages Screen
 * * Quick communication with residents/admin
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Header from '../../components/common/Header';

const MESSAGES = [
  { id: '1', sender: 'Admin', text: 'Please check the rear gate camera.', time: '10 min ago', urgent: true },
  { id: '2', sender: 'Flat A-101', text: 'My guest is arriving in 5 mins.', time: '1 hour ago', urgent: false },
  { id: '3', sender: 'Flat B-404', text: 'Did the milkman come?', time: '2 hours ago', urgent: false },
];

const MessageItem = ({ item }) => (
  <TouchableOpacity style={[styles.card, item.urgent && styles.urgentCard]}>
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Icon 
          name={item.sender === 'Admin' ? 'admin-panel-settings' : 'home'} 
          size={24} 
          color={item.urgent ? colors.error.main : colors.primary.main} 
        />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.text} numberOfLines={2}>{item.text}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const RecentMessagesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Messages" showBack />
      
      <FlatList
        data={MESSAGES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <MessageItem item={item} />}
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
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
    elevation: 1,
  },
  urgentCard: {
    borderLeftColor: colors.error.main,
    backgroundColor: '#FEF2F2',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sender: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '700',
    color: colors.text.primary,
  },
  time: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
  text: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
});

export default RecentMessagesScreen;