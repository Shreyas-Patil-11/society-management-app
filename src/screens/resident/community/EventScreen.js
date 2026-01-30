/**
 * Community Events
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';

const EVENTS = [
  { id: '1', title: 'Diwali Celebration', date: '12 Nov', time: '06:00 PM', location: 'Club House', image: 'https://via.placeholder.com/300x150/FF9800/FFFFFF?text=Diwali' },
  { id: '2', title: 'Annual General Meeting', date: '25 Nov', time: '10:00 AM', location: 'Conference Hall', image: 'https://via.placeholder.com/300x150/2196F3/FFFFFF?text=AGM' },
  { id: '3', title: 'Yoga Workshop', date: 'Every Sunday', time: '07:00 AM', location: 'Garden Area', image: 'https://via.placeholder.com/300x150/4CAF50/FFFFFF?text=Yoga' },
];

const EventCard = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    <View style={styles.content}>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{item.date.split(' ')[0]}</Text>
        <Text style={styles.monthText}>{item.date.split(' ')[1]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Icon name="access-time" size={16} color={colors.text.tertiary} />
          <Text style={styles.metaText}>{item.time}</Text>
          <View style={styles.dot} />
          <Icon name="place" size={16} color={colors.text.tertiary} />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const EventsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Events" showBack />
      
      <FlatList
        data={EVENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <EventCard item={item} />}
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
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRightWidth: 1,
    borderRightColor: colors.border.light,
    marginRight: spacing.md,
  },
  dateText: {
    ...typography.textStyles.h3,
    color: colors.primary.main,
  },
  monthText: {
    ...typography.textStyles.caption,
    textTransform: 'uppercase',
    color: colors.text.secondary,
    fontWeight: '600',
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.tertiary,
    marginHorizontal: spacing.sm,
  },
});

export default EventsScreen;