import {
  addDoc,
  collection,
  doc,
  getDocs,
  or,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { User, Chat, Chats, ChatMessages, ChatMessage, ChatUsers } from '@src/models';
import { createUsername } from '@src/utils/utils';
import { getConnectedUsersIds, getUserID } from '../selectors';
import store from '../store';

const filterUnreadMessages = (chat: Chat) => {
  return chat.messages.filter(message => !message.read).length;
};

export const loadChats = async () => {
  try {
    const connectedUsersIds = getConnectedUsersIds(store.getState())!;
    const chatUsers: ChatUsers = connectedUsersIds.map(id => {
      const username = createUsername(id);
      return {
        uid: id,
        username: username,
      };
    });
    console.log('CHAT', chatUsers);
    const q = query(collection(db, 'chats'), where('users', 'array-contains-any', chatUsers));
    const snapshot = await getDocs(q);
    console.log(snapshot.docs);
    if (snapshot.empty) {
      return {
        chats: [],
        unseenMessages: 0,
      };
    }
    const chats: Chats = [];
    snapshot.docs.forEach(doc => chats.push(doc.data() as Chat));

    if (chats.length === 0) {
      return {
        chats: [],
        unseenMessages: 0,
      };
    }

    chats[0].active = true;

    let unseenMessages = 0;
    chats.forEach(chat => {
      unseenMessages += filterUnreadMessages(chat);
    });

    return {
      chats: chats,
      unseenMessages: unseenMessages,
    };
  } catch (error) {
    throw error;
  }
};

export const addChat = async (user: User) => {
  try {
    const uid = getUserID(store.getState())!;
    const chatUsers: ChatUsers = [
      { uid: user.uid, username: createUsername(user.uid) },
      { uid: uid, username: createUsername(uid) },
    ];
    const _collection = collection(db, 'chats');
    const emptyChat: Chat = {
      key: '',
      users: chatUsers,
      messages: [],
      active: false,
    };
    const response = await addDoc(_collection, emptyChat);
    await updateDoc(doc(db, response.path), {
      key: response.id,
    });

    return {
      ...emptyChat,
      key: response.id,
    };
  } catch (error) {
    throw error;
  }
};
