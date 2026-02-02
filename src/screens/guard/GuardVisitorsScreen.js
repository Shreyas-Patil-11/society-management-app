

/**
 * Guard Visitors Screen
 * src/screens/guard/GuardVisitorsScreen.js
 */
/**
 * Guard Visitors Screen
 * src/screens/guard/GuardVisitorsScreen.js
 */

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   RefreshControl,
//   ActivityIndicator
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native'; // Auto-refresh when coming back

// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import { borderRadius } from '../../theme/borderRadius';
// import Header from '../../components/common/Header';
// import StatusBadge from '../../components/common/StatusBadge';
// import { useToast } from '../../hooks/useToast';

// // Service
// import { visitorService } from '../../services/visitorService';

// // --- DATA MAPPER: Backend -> UI ---
// const mapBackendToUI = (visitor) => {
//   // Backend returns: { id, visitor_name, entry_time, exit_time, Flat: { flat_number, floor_number, block_id } }
  
//   // Format Time (e.g., "10:30 AM")
//   const date = new Date(visitor.entry_time);
//   const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
//   // Format Destination
//   let dest = 'Unknown';
//   if (visitor.Flat) {
//     // Assuming Flat has structure or just flat_number
//     dest = visitor.Flat.flat_number ? `Flat ${visitor.Flat.flat_number}` : `Flat ID: ${visitor.flat_id}`;
//   }

//   return {
//     id: visitor.id,
//     name: visitor.visitor_name || 'Unknown',
//     type: 'Visitor', // Backend model doesn't store type yet, defaulting to Visitor
//     dest: dest,
//     inTime: timeString,
//     status: visitor.exit_time ? 'left' : 'inside', // Logic: If exit_time exists, they left
//     rawDate: date, // For sorting
//   };
// };

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
//   const { showSuccess, showError } = useToast();
  
//   const [activeTab, setActiveTab] = useState('inside'); // inside | history
//   const [listData, setListData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch Data Function
//   const fetchVisitors = async () => {
//     try {
//       const result = await visitorService.getSocietyVisitors();
//       if (result.success) {
//         const mappedData = result.data.map(mapBackendToUI);
//         // Sort by Newest First
//         mappedData.sort((a, b) => b.rawDate - a.rawDate);
//         setListData(mappedData);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Initial Load + Focus Refresh
//   useFocusEffect(
//     useCallback(() => {
//       fetchVisitors();
//     }, [])
//   );

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchVisitors();
//   };

//   const handleCheckout = (visitor) => {
//     Alert.alert(
//       'Confirm Exit',
//       `Mark ${visitor.name} as exited?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'YES, EXIT', 
//           onPress: async () => {
//             // Optimistic Update (Update UI immediately)
//             setListData(prev => prev.map(item => 
//               item.id === visitor.id ? { ...item, status: 'left' } : item
//             ));
            
//             // Call Backend
//             const result = await visitorService.markVisitorExit(visitor.id);
//             if (result.success) {
//               showSuccess(`${visitor.name} marked as exited`);
//               fetchVisitors(); // Refresh to be sure
//             } else {
//               showError('Failed to mark exit');
//               fetchVisitors(); // Revert if failed
//             }
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
//       <Header title="Visitor Log" showBack={false} />
      
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

