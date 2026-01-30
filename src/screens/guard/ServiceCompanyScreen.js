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
  { id: 'maid', name: 'Maid', icon: 'cleaning-services', color: '#EC4899' },
  { id: 'cook', name: 'Cook', icon: 'restaurant-menu', color: '#F59E0B' },
  { id: 'driver', name: 'Driver', icon: 'steering', color: '#3B82F6' }, // Note: 'steering' might not exist in all sets, falling back to car
  { id: 'plumber', name: 'Plumber', icon: 'plumbing', color: '#0EA5E9' },
  { id: 'electrician', name: 'Electrician', icon: 'electrical-services', color: '#EAB308' },
  { id: 'other', name: 'Other', icon: 'handyman', color: '#6B7280' },
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
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
             <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
               <Icon name={item.icon} size={28} color={item.color} />
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
    flex: 1,
    margin: spacing.xs,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    elevation: 1,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
});

export default ServiceCompanyScreen;