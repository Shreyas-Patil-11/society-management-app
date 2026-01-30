/**
 * Add Vehicle Form
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useToast } from '../../../hooks/useToast';

const AddVehicleScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  
  const [type, setType] = useState('Car');
  const [number, setNumber] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = () => {
    // API Call here
    showSuccess('Vehicle added successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Add Vehicle" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.label}>Vehicle Type</Text>
        <View style={styles.typeRow}>
          {['Car', 'Bike'].map((t) => (
            <TouchableOpacity 
              key={t}
              style={[styles.typeCard, type === t && styles.typeSelected]}
              onPress={() => setType(t)}
            >
              <Icon 
                name={t === 'Car' ? 'directions-car' : 'two-wheeler'} 
                size={32} 
                color={type === t ? colors.primary.main : colors.text.tertiary} 
              />
              <Text style={[styles.typeText, type === t && styles.textSelected]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input 
          label="Vehicle Number"
          placeholder="e.g. MH 12 AB 1234"
          value={number}
          onChangeText={setNumber}
          autoCapitalize="characters"
        />

        <Input 
          label="Model & Color"
          placeholder="e.g. White Honda City"
          value={model}
          onChangeText={setModel}
        />

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Save Vehicle" 
          onPress={handleSubmit} 
          disabled={!number || !model}
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
  label: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  typeRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  typeCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  typeSelected: {
    backgroundColor: colors.primary.background,
    borderColor: colors.primary.main,
  },
  typeText: {
    marginTop: spacing.sm,
    fontWeight: '600',
    color: colors.text.tertiary,
  },
  textSelected: {
    color: colors.primary.main,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default AddVehicleScreen;