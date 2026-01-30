/**
 * Booking Slot Selection
 * * Select Date & Time for amenity
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';

// Mock Dates (Next 5 days)
const DATES = Array.from({ length: 5 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    id: i,
    day: d.toLocaleDateString('en-US', { weekday: 'short' }),
    date: d.getDate(),
    full: d,
  };
});

// Mock Slots
const SLOTS = [
  { id: '1', time: '06:00 AM - 07:00 AM', available: true },
  { id: '2', time: '07:00 AM - 08:00 AM', available: false }, // Booked
  { id: '3', time: '05:00 PM - 06:00 PM', available: true },
  { id: '4', time: '06:00 PM - 07:00 PM', available: true },
  { id: '5', time: '07:00 PM - 08:00 PM', available: true },
];

const BookingSlotScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { amenity } = route.params || { amenity: { title: 'Facility' } };
  
  const [selectedDate, setSelectedDate] = useState(DATES[0].id);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleBook = () => {
    navigation.replace('PaymentSuccess', {
      title: 'Booking Confirmed!',
      message: `Your slot for ${amenity.title} has been booked successfully.`,
      nextRoute: 'MyBookings'
    });
  };

  return (
    <View style={styles.container}>
      <Header title={`Book ${amenity.title}`} showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {DATES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.dateCard, selectedDate === item.id && styles.dateSelected]}
              onPress={() => setSelectedDate(item.id)}
            >
              <Text style={[styles.dayText, selectedDate === item.id && styles.textWhite]}>{item.day}</Text>
              <Text style={[styles.dateText, selectedDate === item.id && styles.textWhite]}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.grid}>
          {SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              disabled={!slot.available}
              style={[
                styles.slotCard,
                !slot.available && styles.slotDisabled,
                selectedSlot === slot.id && styles.slotSelected
              ]}
              onPress={() => setSelectedSlot(slot.id)}
            >
              <Text style={[
                styles.slotText,
                selectedSlot === slot.id && styles.textWhite,
                !slot.available && styles.textDisabled
              ]}>
                {slot.time}
              </Text>
              {!slot.available && <Text style={styles.bookedText}>Booked</Text>}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.price}>Free</Text>
        </View>
        <Button 
          title="Confirm Booking" 
          onPress={handleBook} 
          disabled={!selectedSlot}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  dateScroll: {
    marginBottom: spacing.xl,
    flexGrow: 0,
  },
  dateCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginRight: spacing.md,
    minWidth: 60,
    elevation: 1,
  },
  dateSelected: {
    backgroundColor: colors.primary.main,
  },
  dayText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  dateText: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginTop: 4,
  },
  textWhite: {
    color: colors.white,
  },
  grid: {
    gap: spacing.sm,
  },
  slotCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  slotDisabled: {
    backgroundColor: colors.background.secondary,
    opacity: 0.7,
  },
  slotText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  textDisabled: {
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  bookedText: {
    fontSize: 10,
    color: colors.error.main,
    fontWeight: 'bold',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  priceRow: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  price: {
    ...typography.textStyles.h3,
    color: colors.primary.main,
  },
});

export default BookingSlotScreen;