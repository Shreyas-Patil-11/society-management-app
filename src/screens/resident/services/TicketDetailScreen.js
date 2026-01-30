/**
 * Ticket Detail View
 * * Track status and conversation.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import StatusBadge from '../../../components/common/StatusBadge';

const TicketDetailScreen = ({ navigation, route }) => {
  const { ticket } = route.params || { ticket: { id: '#8823', title: 'Leaking Tap', status: 'Open', date: 'Today' } };

  return (
    <View style={styles.container}>
      <Header title={`Ticket ${ticket.id}`} showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{ticket.title}</Text>
            <StatusBadge status={ticket.status === 'Open' ? 'warning' : 'success'} label={ticket.status} />
          </View>
          <Text style={styles.date}>Raised on: {ticket.date}</Text>
          <View style={styles.divider} />
          <Text style={styles.desc}>
            The kitchen tap is leaking continuously. Water wastage is high. Please check.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Timeline</Text>
        
        <View style={styles.timelineItem}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Ticket Raised</Text>
            <Text style={styles.timelineTime}>Today, 10:00 AM</Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Assigned to Plumber</Text>
            <Text style={styles.timelineTime}>Pending</Text>
          </View>
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
  content: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    flex: 1,
  },
  date: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginBottom: spacing.md,
  },
  desc: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  sectionTitle: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingBottom: spacing.xl,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.main,
    marginTop: 4,
    zIndex: 1,
  },
  dotInactive: {
    backgroundColor: colors.border.main,
  },
  line: {
    position: 'absolute',
    left: 5,
    top: 16,
    bottom: 0,
    width: 2,
    backgroundColor: colors.border.light,
  },
  timelineContent: {
    marginLeft: spacing.lg,
  },
  timelineTitle: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
  },
  timelineTime: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
  },
});

export default TicketDetailScreen;