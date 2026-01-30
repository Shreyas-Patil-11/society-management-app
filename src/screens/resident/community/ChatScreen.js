/**
 * Chat List Screen
 * * List of active conversations
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';

const CHATS = [
  { id: '1', name: 'Main Gate Security', message: 'Your parcel has arrived.', time: '10:30 AM', unread: 2, type: 'guard' },
  { id: '2', name: 'Secretary (Amit)', message: 'Please attend the meeting.', time: 'Yesterday', unread: 0, type: 'admin' },
  { id: '3', name: 'Rohan (A-202)', message: 'Thanks for the help!', time: 'Yesterday', unread: 0, type: 'resident' },
];

const ChatItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={[styles.avatar, item.type === 'guard' && styles.guardAvatar]}>
      <Icon 
        name={item.type === 'guard' ? 'security' : 'person'} 
        size={24} 
        color={colors.white} 
      />
    </View>
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.message, item.unread > 0 && styles.unreadMessage]} numberOfLines={1}>
          {item.message}
        </Text>
        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Messages" showBack />
      
      <FlatList
        data={CHATS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatItem 
            item={item} 
            onPress={() => navigation.navigate('Chatting', { name: item.name })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  list: {
    paddingVertical: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  guardAvatar: {
    backgroundColor: colors.secondary.main,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '700',
    color: colors.text.primary,
  },
  time: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  unreadMessage: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.primary.main,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ChatScreen;