
// /**
//  * Resident Home Screen
//  * Connected to Backend API
//  */

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   RefreshControl,
//   StatusBar,
//   ActivityIndicator
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useFocusEffect } from '@react-navigation/native'; // Update on tab switch

// import { colors } from '../../../theme/colors';
// import { typography } from '../../../theme/typography';
// import { spacing } from '../../../theme/spacing';
// import { shadows } from '../../../theme/shadows';
// import { borderRadius } from '../../../theme/borderRadius';

// import Header from '../../../components/common/Header';
// import Card from '../../../components/common/Card';
// import StatusBadge from '../../../components/common/StatusBadge';

// import { useAuth } from '../../../hooks/useAuth';
// import { useNavigation } from '@react-navigation/native';
// import { visitorService } from '../../../services/visitorService'; // Import Service

// const QuickAction = ({ icon, label, color, onPress }) => (
//   <TouchableOpacity style={styles.actionItem} onPress={onPress}>
//     <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
//       <Icon name={icon} size={28} color={color} />
//     </View>
//     <Text style={styles.actionLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// const VisitorItem = ({ visitor }) => (
//   <View style={styles.visitorItem}>
//     <View style={styles.visitorIcon}>
//       <Icon 
//         name={visitor.type === 'Delivery' ? 'local-shipping' : visitor.type === 'Cab' ? 'local-taxi' : 'person'} 
//         size={20} 
//         color={colors.text.secondary} 
//       />
//     </View>
//     <View style={styles.visitorInfo}>
//       <Text style={styles.visitorName}>{visitor.name}</Text>
//       <Text style={styles.visitorDetails}>
//         {visitor.company ? `${visitor.type} • ${visitor.company}` : visitor.type}
//       </Text>
//     </View>
//     <View style={styles.visitorMeta}>
//       <Text style={styles.visitorTime}>
//         {/* Simple time formatting */}
//         {new Date(visitor.date || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//       </Text>
//       <StatusBadge status={visitor.status || 'pending'} size="small" />
//     </View>
//   </View>
// );

// const HomeScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const { user } = useAuth();
  
//   // State for Real Data
//   const [visitors, setVisitors] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch Data Function
//   const fetchDashboardData = async () => {
//     try {
//       const result = await visitorService.getRecentVisitors();
//       if (result.success) {
//         setVisitors(result.data);
//       }
//     } catch (error) {
//       console.log('Error fetching dashboard:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Initial Load
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // Refresh on Pull
//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   // Refresh when screen comes into focus (e.g., after adding a visitor)
//   useFocusEffect(
//     useCallback(() => {
//       fetchDashboardData();
//     }, [])
//   );

//   const handleQuickAction = (route) => {
//     navigation.navigate(route);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
      
//       <Header
//         title={`Hi, ${user?.name?.split(' ')[0] || 'Resident'}`}
//         subtitle={`${user?.building || 'Block A'} - ${user?.flat || '101'}`}
//         titleAlign="left"
//         showBack={false}
//         onTitlePress={() => navigation.navigate('Profile')} 
//         rightIcons={[
//           { icon: 'person', onPress: () => navigation.navigate('Profile') },
//           { icon: 'notifications-none', onPress: () => navigation.navigate('Notifications') },
//         ]}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
        
//         {/* Emergency Alert Banner */}
//         <TouchableOpacity 
//           style={styles.alertBanner} 
//           activeOpacity={0.9}
//           onPress={() => navigation.navigate('HomeAlert')}
//         >
//           <View style={styles.alertContent}>
//             <View style={styles.alertIconContainer}>
//               <Icon name="gpp-bad" size={24} color={colors.white} />
//             </View>
//             <View>
//               <Text style={styles.alertTitle}>Emergency Alert</Text>
//               <Text style={styles.alertSubtitle}>Tap to notify guards instantly</Text>
//             </View>
//           </View>
//           <Icon name="chevron-right" size={24} color={colors.white} />
//         </TouchableOpacity>

