import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';

const GuestEntryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleNext = () => {
    // Proceed to Building/Flat Selection with the collected data
    navigation.navigate('SelectBuilding', {
      visitorName: name,
      visitorPhone: phone,
      vehicleNo: vehicle,
      visitorType: 'Guest'
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Guest Entry" showBack />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Input 
            label="Guest Name"
            placeholder="Enter full name"
            value={name}
            onChangeText={setName}
            leftIcon="person"
          />

          <Input 
            label="Mobile Number"
            placeholder="10-digit number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
            leftIcon="phone"
          />

          <Input 
            label="Vehicle Number (Optional)"
            placeholder="e.g. MH 12 AB 1234"
            value={vehicle}
            onChangeText={setVehicle}
            autoCapitalize="characters"
            leftIcon="directions-car"
          />
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <Button 
            title="Next: Select Flat" 
            onPress={handleNext} 
            disabled={!name || phone.length < 10}
            icon="arrow-forward"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default GuestEntryScreen;