
/**
 * Guard Home Screen
 * src/screens/guard/GuardHomeScreen.js
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../hooks/useAuth';

// FIXED IMPORT: Use Named Import directly
import { getSocietyVisitors } from '../../services/visitorService';

const ENTRY_TYPES = [
  { id: 'guest', label: 'Guest', icon: 'person-add', color: '#4F46E5', route: 'GuestEntry' },
  { id: 'cab', label: 'Cab', icon: 'local-taxi', color: '#EAB308', route: 'CabEntry' },
  { id: 'delivery', label: 'Delivery', icon: 'local-shipping', color: '#06B6D4', route: 'DeliveryEntry' },
  { id: 'service', label: 'Service', icon: 'handyman', color: '#EC4899', route: 'ServicemanEntry' },
];

const ActionCard = ({ item, onPress }) => (
  <TouchableOpacity 
    style={[styles.actionCard, { backgroundColor: item.color }]} 
    onPress={onPress}
    activeOpacity={0.9}
  >
    <Icon name={item.icon} size={32} color={colors.white} />
    <Text style={styles.actionLabel}>{item.label}</Text>
  </TouchableOpacity>
);

const LogItem = ({ item }) => (
  <View style={styles.logItem}>
    <View style={styles.logIcon}>
      <Icon 
        name={item.type === 'Delivery' ? 'local-shipping' : 'person'} 
        size={20} 
        color={colors.text.secondary} 
      />
    </View>
    <View style={styles.logContent}>
      <Text style={styles.logTitle}>{item.name}</Text>
      <Text style={styles.logSub}>{item.type} • {item.dest}</Text>
    </View>
    <View style={styles.logMeta}>
      <StatusBadge status={item.status} size="small" />
      <Text style={styles.logTime}>{item.time}</Text>
    </View>
  </View>
);

const mapVisitorToLog = (visitor) => {
  const date = new Date(visitor.entry_time);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  let dest = 'Unknown';
  if (visitor.Flat) {
    const flatNo = visitor.Flat.flat_number || 'N/A';
    // Handle optional chaining safely
    const blockName = visitor.Flat.Block ? visitor.Flat.Block.name : 'Block';
    dest = `${blockName}-${flatNo}`;
  }

  return {
    id: visitor.id,
    name: visitor.visitor_name || 'Unknown',
    type: visitor.purpose || 'Visitor',
    dest: dest,
    time: timeString,
    status: visitor.exit_time ? 'left' : 'inside',
    rawDate: date,
  };
};

const GuardHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const [recentLogs, setRecentLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadRecentActivity = async () => {
        try {
          // CALL FUNCTION DIRECTLY
          const result = await getSocietyVisitors();
          
          if (result.success && Array.isArray(result.data)) {
            const mapped = result.data.map(mapVisitorToLog);
            mapped.sort((a, b) => b.rawDate - a.rawDate);
            setRecentLogs(mapped.slice(0, 3));
          } else {
            console.log("Visitor Load Msg:", result.message);
          }
        } catch (e) {
          console.error('Home load error:', e);
        } finally {
          setIsLoading(false);
        }
      };

      loadRecentActivity();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View>
          <Text style={styles.headerTitle}>Main Gate</Text>
          <Text style={styles.headerSub}>Guard: {user?.name || 'Security'}</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('GuardSettings')}>
          <Icon name="person" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('PreApproveEntry')}>
          <Icon name="qr-code-scanner" size={24} color={colors.primary.main} />
          <Text style={styles.searchText}>Verify Passcode / QR</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>New Entry</Text>
        <View style={styles.grid}>
          {ENTRY_TYPES.map((item) => (
            <ActionCard key={item.id} item={item} onPress={() => navigation.navigate(item.route)} />
          ))}
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GuardVisitors')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logsCard}>
          {isLoading ? (
            <ActivityIndicator color={colors.primary.main} style={{ padding: 20 }} />
          ) : recentLogs.length === 0 ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: colors.text.tertiary }}>No recent activity</Text>
            </View>
          ) : (
            recentLogs.map((log) => <LogItem key={log.id} item={log} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  header: { backgroundColor: '#1F2937', padding: spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { ...typography.textStyles.h3, color: colors.white },
  headerSub: { ...typography.textStyles.bodySmall, color: colors.text.tertiary, marginTop: 4 },
  profileBtn: { width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  content: { padding: spacing.md },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.primary.main, borderStyle: 'dashed' },
  searchText: { ...typography.textStyles.bodyLarge, color: colors.primary.main, fontWeight: '600', marginLeft: spacing.md },
  sectionTitle: { ...typography.textStyles.h4, color: colors.text.primary, marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xl },
  actionCard: { width: '47%', height: 100, borderRadius: borderRadius.lg, padding: spacing.md, justifyContent: 'space-between', elevation: 3 },
  actionLabel: { ...typography.textStyles.bodyLarge, color: colors.white, fontWeight: '700' },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  seeAll: { ...typography.textStyles.bodySmall, color: colors.primary.main, fontWeight: '600' },
  logsCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.sm },
  logItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.background.secondary },
  logIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background.secondary, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  logContent: { flex: 1 },
  logTitle: { ...typography.textStyles.bodyMedium, fontWeight: '600', color: colors.text.primary },
  logSub: { ...typography.textStyles.caption, color: colors.text.secondary },
  logMeta: { alignItems: 'flex-end' },
  logTime: { ...typography.textStyles.caption, color: colors.text.tertiary, marginTop: 2, fontSize: 10 },
});

export default GuardHomeScreen;