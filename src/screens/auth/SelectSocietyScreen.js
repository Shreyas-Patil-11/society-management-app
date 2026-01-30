
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const SOCIETIES = [
  {
    id: '1',
    name: 'Green Valley Apartments',
    city: 'Mumbai',
    area: 'Andheri West',
  },
  { id: '2', name: 'Blue Ridge', city: 'Pune', area: 'Hinjewadi' },
  { id: '3', name: 'Prestige Lakeside', city: 'Bangalore', area: 'Varthur' },
  { id: '4', name: 'DLF Cyber City', city: 'Gurgaon', area: 'Phase 3' },
];

const SelectSocietyScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { sendOTP } = useAuth();
  const { showSuccess, showError } = useToast();

  // Receive User Data from Step 1
  const { userData } = route.params || {};

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const filtered = SOCIETIES.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = society => {
    Alert.alert('Confirm Society', `Join ${society.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm & Send OTP',
        onPress: async () => {
          setLoading(true);
          try {
            // 1. Send OTP to the phone number collected in Step 1
            const result = await sendOTP(userData.phone);

            if (result.success) {
              showSuccess('OTP Sent');

              // ✅ NEXT STEP: Go to OTP (Pass User Data AND Society Data)
              navigation.navigate('OTPVerification', {
                phone: userData.phone,
                isNewUser: true,
                userData: userData,
                societyData: society, // <--- Passing selected society forward
              });
            } else {
              showError('Failed to send OTP');
            }
          } catch (e) {
            showError('Error sending OTP');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Select Society" showBack />
      <View style={styles.searchBox}>
        <Input
          placeholder="Search society..."
          value={search}
          onChangeText={setSearch}
          leftIcon="search"
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + spacing.lg },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelect(item)}
          >
            <View style={styles.iconBox}>
              <Icon name="apartment" size={28} color={colors.primary.main} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>
                {item.area}, {item.city}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  searchBox: {
    padding: spacing.md,
    backgroundColor: colors.background.primary,
  },
  list: { padding: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    elevation: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1 },
  name: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
  },
  location: { ...typography.textStyles.caption, color: colors.text.secondary },
});

export default SelectSocietyScreen;
