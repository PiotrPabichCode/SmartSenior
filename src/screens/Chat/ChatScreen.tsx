import React, { useCallback, useState, useLayoutEffect } from 'react';
import { auth, db } from 'firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat';
import ChatList from './ChatList';
import { useAppSelector } from '@src/redux/store';
import { getAuth } from 'firebase/auth';
import { Chats } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';

const ChatScreen = () => {
  const chats: Chats = useAppSelector(state => state.chats.chats);
  const currentChat = chats.length > 0 ? chats.find(chat => chat.active) : null;
  const [messages, setMessages] = useState<IMessage[]>([]);

  if (!currentChat) {
    goBack();
    return null;
  }

  useLayoutEffect(() => {
    setMessages(
      currentChat.messages.map(message => ({
        _id: message._id,
        createdAt: message.createdAt.toDate(),
        text: message.text,
        user: message.user,
      })) as IMessage[],
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    const toUserID = currentChat.userID;
    const fromUserID = getAuth().currentUser?.uid;
    const read = false;

    addDoc(collection(db, 'chats'), { _id, createdAt, text, user, toUserID, fromUserID, read });
  }, []);

  return (
    <>
      <ChatList />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages as never)}
        user={{
          _id: auth?.currentUser?.email!,
          name: auth?.currentUser?.displayName!,
          avatar: auth?.currentUser?.photoURL!,
        }}
      />
    </>
  );
};

export default ChatScreen;
