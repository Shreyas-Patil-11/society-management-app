// /**
//  * Guard Home Screen
//  * * Main dashboard for security staff.
//  * * Quick access to entry logging.
//  */

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import { borderRadius } from '../../theme/borderRadius';
// import Header from '../../components/common/Header';
// import StatusBadge from '../../components/common/StatusBadge';
// import { useAuth } from '../../hooks/useAuth';

// const ENTRY_TYPES = [
//   { id: 'guest', label: 'Guest', icon: 'person-add', color: '#4F46E5', route: 'GuestEntry' },
//   { id: 'cab', label: 'Cab', icon: 'local-taxi', color: '#EAB308', route: 'CabEntry' },
//   { id: 'delivery', label: 'Delivery', icon: 'local-shipping', color: '#06B6D4', route: 'DeliveryEntry' },
//   { id: 'service', label: 'Service', icon: 'handyman', color: '#EC4899', route: 'ServicemanEntry' },
// ];

// const RECENT_LOGS = [
//   { id: '1', name: 'Zomato', type: 'Delivery', dest: 'A-101', time: '2 mins ago', status: 'inside' },
//   { id: '2', name: 'Rohan (Guest)', type: 'Guest', dest: 'B-402', time: '15 mins ago', status: 'approved' },
//   { id: '3', name: 'Uber (MH12)', type: 'Cab', dest: 'C-103', time: '1 hr ago', status: 'denied' },
// ];

// const ActionCard = ({ item, onPress }) => (
//   <TouchableOpacity 
//     style={[styles.actionCard, { backgroundColor: item.color }]} 
//     onPress={onPress}
//     activeOpacity={0.9}
//   >
//     <Icon name={item.icon} size={32} color={colors.white} />
//     <Text style={styles.actionLabel}>{item.label}</Text>
//   </TouchableOpacity>
// );

// const LogItem = ({ item }) => (
//   <View style={styles.logItem}>
//     <View style={styles.logIcon}>
//       <Icon 
//         name={item.type === 'Delivery' ? 'local-shipping' : 'person'} 
//         size={20} 
//         color={colors.text.secondary} 
//       />
//     </View>
//     <View style={styles.logContent}>
//       <Text style={styles.logTitle}>{item.name}</Text>
//       <Text style={styles.logSub}>{item.type} • {item.dest}</Text>
//     </View>
//     <View style={styles.logMeta}>
//       <StatusBadge status={item.status} size="small" />
//       <Text style={styles.logTime}>{item.time}</Text>
//     </View>
//   </View>
// );

// const GuardHomeScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { user, signOut } = useAuth();

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
//       {/* Dark Header for Guard */}
//       <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
//         <View>
//           <Text style={styles.headerTitle}>Main Gate</Text>
//           <Text style={styles.headerSub}>Guard: {user?.name || 'Ramesh'}</Text>
//         </View>
//         <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
//           <Icon name="logout" size={24} color={colors.white} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
        
//         {/* Pre-Approve Lookup */}
//         <TouchableOpacity 
//           style={styles.searchBar}
//           onPress={() => navigation.navigate('PreApproveEntry')}
//         >
//           <Icon name="qr-code-scanner" size={24} color={colors.primary.main} />
//           <Text style={styles.searchText}>Verify Passcode / QR</Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>New Entry</Text>
//         <View style={styles.grid}>
//           {ENTRY_TYPES.map((item) => (
//             <ActionCard 
//               key={item.id} 
//               item={item} 
//               onPress={() => navigation.navigate(item.route)} 
//             />
//           ))}
//         </View>

//         <View style={styles.recentHeader}>
//           <Text style={styles.sectionTitle}>Recent Activity</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('GuardVisitors')}>
//             <Text style={styles.seeAll}>View All</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.logsCard}>
//           {RECENT_LOGS.map((log) => (
//             <LogItem key={log.id} item={log} />
//           ))}
//         </View>

