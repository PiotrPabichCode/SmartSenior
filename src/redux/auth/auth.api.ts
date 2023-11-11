import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
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
import { User, ConnectedUser, ConnectedUsers, AuthCredentials, Genders, Roles } from '@src/models';
import { User as FirebaseUser } from 'firebase/auth';
import { useAppSelector } from '../store';

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
    await setDoc(userDoc, emptyUser);
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
      await setDoc(userDoc, emptyUser);
      return emptyUser;
    }
    return snapshot.data() as User;
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

export const validateUserData = (user: User) => {
  return Object.values(user!).findIndex(val => !val) === -1;
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
    const userID = getAuth().currentUser?.uid;
    const _collection = collection(db, `users/${userID}/connectedUsers`);
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
    const userID = getAuth().currentUser?.uid;
    if (userID === email) {
      throw new Error('You cannot add yourself');
    }
    const _collection = collection(db, `users/${userID}/connectedUsers`);
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
    const userID = getAuth().currentUser?.uid;
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
