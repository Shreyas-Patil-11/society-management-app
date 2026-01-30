/**
 * Raise Helpdesk Ticket
 * * Report issues to facility management.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
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

const CATEGORIES = [
  { id: 'plumbing', label: 'Plumbing', icon: 'plumbing' },
  { id: 'electrical', label: 'Electric', icon: 'electrical-services' },
  { id: 'security', label: 'Security', icon: 'security' },
  { id: 'cleaning', label: 'Cleaning', icon: 'cleaning-services' },
  { id: 'other', label: 'Other', icon: 'help-outline' },
];

const RaiseTicketScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = () => {
    if (!category || !title) {
      showError('Please select category and enter title');
      return;
    }
    // API Call simulation
    showSuccess('Ticket raised successfully (ID: #8823)');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Raise Ticket" showBack />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          
          <Text style={styles.sectionLabel}>Select Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, category === cat.id && styles.catSelected]}
                onPress={() => setCategory(cat.id)}
              >
                <Icon 
                  name={cat.icon} 
                  size={24} 
                  color={category === cat.id ? colors.white : colors.text.secondary} 
                />
                <Text style={[styles.catText, category === cat.id && styles.catTextSelected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Input 
            label="Issue Title"
            placeholder="e.g. Leaking Tap in Kitchen"
            value={title}
            onChangeText={setTitle}
          />

          <Input 
            label="Description"
            placeholder="Describe the issue in detail..."
            value={desc}
            onChangeText={setDesc}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: 'top' }}
          />

          <Text style={styles.sectionLabel}>Priority</Text>
          <View style={styles.priorityRow}>
            {['Low', 'Medium', 'High'].map((p) => (
              <TouchableOpacity 
                key={p}
                style={[styles.prioBtn, priority === p && styles.prioActive]}
                onPress={() => setPriority(p)}
              >
                <Text style={[styles.prioText, priority === p && styles.prioTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.attachBtn}>
            <Icon name="attach-file" size={20} color={colors.primary.main} />
            <Text style={styles.attachText}>Attach Photo/Video</Text>
          </TouchableOpacity>

        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <Button 
            title="Submit Ticket" 
            onPress={handleSubmit} 
            disabled={!category || !title}
          />
        </View>
      </KeyboardAvoidingView>
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
  sectionLabel: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  catScroll: {
    marginBottom: spacing.lg,
    flexGrow: 0,
  },
  catCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginRight: spacing.md,
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  catSelected: {
    backgroundColor: colors.primary.main,
  },
  catText: {
    ...typography.textStyles.caption,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },
  catTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  prioBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  prioActive: {
    backgroundColor: colors.primary.light,
    borderColor: colors.primary.main,
  },
  prioText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  prioTextActive: {
    color: colors.primary.dark,
    fontWeight: '600',
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  attachText: {
    marginLeft: spacing.sm,
    color: colors.primary.main,
    fontWeight: '500',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default RaiseTicketScreen;