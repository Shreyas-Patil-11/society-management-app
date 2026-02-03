/**
 * Payment Receipt Screen
 * Shows success message and transaction details
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Button from '../../../components/common/Button';

const PaymentReceiptScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  
  // Data passed from PaymentMethodsScreen
  const { paymentData, amount } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 40 }]}>
        
        <View style={styles.successIcon}>
          <Icon name="check-circle" size={80} color={colors.success.main} />
        </View>

        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Thank you for your payment.</Text>

        <Text style={styles.amount}>₹{amount}</Text>

        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>#{paymentData?.id || 'TXN12345'}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>
                {paymentData?.payment_date 
                    ? new Date(paymentData.payment_date).toLocaleString() 
                    : new Date().toLocaleString()}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Payment Mode</Text>
            <Text style={styles.value}>{paymentData?.payment_mode || 'Online'}</Text>
          </View>
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Button 
          title="Back to Home" 
          onPress={() => navigation.navigate('ResidentTabs')} 
          variant="outline"
          style={{ marginBottom: spacing.md }}
        />
        <Button 
          title="Done" 
          onPress={() => navigation.navigate('Payments')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { alignItems: 'center', padding: spacing.xl },
  successIcon: { marginBottom: spacing.lg },
  title: { ...typography.textStyles.h3, color: colors.text.primary, marginBottom: spacing.xs },
  subtitle: { ...typography.textStyles.bodyMedium, color: colors.text.secondary, marginBottom: spacing.xl },
  amount: { ...typography.textStyles.h1, color: colors.primary.main, marginBottom: spacing.xl * 2 },
  detailsCard: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  label: { ...typography.textStyles.bodyMedium, color: colors.text.secondary },
  value: { ...typography.textStyles.bodyMedium, fontWeight: '700', color: colors.text.primary },
  divider: { height: 1, backgroundColor: colors.border.light, marginVertical: spacing.sm },
  footer: { padding: spacing.lg },
});

export default PaymentReceiptScreen;