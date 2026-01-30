// /**
//  * Guard Visitors Log
//  * * View 'Inside', 'Waiting', and 'History' logs.
//  * * Action: Check-out visitors.
//  */

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import { borderRadius } from '../../theme/borderRadius';
// import Header from '../../components/common/Header';
// import StatusBadge from '../../components/common/StatusBadge';
// import { useToast } from '../../hooks/useToast';

// // Mock Data
// const VISITORS_DATA = [
//   { id: '1', name: 'Rohan Das', type: 'Delivery', dest: 'A-101', inTime: '10:30 AM', status: 'inside' },
//   { id: '2', name: 'Uber Driver', type: 'Cab', dest: 'B-202', inTime: '11:15 AM', status: 'inside' },
//   { id: '3', name: 'Priya Singh', type: 'Guest', dest: 'C-303', inTime: '09:00 AM', status: 'left' },
// ];

// const VisitorLogItem = ({ item, onCheckout }) => (
//   <View style={styles.card}>
//     <View style={styles.row}>
//       <View style={styles.info}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.details}>{item.type} • {item.dest}</Text>
//         <Text style={styles.time}>In: {item.inTime}</Text>
//       </View>
//       <View style={styles.actions}>
//         {item.status === 'inside' ? (
//           <TouchableOpacity 
//             style={styles.checkoutBtn} 
//             onPress={() => onCheckout(item)}
//           >
//             <Text style={styles.checkoutText}>EXIT</Text>
//           </TouchableOpacity>
//         ) : (
//           <StatusBadge status="rejected" label="LEFT" size="small" />
//         )}
//       </View>
//     </View>
//   </View>
// );

// const GuardVisitorsScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { showSuccess } = useToast();
//   const [activeTab, setActiveTab] = useState('inside'); // inside | history
//   const [listData, setListData] = useState(VISITORS_DATA);

//   const handleCheckout = (visitor) => {
//     Alert.alert(
//       'Confirm Exit',
//       `Mark ${visitor.name} as exited?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'YES, EXIT', 
//           onPress: () => {
//             // Update local state for demo
//             setListData(prev => prev.map(item => 
//               item.id === visitor.id ? { ...item, status: 'left' } : item
//             ));
//             showSuccess(`${visitor.name} marked as exited`);
//           } 
//         }
//       ]
//     );
//   };

//   const filteredData = activeTab === 'inside' 
//     ? listData.filter(v => v.status === 'inside')
//     : listData.filter(v => v.status === 'left');

//   return (
//     <View style={styles.container}>
//       <Header title="Visitor Log" showBack />
      
//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'inside' && styles.activeTab]}
//           onPress={() => setActiveTab('inside')}
//         >
//           <Text style={[styles.tabText, activeTab === 'inside' && styles.activeTabText]}>
//             Inside ({listData.filter(v => v.status === 'inside').length})
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'history' && styles.activeTab]}
//           onPress={() => setActiveTab('history')}
//         >
//           <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredData}
//         keyExtractor={item => item.id}
//         contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
//         renderItem={({ item }) => (
//           <VisitorLogItem item={item} onCheckout={handleCheckout} />
//         )}
//         ListEmptyComponent={
//           <View style={styles.empty}>
//             <Text style={styles.emptyText}>No visitors found</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.secondary,
//   },
//   tabs: {
//     flexDirection: 'row',
//     backgroundColor: colors.background.primary,
//     padding: spacing.xs,
//     margin: spacing.md,
//     borderRadius: borderRadius.lg,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: spacing.sm,
//     alignItems: 'center',
//     borderRadius: borderRadius.md,
//   },
//   activeTab: {
//     backgroundColor: colors.primary.light,
//   },
//   tabText: {
//     ...typography.textStyles.bodyMedium,
//     fontWeight: '600',
//     color: colors.text.secondary,
//   },
//   activeTabText: {
//     color: colors.primary.dark,
//   },
//   list: {
//     padding: spacing.md,
//   },
//   card: {
//     backgroundColor: colors.background.primary,
//     padding: spacing.md,
//     borderRadius: borderRadius.lg,
//     marginBottom: spacing.md,
//     borderWidth: 1,
//     borderColor: colors.border.light,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   info: {
//     flex: 1,
//   },
//   name: {
//     ...typography.textStyles.bodyLarge,
//     fontWeight: '700',
//     color: colors.text.primary,
//   },
//   details: {
//     ...typography.textStyles.bodyMedium,
//     color: colors.text.secondary,
//   },
//   time: {
//     ...typography.textStyles.caption,
//     color: colors.text.tertiary,
//     marginTop: 4,
//   },
//   actions: {
//     marginLeft: spacing.md,
//   },
//   checkoutBtn: {
//     backgroundColor: colors.error.background,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.xs,
//     borderRadius: borderRadius.md,
//     borderWidth: 1,
//     borderColor: colors.error.light,
//   },
//   checkoutText: {
//     ...typography.textStyles.caption,
//     fontWeight: '700',
//     color: colors.error.main,
//   },
//   empty: {
//     padding: spacing.xl,
//     alignItems: 'center',
//   },
//   emptyText: {
//     color: colors.text.tertiary,
//   },
// });

