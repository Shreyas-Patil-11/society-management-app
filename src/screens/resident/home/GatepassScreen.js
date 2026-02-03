
/**
 * Digital Gate Pass Screen
 * * Generates a QR Code/Token for visitors
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';

const GatePassScreen = ({ navigation }) => {
  const [passType, setPassType] = useState('Guest'); // Guest | Delivery | Cab

  // Mock Gate Pass Data
  const PASS_CODE = "982345";
  const VALID_UNTIL = "Today, 11:59 PM";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Here is your entry pass for Green Valley Society.\nCode: ${PASS_CODE}\nValid until: ${VALID_UNTIL}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Gate Pass" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Type Selector */}
        <View style={styles.typeSelector}>
          {['Guest', 'Delivery', 'Cab'].map((type) => (
            <TouchableOpacity 
              key={type}
              style={[styles.typeBtn, passType === type && styles.typeBtnActive]}
              onPress={() => setPassType(type)}
            >
              <Text style={[styles.typeText, passType === type && styles.typeTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* The Pass Card */}
        <View style={styles.passCard}>
          <View style={styles.passHeader}>
            <Text style={styles.passTitle}>{passType} Entry Pass</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.qrPlaceholder}>
            <Icon name="qr-code-2" size={180} color={colors.text.primary} />
          </View>

          <Text style={styles.codeLabel}>ENTRY CODE</Text>
          <Text style={styles.codeValue}>{PASS_CODE}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>VALID UNTIL</Text>
              <Text style={styles.infoValue}>{VALID_UNTIL}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>APPROVED BY</Text>
              <Text style={styles.infoValue}>You</Text>
            </View>
          </View>
        </View>

        <Text style={styles.helpText}>
          Share this code with your visitor for hassle-free entry at the gate.
        </Text>

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Share Pass" 
          icon="share" 
          onPress={handleShare} 
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
    alignItems: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    padding: 4,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    width: '100%',
  },
  typeBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  typeBtnActive: {
    backgroundColor: colors.primary.light,
  },
  typeText: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.background,
  },
  typeTextActive: {
    color: colors.primary.background,
  },
  passCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  passHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  passTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
  },
  badge: {
    backgroundColor: colors.success.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.success.light,
  },
  badgeText: {
    color: colors.success.main,
    fontSize: 10,
    fontWeight: 'bold',
  },
  qrPlaceholder: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  codeLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  codeValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.lg,
    letterSpacing: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border.light,
    marginBottom: spacing.lg,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoLabel: {
    fontSize: 10,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  infoValue: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  helpText: {
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.text.secondary,
    ...typography.textStyles.bodySmall,
    paddingHorizontal: spacing.xl,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
});

export default GatePassScreen;