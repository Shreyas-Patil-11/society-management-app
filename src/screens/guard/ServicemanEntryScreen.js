/**
 * Serviceman Entry Screen
 * * For Maids, Drivers, Plumbers, Electricians etc.
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

const SERVICE_TYPES = [
  { id: 'maid', label: 'Maid', icon: 'cleaning-services', color: '#EC4899' },
  { id: 'cook', label: 'Cook', icon: 'restaurant-menu', color: '#F59E0B' },
  { id: 'driver', label: 'Driver', icon: 'directions-car', color: '#3B82F6' },
  { id: 'repair', label: 'Repair', icon: 'handyman', color: '#6366F1' },
  { id: 'other', label: 'Other', icon: 'person', color: '#6B7280' },
];

const ServicemanEntryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState('');
  const [flat, setFlat] = useState('');

  const handleSubmit = () => {
    Keyboard.dismiss();
    // Navigate to the "Ringing" simulation screen
    navigation.navigate('Ringing', {
      visitorName: name || selectedType,
      visitorType: 'Service',
      flatNo: flat
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Service Entry" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionLabel}>Select Service Type</Text>
        <View style={styles.grid}>
          {SERVICE_TYPES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                selectedType === item.id && styles.cardSelected
              ]}
              onPress={() => setSelectedType(item.id)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                <Icon 
                  name={item.icon} 
                  size={28} 
                  color={selectedType === item.id ? colors.white : item.color} 
                />
              </View>
              <Text style={[
                styles.cardText, 
                selectedType === item.id && styles.textSelected
              ]}>
                {item.label}
              </Text>
              {selectedType === item.id && (
                <View style={[styles.selectedOverlay, { backgroundColor: item.color }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Input 
          label="Name (Optional)"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          leftIcon="person"
        />

        <Input 
          label="Flat Number"
          placeholder="e.g. A-101"
          value={flat}
          onChangeText={setFlat}
          autoCapitalize="characters"
          leftIcon="home"
        />

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Notify Resident" 
          onPress={handleSubmit} 
          disabled={!selectedType || !flat}
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
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardSelected: {
    backgroundColor: colors.white, // Will be covered by overlay
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
    zIndex: -1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  cardText: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  textSelected: {
    color: colors.white,
    zIndex: 1,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default ServicemanEntryScreen;