
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';

const SERVICES = [
  { id: 'uc', name: 'Urban Co', icon: 'handyman', color: '#000000' },
  { id: 'jio', name: 'Jio Fiber', icon: 'router', color: '#0057E7' },
  { id: 'airtel', name: 'Airtel', icon: 'wifi', color: '#FF0000' },
  { id: 'gas', name: 'Gas Repair', icon: 'local-fire-department', color: '#F59E0B' },
  { id: 'ac', name: 'AC Service', icon: 'ac-unit', color: '#06B6D4' },
  { id: 'maid', name: 'Maid/Help', icon: 'cleaning-services', color: '#EC4899' },
  { id: 'carpenter', name: 'Carpenter', icon: 'carpenter', color: '#8D6E63' },
  { id: 'other', name: 'Other', icon: 'build', color: '#6B7280' },
];

const ServiceCompanyScreen = ({ navigation }) => {
  const handleSelect = (service) => {
    navigation.navigate('ServicemanEntry', { service });
  };

  return (
    <View style={styles.container}>
      <Header title="Select Service" showBack />
      <FlatList
        data={SERVICES}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
             <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
               <Icon name={item.icon} size={40} color={item.color} />
             </View>
             <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  list: { padding: spacing.md },
  card: {
    flex: 1, margin: spacing.sm, backgroundColor: colors.white,
    borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center',
    paddingVertical: spacing.xl, elevation: 1,
  },
  iconBox: {
    width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: { ...typography.textStyles.bodyMedium, fontWeight: '700', color: colors.text.primary },
});

export default ServiceCompanyScreen;