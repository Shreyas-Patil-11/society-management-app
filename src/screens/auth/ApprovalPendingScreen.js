import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ApprovalPendingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
            <Icon name="hourglass-empty" size={60} color={colors.warning} />
        </View>
        
        <Text style={styles.title}>Approval Pending</Text>
        <Text style={styles.message}>
          Your request to join the society has been sent. 
          {'\n\n'}
          Please wait for the Society Admin to approve your request. 
          You will be able to login once approved.
        </Text>

        <Button 
          title="Back to Login"
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
          })}
          style={styles.button}
          variant="outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: '#FFF4E5', // Light orange
    borderRadius: 50,
  },
  title: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  button: {
    width: '100%',
  }
});

export default ApprovalPendingScreen;