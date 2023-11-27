import { useCallback, useState, useLayoutEffect } from 'react';
import { db } from 'firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat';
import ChatList from './ChatList';
import { useAppSelector } from '@src/redux/types';
import { selectActiveChat } from '@src/redux/chats/chats.slice';
import { selectUser } from '@src/redux/auth/auth.slice';
import EmptyChat from './EmptyChat';

const ChatScreen = () => {
  const activeChat = useAppSelector(state => selectActiveChat(state));
  const user = useAppSelector(state => selectUser(state));
  const [messages, setMessages] = useState<IMessage[]>([]);

  if (!activeChat) {
    return <EmptyChat />;
  }

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

  return (
    <>
      <ChatList />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages as never)}
        user={{
          _id: user?.email!,
          name: user?.firstName!,
        }}
      />
    </>
  );
};

export default ChatScreen;
