
/**
 * Help Desk Screen (My Complaints)
 * Connected to Backend API
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import StatusBadge from '../../../components/common/StatusBadge';

// Import Service
import { getMyComplaints } from '../../../services/ComplaintService';

const ComplaintItem = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <View style={styles.cardHeader}>
      <View style={styles.headerLeft}>
        <Text style={styles.ticketId}>#{item.id}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <StatusBadge status={item.status} />
    </View>
    
    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
    
    <View style={styles.divider} />
    
    <View style={styles.footer}>
      <View style={styles.categoryBadge}>
        <Icon name="build" size={14} color={colors.text.secondary} />
        <Text style={styles.categoryText}>Maintenance</Text>
      </View>
      <Icon name="chevron-right" size={20} color={colors.text.tertiary} />
    </View>
  </TouchableOpacity>
);

const HelpDeskScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComplaints = async () => {
    try {
      const result = await getMyComplaints();
      if (result.success && Array.isArray(result.data)) {
        // Map Backend Data to UI
        const mappedData = result.data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          status: item.status.toLowerCase(), // 'OPEN' -> 'open' for Badge
          date: new Date(item.created_at).toLocaleDateString(),
          rawDate: new Date(item.created_at)
        }));
        
        // Sort by newest
        mappedData.sort((a, b) => b.rawDate - a.rawDate);
        setComplaints(mappedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchComplaints();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchComplaints();
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Help Desk" 
        showBack 
        rightIcons={[
          { icon: 'add', onPress: () => navigation.navigate('RaiseTicket') }
        ]}
      />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => <ComplaintItem item={item} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon name="support-agent" size={64} color={colors.text.tertiary} />
              <Text style={styles.emptyTitle}>No Complaints Yet</Text>
              <Text style={styles.emptySubtitle}>Have an issue? Tap + to raise a ticket.</Text>
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
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  ticketId: { ...typography.textStyles.caption, fontWeight: '700', color: colors.primary.main },
  date: { ...typography.textStyles.caption, color: colors.text.tertiary },
  title: { ...typography.textStyles.h4, color: colors.text.primary, marginBottom: 4 },
  description: { ...typography.textStyles.bodyMedium, color: colors.text.secondary, marginBottom: spacing.md },
  divider: { height: 1, backgroundColor: colors.border.light, marginBottom: spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.sm, gap: 4
  },
  categoryText: { ...typography.textStyles.caption, color: colors.text.secondary },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { ...typography.textStyles.h3, color: colors.text.secondary, marginTop: spacing.md },
  emptySubtitle: { ...typography.textStyles.bodyMedium, color: colors.text.tertiary, marginTop: spacing.xs },
});

export default HelpDeskScreen;