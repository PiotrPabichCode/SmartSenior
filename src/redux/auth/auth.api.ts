import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from 'firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  User,
  ConnectedUser,
  ConnectedUsers,
  AuthCredentials,
  Genders,
  Roles,
  Users,
} from '@src/models';
import { User as FirebaseUser } from 'firebase/auth';
import { fetchEventsByID } from '../events/events.api';
import { getConnectedUsersIds, getEmail, getUserID } from '../selectors';
import store from '../store';

const getUserTemplate = (uid: string, email: string | null): User => {
  const emptyUser: User = {
    uid: uid,
    email: email,
    birthDate: null,
    firstName: null,
    lastName: null,
    gender: Genders.MALE,
    role: Roles.SENIOR,
    connectedUsersIds: [],
  };
  return emptyUser;
};

export const signIn = async (authData: AuthCredentials): Promise<User> => {
  try {
    const response = await signInWithEmailAndPassword(auth, authData.email, authData.password);
    const user: FirebaseUser = response.user;
    if (!user) {
      throw new Error('User not found');
    }
    return await loadUserDoc(user);
  } catch (error) {
    throw error;
  }
};

export const signUp = async (authData: AuthCredentials): Promise<User> => {
  try {
    const response = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
    const user = response.user;
    if (!user) {
      throw new Error('Unable to create new account');
    }
    const emptyUser = getUserTemplate(user.uid, user.email);
    const userDoc = doc(db, 'users', user.uid);
    await setDoc(userDoc, {
      ...emptyUser,
      deleted: false,
    });
    return emptyUser;
  } catch (error) {
    throw error;
  }
};

export const loadUserDoc = async (user: FirebaseUser): Promise<User> => {
  try {
    const userDoc = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userDoc);
    if (!snapshot.exists()) {
      const emptyUser = getUserTemplate(user.uid, user.email);
      await setDoc(userDoc, {
        ...emptyUser,
        deleted: false,
      });
      return emptyUser;
    }
    const _user = snapshot.data();
    delete _user.deleted;
    return _user as User;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (
  uid: string,
  values: Partial<User>,
): Promise<Partial<User>> => {
  try {
    const userDoc = doc(db, 'users', uid);
    await updateDoc(userDoc, values);
    return values;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const validateUserData = (user: User | null) => {
  if (!user) {
    return false;
  }
  return Object.values(user).findIndex(val => !val) === -1;
};

const findUserByEmail = async (email: string): Promise<User> => {
  try {
    const userCollection = collection(db, 'users');
    const _query = query(userCollection, where('email', '==', email), limit(1));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('User not found');
    }

    const doc = snapshot.docs[0];
    return doc.data() as User;
  } catch (error) {
    throw error;
  }
};

const loadUserByEmail = async (email: string): Promise<User> => {
  try {
    const _collection = collection(db, 'users');
    const _query = query(
      _collection,
      where('deleted', '==', false),
      where('email', '==', email),
      limit(1),
    );
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('User does not exists');
    }
    const data = snapshot.docs[0].data();
    delete data.deleted;
    return data as User;
  } catch (error) {
    throw error;
  }
};

export const loadConnectedUsers = async (uid: string) => {
  try {
    const connectedUsersIds = getConnectedUsersIds(store.getState());
    const _collection = collection(db, `users`);

    const _query = query(
      _collection,
      where('deleted', `==`, false),
      where('uid', 'in', connectedUsersIds),
    );
    const snapshot = await getDocs(_query);
    const users: Users = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      delete data.deleted;
      users.push(data as User);
    });

    const connectedUsers: ConnectedUsers = await Promise.all(
      users.map(async user => {
        try {
          const events = await fetchEventsByID(user.uid);
          return {
            user: user,
            events: events,
            deleted: false,
          };
        } catch (error) {
          return {
            user: user,
            events: [],
            deleted: false,
          };
        }
      }),
    );

    return connectedUsers;
  } catch (error) {
    throw error;
  }
};

export const addConnectedUser = async (email: string) => {
  try {
    const userEmail = getEmail(store.getState());

    if (userEmail === email) {
      throw new Error('You cannot add yourself');
    }

    const newUser = await loadUserByEmail(email);
    const newUserID = newUser.uid;

    const connectedUsersIds = getConnectedUsersIds(store.getState())!;
    if (connectedUsersIds.includes(newUserID)) {
      throw new Error('User already added');
    }

    const userID = getUserID(store.getState());
    const _doc = doc(db, `users/${userID}`);

    await updateDoc(_doc, {
      connectedUsersIds: [...connectedUsersIds, newUserID],
    });

    const newUserDoc = doc(db, `users/${newUserID}`);
    await updateDoc(newUserDoc, {
      connectedUsersIds: [...newUser.connectedUsersIds, userID],
    });

    const connectedUser: ConnectedUser = {
      user: newUser,
      events: await fetchEventsByID(newUserID),
    };

    return connectedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteConnectedUser = async (email: string) => {
  try {
    const userID = getUserID(store.getState());
    const _collection = collection(db, `users/${userID}/connectedUsers`);
    const _query = query(_collection, where('email', '==', email), limit(1));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('User does not exists');
    }
    const doc = snapshot.docs[0].ref;
    await updateDoc(doc, {
      deleted: true,
    });
    return email;
  } catch (error) {
    throw error;
  }
};
