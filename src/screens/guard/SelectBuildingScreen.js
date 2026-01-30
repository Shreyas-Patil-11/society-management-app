/**
 * Select Building Screen
 * * Step 1 of Manual Lookup
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';

const BUILDINGS = [
  { id: 'A', name: 'Tower A', occupancy: '90%' },
  { id: 'B', name: 'Tower B', occupancy: '85%' },
  { id: 'C', name: 'Tower C', occupancy: '60%' },
  { id: 'D', name: 'Tower D', occupancy: '40%' },
];

const SelectBuildingScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  // Pass forward any previous data (e.g., visitor name)
  const entryData = route.params || {};

  const handleSelect = (building) => {
    navigation.navigate('SelectFlat', {
      ...entryData,
      building: building.name,
      buildingId: building.id,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Select Building" showBack />
      
      <Text style={styles.helperText}>Which building is the visitor going to?</Text>

      <FlatList
        data={BUILDINGS}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleSelect(item)}
            activeOpacity={0.8}
          >
            <View style={styles.iconBox}>
              <Icon name="apartment" size={32} color={colors.primary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.occupancy} Occupied</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
          </TouchableOpacity>
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
  helperText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  list: {
    padding: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
  },
  sub: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
});

export default SelectBuildingScreen;