/**
 * Amenities Payment/Invoice Screen
 * * Review booking details before making payment
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

const AmenitiesPaymentScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  // Mock data if params are missing
  const { 
    amenityName = 'Club House', 
    date = '2023-10-25', 
    slot = '10:00 AM', 
    price = '500' 
  } = route.params || {};

  const basePrice = parseInt(price);
  const taxes = basePrice * 0.18; // 18% GST
  const total = basePrice + taxes;

  const handleProceed = () => {
    navigation.navigate('PaymentMethods', {
      amount: total.toFixed(0),
      title: `Booking: ${amenityName}`,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Review Booking" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <Card style={styles.detailsCard}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="event" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Amenity</Text>
              <Text style={styles.value}>{amenityName}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="schedule" size={24} color={colors.secondary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Date & Time</Text>
              <Text style={styles.value}>{date} • {slot}</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <Card style={styles.billCard}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Base Rate</Text>
            <Text style={styles.billValue}>₹{basePrice}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes (18% GST)</Text>
            <Text style={styles.billValue}>₹{taxes.toFixed(0)}</Text>
          </View>
          <View style={[styles.divider, { marginVertical: spacing.md }]} />
          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{total.toFixed(0)}</Text>
          </View>
        </Card>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title={`Proceed to Pay ₹${total.toFixed(0)}`} 
          onPress={handleProceed} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  detailsCard: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  label: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  value: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    width: '100%',
  },
  billCard: {
    padding: spacing.lg,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  billLabel: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  billValue: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
    fontWeight: '500',
  },
  totalLabel: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
  },
  totalValue: {
    ...typography.textStyles.h4,
    color: colors.primary.main,
    fontWeight: '700',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default AmenitiesPaymentScreen;