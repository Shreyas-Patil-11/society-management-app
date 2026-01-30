/**
 * Community Polls
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const POLLS = [
  {
    id: '1',
    question: 'Should we upgrade the gym equipment?',
    votes: 45,
    options: [
      { id: 'opt1', text: 'Yes, urgently', percentage: 60 },
      { id: 'opt2', text: 'No, it works fine', percentage: 30 },
      { id: 'opt3', text: 'Maybe later', percentage: 10 },
    ],
    voted: false,
  },
  {
    id: '2',
    question: 'Preferred date for Diwali Party?',
    votes: 82,
    options: [
      { id: 'optA', text: 'Saturday, 11th', percentage: 70 },
      { id: 'optB', text: 'Sunday, 12th', percentage: 30 },
    ],
    voted: true,
  }
];

const PollCard = ({ item }) => {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.votes}>{item.votes} Votes</Text>
      
      <View style={styles.options}>
        {item.options.map((opt) => {
          const isSelected = selected === opt.id;
          // Show results if voted (from prop) or just selected locally
          const showResults = item.voted || selected;

          return (
            <TouchableOpacity 
              key={opt.id} 
              style={[styles.optionRow, isSelected && styles.optionSelected]}
              onPress={() => !item.voted && setSelected(opt.id)}
              disabled={!!showResults}
            >
              <View style={styles.textRow}>
                <Text style={[styles.optText, isSelected && styles.optTextSelected]}>{opt.text}</Text>
                {showResults && <Text style={styles.percent}>{opt.percentage}%</Text>}
              </View>
              
              {showResults && (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${opt.percentage}%` }]} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {item.voted && <Text style={styles.votedLabel}>You voted</Text>}
    </View>
  );
};

const PollsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Polls" showBack />
      
      <FlatList
        data={POLLS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <PollCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    elevation: 1,
  },
  question: {
    ...typography.textStyles.h4,
    color: colors.text.primary,
    marginBottom: 4,
  },
  votes: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  options: {
    gap: spacing.sm,
  },
  optionRow: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: colors.primary.background,
    borderColor: colors.primary.main,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  optText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
  },
  optTextSelected: {
    fontWeight: '600',
    color: colors.primary.dark,
  },
  percent: {
    ...typography.textStyles.caption,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 3,
  },
  votedLabel: {
    textAlign: 'right',
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.success.main,
    fontWeight: '600',
  },
});

export default PollsScreen;