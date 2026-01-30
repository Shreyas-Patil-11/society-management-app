// import React from 'react'
// import { Text, View } from 'react-native'

// const ActivityScreen = () => {
//   return (
//     <View>
//         <Text>ActivityScreen</Text>
//     </View>
//   )
// }

// export default ActivityScreen


/**
 * Community Activity Screen
 * * Main Hub for Feeds, Notices, and Polls
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import FloatingActionButton from '../../../components/common/FloatingActionButton';
import StatusBadge from '../../../components/common/StatusBadge';

// Mock Data
const FEEDS = [
  {
    id: '1',
    type: 'notice',
    author: 'Admin',
    title: 'Water Tank Cleaning',
    content: 'Water supply will be disrupted tomorrow from 10 AM to 2 PM for maintenance.',
    time: '2 hours ago',
    likes: 12,
    comments: 0,
    important: true,
  },
  {
    id: '2',
    type: 'post',
    author: 'Rahul Sharma (A-201)',
    title: 'Selling Old Sofa',
    content: 'Selling my 3-seater sofa. Good condition. Price: ₹5000.',
    image: 'https://via.placeholder.com/300x200',
    time: '5 hours ago',
    likes: 5,
    comments: 2,
  },
  {
    id: '3',
    type: 'poll',
    author: 'Society Admin',
    title: 'Diwali Party Date?',
    content: 'Please vote for your preferred date for the celebration.',
    votes: 45,
    time: '1 day ago',
    options: ['Sat, 24th Oct', 'Sun, 25th Oct'],
  },
];

const FeedCard = ({ item }) => (
  <View style={styles.card}>
    {/* Header */}
    <View style={styles.cardHeader}>
      <View style={styles.authorRow}>
        <View style={[styles.avatar, item.type === 'notice' && styles.adminAvatar]}>
          <Icon 
            name={item.type === 'notice' ? 'campaign' : 'person'} 
            size={20} 
            color={colors.white} 
          />
        </View>
        <View>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
      {item.important && <StatusBadge status="warning" label="IMPORTANT" size="small" />}
    </View>

    {/* Content */}
    <View style={styles.cardContent}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.content}</Text>
    </View>

    {/* Footer Actions */}
    <View style={styles.cardFooter}>
      <TouchableOpacity style={styles.actionBtn}>
        <Icon name="thumb-up-off-alt" size={20} color={colors.text.secondary} />
        <Text style={styles.actionText}>{item.likes || 0} Likes</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionBtn}>
        <Icon name="chat-bubble-outline" size={20} color={colors.text.secondary} />
        <Text style={styles.actionText}>{item.comments || 0} Comments</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Icon name="share" size={20} color={colors.text.secondary} />
      </TouchableOpacity>
    </View>
  </View>
);

const ActivityScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all'); // all | notice | poll

  const filteredData = filter === 'all' 
    ? FEEDS 
    : FEEDS.filter(item => item.type === filter);

  return (
    <View style={styles.container}>
      <Header 
        title="Community" 
        showBack={false}
        rightIcons={[
          { icon: 'contacts', onPress: () => navigation.navigate('Residents') }
        ]}
      />

      {/* Filter Tabs */}
      <View style={styles.tabs}>
        {['All', 'Notice', 'Poll'].map((tab) => {
          const key = tab.toLowerCase();
          const isActive = filter === key;
          return (
            <TouchableOpacity 
              key={key} 
              style={[styles.tabItem, isActive && styles.activeTab]}
              onPress={() => setFilter(key)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 80 }]}
        renderItem={({ item }) => <FeedCard item={item} />}
        showsVerticalScrollIndicator={false}
      />

      <FloatingActionButton 
        icon="edit" 
        onPress={() => navigation.navigate('CreatePost')} 
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
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    backgroundColor: colors.background.secondary,
  },
  activeTab: {
    backgroundColor: colors.primary.main,
  },
  tabText: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.white,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  adminAvatar: {
    backgroundColor: colors.primary.main,
  },
  authorName: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '700',
    color: colors.text.primary,
  },
  timeText: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
  cardContent: {
    marginBottom: spacing.md,
  },
  postTitle: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  postBody: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.sm,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  actionText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginLeft: 4,
  },
});

export default ActivityScreen;