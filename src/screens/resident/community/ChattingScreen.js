/**
 * Chatting Screen
 * * Single chat view.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';

const INITIAL_MSGS = [
  { id: '1', text: 'Hi, is the parcel there?', sender: 'me', time: '10:00 AM' },
  { id: '2', text: 'Yes, sir. Just arrived.', sender: 'them', time: '10:05 AM' },
  { id: '3', text: 'Great, coming down.', sender: 'me', time: '10:06 AM' },
];

const ChattingScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { name } = route.params;
  const [messages, setMessages] = useState(INITIAL_MSGS);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      text: text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setText('');
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.msgContainer, isMe ? styles.myMsg : styles.theirMsg]}>
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.msgText, isMe ? styles.myText : styles.theirText]}>{item.text}</Text>
          <Text style={[styles.timeText, isMe ? styles.myTime : styles.theirTime]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={name} showBack />
      
      <FlatList
        data={[...messages].reverse()} // Reverse for chat view
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: spacing.lg }]}
        inverted // Messages start from bottom
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={text}
            onChangeText={setText}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Icon name="send" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  msgContainer: {
    marginBottom: spacing.sm,
    width: '100%',
    flexDirection: 'row',
  },
  myMsg: {
    justifyContent: 'flex-end',
  },
  theirMsg: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: colors.primary.main,
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 2,
  },
  msgText: {
    ...typography.textStyles.bodyMedium,
  },
  myText: {
    color: colors.white,
  },
  theirText: {
    color: colors.text.primary,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  theirTime: {
    color: colors.text.tertiary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    marginRight: spacing.md,
    color: colors.text.primary,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChattingScreen;