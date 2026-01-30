// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { Header, Input, Button } from '../../../components/common';
// import { spacing } from '../../../theme';
// import { COMPLAINT_CATEGORIES } from '../../../utils/constants';

// const RaiseComplaintScreen = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const submitComplaint = () => {
//     // API: POST /resident/complaints/create
//     navigation.goBack();
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header title="Raise Complaint" />
//       <View style={{ padding: spacing.base }}>
//         <Input label="Title" value={title} onChangeText={setTitle} />
//         <Input
//           label="Description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//         />
//         <Button title="Submit" onPress={submitComplaint} />
//       </View>
//     </View>
//   );
// };

// export default RaiseComplaintScreen;


/**
 * Raise Complaint Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker'; // Mock this if package not installed

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useToast } from '../../../hooks/useToast';

const CATEGORIES = [
  { id: 'plumbing', label: 'Plumbing', icon: 'water-drop' },
  { id: 'electrical', label: 'Electrical', icon: 'bolt' },
  { id: 'security', label: 'Security', icon: 'security' },
  { id: 'housekeeping', label: 'Cleaning', icon: 'cleaning-services' },
  { id: 'other', label: 'Other', icon: 'more-horiz' },
];

const RaiseComplaintScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !title) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // API Mock
    setLoading(false);
    
    showSuccess('Complaint registered successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Raise Complaint" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
        <Text style={styles.sectionLabel}>Select Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.catItem,
                category === cat.id && styles.activeCatItem
              ]}
              onPress={() => setCategory(cat.id)}
            >
              <Icon 
                name={cat.icon} 
                size={24} 
                color={category === cat.id ? colors.white : colors.text.secondary} 
              />
              <Text style={[
                styles.catText,
                category === cat.id && styles.activeCatText
              ]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input
          label="Issue Title"
          placeholder="e.g. Tap leaking in master bathroom"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          label="Description"
          placeholder="Please describe the issue in detail..."
          value={desc}
          onChangeText={setDesc}
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        <Text style={styles.sectionLabel}>Attachments (Optional)</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Icon name="add-a-photo" size={32} color={colors.primary.main} />
          <Text style={styles.uploadText}>Add Photo</Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Submit Complaint" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!category || !title}
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
  sectionLabel: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  catRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  catItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    width: 80,
    height: 80,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  activeCatItem: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  catText: {
    ...typography.textStyles.caption,
    marginTop: spacing.xs,
    color: colors.text.secondary,
  },
  activeCatText: {
    color: colors.white,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: colors.primary.light,
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.background,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  uploadText: {
    ...typography.textStyles.bodySmall,
    color: colors.primary.main,
    marginTop: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default RaiseComplaintScreen;