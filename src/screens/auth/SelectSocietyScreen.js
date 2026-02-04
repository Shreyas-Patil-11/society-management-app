

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/common/Header';
import { apiClient } from '../../services/api/apiClient';
import { useToast } from '../../hooks/useToast';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const SelectSocietyScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();

  const params = route?.params ?? {};
  const userData = params?.userData ?? {};

  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("✅ SelectSociety userData:", userData);

    if (!userData?.phone || !userData?.password) {
      showError("Signup details missing. Please signup again.");
      navigation.replace("SignUp");
      return;
    }

    fetchSocieties();
  }, []);

  const fetchSocieties = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/societies/public');
      const data = response?.data ?? response;

      setSocieties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('❌ Society fetch error:', error);
      showError('Failed to load societies');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = society => {
    if (!society?.id) {
      showError("Invalid society selected");
      return;
    }

    navigation.navigate('SelectBlock', {
      userData,        // ✅ includes password
      societyData: society,
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Select Society" showBack />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={societies}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelect(item)} // ✅ PASS item
            >
              <View style={styles.iconBox}>
                <Icon name="apartment" size={24} color={colors.primary.main} />
              </View>
              <Text style={styles.text}>{item.name}</Text>
              <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No societies found</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  text: { flex: 1, fontSize: 16, color: colors.text.primary, fontWeight: '500' },
  emptyText: { textAlign: 'center', marginTop: 20, color: colors.text.secondary },
});

export default SelectSocietyScreen;
