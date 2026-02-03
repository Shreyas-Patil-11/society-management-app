// // /**
// //  * Confirm Selection Screen
// //  * * Final review before notifying resident
// //  */


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import { useToast } from '../../hooks/useToast';

// Service Import
import { addVisitor } from '../../services/visitorService';

const ConfirmSelectionScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const { 
    visitorName, 
    visitorPhone, 
    vehicleNo, 
    visitorType, 
    blockName, 
    flatNumber, 
    flatId 
  } = route.params;

  const fullAddress = `${blockName} - ${flatNumber}`;

  // --- HELPER: Map Frontend Types to Database ENUM ---
  const getValidPurpose = (type) => {
    const upperType = type?.toUpperCase() || 'GUEST';
    const ALLOWED_VALUES = ['GUEST', 'DELIVERY', 'MAINTENANCE', 'OTHER'];
    
    // If the type (e.g., 'CAB') is not in the allowed list, map it to 'OTHER'
    return ALLOWED_VALUES.includes(upperType) ? upperType : 'OTHER';
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    
    const payload = {
      visitor_name: visitorName,
      purpose: getValidPurpose(visitorType), // Fix applied here
      flat_id: flatId,
      phone: visitorPhone, 
      vehicle_number: vehicleNo 
    };

    const result = await addVisitor(payload);

    if (result.success) {
      showSuccess("Visitor Entry Added!");
      navigation.reset({
        index: 0,
        routes: [{ name: 'GuardTabs' }], 
      });
    } else {
      showError(result.message || "Failed to add entry");
    }
    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Confirm Entry" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Entry Details</Text>
          
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="person" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Visitor Name</Text>
              <Text style={styles.value}>{visitorName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="phone" size={24} color={colors.info.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{visitorPhone || '-'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="category" size={24} color={colors.secondary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.value}>{visitorType}</Text>
            </View>
          </View>

          {vehicleNo ? (
            <>
              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={styles.iconBox}>
                  <Icon name="directions-car" size={24} color={colors.warning.main} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Vehicle</Text>
                  <Text style={styles.value}>{vehicleNo}</Text>
                </View>
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Destination</Text>
          <View style={styles.destRow}>
            <Icon name="apartment" size={40} color={colors.text.primary} />
            <Text style={styles.destText}>{fullAddress}</Text>
          </View>
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title={submitting ? "Processing..." : "CONFIRM & ALLOW ENTRY"} 
          onPress={handleConfirm} 
          loading={submitting}
          icon="check-circle"
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
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginLeft: 56, 
    marginVertical: spacing.md,
  },
  destRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  destText: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default ConfirmSelectionScreen;