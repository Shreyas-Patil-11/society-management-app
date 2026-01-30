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

const CABS = [
  { id: 'uber', name: 'Uber', icon: 'local-taxi', color: '#000000' },
  { id: 'ola', name: 'Ola', icon: 'directions-car', color: '#B8D335' },
  { id: 'blu', name: 'BluSmart', icon: 'electric-car', color: '#0052CC' },
  { id: 'indriver', name: 'inDrive', icon: 'navigation', color: '#27C55E' },
  { id: 'other', name: 'Private Taxi', icon: 'taxi-alert', color: '#6B7280' },
];

const CabCompanyScreen = ({ navigation }) => {
  const handleSelect = (company) => {
    navigation.navigate('CabEntry', { company });
  };

  return (
    <View style={styles.container}>
      <Header title="Select Cab" showBack />
      <FlatList
        data={CABS}
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
    flex: 1,
    margin: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    elevation: 1,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '700',
    color: colors.text.primary,
  },
});

export default CabCompanyScreen;