/**
 * Household Screen
 * * Manage family members and daily help
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import FloatingActionButton from '../../../components/common/FloatingActionButton';

const MEMBERS = [
  { id: '1', name: 'Rohan Das', type: 'Admin', relation: 'Self', avatar: null },
  { id: '2', name: 'Priya Das', type: 'Family', relation: 'Wife', avatar: null },
  { id: '3', name: 'Sunita Maid', type: 'Daily Help', relation: 'Maid', avatar: null, phone: '9876543210' },
];

const MemberCard = ({ member }) => (
  <View style={styles.card}>
    <View style={styles.avatar}>
      <Icon name="person" size={24} color={colors.white} />
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.details}>
        {member.relation} • {member.type}
      </Text>
      {member.phone && <Text style={styles.phone}>{member.phone}</Text>}
    </View>
    <TouchableOpacity style={styles.actionBtn}>
      <Icon name="more-vert" size={24} color={colors.text.tertiary} />
    </TouchableOpacity>
  </View>
);

const HouseholdScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('family'); // family | help

  return (
    <View style={styles.container}>
      <Header title="My Household" showBack />
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'family' && styles.activeTab]}
          onPress={() => setActiveTab('family')}
        >
          <Text style={[styles.tabText, activeTab === 'family' && styles.activeTabText]}>Family</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'help' && styles.activeTab]}
          onPress={() => setActiveTab('help')}
        >
          <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>Daily Help</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MEMBERS.filter(m => activeTab === 'family' ? m.type !== 'Daily Help' : m.type === 'Daily Help')}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <MemberCard member={item} />}
      />

      <FloatingActionButton 
        icon="person-add" 
        onPress={() => navigation.navigate(activeTab === 'family' ? 'AddFamily' : 'AddHelps')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    padding: spacing.sm,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTab: {
    backgroundColor: colors.primary.main,
  },
  tabText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.white,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
  },
  details: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  phone: {
    ...typography.textStyles.caption,
    color: colors.primary.main,
    marginTop: 2,
  },
  actionBtn: {
    padding: spacing.sm,
  },
});

export default HouseholdScreen;