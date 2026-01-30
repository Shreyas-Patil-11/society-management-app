/**
 * Security Staff Login
 * * Specialized login for guards using Employee ID
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const SecurityLoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signInWithEmail } = useAuth(); // Reusing email auth for Emp ID
  const { showError, showSuccess } = useToast();
  
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!empId || !password) {
      showError('Please enter Employee ID and Password');
      return;
    }

    setLoading(true);
    try {
      // Hardcoded for demo: EmpID 'SEC001' maps to guard email
      const email = empId === 'SEC001' ? 'guard@society.com' : empId;
      
      const result = await signInWithEmail(email, password, 'guard');
      
      if (result.success) {
        showSuccess('Guard Login Successful');
        // RootNavigator detects 'guard' role and switches stack automatically
      } else {
        showError(result.message || 'Invalid credentials');
      }
    } catch (e) {
      showError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Security Login" showBack />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.logoBox}>
            <Icon name="security" size={60} color={colors.primary.main} />
          </View>
          
          <Text style={styles.title}>Guard Portal</Text>
          <Text style={styles.subtitle}>Enter your Shift Details</Text>

          <View style={styles.form}>
            <Input 
              label="Employee ID"
              placeholder="e.g. SEC001"
              value={empId}
              onChangeText={setEmpId}
              autoCapitalize="characters"
              leftIcon="badge"
            />
            
            <Input 
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              type="password"
              leftIcon="lock"
            />

            <Button 
              title="Start Shift" 
              onPress={handleLogin}
              loading={loading}
              style={styles.btn}
              fullWidth
            />
          </View>
          
          {/* Dev Hint */}
          <Text style={styles.hint}>Dev Hint: Use SEC001 / password</Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  logoBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  btn: {
    marginTop: spacing.md,
  },
  hint: {
    marginTop: spacing.xl,
    color: colors.text.tertiary,
    fontSize: 12,
  },
});

export default SecurityLoginScreen;