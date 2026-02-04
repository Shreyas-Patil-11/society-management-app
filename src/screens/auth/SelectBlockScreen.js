import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Header from '../../components/common/Header';
import { apiClient } from '../../services/api/apiClient';
import { useToast } from '../../hooks/useToast';

const SelectBlockScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();
  
  // ✅ 1. Get Society Data
  const { userData, societyData } = route.params || {};

  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    if (!societyData?.id) {
      showError("Society data missing");
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Fetching blocks for Society ID: ${societyData.id}`);
      // ✅ Public API Call
      const response = await apiClient.get(`/blocks/public/${societyData.id}`);
      const data = response.data || response;
      setBlocks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Block Fetch Error:", error);
      showError('Failed to load blocks');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockSelect = (block) => {
    console.log("Selected Block:", block); // ✅ Debug Log

    if (!block || !block.id) {
        showError("Invalid Block Selection");
        return;
    }

    // ✅ Pass ALL Data to Next Screen
    navigation.navigate('SelectFlat', {
  userData: userData,
  societyData: societyData,
  blockData: block
});
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Select Block" showBack />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={blocks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No blocks found</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleBlockSelect(item)}>
              <View style={styles.iconBox}>
                <Icon name="domain" size={24} color={colors.primary.main} />
              </View>
              <Text style={styles.text}>{item.name}</Text>
              <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
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
    borderRadius: 8,
    marginBottom: spacing.sm,
    elevation: 1
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md
  },
  text: { flex: 1, fontSize: 16, color: colors.text.primary, fontWeight: '500' },
  emptyText: { textAlign: 'center', marginTop: 20, color: colors.text.secondary }
});

export default SelectBlockScreen;