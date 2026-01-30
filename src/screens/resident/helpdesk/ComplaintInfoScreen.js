import React from 'react';
import { View, Text } from 'react-native';
import { Header, Card, StatusBadge } from '../../../components/common';
import { colors, spacing, typography } from '../../../theme';
import { complaints } from '../../../mock/complaints';

const ComplaintInfoScreen = ({ route }) => {
  const { id } = route.params;
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      <Header title="Complaint Details" />
      <View style={{ padding: spacing.base }}>
        <Card>
          <Text style={typography.textStyles.h3}>{complaint.title}</Text>
          <StatusBadge status={complaint.status} />
          <Text style={{ marginTop: spacing.sm }}>
            {complaint.description}
          </Text>
        </Card>
      </View>
    </View>
  );
};

export default ComplaintInfoScreen;
