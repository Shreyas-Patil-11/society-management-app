/**
 * Book Amenity Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars'; // Mock if needed

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';

const SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'];

const BookedAmenitiesScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { amenity } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleBook = () => {
    navigation.navigate('PaymentReceipt', { 
      amount: amenity.rate.replace('₹', '').split('/')[0], // Extract amount
      transactionId: 'BK-' + Math.floor(Math.random() * 9999) 
    });
  };

  return (
    <View style={styles.container}>
      <Header title={`Book ${amenity.name}`} showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
        {/* Calendar Mock */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Calendar
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            }}
            theme={{
              todayTextColor: colors.primary.main,
              selectedDayBackgroundColor: colors.primary.main,
              arrowColor: colors.primary.main,
            }}
            style={styles.calendar}
          />
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotsGrid}>
            {SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotItem,
                  selectedSlot === slot && styles.activeSlot
                ]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[
                  styles.slotText,
                  selectedSlot === slot && styles.activeSlotText
                ]}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Rate: {amenity.rate}</Text>
          <Text style={styles.summaryTotal}>
            Total: {amenity.rate === 'Free' ? 'Free' : amenity.rate.split('/')[0]}
          </Text>
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Confirm Booking" 
          onPress={handleBook} 
          disabled={!selectedDate || !selectedSlot}
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
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  calendar: {
    borderRadius: borderRadius.md,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slotItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border.main,
    backgroundColor: colors.background.primary,
  },
  activeSlot: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  slotText: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  activeSlotText: {
    color: colors.white,
    fontWeight: '600',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary.light,
  },
  summaryText: {
    ...typography.textStyles.bodyMedium,
    color: colors.primary.dark,
  },
  summaryTotal: {
    ...typography.textStyles.h3,
    color: colors.primary.dark,
    fontWeight: '700',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default BookedAmenitiesScreen;