/**
 * Entry Allowed Screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';

const AllowedScreen = ({ navigation, route }) => {
  const { visitorName, flatNo } = route.params;

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={120} color={colors.white} />
      
      <Text style={styles.title}>ALLOWED</Text>
      <Text style={styles.subtitle}>Resident approved the entry</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Visitor</Text>
        <Text style={styles.value}>{visitorName}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Destination</Text>
        <Text style={styles.value}>{flatNo}</Text>
      </View>

      <Button 
        title="Done" 
        style={styles.btn}
        labelStyle={{ color: colors.success.main }}
        onPress={() => navigation.navigate('GuardHome')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.success.main, // Green
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    ...typography.textStyles.h1,
    color: colors.white,
    marginTop: spacing.md,
    letterSpacing: 2,
  },
  subtitle: {
    ...typography.textStyles.bodyMedium,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    padding: spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  label: {
    ...typography.textStyles.caption,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  value: {
    ...typography.textStyles.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    width: '50%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: spacing.md,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.white,
  },
});

export default AllowedScreen;