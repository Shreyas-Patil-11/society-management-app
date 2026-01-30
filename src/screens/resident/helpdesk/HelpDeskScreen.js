// import React from 'react';
// import { View, FlatList } from 'react-native';
// import { Header, Card, Button, StatusBadge } from '../../../components/common';
// import { colors, spacing } from '../../../theme';
// import { COMPLAINT_STATUS } from '../../../utils/constants';
// import { complaints } from '../../../mock/complaints';

// const HelpDeskScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
//       <Header title="Help Desk" />

//       <FlatList
//         contentContainerStyle={{ padding: spacing.base }}
//         data={complaints}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Card onPress={() => navigation.navigate('ComplaintInfo', { id: item.id })}>
//             <Card.Row>
//               <Card.Title>{item.title}</Card.Title>
//               <StatusBadge status={item.status} />
//             </Card.Row>
//             <Card.Subtitle>{item.category}</Card.Subtitle>
//           </Card>
//         )}
//         ListFooterComponent={
//           <Button
//             title="Raise Complaint"
//             onPress={() => navigation.navigate('RaiseComplaint')}
//             style={{ marginTop: spacing.lg }}
//           />
//         }
//       />
//     </View>
//   );
// };

// export default HelpDeskScreen;


/**
 * Helpdesk Screen
 * * View and manage support tickets.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import StatusBadge from '../../../components/common/StatusBadge';
import FloatingActionButton from '../../../components/common/FloatingActionButton';
import { borderRadius } from '../../../theme/borderRadius';

// Mock Data
const TICKETS = [
  { id: '1', title: 'Leaking Tap in Kitchen', category: 'Plumbing', date: 'Oct 24', status: 'pending', id_disp: '#1023' },
  { id: '2', title: 'Lift A not working', category: 'Electrical', date: 'Oct 22', status: 'resolved', id_disp: '#1019' },
  { id: '3', title: 'Garbage not collected', category: 'Housekeeping', date: 'Oct 20', status: 'rejected', id_disp: '#1012' },
];

const TicketItem = ({ ticket, onPress }) => (
  <TouchableOpacity style={styles.ticketItem} onPress={onPress}>
    <View style={styles.ticketHeader}>
      <Text style={styles.ticketId}>{ticket.id_disp}</Text>
      <StatusBadge status={ticket.status} size="small" />
    </View>
    <Text style={styles.ticketTitle}>{ticket.title}</Text>
    <View style={styles.ticketFooter}>
      <View style={styles.categoryBadge}>
        <Icon name="tag" size={14} color={colors.text.secondary} />
        <Text style={styles.categoryText}>{ticket.category}</Text>
      </View>
      <Text style={styles.dateText}>{ticket.date}</Text>
    </View>
  </TouchableOpacity>
);

const HelpDeskScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('active'); // active | history

  return (
    <View style={styles.container}>
      <Header title="Helpdesk" showBack />
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]} 
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]} 
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={TICKETS} // In real app, filter based on activeTab
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 80 }]}
        renderItem={({ item }) => (
          <TicketItem 
            ticket={item} 
            onPress={() => navigation.navigate('ComplaintInfo', { ticketId: item.id })} 
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="done-all" size={64} color={colors.border.main} />
            <Text style={styles.emptyText}>No complaints found</Text>
          </View>
        }
      />

      <FloatingActionButton
        icon="add" 
        onPress={() => navigation.navigate('RaiseComplaint')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    paddingVertical: spacing.md,
    marginRight: spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary.main,
  },
  tabText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.primary.main,
  },
  list: {
    padding: spacing.md,
  },
  ticketItem: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  ticketId: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  ticketTitle: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  categoryText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  dateText: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.text.tertiary,
  },
});

export default HelpDeskScreen;