//         {/* Quick Actions */}
//         <Text style={styles.sectionTitle}>Pre-Approve Entry</Text>
//         <Card style={styles.actionsCard}>
//           <View style={styles.actionsGrid}>
//             <QuickAction 
//               icon="person-add" 
//               label="Guest" 
//               color={colors.primary.main} 
//               onPress={() => handleQuickAction('AllowGuest')} 
//             />
//             <QuickAction 
//               icon="local-taxi" 
//               label="Cab" 
//               color={colors.warning.main} 
//               onPress={() => handleQuickAction('AllowCab')} 
//             />
//             <QuickAction 
//               icon="local-shipping" 
//               label="Delivery" 
//               color={colors.info.main} 
//               onPress={() => handleQuickAction('AllowDelivery')} 
//             />
//             <QuickAction 
//               icon="handyman" 
//               label="Service" 
//               color={colors.secondary.main} 
//               onPress={() => handleQuickAction('AllowServiceman')} 
//             />
//           </View>
//         </Card>

//         {/* Gate Pass Status */}
//         <TouchableOpacity 
//           onPress={() => navigation.navigate('Gatepass')}
//           activeOpacity={1.0} 
//         >
//           <Card style={styles.gatePassCard} variant="elevated">
//             <View style={styles.gatePassContent}>
//               <Icon name="qr-code" size={32} color={colors.primary.main} />
//               <View style={styles.gatePassInfo}>
//                 <Text style={styles.gatePassTitle}>My Gate Pass</Text>
//                 <Text style={styles.gatePassSubtitle}>Show this at entry for quick access</Text>
//               </View>
//               <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
//             </View>
//           </Card>
//         </TouchableOpacity>

//         {/* Recent Visitors Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent Visitors</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('ServicesTab')}>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         <Card style={styles.visitorsCard}>
//           {loading ? (
//              <View style={{ padding: 20 }}>
//                 <ActivityIndicator size="small" color={colors.primary.main} />
//              </View>
//           ) : visitors.length === 0 ? (
//              <View style={{ padding: 20, alignItems: 'center' }}>
//                 <Text style={{ color: colors.text.secondary }}>No recent visitors</Text>
//              </View>
//           ) : (
//             visitors.map((visitor, index) => (
//               <React.Fragment key={visitor.id || index}>
//                 <VisitorItem visitor={visitor} />
//                 {index < visitors.length - 1 && <View style={styles.divider} />}
//               </React.Fragment>
//             ))
//           )}
//         </Card>

