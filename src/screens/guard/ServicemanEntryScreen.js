
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import { useToast } from '../../hooks/useToast';

const ServicemanEntryScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();
  
  const service = route.params?.service;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // const handleNext = () => {
  //   Keyboard.dismiss();
  //   if (!name.trim()) {
  //     showError('Please enter Name');
  //     return;
  //   }

  //   // Service Type: Mapped to 'MAINTENANCE' or 'SERVICE' in backend
  //   const entryData = {
  //     visitorName: `${name} (${service?.name})`,
  //     visitorPhone: phone,
  //     vehicleNo: '',
  //     visitorType: 'SERVICE', 
  //   };

  //   navigation.navigate('SelectBuilding', entryData);
  // };

  const handleNext = () => {
    Keyboard.dismiss();
    if (!name.trim()) {
      showError('Please enter Name');
      return;
    }

    // FIX: Define fallback name
    const serviceName = service?.name || 'Service'; 

    const entryData = {
      visitorName: `${name} (${serviceName})`, // Uses fallback
      visitorPhone: phone,
      vehicleNo: '',
      visitorType: 'SERVICE', 
    };

    navigation.navigate('SelectBuilding', entryData);
  };

  return (
    <View style={styles.container}>
      <Header title="Service Entry" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.companyHeader}>
          <View style={[styles.iconBox, { backgroundColor: (service?.color || colors.primary.main) + '20' }]}>
            <Icon name={service?.icon || 'build'} size={32} color={service?.color || colors.primary.main} />
          </View>
          <Text style={styles.companyName}>{service?.name || 'Service'}</Text>
        </View>

        <Input 
          label="Person Name *"
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          leftIcon="person"
        />

        <Input 
          label="Phone Number"
          placeholder="98765 43210"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
          leftIcon="phone"
        />

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Next: Select Destination" 
          onPress={handleNext} 
          icon="arrow-forward"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  companyHeader: { alignItems: 'center', marginBottom: spacing.xl },
  iconBox: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  companyName: { ...typography.textStyles.h3, color: colors.text.primary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border.light },
});

export default ServicemanEntryScreen;