import { addDoc, collection, getDocs, or, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { User, Chat, Chats, ChatMessages, ChatMessage, ConnectedUser } from '@src/models';
import { useAppSelector } from '../store';

const createUsername = (userID: string) => {
  const connectedUsers = useAppSelector(state => state.auth.connectedUsers);
  const user = connectedUsers.find(user => user.user.uid === userID)?.user!;
  return user.firstName ? user.firstName : 'user';
};

export const loadChats = async () => {
  try {
    const connectedUsersIds = useAppSelector(state => state.auth.user?.connectedUsersIds);
    const q = query(
      collection(db, 'chats'),
      or(where('fromUserID', 'in', connectedUsersIds), where('toUserID', 'in', connectedUsersIds)),
      orderBy('createdAt', 'desc'),
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }
    const messages = snapshot.docs.map(doc => doc.data());

    // Create an object to store messages based on user
    const userMessages: { [userId: string]: ChatMessages } = {};

    // Group messages based on user
    messages.forEach(message => {
      const userID = message.toUserID;
      if (!userMessages[userID]) {
        userMessages[userID] = [];
      }
      userMessages[userID].push(message as ChatMessage);
    });

    const chats: Chats = Object.keys(userMessages).map(userID => ({
      userID: userID,
      username: createUsername(userID),
      messages: userMessages[userID],
      active: false,
    }));

    if (chats.length > 0) {
      chats[0].active = true;
    }

    return {
      chats: chats,
      unseenMessages: messages.filter(message => !message.received).length,
    };
  } catch (error) {
    throw error;
  }
};

export const addChat = async (user: User) => {
  try {
    const _collection = collection(db, 'chats', user.uid);
    const emptyChat: Chat = {
      userID: user.uid,
      username: createUsername(user.uid),
      messages: [],
      active: false,
    };
    await addDoc(_collection, emptyChat);

    return emptyChat;
  } catch (error) {
    throw error;
  }
};
