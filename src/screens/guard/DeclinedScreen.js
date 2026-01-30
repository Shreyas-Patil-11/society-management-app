/**
 * Entry Declined Screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';

const DeclinedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon name="block" size={120} color={colors.white} />
      
      <Text style={styles.title}>DENIED</Text>
      <Text style={styles.subtitle}>Resident rejected the entry</Text>

      <Button 
        title="Go Back" 
        style={styles.btn}
        labelStyle={{ color: colors.error.main }}
        onPress={() => navigation.navigate('GuardHome')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.error.main, // Red
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
    marginBottom: spacing.xxl,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.white,
    marginTop: spacing.xl,
  },
});

export default DeclinedScreen;