//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.secondary,
//   },
//   content: {
//     padding: spacing.base,
//   },
//   alertBanner: {
//     backgroundColor: colors.error.main,
//     borderRadius: borderRadius.lg,
//     padding: spacing.md,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: spacing.lg,
//     ...shadows.md,
//   },
//   alertContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   alertIconContainer: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     padding: spacing.sm,
//     borderRadius: borderRadius.full,
//     marginRight: spacing.md,
//   },
//   alertTitle: {
//     ...typography.textStyles.h4,
//     color: colors.white,
//     fontWeight: '700',
//   },
//   alertSubtitle: {
//     ...typography.textStyles.caption,
//     color: 'rgba(255,255,255,0.9)',
//   },
//   sectionTitle: {
//     ...typography.textStyles.h4,
//     color: colors.text.primary,
//     marginBottom: spacing.sm,
//     marginLeft: spacing.xs,
//   },
//   actionsCard: {
//     padding: spacing.md,
//     marginBottom: spacing.lg,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionItem: {
//     alignItems: 'center',
//     width: '22%',
//   },
//   actionIcon: {
//     width: 56,
//     height: 56,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: spacing.xs,
//   },
//   actionLabel: {
//     ...typography.textStyles.caption,
//     color: colors.text.secondary,
//     textAlign: 'center',
//   },
//   gatePassCard: {
//     marginBottom: spacing.lg,
//     backgroundColor: colors.primary.background,
//     borderColor: colors.primary.main,
//     borderWidth: 1,
//   },
//   gatePassContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   gatePassInfo: {
//     flex: 1,
//     marginLeft: spacing.md,
//   },
//   gatePassTitle: {
//     ...typography.textStyles.bodyLarge,
//     fontWeight: '600',
//     color: colors.primary.dark,
//   },
//   gatePassSubtitle: {
//     ...typography.textStyles.caption,
//     color: colors.text.secondary,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.sm,
//     marginLeft: spacing.xs,
//   },
//   seeAllText: {
//     ...typography.textStyles.bodySmall,
//     color: colors.primary.main,
//     fontWeight: '600',
//   },
//   visitorsCard: {
//     padding: 0,
//     overflow: 'hidden',
//   },
//   visitorItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: spacing.md,
//   },
//   visitorIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: borderRadius.full,
//     backgroundColor: colors.background.tertiary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },
//   visitorInfo: {
//     flex: 1,
//   },
//   visitorName: {
//     ...typography.textStyles.bodyMedium,
//     fontWeight: '600',
//     color: colors.text.primary,
//   },
//   visitorDetails: {
//     ...typography.textStyles.caption,
//     color: colors.text.secondary,
//   },
//   visitorMeta: {
//     alignItems: 'flex-end',
//   },
//   visitorTime: {
//     ...typography.textStyles.caption,
//     color: colors.text.tertiary,
//     marginBottom: 4,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: colors.border.light,
//     marginLeft: 68,
//   },
// });

// export default HomeScreen;


