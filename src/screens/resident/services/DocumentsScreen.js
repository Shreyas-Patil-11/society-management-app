

/**
 * Documents Screen
 * Lists Society Rules, AGM Reports, etc.
 * Fixed: Removed fallback mock data to allow "No documents found" state.
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Linking,
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

// Import Service
import { getDocuments } from '../../../services/documentService';

const DocumentItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.card} 
    activeOpacity={0.7}
    onPress={() => {
        if(item.url) {
            Linking.openURL(item.url).catch(err => Alert.alert("Error", "Cannot open file"));
        } else {
            Alert.alert("Info", "This is a placeholder document.");
        }
    }}
  >
    <View style={styles.iconBox}>
      <Icon name="description" size={28} color={colors.primary.main} />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>Uploaded: {item.date}</Text>
    </View>
    <Icon name="download" size={24} color={colors.text.tertiary} />
  </TouchableOpacity>
);

const DocumentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDocuments = async () => {
    try {
      const result = await getDocuments();
      
      // FIX: Only set data if API returns valid array. Otherwise set empty.
      if (result.success && Array.isArray(result.data)) {
        // Map Backend Data
        const mappedData = result.data.map(doc => ({
          id: doc.id.toString(),
          title: doc.title || doc.report_name || 'Untitled Document',
          date: new Date(doc.created_at).toLocaleDateString(),
          url: doc.file_url || null, 
          rawDate: new Date(doc.created_at)
        }));
        
        // Sort by newest
        mappedData.sort((a, b) => b.rawDate - a.rawDate);
        setDocuments(mappedData);
      } else {
        // FIX: Removed Mock Data. Now it sets empty array to trigger ListEmptyComponent.
        setDocuments([]); 
      }
    } catch (error) {
      console.error(error);
      setDocuments([]); // Set empty on error too
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDocuments();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchDocuments();
  };

  return (
    <View style={styles.container}>
      <Header title="Documents" showBack />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => <DocumentItem item={item} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon name="folder-off" size={48} color={colors.text.tertiary} />
              <Text style={styles.emptyText}>No documents found</Text>
              <Text style={styles.emptySubText}>Check back later for society updates.</Text>
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
  },
  iconBox: {
    width: 48, height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary.light + '20',
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: { flex: 1 },
  title: { ...typography.textStyles.bodyLarge, fontWeight: '600', color: colors.text.primary, marginBottom: 4 },
  date: { ...typography.textStyles.caption, color: colors.text.tertiary },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyText: { ...typography.textStyles.h4, color: colors.text.secondary, marginTop: spacing.md },
  emptySubText: { ...typography.textStyles.bodyMedium, color: colors.text.tertiary, marginTop: spacing.xs },
});

export default DocumentsScreen;