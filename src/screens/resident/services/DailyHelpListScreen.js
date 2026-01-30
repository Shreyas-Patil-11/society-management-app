/**
 * Daily Help Directory
 * * Find Maids, Cooks, Drivers etc.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import StatusBadge from '../../../components/common/StatusBadge';

const HELPERS = [
  { id: '1', name: 'Sunita Devi', type: 'Maid', rating: '4.8', status: 'Inside', phone: '9876543210' },
  { id: '2', name: 'Raju Kumar', type: 'Driver', rating: '4.5', status: 'Outside', phone: '9876543210' },
  { id: '3', name: 'Anita Singh', type: 'Cook', rating: '4.9', status: 'Inside', phone: '9876543210' },
  { id: '4', name: 'Kamlesh', type: 'Cleaner', rating: '4.2', status: 'Outside', phone: '9876543210' },
];

const HelperCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Icon name="person" size={32} color={colors.white} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={16} color="#F59E0B" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.status}>
        <StatusBadge 
          status={item.status === 'Inside' ? 'success' : 'neutral'} 
          label={item.status} 
          size="small" 
        />
      </View>
    </View>
  </TouchableOpacity>
);

const DailyHelpListScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' 
    ? HELPERS 
    : HELPERS.filter(h => h.type === filter);

  const categories = ['All', 'Maid', 'Cook', 'Driver'];

  return (
    <View style={styles.container}>
      <Header title="Daily Help" showBack />
      
      {/* Category Filter */}
      <View style={styles.cats}>
        {categories.map(cat => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.catItem, filter === cat && styles.catActive]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.catText, filter === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HelperCard 
            item={item} 
            onPress={() => navigation.navigate('BookService', { helper: item })} 
          />
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
  cats: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background.primary,
  },
  catItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    marginRight: spacing.sm,
  },
  catActive: {
    backgroundColor: colors.primary.main,
  },
  catText: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  catTextActive: {
    color: colors.white,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '700',
    color: colors.text.primary,
  },
  type: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.text.primary,
    marginLeft: 4,
  },
  status: {
    alignItems: 'flex-end',
  },
});

export default DailyHelpListScreen;