//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.secondary,
//   },
//   header: {
//     backgroundColor: '#1F2937',
//     padding: spacing.lg,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     ...typography.textStyles.h3,
//     color: colors.white,
//   },
//   headerSub: {
//     ...typography.textStyles.bodySmall,
//     color: colors.text.tertiary,
//     marginTop: 4,
//   },
//   logoutBtn: {
//     padding: spacing.sm,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: borderRadius.md,
//   },
//   content: {
//     padding: spacing.md,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//     padding: spacing.md,
//     borderRadius: borderRadius.lg,
//     marginBottom: spacing.lg,
//     borderWidth: 1,
//     borderColor: colors.primary.main,
//     borderStyle: 'dashed',
//   },
//   searchText: {
//     ...typography.textStyles.bodyLarge,
//     color: colors.primary.main,
//     fontWeight: '600',
//     marginLeft: spacing.md,
//   },
//   sectionTitle: {
//     ...typography.textStyles.h4,
//     color: colors.text.primary,
//     marginBottom: spacing.md,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: spacing.md,
//     marginBottom: spacing.xl,
//   },
//   actionCard: {
//     width: '47%', // 2 columns
//     height: 100,
//     borderRadius: borderRadius.lg,
//     padding: spacing.md,
//     justifyContent: 'space-between',
//     ...Platform.select({
//       ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4 },
//       android: { elevation: 4 },
//     }),
//   },
//   actionLabel: {
//     ...typography.textStyles.bodyLarge,
//     color: colors.white,
//     fontWeight: '700',
//   },
//   recentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.sm,
//   },
//   seeAll: {
//     ...typography.textStyles.bodySmall,
//     color: colors.primary.main,
//     fontWeight: '600',
//   },
//   logsCard: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.lg,
//     padding: spacing.sm,
//   },
//   logItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.background.secondary,
//   },
//   logIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: colors.background.secondary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },
//   logContent: {
//     flex: 1,
//   },
//   logTitle: {
//     ...typography.textStyles.bodyMedium,
//     fontWeight: '600',
//     color: colors.text.primary,
//   },
//   logSub: {
//     ...typography.textStyles.caption,
//     color: colors.text.secondary,
//   },
//   logMeta: {
//     alignItems: 'flex-end',
//   },
//   logTime: {
//     ...typography.textStyles.caption,
//     color: colors.text.tertiary,
//     marginTop: 2,
//     fontSize: 10,
//   },
// });

// export default GuardHomeScreen;

// /**
//  * Guard Home Screen
//  * * Main dashboard for security staff.
//  * * Quick access to entry logging.
//  */

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import { borderRadius } from '../../theme/borderRadius';
// import StatusBadge from '../../components/common/StatusBadge';
// import { useAuth } from '../../hooks/useAuth';

// const ENTRY_TYPES = [
//   { id: 'guest', label: 'Guest', icon: 'person-add', color: '#4F46E5', route: 'GuestEntry' },
//   { id: 'cab', label: 'Cab', icon: 'local-taxi', color: '#EAB308', route: 'CabEntry' },
//   { id: 'delivery', label: 'Delivery', icon: 'local-shipping', color: '#06B6D4', route: 'DeliveryEntry' },
//   { id: 'service', label: 'Service', icon: 'handyman', color: '#EC4899', route: 'ServicemanEntry' },
// ];

// const RECENT_LOGS = [
//   { id: '1', name: 'Zomato', type: 'Delivery', dest: 'A-101', time: '2 mins ago', status: 'inside' },
//   { id: '2', name: 'Rohan (Guest)', type: 'Guest', dest: 'B-402', time: '15 mins ago', status: 'approved' },
//   { id: '3', name: 'Uber (MH12)', type: 'Cab', dest: 'C-103', time: '1 hr ago', status: 'denied' },
// ];

// const ActionCard = ({ item, onPress }) => (
//   <TouchableOpacity 
//     style={[styles.actionCard, { backgroundColor: item.color }]} 
//     onPress={onPress}
//     activeOpacity={0.9}
//   >
//     <Icon name={item.icon} size={32} color={colors.white} />
//     <Text style={styles.actionLabel}>{item.label}</Text>
//   </TouchableOpacity>
// );

