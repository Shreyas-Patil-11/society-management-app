/**
 * Notice Board Screen
 * Connected to Backend API
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

// 1. IMPORT SERVICE
import { getNotices } from '../../../services/noticeService';

const NoticeItem = ({ notice, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(notice)} activeOpacity={0.8}>
    <View style={styles.headerRow}>
      <View style={styles.iconContainer}>
        <Icon name="campaign" size={24} color={colors.primary.main} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {notice.title}
        </Text>
        <Text style={styles.date}>{notice.date}</Text>
      </View>
      {notice.isNew && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW</Text>
        </View>
      )}
    </View>
    <Text style={styles.preview} numberOfLines={2}>
      {notice.description}
    </Text>
  </TouchableOpacity>
);

const NoticeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modal State
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 2. FETCH FUNCTION
  const fetchNotices = async () => {
    try {
      const result = await getNotices();
      console.log("Notices API Result:", result); // Debug Log

      if (result.success && Array.isArray(result.data)) {
        // Map Backend Data to UI
        const mappedData = result.data.map(item => {
          const createdDate = new Date(item.created_at);
          const isRecent = (new Date() - createdDate) / (1000 * 60 * 60 * 24) < 3; // < 3 days old

          return {
            id: item.id,
            title: item.title,
            description: item.description,
            date: createdDate.toLocaleDateString('en-US', { 
              day: 'numeric', month: 'short', year: 'numeric' 
            }),
            isNew: isRecent,
            rawDate: createdDate
          };
        });

        // Sort by newest first
        mappedData.sort((a, b) => b.rawDate - a.rawDate);
        setNotices(mappedData);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotices();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotices();
  };

  const handlePress = (notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Notice Board" showBack />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <NoticeItem notice={item} onPress={handlePress} />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon name="campaign" size={48} color={colors.text.tertiary} />
              <Text style={styles.emptyText}>No notices yet</Text>
            </View>
          }
        />
      )}

      {/* Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notice Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              {selectedNotice && (
                <>
                  <Text style={styles.detailTitle}>{selectedNotice.title}</Text>
                  <View style={styles.dateRow}>
                    <Icon name="event" size={16} color={colors.text.tertiary} />
                    <Text style={styles.detailDate}>{selectedNotice.date}</Text>
                  </View>
                  <View style={styles.divider} />
                  <Text style={styles.detailDescription}>{selectedNotice.description}</Text>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  list: {
    padding: spacing.md,
  },
  card: {
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light + '20',
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  textContainer: { flex: 1 },
  title: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  date: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
  preview: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  badge: {
    backgroundColor: colors.error.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  badgeText: {
    ...typography.textStyles.caption,
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center', marginTop: 60,
  },
  emptyText: {
    ...typography.textStyles.bodyLarge,
    color: colors.text.tertiary,
    marginTop: spacing.md,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg,
  },
  modalTitle: { ...typography.textStyles.h4, color: colors.text.primary },
  modalBody: { marginBottom: spacing.md },
  detailTitle: { ...typography.textStyles.h4, color: colors.primary.main, marginBottom: spacing.sm },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  detailDate: { ...typography.textStyles.bodySmall, color: colors.text.tertiary, marginLeft: spacing.xs },
  divider: { height: 1, backgroundColor: colors.border.light, marginBottom: spacing.md },
  detailDescription: { ...typography.textStyles.bodyLarge, color: colors.text.primary, lineHeight: 24 },
});

export default NoticeScreen;