// import React from 'react';
// import { View, FlatList, Text } from 'react-native';
// import { Header, Card } from '../../../components/common';
// import { colors, spacing, typography } from '../../../theme';
// import { notices } from '../../../mock/notices';

// const NoticeBoardScreen = () => {
//   return (
//     <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
//       <Header title="Notice Board" />

//       <FlatList
//         contentContainerStyle={{ padding: spacing.base }}
//         data={notices}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Card>
//             <Text style={typography.textStyles.h4}>{item.title}</Text>
//             <Text style={{ marginTop: spacing.xs }}>
//               {item.description}
//             </Text>
//           </Card>
//         )}
//       />
//     </View>
//   );
// };

// export default NoticeBoardScreen;


/**
 * Notice Board Screen
 * * List of official notices
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const NOTICES = [
  { id: '1', title: 'AGM Meeting', date: '25 Oct', content: 'Annual General Meeting is scheduled for Sunday.', type: 'urgent' },
  { id: '2', title: 'Swimming Pool Maintenance', date: '22 Oct', content: 'Pool will be closed for cleaning.', type: 'info' },
];

const NoticeBoardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Notice Board" showBack />
      
      <FlatList
        data={NOTICES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconBox}>
              <Icon name="campaign" size={24} color={colors.white} />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.content}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  body: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    alignSelf: 'flex-end',
  },
});

export default NoticeBoardScreen;