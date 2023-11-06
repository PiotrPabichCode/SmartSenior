import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AuthCredentials, ConnectedUser, ConnectedUsers, User, UserDetails } from './auth.types';
import { auth, db } from 'firebaseConfig';
import { fetchActiveEvents } from '../events/events.api';
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
import { authUserID, authUserEmail } from '@src/utils/utils';

export const signIn = async (authData: AuthCredentials) => {
  try {
    const response = await signInWithEmailAndPassword(auth, authData.email, authData.password);
    const user = response.user;
    if (user) {
      return {
        email: user.email,
        uid: user.uid,
      } as User;
    }
    throw new Error('User not found');
  } catch (error) {
    throw error;
  }
};

export const signUp = async (authData: AuthCredentials) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
    const user = response.user;
    if (user) {
      return {
        email: user.email,
        uid: user.uid,
      } as User;
    }
    throw new Error('Unable to create new account');
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const checkIfUserDataExists = async () => {
  try {
    const userDoc = doc(db, `users/${authUserID}`);
    const snapshot = await getDoc(userDoc);
    if (!snapshot.exists()) {
      throw new Error('User data not found');
    }
    return snapshot.data() as UserDetails;
  } catch (error) {
    throw error;
  }
};

export const setUserDetails = async (values: any) => {
  try {
    const userDoc = doc(db, `users/${authUserID}`);
    await setDoc(userDoc, values);
    return values;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const userCollection = collection(db, 'users');
    const _query = query(userCollection, where('email', '==', email), limit(1));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('User not found');
    }

    const doc = snapshot.docs[0];
    return doc.data();
  } catch (error) {
    throw error;
  }
};

export const loadConnectedUsers = async () => {
  try {
    const _collection = collection(db, `users/${authUserID}/connectedUsers`);
    const _query = query(_collection, where('deleted', `==`, false));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('Unable to fetch connected users');
    }
    const users: ConnectedUsers = [];
    snapshot.forEach(doc => {
      users.push(doc.data() as ConnectedUser);
    });
    return users;
  } catch (error) {
    throw error;
  }
};

export const addConnectedUser = async (email: string) => {
  try {
    if (authUserEmail === email) {
      throw new Error('You cannot add yourself');
    }
    const _collection = collection(db, `users/${authUserID}/connectedUsers`);
    const _query = query(_collection, where('email', '==', email), limit(1));
    const snapshot = await getDocs(_query);
    if (!snapshot.empty) {
      throw new Error('User already added');
    }

    const newUser = await findUserByEmail(email);
    newUser.events = await fetchActiveEvents();
    newUser.deleted = false;
    await addDoc(_collection, newUser);
    return newUser as ConnectedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteConnectedUser = async (email: string) => {
  try {
    const _collection = collection(db, `users/${authUserID}/connectedUsers`);
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
