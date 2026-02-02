// // /**
// //  * Select Building Screen
// //  * * Step 1 of Manual Lookup
// //  */


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';

// Service
import { getSocietyBlocks } from '../../services/visitorService';

const SelectBuildingScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { visitorName, visitorPhone, vehicleNo, visitorType } = route.params;
  
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      const result = await getSocietyBlocks();
      if (result.success) {
        setBlocks(result.data);
      } else {
        console.log("Block Fetch Error:", result.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (block) => {
    navigation.navigate('SelectFlat', {
      visitorName,
      visitorPhone,
      vehicleNo,
      visitorType,
      blockId: block.id,
      blockName: block.name
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Select Building" showBack />
      
      <Text style={styles.helperText}>Which building is the visitor going to?</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={blocks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          ListEmptyComponent={
            <Text style={styles.empty}>No buildings found</Text>
          }
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
                {/* Optional: Add occupancy or other info if available in backend */}
                <Text style={styles.sub}>Select to view flats</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
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
    // Shadows
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
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    ...typography.textStyles.bodyMedium,
    color: colors.text.tertiary,
  },
});

export default SelectBuildingScreen;