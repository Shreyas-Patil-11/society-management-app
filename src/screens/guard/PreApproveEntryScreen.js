/**
 * Verify Entry Code
 * * Check pre-approved codes from residents.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import { useToast } from '../../hooks/useToast';

const PreApproveEntryScreen = ({ navigation }) => {
  const { showSuccess, showError } = useToast();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    Keyboard.dismiss();
    setLoading(true);

    // Mock verification
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') {
        showSuccess('Code Verified! Entry Approved.');
        navigation.goBack();
      } else {
        showError('Invalid or Expired Code');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Verify Code" showBack />
      
      <View style={styles.content}>
        <View style={styles.scanBox}>
          <Icon name="qr-code-scanner" size={120} color={colors.primary.light} />
          <Text style={styles.scanText}>Scan Visitor QR</Text>
        </View>

        <Text style={styles.orText}>OR</Text>

        <Input 
          label="Enter 6-Digit Code"
          placeholder="e.g. 123456"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
          style={{ fontSize: 24, letterSpacing: 8 }}
        />

        <Button 
          title="Verify Code" 
          onPress={handleVerify} 
          loading={loading}
          disabled={code.length < 6}
          style={styles.btn}
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
    padding: spacing.xl,
  },
  scanBox: {
    height: 200,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary.light,
    borderStyle: 'dashed',
  },
  scanText: {
    marginTop: spacing.md,
    color: colors.primary.main,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.text.tertiary,
    fontWeight: 'bold',
  },
  btn: {
    marginTop: spacing.lg,
  },
});

export default PreApproveEntryScreen;