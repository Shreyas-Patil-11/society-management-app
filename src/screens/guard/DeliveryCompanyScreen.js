
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

const COMPANIES = [
  { id: 'zomato', name: 'Zomato', icon: 'delivery-dining', color: '#E23744' },
  { id: 'swiggy', name: 'Swiggy', icon: 'fastfood', color: '#FC8019' },
  { id: 'amazon', name: 'Amazon', icon: 'inventory', color: '#FF9900' },
  { id: 'flipkart', name: 'Flipkart', icon: 'shopping-bag', color: '#2874F0' },
  { id: 'blinkit', name: 'Blinkit', icon: 'electric-moped', color: '#F8CB46' },
  { id: 'zepto', name: 'Zepto', icon: 'timer', color: '#663399' },
  { id: 'dominos', name: 'Dominos', icon: 'local-pizza', color: '#006491' },
  { id: 'courier', name: 'Courier', icon: 'local-shipping', color: '#6B7280' },
];

const DeliveryCompanyScreen = ({ navigation }) => {
  const handleSelect = (company) => {
    navigation.navigate('DeliveryEntry', { company });
  };

  return (
    <View style={styles.container}>
      <Header title="Select Delivery" showBack />
      <FlatList
        data={COMPANIES}
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

export default DeliveryCompanyScreen;