// const LogItem = ({ item }) => (
//   <View style={styles.logItem}>
//     <View style={styles.logIcon}>
//       <Icon 
//         name={item.type === 'Delivery' ? 'local-shipping' : 'person'} 
//         size={20} 
//         color={colors.text.secondary} 
//       />
//     </View>
//     <View style={styles.logContent}>
//       <Text style={styles.logTitle}>{item.name}</Text>
//       <Text style={styles.logSub}>{item.type} • {item.dest}</Text>
//     </View>
//     <View style={styles.logMeta}>
//       <StatusBadge status={item.status} size="small" />
//       <Text style={styles.logTime}>{item.time}</Text>
//     </View>
//   </View>
// );

// const GuardHomeScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { user } = useAuth();

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
//       {/* Dark Header for Guard */}
//       <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
//         <View>
//           <Text style={styles.headerTitle}>Main Gate</Text>
//           <Text style={styles.headerSub}>Guard: {user?.name || 'Ramesh'}</Text>
//         </View>
        
//         {/* ✅ UPDATED: Navigates to Settings instead of direct Logout */}
//         <TouchableOpacity 
//           style={styles.settingsBtn} 
//           onPress={() => navigation.navigate('GuardSettings')}
//         >
//           <Icon name="settings" size={24} color={colors.white} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
        
//         {/* Pre-Approve Lookup */}
//         <TouchableOpacity 
//           style={styles.searchBar}
//           onPress={() => navigation.navigate('PreApproveEntry')}
//         >
//           <Icon name="qr-code-scanner" size={24} color={colors.primary.main} />
//           <Text style={styles.searchText}>Verify Passcode / QR</Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>New Entry</Text>
//         <View style={styles.grid}>
//           {ENTRY_TYPES.map((item) => (
//             <ActionCard 
//               key={item.id} 
//               item={item} 
//               onPress={() => navigation.navigate(item.route)} 
//             />
//           ))}
//         </View>

//         <View style={styles.recentHeader}>
//           <Text style={styles.sectionTitle}>Recent Activity</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('GuardVisitors')}>
//             <Text style={styles.seeAll}>View All</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.logsCard}>
//           {RECENT_LOGS.map((log) => (
//             <LogItem key={log.id} item={log} />
//           ))}
//         </View>

//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.secondary,
//   },
//   header: {
//     backgroundColor: '#1F2937', // Dark Slate for Guards
//     padding: spacing.lg,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     ...typography.textStyles.h3,
//     color: colors.white,
//   },
//   headerSub: {
//     ...typography.textStyles.bodySmall,
//     color: colors.text.tertiary,
//     marginTop: 4,
//   },
//   settingsBtn: {
//     padding: spacing.sm,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: borderRadius.md,
//   },
//   content: {
//     padding: spacing.md,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//     padding: spacing.md,
//     borderRadius: borderRadius.lg,
//     marginBottom: spacing.lg,
//     borderWidth: 1,
//     borderColor: colors.primary.main,
//     borderStyle: 'dashed',
//   },
//   searchText: {
//     ...typography.textStyles.bodyLarge,
//     color: colors.primary.main,
//     fontWeight: '600',
//     marginLeft: spacing.md,
//   },
//   sectionTitle: {
//     ...typography.textStyles.h4,
//     color: colors.text.primary,
//     marginBottom: spacing.md,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: spacing.md,
//     marginBottom: spacing.xl,
//   },
//   actionCard: {
//     width: '47%', 
//     height: 100,
//     borderRadius: borderRadius.lg,
//     padding: spacing.md,
//     justifyContent: 'space-between',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   actionLabel: {
//     ...typography.textStyles.bodyLarge,
//     color: colors.white,
//     fontWeight: '700',
//   },
//   recentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.sm,
//   },
//   seeAll: {
//     ...typography.textStyles.bodySmall,
//     color: colors.primary.main,
//     fontWeight: '600',
//   },
//   logsCard: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.lg,
//     padding: spacing.sm,
//   },
//   logItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.background.secondary,
//   },
//   logIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: colors.background.secondary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },
//   logContent: {
//     flex: 1,
//   },
//   logTitle: {
//     ...typography.textStyles.bodyMedium,
//     fontWeight: '600',
//     color: colors.text.primary,
//   },
//   logSub: {
//     ...typography.textStyles.caption,
//     color: colors.text.secondary,
//   },
//   logMeta: {
//     alignItems: 'flex-end',
//   },
//   logTime: {
//     ...typography.textStyles.caption,
//     color: colors.text.tertiary,
//     marginTop: 2,
//     fontSize: 10,
//   },
// });

