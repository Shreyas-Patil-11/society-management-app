// import React from 'react'
// import { View } from 'react-native'
// import { Text } from 'react-native-gesture-handler'

// const ResidentsScreen = () => {
//   return (
//     <View>
//         <Text>
//             ResidentsScreen
//         </Text>
//     </View>
//   )
// }

// export default ResidentsScreen


/**
 * Residents Directory Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Input from '../../../components/common/Input';

const RESIDENTS = [
  { id: '1', name: 'Amit Sharma', flat: 'A-101', role: 'Secretary', phone: '9876543210' },
  { id: '2', name: 'Priya Patel', flat: 'A-102', role: 'Member', phone: null },
  { id: '3', name: 'Dr. John Doe', flat: 'B-201', role: 'Treasurer', phone: '9876543210' },
  { id: '4', name: 'Sneha Gupta', flat: 'B-202', role: 'Member', phone: null },
  { id: '5', name: 'Rohan Mehta', flat: 'C-301', role: 'Member', phone: '9876543210' },
];

const ResidentItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.flat}>{item.flat} • {item.role}</Text>
    </View>
    {item.phone && (
      <TouchableOpacity 
        style={styles.callBtn}
        onPress={() => Linking.openURL(`tel:${item.phone}`)}
      >
        <Icon name="phone" size={20} color={colors.primary.main} />
      </TouchableOpacity>
    )}
  </View>
);

const ResidentsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = RESIDENTS.filter(
    r => r.name.toLowerCase().includes(search.toLowerCase()) || 
         r.flat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="Residents" showBack />
      
      <View style={styles.searchContainer}>
        <Input 
          placeholder="Search by name or flat no..." 
          value={search}
          onChangeText={setSearch}
          leftIcon="search"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ResidentItem item={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No residents found</Text>
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
  searchContainer: {
    padding: spacing.md,
    backgroundColor: colors.background.primary,
  },
  list: {
    padding: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.textStyles.h4,
    color: colors.white,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  flat: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  callBtn: {
    padding: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.full,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.tertiary,
  },
});

export default ResidentsScreen;