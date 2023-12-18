import React, { useCallback, useState, useLayoutEffect } from 'react';
import { db } from 'firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import ChatList from './ChatList';
import { View } from 'react-native';
import useThemeColors from '@src/config/useThemeColors';
import 'dayjs/locale/pl';
import { t } from '@src/localization/Localization';

// New functional component for fetching and displaying messages
const MessageDisplay = ({ activeChat }: { activeChat: any }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    console.log(activeChat);
    const q = query(
      collection(db, 'chats', activeChat.key, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(25),
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })) as IMessage[],
      );
    });

    return () => unsubscribe();
  }, [activeChat]);

  const onSend = useCallback(
    (messages = []) => {
      if (!activeChat) {
        return;
      }
      const { _id, createdAt, text, user } = messages[0];

      const chatMessage = {
        _id: _id,
        createdAt: createdAt,
        text: text,
        user: user,
        read: false,
      };

      addDoc(collection(db, 'chats', activeChat.key, 'messages'), chatMessage);
    },
    [activeChat],
  );

  const user = useAppSelector(state => selectUser(state));
  const backgroundColor = useThemeColors().cardBackground;

  return (
    <View style={{ flexGrow: 1, backgroundColor }}>
      <ChatList />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        locale={'pl'}
        dateFormat="DD-MM-YYYY"
        timeFormat="HH:mm"
        placeholder={t('chat.placeholder')}
        onSend={messages => onSend(messages as never)}
        user={{
          _id: user?.email!,
          name: user?.firstName!,
        }}
      />
    </View>
  );
};

export default MessageDisplay;
