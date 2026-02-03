

/**
 * Allow Serviceman Screen
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { SERVICE_TYPES } from '../../../utils/constants';

const AllowServicemanScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    showSuccess('Service entry pre-approved!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Allow Service" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        <Text style={styles.sectionTitle}>Select Service Type</Text>
        <View style={styles.list}>
          {SERVICE_TYPES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceItem,
                selectedService === service.id && styles.selectedItem
              ]}
              onPress={() => setSelectedService(service.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: selectedService === service.id ? colors.primary.main : colors.background.tertiary }]}>
                <Icon 
                  name={service.icon} 
                  size={24} 
                  color={selectedService === service.id ? colors.white : colors.text.secondary} 
                />
              </View>
              <Text style={styles.serviceName}>{service.label}</Text>
              {selectedService === service.id && (
                <Icon name="check-circle" size={20} color={colors.primary.main} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Approve Entry" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!selectedService}
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
  list: {
    gap: spacing.sm,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  selectedItem: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.background,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  serviceName: {
    ...typography.textStyles.bodyMedium,
    flex: 1,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
});

export default AllowServicemanScreen;