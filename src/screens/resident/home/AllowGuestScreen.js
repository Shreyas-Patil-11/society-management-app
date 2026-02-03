

/**
 * Allow Guest Screen
 * * Form to pre-approve a guest.
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useForm } from '../../../hooks/useForm';
import { useToast } from '../../../hooks/useToast';
import { isValidPhone, isValidName } from '../../../utils/validators';
import { borderRadius } from '../../../theme/borderRadius';

const AllowGuestScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  const [isShareable, setIsShareable] = useState(true);

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    {
      name: '',
      phone: '',
      date: new Date().toISOString().split('T')[0], // Today
      time: '',
      vehicle: '',
    },
    (vals) => {
      const errs = {};
      if (!vals.name) errs.name = 'Guest name is required';
      else if (!isValidName(vals.name)) errs.name = 'Invalid name';
      
      if (vals.phone && !isValidPhone(vals.phone)) errs.phone = 'Invalid phone number';
      
      return errs;
    },
    async (vals) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess(`Entry approved for ${vals.name}`);
      navigation.goBack();
    }
  );

  return (
    <View style={styles.container}>
      <Header title="Allow Guest" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        <Input
          label="Guest Name"
          placeholder="Enter guest name"
          value={values.name}
          onChangeText={(t) => handleChange('name', t)}
          error={errors.name}
          leftIcon="person"
        />

        <Input
          label="Phone Number (Optional)"
          placeholder="Enter mobile number"
          value={values.phone}
          onChangeText={(t) => handleChange('phone', t)}
          error={errors.phone}
          keyboardType="phone-pad"
          leftIcon="phone"
          maxLength={10}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Input
              label="Date"
              value={values.date}
              editable={false} // Would use DatePicker in real app
              leftIcon="calendar-today"
            />
          </View>
          <View style={styles.halfInput}>
            <Input
              label="Expected Time"
              placeholder="Select time" // Would use TimePicker
              value={values.time}
              onChangeText={(t) => handleChange('time', t)}
              leftIcon="access-time"
            />
          </View>
        </View>

        <Input
          label="Vehicle Number (Optional)"
          placeholder="e.g. MH 12 AB 1234"
          value={values.vehicle}
          onChangeText={(t) => handleChange('vehicle', t)}
          autoCapitalize="characters"
          leftIcon="directions-car"
        />

        <View style={styles.switchContainer}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.switchTitle}>Share details via WhatsApp</Text>
            <Text style={styles.switchSubtitle}>Send entry code to guest automatically</Text>
          </View>
          <Switch
            value={isShareable}
            onValueChange={setIsShareable}
            trackColor={{ false: colors.border.main, true: colors.success.light }}
            thumbColor={isShareable ? colors.success.main : colors.white}
          />
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Create Pass" 
          onPress={handleSubmit} 
          loading={isSubmitting}
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
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  switchTextContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  switchTitle: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  switchSubtitle: {
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

export default AllowGuestScreen;