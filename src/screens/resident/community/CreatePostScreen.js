

/**
 * Create Post Screen
 * * Supports: General Text, Polls, and Sell Listings
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
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

const POST_TYPES = [
  { id: 'general', label: 'General', icon: 'article' },
  { id: 'poll', label: 'Poll', icon: 'poll' },
  { id: 'sell', label: 'Sell', icon: 'storefront' },
];

const CreatePostScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();

  const [postType, setPostType] = useState('general');
  const [content, setContent] = useState('');
  
  // Sell Specific State
  const [price, setPrice] = useState('');
  const [itemName, setItemName] = useState('');

  // Poll Specific State
  const [pollOptions, setPollOptions] = useState(['', '']);

  const handleAddOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const updateOption = (text, index) => {
    const newOptions = [...pollOptions];
    newOptions[index] = text;
    setPollOptions(newOptions);
  };

  const handlePost = () => {
    // Validation
    if (postType === 'general' && !content) return;
    if (postType === 'sell' && (!itemName || !price)) return;
    if (postType === 'poll' && (!content || pollOptions.some(o => !o))) return;

    showSuccess('Post created successfully!');
    navigation.goBack();
  };

  const renderPollSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Poll Options</Text>
      {pollOptions.map((opt, index) => (
        <View key={index} style={styles.optionRow}>
          <Icon name="radio-button-unchecked" size={24} color={colors.text.tertiary} />
          <TextInput
            style={styles.optionInput}
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChangeText={(t) => updateOption(t, index)}
            placeholderTextColor={colors.text.tertiary}
          />
        </View>
      ))}
      {pollOptions.length < 4 && (
        <TouchableOpacity style={styles.addOptionBtn} onPress={handleAddOption}>
          <Icon name="add" size={20} color={colors.primary.main} />
          <Text style={styles.addOptionText}>Add Option</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSellSection = () => (
    <View style={styles.section}>
      <Input 
        label="Item Name"
        placeholder="e.g. Sofa Set, Bicycle"
        value={itemName}
        onChangeText={setItemName}
      />
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        <View style={{ flex: 1 }}>
           <Input 
            label="Price (₹)"
            placeholder="5000"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1 }}>
           <Input 
            label="Condition"
            placeholder="e.g. Good, New"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Create Post" showBack />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          
          {/* Post Type Selector */}
          <View style={styles.typeRow}>
            {POST_TYPES.map((type) => {
              const isSelected = postType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeBtn, isSelected && styles.typeBtnSelected]}
                  onPress={() => setPostType(type.id)}
                >
                  <Icon 
                    name={type.icon} 
                    size={20} 
                    color={isSelected ? colors.white : colors.text.secondary} 
                  />
                  <Text style={[styles.typeText, isSelected && styles.typeTextSelected]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Main Content Input */}
          <TextInput
            style={styles.mainInput}
            placeholder={
              postType === 'poll' ? "Ask a question..." :
              postType === 'sell' ? "Describe what you are selling..." :
              "What's on your mind?"
            }
            multiline
            value={content}
            onChangeText={setContent}
            placeholderTextColor={colors.text.tertiary}
          />

          {/* Dynamic Sections */}
          {postType === 'poll' && renderPollSection()}
          {postType === 'sell' && renderSellSection()}

          {/* Photo Attachment (Visual Only) */}
          <TouchableOpacity style={styles.photoBtn}>
            <Icon name="add-photo-alternate" size={24} color={colors.primary.main} />
            <Text style={styles.photoText}>Add Photo/Video</Text>
          </TouchableOpacity>

        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <Button 
            title="Post" 
            onPress={handlePost} 
            disabled={!content && postType === 'general'} // Simple validation logic
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  typeRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    padding: 4,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  typeBtnSelected: {
    backgroundColor: colors.primary.main,
    elevation: 2,
  },
  typeText: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  typeTextSelected: {
    color: colors.white,
  },
  mainInput: {
    ...typography.textStyles.bodyLarge,
    color: colors.text.primary,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
  },
  section: {
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  optionInput: {
    flex: 1,
    paddingVertical: spacing.md,
    marginLeft: spacing.md,
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  addOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  addOptionText: {
    marginLeft: spacing.sm,
    color: colors.primary.main,
    fontWeight: '600',
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: borderRadius.lg,
    borderStyle: 'dashed',
  },
  photoText: {
    marginLeft: spacing.md,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default CreatePostScreen;