import React, { useCallback, useState, useLayoutEffect } from 'react';
import { auth, db } from 'firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat';
import ChatList from './ChatList';
import { getAuth } from 'firebase/auth';
import { ChatMessage, Chats } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';

const ChatScreen = () => {
  const chats: Chats = useAppSelector(state => state.chats.chats);
  const currentChat = chats.length > 0 ? chats.find(chat => chat.active) : null;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [docRef, setDocRef] = useState('');

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

  const onSend = useCallback((_messages = []) => {
    const { _id, createdAt, text, user } = _messages[0];
    const fromUserID = getAuth().currentUser?.uid!;
    const toUserID = currentChat.users.find(user => user.uid !== fromUserID)?.uid!;

    const chatMessage: ChatMessage = {
      _id: _id,
      createdAt: createdAt,
      text: text,
      user: user,
      toUserID: toUserID,
      fromUserID: fromUserID,
      read: false,
    };
    const _doc = doc(db, 'chats', currentChat.key);
    updateDoc(_doc, {
      messages: arrayUnion(chatMessage),
    });

    messages.push(_messages[0]);
    setMessages(messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  return (
    <>
      <ChatList />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
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