//       {isLoading ? (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color={colors.primary.main} />
//         </View>
//       ) : (
//         <FlatList
//           data={filteredData}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//           renderItem={({ item }) => (
//             <VisitorLogItem item={item} onCheckout={handleCheckout} />
//           )}
//           ListEmptyComponent={
//             <View style={styles.empty}>
//               <Text style={styles.emptyText}>No visitors found</Text>
//             </View>
//           }
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.background.secondary },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   tabs: {
//     flexDirection: 'row',
//     backgroundColor: colors.white,
//     padding: spacing.xs,
//     margin: spacing.md,
//     borderRadius: borderRadius.lg,
//     borderWidth: 1,
//     borderColor: colors.border.light,
//   },
//   tab: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: borderRadius.md },
//   activeTab: { backgroundColor: colors.primary.main },
//   tabText: { ...typography.textStyles.bodyMedium, fontWeight: '600', color: colors.text.secondary },
//   activeTabText: { color: colors.primary.background, fontWeight: '700' },
//   list: { padding: spacing.md },
//   card: {
//     backgroundColor: colors.white,
//     padding: spacing.md,
//     borderRadius: borderRadius.lg,
//     marginBottom: spacing.md,
//     borderWidth: 1,
//     borderColor: colors.border.light,
//     elevation: 1,
//   },
//   row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   info: { flex: 1 },
//   name: { ...typography.textStyles.bodyLarge, fontWeight: '700', color: colors.text.primary },
//   details: { ...typography.textStyles.bodyMedium, color: colors.text.secondary },
//   time: { ...typography.textStyles.caption, color: colors.text.tertiary, marginTop: 4 },
//   actions: { marginLeft: spacing.md },
//   checkoutBtn: {
//     backgroundColor: colors.error.background,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.xs,
//     borderRadius: borderRadius.md,
//     borderWidth: 1,
//     borderColor: colors.error.light,
//   },
//   checkoutText: { ...typography.textStyles.caption, fontWeight: '700', color: colors.error.main },
//   empty: { padding: spacing.xl, alignItems: 'center' },
//   emptyText: { color: colors.text.tertiary },
// });

// export default GuardVisitorsScreen;

/**
 * Guard Visitors Screen
 * src/screens/guard/GuardVisitorsScreen.js
 * Added: Search and Filter Functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Header from '../../components/common/Header';
import StatusBadge from '../../components/common/StatusBadge';
import { useToast } from '../../hooks/useToast';

// Service
import { visitorService } from '../../services/visitorService';

// --- DATA MAPPER: Backend -> UI ---
const mapBackendToUI = (visitor) => {
  const date = new Date(visitor.entry_time);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  let dest = 'Unknown';
  if (visitor.Flat) {
    const flatNo = visitor.Flat.flat_number;
    if (visitor.Flat.Block && visitor.Flat.Block.name) {
      dest = `${visitor.Flat.Block.name}-${flatNo}`;
    } else {
      dest = `Flat ${flatNo}`;
    }
  }

  return {
    id: visitor.id,
    name: visitor.visitor_name || 'Unknown',
    type: 'Visitor',
    dest: dest,
    inTime: timeString,
    status: visitor.exit_time ? 'left' : 'inside',
    rawDate: date,
  };
};

const VisitorLogItem = ({ item, onCheckout }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.type} • {item.dest}</Text>
        <Text style={styles.time}>In: {item.inTime} • {item.rawDate.toLocaleDateString()}</Text>
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
          <StatusBadge status="left" label="LEFT" size="small" />
        )}
      </View>
    </View>
  </View>
);

const GuardVisitorsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  
  const [activeTab, setActiveTab] = useState('inside'); // inside | history
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('all'); // all, today, yesterday, week

  // Fetch Data Function
  const fetchVisitors = async () => {
    try {
      const result = await visitorService.getSocietyVisitors();
      if (result.success) {
        const mappedData = result.data.map(mapBackendToUI);
        mappedData.sort((a, b) => b.rawDate - a.rawDate);
        setListData(mappedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchVisitors();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchVisitors();
  };

  const handleCheckout = (visitor) => {
    Alert.alert(
      'Confirm Exit',
      `Mark ${visitor.name} as exited?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'YES, EXIT', 
          onPress: async () => {
            setListData(prev => prev.map(item => 
              item.id === visitor.id ? { ...item, status: 'left' } : item
            ));
            
            const result = await visitorService.markVisitorExit(visitor.id);
            if (result.success) {
              showSuccess(`${visitor.name} marked as exited`);
              fetchVisitors();
            } else {
              showError('Failed to mark exit');
              fetchVisitors();
            }
          } 
        }
      ]
    );
  };

  // --- FILTERING LOGIC ---
  const getFilteredData = () => {
    let data = listData;

    // 1. Tab Filter
    data = activeTab === 'inside' 
      ? data.filter(v => v.status === 'inside')
      : data.filter(v => v.status === 'left');

    // 2. Search Filter (Name or Flat)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(v => 
        v.name.toLowerCase().includes(query) || 
        v.dest.toLowerCase().includes(query)
      );
    }

    // 3. Date Filter
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    if (dateFilter === 'today') {
      data = data.filter(v => v.rawDate >= today);
    } else if (dateFilter === 'yesterday') {
      data = data.filter(v => v.rawDate >= yesterday && v.rawDate < today);
    } else if (dateFilter === 'week') {
      data = data.filter(v => v.rawDate >= lastWeek);
    }

    return data;
  };

  const filteredData = getFilteredData();

  return (
    <View style={styles.container}>
      <Header title="Visitor Log" showBack={false} />
      
      {/* Search & Filter Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Icon name="search" size={20} color={colors.text.tertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search name or flat..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.filterBtn, dateFilter !== 'all' && styles.filterBtnActive]} 
          onPress={() => setShowFilterModal(true)}
        >
          <Icon 
            name="filter-list" 
            size={24} 
            color={dateFilter !== 'all' ? colors.primary.main : colors.text.secondary} 
          />
        </TouchableOpacity>
      </View>

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

      {/* List */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <VisitorLogItem item={item} onCheckout={handleCheckout} />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No visitors found</Text>
            </View>
          }
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Date</Text>
            
            <TouchableOpacity 
              style={[styles.filterOption, dateFilter === 'all' && styles.filterOptionActive]}
              onPress={() => { setDateFilter('all'); setShowFilterModal(false); }}
            >
              <Text style={[styles.filterText, dateFilter === 'all' && styles.filterTextActive]}>All Time</Text>
              {dateFilter === 'all' && <Icon name="check" size={20} color={colors.primary.main} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterOption, dateFilter === 'today' && styles.filterOptionActive]}
              onPress={() => { setDateFilter('today'); setShowFilterModal(false); }}
            >
              <Text style={[styles.filterText, dateFilter === 'today' && styles.filterTextActive]}>Today</Text>
              {dateFilter === 'today' && <Icon name="check" size={20} color={colors.primary.main} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterOption, dateFilter === 'yesterday' && styles.filterOptionActive]}
              onPress={() => { setDateFilter('yesterday'); setShowFilterModal(false); }}
            >
              <Text style={[styles.filterText, dateFilter === 'yesterday' && styles.filterTextActive]}>Yesterday</Text>
              {dateFilter === 'yesterday' && <Icon name="check" size={20} color={colors.primary.main} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterOption, dateFilter === 'week' && styles.filterOptionActive]}
              onPress={() => { setDateFilter('week'); setShowFilterModal(false); }}
            >
              <Text style={[styles.filterText, dateFilter === 'week' && styles.filterTextActive]}>Last 7 Days</Text>
              {dateFilter === 'week' && <Icon name="check" size={20} color={colors.primary.main} />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  // Search & Filter Styles
  searchContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: colors.text.primary,
    fontSize: 14,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterBtnActive: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.light + '20',
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  tab: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: borderRadius.md },
  activeTab: { backgroundColor: colors.primary.main },
  tabText: { ...typography.textStyles.bodyMedium, fontWeight: '600', color: colors.text.secondary },
  activeTabText: { color: colors.primary.background, fontWeight: '700' },
  
  // List
  list: { padding: spacing.md, paddingTop: 0 },
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    elevation: 1,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { flex: 1 },
  name: { ...typography.textStyles.bodyLarge, fontWeight: '700', color: colors.text.primary },
  details: { ...typography.textStyles.bodyMedium, color: colors.text.secondary },
  time: { ...typography.textStyles.caption, color: colors.text.tertiary, marginTop: 4 },
  actions: { marginLeft: spacing.md },
  checkoutBtn: {
    backgroundColor: colors.error.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error.light,
  },
  checkoutText: { ...typography.textStyles.caption, fontWeight: '700', color: colors.error.main },
  empty: { padding: spacing.xl, alignItems: 'center' },
  emptyText: { color: colors.text.tertiary },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    elevation: 5,
  },
  modalTitle: {
    ...typography.textStyles.h4,
    marginBottom: spacing.md,
    color: colors.text.primary,
    textAlign: 'center',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  filterOptionActive: {
    backgroundColor: colors.primary.light + '10',
  },
  filterText: {
    ...typography.textStyles.bodyLarge,
    color: colors.text.secondary,
  },
  filterTextActive: {
    color: colors.primary.main,
    fontWeight: '700',
  },
});

export default GuardVisitorsScreen;