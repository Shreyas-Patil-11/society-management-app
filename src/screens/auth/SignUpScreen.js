

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import { useToast } from '../../hooks/useToast';

const SignUpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!name || !email || !phone) {
      showError('All fields are required');
      return;
    }
    if (phone.length !== 10) {
      showError('Invalid phone number');
      return;
    }

    // ✅ NEXT STEP: Go to Select Society (Pass data forward)
    navigation.navigate('SelectSociety', {
      userData: { name, email, phone }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Create Account" showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Join your Society</Text>
          <Text style={styles.subtitle}>Enter your details to get started.</Text>

          <View style={styles.form}>
            <Input label="Full Name" placeholder="e.g. Rahul Sharma" value={name} onChangeText={setName} leftIcon="person" />
            <Input label="Email" placeholder="e.g. rahul@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" leftIcon="email" />
            <Input label="Mobile" placeholder="e.g. 9876543210" value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} leftIcon="phone" />
            
            <Button 
              title="Next: Select Society" 
              onPress={handleContinue} 
              style={styles.btn}
              icon="arrow-forward"
            />
          </View>
        </ScrollView>
        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.xl },
  title: { ...typography.textStyles.h2, color: colors.text.primary, marginBottom: spacing.xs },
  subtitle: { ...typography.textStyles.bodyMedium, color: colors.text.secondary, marginBottom: spacing.xxl },
  form: { gap: spacing.sm },
  btn: { marginTop: spacing.md },
  footer: { flexDirection: 'row', justifyContent: 'center', padding: spacing.md },
  footerText: { ...typography.textStyles.bodyMedium, color: colors.text.secondary },
  link: { ...typography.textStyles.bodyMedium, color: colors.primary.main, fontWeight: '700' },
});

export default SignUpScreen;