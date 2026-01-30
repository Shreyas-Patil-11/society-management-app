/**
 * My Posts Screen
 * * View/Delete own posts.
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const MY_POSTS = [
  { id: '1', title: 'Selling Sofa', date: '2 days ago', likes: 5, comments: 2 },
  { id: '2', title: 'Car Pooling', date: '1 week ago', likes: 12, comments: 4 },
];

const MyPostsScreen = ({ navigation }) => {
  const handleDelete = () => {
    Alert.alert('Delete Post', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="My Posts" showBack />
      
      <FlatList
        data={MY_POSTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>Posted {item.date}</Text>
              <Text style={styles.stats}>{item.likes} Likes • {item.comments} Comments</Text>
            </View>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
              <Icon name="delete" size={24} color={colors.text.tertiary} />
            </TouchableOpacity>
          </View>
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
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    color: colors.text.primary,
  },
  date: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  stats: {
    ...typography.textStyles.caption,
    color: colors.primary.main,
    marginTop: 4,
    fontWeight: '500',
  },
  deleteBtn: {
    padding: spacing.sm,
  },
});

export default MyPostsScreen;