// export default GuardVisitorsScreen;

/**
 * Guard Visitors Log
 * * View 'Inside', 'Waiting', and 'History' logs.
 * * Action: Check-out visitors.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';
import StatusBadge from '../../components/common/StatusBadge';
import { useToast } from '../../hooks/useToast';

// Mock Data
const VISITORS_DATA = [
  { id: '1', name: 'Rohan Das', type: 'Delivery', dest: 'A-101', inTime: '10:30 AM', status: 'inside' },
  { id: '2', name: 'Uber Driver', type: 'Cab', dest: 'B-202', inTime: '11:15 AM', status: 'inside' },
  { id: '3', name: 'Priya Singh', type: 'Guest', dest: 'C-303', inTime: '09:00 AM', status: 'left' },
];

const VisitorLogItem = ({ item, onCheckout }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.type} • {item.dest}</Text>
        <Text style={styles.time}>In: {item.inTime}</Text>
      </View>
      <View style={styles.actions}>
        {item.status === 'inside' ? (
          <TouchableOpacity 
            style={styles.checkoutBtn} 
            onPress={() => onCheckout(item)}
          >
            <Text style={styles.checkoutText}>EXIT</Text>
          </TouchableOpacity>
        ) : (
          <StatusBadge status="rejected" label="LEFT" size="small" />
        )}
      </View>
    </View>
  </View>
);

const GuardVisitorsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('inside'); // inside | history
  const [listData, setListData] = useState(VISITORS_DATA);

  const handleCheckout = (visitor) => {
    Alert.alert(
      'Confirm Exit',
      `Mark ${visitor.name} as exited?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'YES, EXIT', 
          onPress: () => {
            // Update local state for demo
            setListData(prev => prev.map(item => 
              item.id === visitor.id ? { ...item, status: 'left' } : item
            ));
            showSuccess(`${visitor.name} marked as exited`);
          } 
        }
      ]
    );
  };

  const filteredData = activeTab === 'inside' 
    ? listData.filter(v => v.status === 'inside')
    : listData.filter(v => v.status === 'left');

  return (
    <View style={styles.container}>
      <Header title="Visitor Log" showBack />
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'inside' && styles.activeTab]}
          onPress={() => setActiveTab('inside')}
        >
          <Text style={[styles.tabText, activeTab === 'inside' && styles.activeTabText]}>
            Inside ({listData.filter(v => v.status === 'inside').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
        renderItem={({ item }) => (
          <VisitorLogItem item={item} onCheckout={handleCheckout} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No visitors found</Text>
          </View>
        }
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
    backgroundColor: colors.white, // Changed container to white
    padding: spacing.xs,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTab: {
    // ✅ FIX: Use 'primary.background' (Light Blue)
    backgroundColor: colors.primary.main,
  },
  tabText: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeTabText: {
    // ✅ FIX: Use 'primary.main' (Dark Blue)
    color: colors.primary.background,
    fontWeight: '700',
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white, // Changed to white for better contrast
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
  },
  details: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  time: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  actions: {
    marginLeft: spacing.md,
  },
  checkoutBtn: {
    backgroundColor: colors.error.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error.light,
  },
  checkoutText: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.error.main,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.tertiary,
  },
});

export default GuardVisitorsScreen;