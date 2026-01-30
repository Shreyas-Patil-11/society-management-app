// import React from 'react'
// import { View } from 'react-native'
// import { Text } from 'react-native-gesture-handler'

// const SelectAmenityScreen = () => {
//   return (
//     <View>
//         <Text>
//             SelectAmenityScreen
//         </Text>
//     </View>
//   )
// }

// export default SelectAmenityScreen

/**
 * Select Amenity Screen
 * * View available amenities and book them.
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const AMENITIES = [
  { id: '1', name: 'Club House', rate: '₹500/hr', image: 'https://via.placeholder.com/400x200', icon: 'apartment' },
  { id: '2', name: 'Tennis Court', rate: '₹100/hr', image: 'https://via.placeholder.com/400x200', icon: 'sports-tennis' },
  { id: '3', name: 'Swimming Pool', rate: 'Free', image: 'https://via.placeholder.com/400x200', icon: 'pool' },
  { id: '4', name: 'Party Hall', rate: '₹2000/day', image: 'https://via.placeholder.com/400x200', icon: 'celebration' },
];

const AmenityCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.imagePlaceholder}>
      <Icon name={item.icon} size={48} color={colors.text.tertiary} />
    </View>
    <View style={styles.cardContent}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardRate}>{item.rate}</Text>
      </View>
      <View style={styles.bookButton}>
        <Text style={styles.bookText}>BOOK</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SelectAmenityScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Amenities" showBack />
      
      <FlatList
        data={AMENITIES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AmenityCard 
            item={item} 
            onPress={() => navigation.navigate('BookedAmenities', { amenity: item })} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  list: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    height: 140,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
  },
  cardRate: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: colors.primary.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  bookText: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.primary.main,
  },
});

export default SelectAmenityScreen;