// export default GuardHomeScreen;


/**
 * Guard Home Screen
 * * Main dashboard for security staff.
 * * Quick access to entry logging.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../hooks/useAuth';

const ENTRY_TYPES = [
  { id: 'guest', label: 'Guest', icon: 'person-add', color: '#4F46E5', route: 'GuestEntry' },
  { id: 'cab', label: 'Cab', icon: 'local-taxi', color: '#EAB308', route: 'CabEntry' },
  { id: 'delivery', label: 'Delivery', icon: 'local-shipping', color: '#06B6D4', route: 'DeliveryEntry' },
  { id: 'service', label: 'Service', icon: 'handyman', color: '#EC4899', route: 'ServicemanEntry' },
];

const RECENT_LOGS = [
  { id: '1', name: 'Zomato', type: 'Delivery', dest: 'A-101', time: '2 mins ago', status: 'inside' },
  { id: '2', name: 'Rohan (Guest)', type: 'Guest', dest: 'B-402', time: '15 mins ago', status: 'approved' },
  { id: '3', name: 'Uber (MH12)', type: 'Cab', dest: 'C-103', time: '1 hr ago', status: 'denied' },
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

const GuardHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Dark Header for Guard */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View>
          <Text style={styles.headerTitle}>Main Gate</Text>
          <Text style={styles.headerSub}>Guard: {user?.name || 'Ramesh'}</Text>
        </View>
        
        {/* ✅ UPDATED: Now shows Profile Icon */}
        {/* Navigates to GuardSettings which usually contains profile info */}
        <TouchableOpacity 
          style={styles.profileBtn} 
          onPress={() => navigation.navigate('GuardSettings')}
        >
          <Icon name="person" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
        
        {/* Pre-Approve Lookup */}
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => navigation.navigate('PreApproveEntry')}
        >
          <Icon name="qr-code-scanner" size={24} color={colors.primary.main} />
          <Text style={styles.searchText}>Verify Passcode / QR</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>New Entry</Text>
        <View style={styles.grid}>
          {ENTRY_TYPES.map((item) => (
            <ActionCard 
              key={item.id} 
              item={item} 
              onPress={() => navigation.navigate(item.route)} 
            />
          ))}
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GuardVisitors')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logsCard}>
          {RECENT_LOGS.map((log) => (
            <LogItem key={log.id} item={log} />
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    backgroundColor: '#1F2937', // Dark Slate for Guards
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.textStyles.h3,
    color: colors.white,
  },
  headerSub: {
    ...typography.textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  profileBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderStyle: 'dashed',
  },
  searchText: {
    ...typography.textStyles.bodyLarge,
    color: colors.primary.main,
    fontWeight: '600',
    marginLeft: spacing.md,
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionCard: {
    width: '47%', 
    height: 100,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionLabel: {
    ...typography.textStyles.bodyLarge,
    color: colors.white,
    fontWeight: '700',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  seeAll: {
    ...typography.textStyles.bodySmall,
    color: colors.primary.main,
    fontWeight: '600',
  },
  logsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  logIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logContent: {
    flex: 1,
  },
  logTitle: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  logSub: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  logMeta: {
    alignItems: 'flex-end',
  },
  logTime: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: 2,
    fontSize: 10,
  },
});

export default GuardHomeScreen;