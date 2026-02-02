/**
 * Change Password Screen
 * src/screens/guard/ChangePasswordScreen.js
 */
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';
import { authService } from '../../services/authService';

const ChangePasswordScreen = ({ navigation }) => {
  const { showSuccess, showError } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    // Call the API
    const result = await authService.changePassword(currentPassword, newPassword);
    
    setLoading(false);

    if (result.success) {
      showSuccess('Password changed successfully');
      navigation.goBack();
    } else {
      showError(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Change Password" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Input
          label="Current Password"
          placeholder="Enter current password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          leftIcon="lock"
        />

        <Input
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          leftIcon="lock-open"
        />

        <Input
          label="Confirm New Password"
          placeholder="Re-enter new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          leftIcon="lock-outline"
        />

        <Button 
          title="Update Password" 
          onPress={handleSubmit} 
          loading={loading}
          style={styles.btn}
        />

      </ScrollView>
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
  btn: {
    marginTop: spacing.xl,
  },
});

export default ChangePasswordScreen;