

/**
 * Payment Methods Screen
 * Select Mode -> Call Backend -> Navigate to Receipt
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import { useToast } from '../../../hooks/useToast';

// Service
import { makePayment } from '../../../services/paymentService';

const PAYMENT_METHODS = [
  { id: 'UPI', label: 'UPI', icon: 'smartphone', sub: 'GPay, PhonePe, Paytm' },
  { id: 'CARD', label: 'Credit / Debit Card', icon: 'credit-card', sub: 'Visa, Mastercard' },
  { id: 'NET_BANKING', label: 'Net Banking', icon: 'account-balance', sub: 'All Indian banks' },
];

const PaymentMethodsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  
  // Get params passed from PaymentsScreen
  const { billId, amount, title } = route.params || {};
  
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    if (!billId) {
        showError("Invalid Bill ID");
        return;
    }

    setIsProcessing(true);

    try {
        const payload = {
            bill_id: billId,
            amount: amount,
            payment_mode: selectedMethod // 'UPI', 'CARD', etc.
        };

        const result = await makePayment(payload);

        if (result.success) {
            showSuccess('Payment Successful!');
            // Navigate to Receipt with the response data (Transaction ID etc.)
            navigation.replace('PaymentReceipt', { 
                paymentData: result.data,
                amount: amount
            });
        } else {
            showError(result.message || 'Payment Failed');
        }
    } catch (error) {
        showError('Network Error');
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Make Payment" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Bill Summary */}
        <Card style={styles.billCard}>
          <Text style={styles.billLabel}>Total Payable</Text>
          <Text style={styles.billAmount}>₹{amount}</Text>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.billDetailLabel}>Payment For</Text>
            <Text style={styles.billDetailValue}>{title}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        <View style={styles.methodsContainer}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodItem,
                selectedMethod === method.id && styles.selectedMethod
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodIconBox}>
                <Icon 
                  name={method.icon} 
                  size={24} 
                  color={selectedMethod === method.id ? colors.primary.main : colors.text.secondary} 
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={[
                  styles.methodLabel,
                  selectedMethod === method.id && styles.selectedText
                ]}>{method.label}</Text>
                <Text style={styles.methodSub}>{method.sub}</Text>
              </View>
              <View style={styles.radio}>
                {selectedMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title={`Pay ₹${amount}`} 
          onPress={handlePay} 
          loading={isProcessing}
          icon="lock"
        />
        <View style={styles.secureBadge}>
          <Icon name="verified-user" size={14} color={colors.success.main} />
          <Text style={styles.secureText}>100% Secure Payment</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  content: { padding: spacing.lg },
  billCard: { alignItems: 'center', marginBottom: spacing.xl, paddingVertical: spacing.xl },
  billLabel: { ...typography.textStyles.bodyMedium, color: colors.text.secondary, marginBottom: spacing.xs },
  billAmount: { ...typography.textStyles.h2, color: colors.text.primary, marginBottom: spacing.md },
  divider: { height: 1, width: '100%', backgroundColor: colors.border.light, marginVertical: spacing.md },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  billDetailLabel: { ...typography.textStyles.bodyMedium, color: colors.text.secondary },
  billDetailValue: { ...typography.textStyles.bodyMedium, fontWeight: '600', color: colors.text.primary },
  sectionTitle: { ...typography.textStyles.h4, color: colors.text.primary, marginBottom: spacing.md },
  methodsContainer: { backgroundColor: colors.background.primary, borderRadius: borderRadius.lg, padding: spacing.sm },
  methodItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.xs, borderWidth: 1, borderColor: 'transparent' },
  selectedMethod: { borderColor: colors.primary.main, backgroundColor: colors.primary.background },
  methodIconBox: { width: 40, alignItems: 'center', marginRight: spacing.md },
  methodInfo: { flex: 1 },
  methodLabel: { ...typography.textStyles.bodyMedium, fontWeight: '600', color: colors.text.primary },
  selectedText: { color: colors.primary.main },
  methodSub: { ...typography.textStyles.caption, color: colors.text.tertiary },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.text.tertiary, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary.main },
  footer: { padding: spacing.lg, backgroundColor: colors.background.primary, borderTopWidth: 1, borderTopColor: colors.border.light },
  secureBadge: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: spacing.sm, gap: 4 },
  secureText: { ...typography.textStyles.caption, color: colors.text.secondary },
});

export default PaymentMethodsScreen;