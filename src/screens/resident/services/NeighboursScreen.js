/**
 * Find Neighbours Screen
 * Connected to Backend API
 * Logic: Shows Flat (n-1) and (n+1)
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

import { useAuth } from '../../../hooks/useAuth';
// IMP: Import the service we created
import { getMyNeighbours } from '../../../services/neighbourService';

const NeighbourCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.avatarContainer}>
      <Icon name="person" size={30} color={colors.primary.main} />
    </View>
    
    <View style={styles.info}>
      <Text style={styles.name}>{item.Resident?.name || 'Resident'}</Text>
      <View style={styles.locationRow}>
        <Icon name="home" size={14} color={colors.text.tertiary} />
        <Text style={styles.flatText}>
           Flat {item.flat_number} • {item.Block?.name || 'Block'}
        </Text>
      </View>
    </View>

    {/* Phone/Contact Button (Mock Action) */}
    <TouchableOpacity 
      style={styles.actionBtn}
      onPress={() => Alert.alert('Contact', `Contact feature coming soon for ${item.Resident?.name}`)}
    >
      <Icon name="call" size={20} color={colors.primary.main} />
    </TouchableOpacity>
  </View>
);

const NeighboursScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth(); // Get logged-in user details
  
  const [neighbours, setNeighbours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchNeighbours = async () => {
    // 1. Validation: Ensure user has a flat assigned
    if (!user?.Flat?.id || !user?.Flat?.block_id) {
      setLoading(false);
      setRefreshing(false);
      setErrorMsg('You are not assigned to a flat/block yet.');
      return;
    }

    try {
      setErrorMsg(null);
      // 2. Call Service with (BlockID, MyFlatNumber)
      const result = await getMyNeighbours(user.Flat.block_id, user.Flat.flat_number);
      
      console.log("Neighbours Result:", result); // Debugging

      if (result.success) {
        setNeighbours(result.data);
      } else {
        // If API fails or logic returns false
        setErrorMsg(result.message || 'Could not fetch neighbours.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Network Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNeighbours();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNeighbours();
  };

  return (
    <View style={styles.container}>
      <Header title="My Neighbours" showBack />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={neighbours}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => <NeighbourCard item={item} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              {errorMsg ? (
                 <>
                   <Icon name="error-outline" size={48} color={colors.error.main} />
                   <Text style={[styles.emptyText, { color: colors.error.main }]}>{errorMsg}</Text>
                 </>
              ) : (
                 <>
                   <Icon name="person-search" size={48} color={colors.text.tertiary} />
                   <Text style={styles.emptyText}>No immediate neighbours found.</Text>
                   <Text style={styles.emptySubText}>
                     (Looking for flats {parseInt(user?.Flat?.flat_number)-1} and {parseInt(user?.Flat?.flat_number)+1})
                   </Text>
                 </>
              )}
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarContainer: {
    width: 50, height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary.light + '20',
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1 },
  name: { ...typography.textStyles.bodyLarge, fontWeight: '700', color: colors.text.primary, marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  flatText: { ...typography.textStyles.caption, color: colors.text.secondary },
  actionBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center', justifyContent: 'center',
  },
  empty: { alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  emptyText: { ...typography.textStyles.h4, color: colors.text.secondary, marginTop: spacing.md, textAlign: 'center' },
  emptySubText: { ...typography.textStyles.caption, color: colors.text.tertiary, marginTop: spacing.xs, textAlign: 'center' },
});

export default NeighboursScreen;