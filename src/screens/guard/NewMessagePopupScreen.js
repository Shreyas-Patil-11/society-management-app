/**
 * New Message Popup
 * * Modal to alert guard of resident instructions
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

const NewMessagePopupScreen = ({ navigation, route }) => {
  // Mock Data if none passed
  const { 
    sender = "Flat A-101", 
    message = "Please send the Swiggy delivery boy to my flat.", 
    time = "Just now" 
  } = route.params || {};

  const handleClose = () => {
    navigation.goBack();
  };

  const handleReply = () => {
    // Navigate to a chat screen or just close with acknowledgment
    navigation.goBack();
    // In real app: navigation.navigate('Chat', { recipient: sender });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Icon name="mail" size={24} color={colors.white} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>New Message</Text>
            <Text style={styles.subtitle}>{time}</Text>
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Icon name="close" size={24} color={colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.senderLabel}>FROM</Text>
          <Text style={styles.senderName}>{sender}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.messageText}>"{message}"</Text>
        </View>

        {/* Actions */}
        <View style={styles.footer}>
          <Button 
            title="Ignore" 
            type="outline" 
            style={{ flex: 1 }} 
            onPress={handleClose}
          />
          <View style={{ width: spacing.md }} />
          <Button 
            title="Acknowledge" 
            style={{ flex: 1 }} 
            onPress={handleReply}
          />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  popup: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  body: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  senderLabel: {
    fontSize: 10,
    color: colors.text.tertiary,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  senderName: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  messageText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewMessagePopupScreen;