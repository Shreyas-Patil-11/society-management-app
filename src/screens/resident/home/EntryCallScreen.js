// import React from 'react';
// import { View, Text } from 'react-native';
// import { Header, Button } from '../../../components/common';
// import { spacing, typography } from '../../../theme';

// const EntryCallScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <Header title="Entry Call" />
//       <View style={{ padding: spacing.base }}>
//         <Text style={typography.textStyles.bodyLarge}>
//           Guard is requesting entry approval.
//         </Text>
//         <Button title="Allow" />
//         <Button title="Decline" variant="secondary" />
//       </View>
//     </View>
//   );
// };

// export default EntryCallScreen;


/**
 * Entry Call Screen
 * * Simulates an incoming call from the Guard.
 * This would typically be triggered by a notification or socket event.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';

const { width } = Dimensions.get('window');

const EntryCallScreen = ({ navigation, route }) => {
  const visitor = route.params?.visitor || { name: 'Unknown', type: 'Visitor' };
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = () => {
    // Logic to approve entry
    navigation.goBack();
  };

  const handleDecline = () => {
    // Logic to deny entry
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Icon name="security" size={40} color={colors.white} style={{ opacity: 0.8 }} />
        <Text style={styles.gateText}>Main Gate Security</Text>
        <Text style={styles.timerText}>Incoming Call...</Text>
      </View>

      <View style={styles.visitorCard}>
        <View style={styles.avatar}>
          <Icon name="person" size={40} color={colors.text.secondary} />
        </View>
        <Text style={styles.visitorName}>{visitor.name}</Text>
        <Text style={styles.visitorType}>{visitor.type}</Text>
        <Text style={styles.visitorType}>is at the gate</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline}>
          <Icon name="close" size={32} color={colors.white} />
          <Text style={styles.buttonText}>DENY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
          <Icon name="check" size={32} color={colors.white} />
          <Text style={styles.buttonText}>APPROVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937', // Dark background for call screen
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  topSection: {
    alignItems: 'center',
  },
  gateText: {
    ...typography.textStyles.h3,
    color: colors.white,
    marginTop: spacing.md,
  },
  timerText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  visitorCard: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  visitorName: {
    ...typography.textStyles.h2,
    color: colors.white,
  },
  visitorType: {
    ...typography.textStyles.bodyLarge,
    color: colors.text.tertiary,
  },
  actions: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: colors.error.main,
  },
  acceptButton: {
    backgroundColor: colors.success.main,
  },
  buttonText: {
    ...typography.textStyles.caption,
    color: colors.white,
    marginTop: 4,
    position: 'absolute',
    bottom: -24,
  },
});

export default EntryCallScreen;