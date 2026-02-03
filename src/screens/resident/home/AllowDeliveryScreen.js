
/**
 * Allow Delivery Screen
 * * Pre-approve a delivery.
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import { useToast } from '../../../hooks/useToast';
import { DELIVERY_COMPANIES } from '../../../utils/constants';

const AllowDeliveryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [leaveAtGate, setLeaveAtGate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    showSuccess('Delivery pre-approved!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Allow Delivery" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
        <Text style={styles.sectionTitle}>Select Delivery Partner</Text>
        <View style={styles.grid}>
          {DELIVERY_COMPANIES.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={[
                styles.companyItem,
                selectedCompany === company.id && styles.selectedItem
              ]}
              onPress={() => setSelectedCompany(company.id)}
            >
              <Icon 
                name={company.icon} 
                size={28} 
                color={selectedCompany === company.id ? colors.primary.main : colors.text.secondary} 
              />
              <Text style={[
                  styles.companyName, 
                  selectedCompany === company.id && styles.selectedText
                ]}
                numberOfLines={1}
              >
                {company.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionContainer}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Leave at Gate</Text>
            <Text style={styles.optionSubtitle}>Guard will collect the parcel</Text>
          </View>
          <Switch
            value={leaveAtGate}
            onValueChange={setLeaveAtGate}
            trackColor={{ false: colors.border.main, true: colors.primary.light }}
            thumbColor={leaveAtGate ? colors.primary.main : colors.white}
          />
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Approve Delivery" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!selectedCompany}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  companyItem: {
    width: '30%',
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    gap: spacing.sm,
  },
  selectedItem: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.background,
  },
  companyName: {
    ...typography.textStyles.caption,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.primary.main,
    fontWeight: '700',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  optionTitle: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  optionSubtitle: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
});

export default AllowDeliveryScreen;