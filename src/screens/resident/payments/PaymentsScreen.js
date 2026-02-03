
/**
 * Payments Screen
 * Features:
 * 1. Pending Bills (Pay Now)
 * 2. Payment History (View Paid Bills)
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
  Alert,
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
import { getMyBills } from '../../../services/paymentService';

// --- TAB COMPONENT ---
const TabSwitch = ({ activeTab, onTabChange }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'PENDING' && styles.activeTab]}
      onPress={() => onTabChange('PENDING')}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === 'PENDING' && styles.activeTabText,
        ]}
      >
        Pending
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'PAID' && styles.activeTab]}
      onPress={() => onTabChange('PAID')}
    >
      <Text
        style={[styles.tabText, activeTab === 'PAID' && styles.activeTabText]}
      >
        History
      </Text>
    </TouchableOpacity>
  </View>
);

const BillCard = ({ bill, activeTab, onPay, onViewReceipt }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View
        style={[styles.iconBox, activeTab === 'PAID' && styles.paidIconBox]}
      >
        <Icon
          name={activeTab === 'PAID' ? 'check-circle' : 'receipt-long'}
          size={24}
          color={
            activeTab === 'PAID' ? colors.success.main : colors.primary.main
          }
        />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.billMonth}>{bill.billing_month}</Text>
        <Text style={styles.billType}>Maintenance Bill</Text>
      </View>
      <View style={styles.amountBox}>
        <Text
          style={[
            styles.amountText,
            activeTab === 'PAID' && { color: colors.success.dark },
          ]}
        >
          ₹{bill.amount}
        </Text>
      </View>
    </View>

    <View style={styles.divider} />

    <View style={styles.cardFooter}>
      <View style={styles.dateRow}>
        <Text style={styles.label}>
          {activeTab === 'PAID' ? 'Paid On:' : 'Due Date:'}
        </Text>
        <Text style={styles.value}>
          {activeTab === 'PAID' ? 'Recently' : bill.due_date}
        </Text>
      </View>

      {activeTab === 'PENDING' ? (
        <TouchableOpacity style={styles.payBtn} onPress={() => onPay(bill)}>
          <Text style={styles.payBtnText}>PAY NOW</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => onViewReceipt(bill)}
        >
          <Text style={styles.receiptBtnText}>Receipt</Text>
          <Icon name="arrow-forward" size={14} color={colors.primary.main} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const PaymentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('PENDING'); // 'PENDING' or 'PAID'
  const [allBills, setAllBills] = useState([]); // Store complete list
  const [displayBills, setDisplayBills] = useState([]); // Store filtered list
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBills = async () => {
    try {
      const result = await getMyBills();

      if (result.success && Array.isArray(result.data)) {
        const formattedBills = result.data.map(b => ({
          id: b.id.toString(),
          amount: b.amount,
          billing_month: b.billing_month,
          due_date: new Date(b.due_date).toLocaleDateString(),
          status: b.status, // 'PENDING' or 'PAID'
        }));

        setAllBills(formattedBills);
        filterBills(formattedBills, activeTab);
      } else {
        setAllBills([]);
        setDisplayBills([]);
      }
    } catch (error) {
      console.error('Fetch Bills Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter helper
  const filterBills = (bills, status) => {
    const filtered = bills.filter(b => b.status === status);
    setDisplayBills(filtered);
  };

  // Handle Tab Change
  const handleTabChange = tab => {
    setActiveTab(tab);
    filterBills(allBills, tab);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBills();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchBills();
  };

  const handlePay = bill => {
    navigation.navigate('PaymentMethods', {
      billId: bill.id,
      amount: bill.amount,
      title: `Maintenance - ${bill.billing_month}`,
    });
  };

  const handleViewReceipt = bill => {
    // Navigate to Receipt Screen (Simulated Data for now since it's history)
    navigation.navigate('PaymentReceipt', {
      paymentData: {
        id: `HIST-${bill.id}`,
        payment_date: new Date().toISOString(), // Mock date as backend might not send paid_at in bill list
        payment_mode: 'Online',
      },
      amount: bill.amount,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Payments" showBack />

      {/* Tabs */}
      <View style={styles.headerContainer}>
        <TabSwitch activeTab={activeTab} onTabChange={handleTabChange} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={displayBills}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + spacing.lg },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <BillCard
              bill={item}
              activeTab={activeTab}
              onPay={handlePay}
              onViewReceipt={handleViewReceipt}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon
                name={activeTab === 'PENDING' ? 'check-circle' : 'history'}
                size={64}
                color={colors.text.tertiary}
              />
              <Text style={styles.emptyText}>
                {activeTab === 'PENDING'
                  ? 'No Pending Dues!'
                  : 'No Payment History'}
              </Text>
              <Text style={styles.emptySubText}>
                {activeTab === 'PENDING'
                  ? 'You are all caught up.'
                  : 'Paid bills will appear here.'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  headerContainer: { paddingHorizontal: spacing.md, marginTop: spacing.sm },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: spacing.md },

  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTab: {
    backgroundColor: colors.primary.light + '30',
  },
  tabText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.primary.main,
    fontWeight: '700',
  },

  // Card Styles
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  paidIconBox: {
    backgroundColor: colors.success.light + '20',
  },
  headerText: { flex: 1 },
  billMonth: { ...typography.textStyles.h4, color: colors.text.primary },
  billType: { ...typography.textStyles.caption, color: colors.text.secondary },
  amountBox: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  amountText: {
    ...typography.textStyles.h4,
    color: colors.primary.dark,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginBottom: spacing.md,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRow: { flexDirection: 'row', alignItems: 'center' },
  label: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginRight: 4,
  },
  value: {
    ...typography.textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },

  payBtn: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  payBtnText: {
    ...typography.textStyles.button,
    color: colors.white,
    fontSize: 12,
  },

  receiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  receiptBtnText: {
    ...typography.textStyles.button,
    color: colors.primary.main,
    fontSize: 12,
  },

  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  emptySubText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
});

export default PaymentsScreen;
