/**
 * Raise Ticket Screen
 * Connected to Backend API
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import Header from '../../../components/common/Header';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useToast } from '../../../hooks/useToast';
import { useAuth } from '../../../hooks/useAuth';

// Import Service
import { createComplaint } from '../../../services/ComplaintService';

const RaiseTicketScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const { user } = useAuth(); // To get society_id if stored in user
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    
    if (!title.trim() || !description.trim()) {
      showError('Please fill all details');
      return;
    }

    setLoading(true);

    // Payload for Backend
    const payload = {
      title: title,
      description: description,
      // Default to 1 if user.society_id is missing, or grab from user context
      society_id: user?.society_id || 1 
    };

    const result = await createComplaint(payload);
    
    setLoading(false);

    if (result.success) {
      showSuccess('Ticket Raised Successfully!');
      navigation.goBack();
    } else {
      showError(result.message || 'Failed to raise ticket');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Raise Ticket" showBack />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
          
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryBox}>
            <Icon name="build" size={20} color={colors.primary.main} />
            <Text style={styles.categoryText}>Maintenance / Repair</Text>
          </View>

          <Input
            label="Issue Title"
            placeholder="e.g., Leaking Tap in Kitchen"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            label="Description"
            placeholder="Describe the issue in detail..."
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
            style={styles.textArea}
            textAlignVertical="top"
          />

          <Button
            title="Submit Complaint"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitBtn}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  label: { ...typography.textStyles.bodyMedium, fontWeight: '700', color: colors.text.primary, marginBottom: spacing.sm },
  categoryBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background.secondary,
    padding: spacing.md, borderRadius: 8, borderWidth: 1, borderColor: colors.border.light,
    marginBottom: spacing.lg, gap: spacing.sm
  },
  categoryText: { ...typography.textStyles.bodyMedium, color: colors.text.primary },
  textArea: { minHeight: 120 },
  submitBtn: { marginTop: spacing.xl },
});

export default RaiseTicketScreen;