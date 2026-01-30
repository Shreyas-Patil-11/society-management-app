/**
 * Edit Profile Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateProfile } = useAuth(); // Assume updateProfile exists in AuthContext
  const { showSuccess } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // In real app: await updateProfile({ name, email, phone });
      setLoading(false);
      showSuccess('Profile updated successfully');
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Edit Profile" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Avatar Upload Placeholder */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="person" size={60} color={colors.text.tertiary} />
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Icon name="camera-alt" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Input 
          label="Full Name"
          value={name}
          onChangeText={setName}
          leftIcon="person"
        />

        <Input 
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          leftIcon="email"
        />

        <Input 
          label="Mobile Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          leftIcon="phone"
          editable={false} // Phone is usually ID, harder to change
          style={{ opacity: 0.7 }}
        />
        <Text style={styles.hint}>Contact Admin to change registered mobile number.</Text>

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Save Changes" 
          onPress={handleSave} 
          loading={loading}
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
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary.main,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  hint: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: -spacing.sm,
    marginLeft: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default EditProfileScreen;