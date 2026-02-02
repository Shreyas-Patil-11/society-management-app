// // /**
// //  * Select Flat Screen
// //  * * Step 2 of Manual Lookup
// //  */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';

// Service
import { getFlatsByBlock } from '../../services/visitorService';

const SelectFlatScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const params = route.params; // Contains visitorName, blockId, blockName, etc.
  
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlats();
  }, []);

  const loadFlats = async () => {
    try {
      const result = await getFlatsByBlock(params.blockId);
      if (result.success) {
        setFlats(result.data);
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (flat) => {
    navigation.navigate('ConfirmSelection', {
      ...params,
      flatId: flat.id,
      flatNumber: flat.flat_number
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.flatNum}>{item.flat_number}</Text>
      {/* UI: Status Dot (Green if occupied, Grey if vacant/unknown) */}
      <View 
        style={[
          styles.statusDot, 
          { 
            backgroundColor: item.status === 'Occupied' 
              ? colors.success?.main || '#22C55E' // Fallback green
              : colors.border.main 
          }
        ]} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={`${params.blockName} - Select Flat`} showBack />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={flats}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + spacing.lg }]}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>No flats found in this block</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 1, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  empty: {
    textAlign: 'center',
    marginTop: 40,
    ...typography.textStyles.bodyMedium,
    color: colors.text.tertiary,
  },
});

export default SelectFlatScreen;