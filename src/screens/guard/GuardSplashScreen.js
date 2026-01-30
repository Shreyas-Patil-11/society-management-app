/**
 * Guard Splash Screen
 * * Simple loading screen before Guard Dashboard
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';

const GuardSplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate checking guard shift status
    const timer = setTimeout(() => {
      navigation.replace('GuardHome');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Icon name="security" size={80} color={colors.white} />
      <Text style={styles.title}>Guard Portal</Text>
      <ActivityIndicator size="large" color={colors.white} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937', // Dark guard theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default GuardSplashScreen;