/**
 * Resident Home Screen
 * Features: Dashboard, Quick Actions, Visitor Log
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { shadows } from '../../../theme/shadows';
import { borderRadius } from '../../../theme/borderRadius';

import Header from '../../../components/common/Header';
import Card from '../../../components/common/Card';
import { useAuth } from '../../../hooks/useAuth';

// Named Import
import { getResidentVisitors } from '../../../services/visitorService';

const QuickAction = ({ icon, label, color, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
      <Icon name={icon} size={28} color={color} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const VisitorItem = ({ visitor }) => {
  const getIcon = (type) => {
    const t = type?.toUpperCase();
    if (t === 'DELIVERY') return 'local-shipping';
    if (t === 'CAB') return 'local-taxi';
    if (t === 'SERVICE' || t === 'MAINTENANCE') return 'handyman';
    return 'person';
  };

  return (
    <View style={styles.visitorItem}>
      <View style={styles.visitorIcon}>
        <Icon name={getIcon(visitor.type)} size={20} color={colors.text.secondary} />
      </View>
      <View style={styles.visitorInfo}>
        <Text style={styles.visitorName}>{visitor.name}</Text>
        <Text style={styles.visitorDetails}>{visitor.type}</Text>
      </View>
      <View style={styles.visitorMeta}>
        <Text style={styles.visitorTime}>{visitor.time}</Text>
        <Text style={styles.visitorDate}>{visitor.date}</Text>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [visitors, setVisitors] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null); // To store backend errors

  const fetchDashboardData = async () => {
    setErrorMsg(null); // Reset error
    try {
      const result = await getResidentVisitors();
      
      if (result.success && Array.isArray(result.data)) {
        const mappedData = result.data.map(v => {
          const entryDate = new Date(v.entry_time);
          const isToday = new Date().toDateString() === entryDate.toDateString();
          return {
            id: v.id,
            name: v.visitor_name || 'Unknown',
            type: v.purpose || 'GUEST',
            time: entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: isToday ? 'Today' : entryDate.toLocaleDateString(),
            rawDate: entryDate 
          };
        });
        mappedData.sort((a, b) => b.rawDate - a.rawDate);
        setVisitors(mappedData.slice(0, 5)); 
      } else {
        // If success is false, capture the message (e.g., "Flat is not assigned yet")
        if (result.message) {
          setErrorMsg(result.message);
        }
        setVisitors([]);
      }
    } catch (error) {
      console.log('Error fetching dashboard:', error);
      setErrorMsg('Network Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const handleQuickAction = (route) => {
    // Check for specific routes or show placeholders
    if (['AllowGuest', 'AllowCab', 'AllowDelivery', 'AllowServiceman'].includes(route)) {
        // navigation.navigate(route); 
        console.log("Navigating to:", route);
    } else {
        console.log("Route not implemented:", route);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
      
      <Header
        title={`Hi, ${user?.name?.split(' ')[0] || 'Resident'}`}
        subtitle={`${user?.Flat?.Block?.name || 'Block'} - ${user?.Flat?.flat_number || 'Flat'}`}
        titleAlign="left"
        showBack={false}
        rightIcons={[
          { icon: 'person', onPress: () => navigation.navigate('Profile') },
          { icon: 'notifications-none', onPress: () => navigation.navigate('Notifications') },
        ]}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        {/* Emergency Alert Banner */}
        <TouchableOpacity 
          style={styles.alertBanner} 
          activeOpacity={0.9}
        >
          <View style={styles.alertContent}>
            <View style={styles.alertIconContainer}>
              <Icon name="gpp-bad" size={24} color={colors.white} />
            </View>
            <View>
              <Text style={styles.alertTitle}>Emergency Alert</Text>
              <Text style={styles.alertSubtitle}>Tap to notify guards instantly</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.white} />
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Pre-Approve Entry</Text>
        <Card style={styles.actionsCard}>
          <View style={styles.actionsGrid}>
            <QuickAction 
              icon="person-add" 
              label="Guest" 
              color={colors.primary.main} 
              onPress={() => handleQuickAction('AllowGuest')} 
            />
            <QuickAction 
              icon="local-taxi" 
              label="Cab" 
              color={colors.warning.main} 
              onPress={() => handleQuickAction('AllowCab')} 
            />
            <QuickAction 
              icon="local-shipping" 
              label="Delivery" 
              color={colors.info.main} 
              onPress={() => handleQuickAction('AllowDelivery')} 
            />
            <QuickAction 
              icon="handyman" 
              label="Service" 
              color={colors.secondary.main} 
              onPress={() => handleQuickAction('AllowServiceman')} 
            />
          </View>
        </Card>

        {/* Recent Visitors Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Visitors</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ServicesTab')}>
             {/* Using ServicesTab as a placeholder for 'All Visitors' list if it exists */}
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.visitorsCard}>
          {loading ? (
             <View style={{ padding: 20 }}>
                <ActivityIndicator size="small" color={colors.primary.main} />
             </View>
          ) : visitors.length > 0 ? (
            visitors.map((visitor, index) => (
              <React.Fragment key={visitor.id || index}>
                <VisitorItem visitor={visitor} />
                {index < visitors.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))
          ) : (
             <View style={{ padding: 20, alignItems: 'center' }}>
                {/* DISPLAY ERROR MESSAGE IF EXISTS */}
                <Text style={{ color: errorMsg ? colors.error.main : colors.text.secondary, textAlign: 'center' }}>
                    {errorMsg || "No recent visitors"}
                </Text>
             </View>
          )}
        </Card>

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
    padding: spacing.base,
  },
  alertBanner: {
    backgroundColor: colors.error.main,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  alertTitle: {
    ...typography.textStyles.h4,
    color: colors.white,
    fontWeight: '700',
  },
  alertSubtitle: {
    ...typography.textStyles.caption,
    color: 'rgba(255,255,255,0.9)',
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  actionsCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    width: '22%',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  actionLabel: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  seeAllText: {
    ...typography.textStyles.bodySmall,
    color: colors.primary.main,
    fontWeight: '600',
  },
  visitorsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  visitorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  visitorIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  visitorDetails: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  visitorMeta: {
    alignItems: 'flex-end',
  },
  visitorTime: {
    ...typography.textStyles.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  visitorDate: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginLeft: 68,
  },
});

export default HomeScreen;