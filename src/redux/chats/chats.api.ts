import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { User, Chat, Chats } from '@src/models';
import { createUsername } from '@src/utils/utils';
import { store } from '../common';
import { selectUserID } from '../auth/auth.slice';

const createChatUsers = (userIds: Array<string>) => {
  return userIds.map(id => {
    return {
      uid: id,
      username: createUsername(id),
    };
  });
};

export const loadChats = async () => {
  try {
    const userID = selectUserID(store.getState())!;
    const q = query(collection(db, 'chats'), where('users', 'array-contains-any', [userID]));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error('No existing chats');
    }
    const chats: Chats = snapshot.docs.map(doc => {
      const chat = doc.data();
      return {
        ...chat,
        users: createChatUsers(chat.users),
      } as Chat;
    });

    chats[0].active = true;

    let unseenMessages = 0;
    chats.forEach(chat => {
      unseenMessages += 0;
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
    const uid = selectUserID(store.getState());
    if (!uid) {
      throw new Error('User uid is not defined');
    }
    const _collection = collection(db, 'chats');

    const chat = {
      key: '',
      users: [user.uid, uid],
      active: false,
    };
    const response = await addDoc(_collection, chat);
    await updateDoc(doc(db, response.path), {
      key: response.id,
    });

    return {
      ...chat,
      users: [
        { uid: user.uid, username: createUsername(user.uid) },
        { uid: uid, username: createUsername(uid) },
      ],
      key: response.id,
    } as Chat;
  } catch (error) {
    throw error;
  }
};
