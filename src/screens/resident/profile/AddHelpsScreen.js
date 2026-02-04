/**
 * Add Daily Help Screen
 * Allows adding Maid, Driver, Cook, etc.
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useToast } from '../../../hooks/useToast';
import { householdService } from '../../../services/householdService';

const AddHelpsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [work, setWork] = useState(''); // Role like Maid, Driver, etc.
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // 1. Validation
    if (!name || !phone || !work) {
        showError("All fields are required");
        return;
    }

    if (phone.length !== 10) {
        showError("Please enter a valid 10-digit mobile number");
        return;
    }

    setLoading(true);

    // 2. Prepare Payload
    // Backend Schema requires 'relation'. We set it to 'Daily Help' generic tag.
    // 'work' stores the specific job (Maid, Driver).
    const payload = {
        name,
        phone,
        relation: 'Daily Help', 
        work: work 
    };

    // 3. API Call
    const result = await householdService.addHouseholdMember(payload);
    setLoading(false);

    // 4. Handle Response
    if (result.success) {
        showSuccess('Daily help added successfully');
        navigation.goBack();
    } else {
        showError(result.message || 'Failed to add help');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add Daily Help" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.infoBox}>
            <Text style={styles.infoText}>
                Add details of your daily help (Maid, Driver, Cook, etc.) for easier gate entry approvals.
            </Text>
        </View>

        <Input 
          label="Full Name"
          placeholder="e.g. Sunita Devi"
          value={name}
          onChangeText={setName}
          leftIcon="person"
        />

        <Input 
          label="Mobile Number"
          placeholder="Enter 10-digit number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
          leftIcon="phone"
        />

        <Input 
          label="Role / Work Type"
          placeholder="e.g. Maid, Driver, Cook, Nanny"
          value={work}
          onChangeText={setWork}
          leftIcon="work"
        />

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Add Daily Help" 
          onPress={handleSubmit} 
          disabled={loading || !name || !phone || !work}
          loading={loading}
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
  infoBox: {
    backgroundColor: colors.primary.light + '20', // 20% opacity
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  infoText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default AddHelpsScreen;