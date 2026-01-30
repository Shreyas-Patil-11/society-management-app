
/**
 * Profile Dashboard Screen
 * * Hub for managing personal details, household, and settings.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import { useAuth } from '../../../hooks/useAuth';

const MENU_ITEMS = [
  { label: 'My Household', icon: 'people', route: 'Household', color: '#4F46E5' },
  { label: 'My Vehicles', icon: 'directions-car', route: 'AddVehicle', color: '#0891B2' },
  { label: 'My Posts', icon: 'article', route: 'MyPosts', color: '#EA580C' },
  { label: 'Gate Pass', icon: 'qr-code', route: 'Gatepass', color: '#16A34A' },
  { label: 'Settings', icon: 'settings', route: 'Settings', color: '#64748B' },
  { label: 'Support', icon: 'help', route: 'Support', color: '#9333EA' },
];

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // ✅ FIX: Destructure 'signOut' instead of 'logout' to match AuthContext directly
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // ✅ Call signOut directly
              await signOut(); 
            } catch (e) {
              console.error("Logout failed", e);
            }
          } 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="My Profile" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={60} color={colors.text.secondary} />
          </View>
          <Text style={styles.userName}>{user?.name || 'Resident Name'}</Text>
          <Text style={styles.userDetail}>
            {user?.building || 'Block A'} • {user?.flat || '101'}
          </Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Resident (Owner)</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Vehicles</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Visitors</Text>
          </View>
        </View>

        {/* Menu Grid */}
        <Text style={styles.sectionTitle}>Manage</Text>
        <View style={styles.menuGrid}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Icon name={item.icon} size={28} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={20} color={colors.text.tertiary} style={styles.arrow} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color={colors.error.main} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>App Version 1.0.0</Text>

      </ScrollView>
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
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  userDetail: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  roleBadge: {
    backgroundColor: colors.primary.background,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary.light,
  },
  roleText: {
    ...typography.textStyles.caption,
    color: colors.primary.main,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: colors.border.light,
    height: '80%',
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  menuGrid: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    marginBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.error.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.error.light,
    marginBottom: spacing.lg,
  },
  logoutText: {
    ...typography.textStyles.bodyMedium,
    color: colors.error.main,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  versionText: {
    textAlign: 'center',
    color: colors.text.tertiary,
    ...typography.textStyles.caption,
  },
});

export default ProfileScreen;