/**
 * Select Flat Screen
 * * Step 2 of Manual Lookup
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';

// Generate Mock Flats (101-104, 201-204, etc.)
const FLOORS = [1, 2, 3, 4, 5];
const FLATS_PER_FLOOR = 4;

const generateFlats = () => {
  let flats = [];
  FLOORS.forEach(floor => {
    for (let i = 1; i <= FLATS_PER_FLOOR; i++) {
      flats.push({ id: `${floor}0${i}`, number: `${floor}0${i}`, status: 'occupied' });
    }
  });
  return flats;
};

const FLATS = generateFlats();

const SelectFlatScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { building } = route.params;
  const entryData = route.params;

  const handleSelect = (flat) => {
    navigation.navigate('ConfirmSelection', {
      ...entryData,
      flat: flat.number,
      fullAddress: `${building}, ${flat.number}`,
    });
  };

  return (
    <View style={styles.container}>
      <Header title={`${building} - Select Flat`} showBack />
      
      <FlatList
        data={FLATS}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + spacing.lg }]}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.flatNum}>{item.number}</Text>
            <View style={[styles.statusDot, { backgroundColor: item.status === 'occupied' ? colors.success.main : colors.border.main }]} />
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
  grid: {
    padding: spacing.md,
  },
  card: {
    flex: 1,
    margin: spacing.sm,
    height: 80,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
    elevation: 1,
  },
  flatNum: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default SelectFlatScreen;