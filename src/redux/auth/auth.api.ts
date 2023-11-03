import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthCredentials, ConnectedUser } from './auth.types';
import { FIREBASE_AUTH, db } from 'firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { fetchActiveEvents } from '../events/events.api';

export const signIn = async (authData: AuthCredentials) => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password,
    );
    const user = response.user;
    if (user) {
      return {
        email: user.email,
        uid: user.uid,
      };
    }
    throw new Error('User not found');
  } catch (error) {
    throw error;
  }
};

export const signUp = async (authData: AuthCredentials) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password,
    );
    const user = response.user;
    if (user) {
      return {
        email: user.email,
        uid: user.uid,
      };
    }
    throw new Error('Unable to create new account');
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    throw error;
  }
};

export const checkIfUserDataExists = async () => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, 'users/' + userUid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    throw new Error('User data not found');
  } catch (error) {
    throw error;
  }
};

export const setUserDetails = async (values: any) => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, 'users/' + userUid);
    await set(userRef, values);
    return values;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const userRef = ref(db, `users`);
    const _query = query(userRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(_query);
    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const data = snapshot.val();
      return data[key];
    }
    throw new Error('User not found');
  } catch (error) {
    throw error;
  }
};

export const loadConnectedUsers = async () => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, `users/${userUid}/connectedUsers`);
    const _query = query(userRef, orderByChild('deleted'), equalTo(false));
    const snapshot = await get(_query);
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as ConnectedUser[];
    }
    throw new Error('Unable to fetch connected users');
  } catch (error) {
    throw error;
  }
};

export const addConnectedUser = async (email: string) => {
  try {
    if (getAuth().currentUser?.email === email) {
      throw new Error('You cannot add yourself');
    }
    const userUid = getAuth().currentUser?.uid;
    const connectedUserRef = ref(db, `users/${userUid}/connectedUsers`);
    const _query = query(connectedUserRef, orderByChild('email'), equalTo(email));
    let snapshot = await get(_query);
    if (snapshot.exists()) {
      throw new Error('User already added');
    }

    const newUser = await findUserByEmail(email);

    newUser.events = await fetchActiveEvents();
    newUser.deleted = false;
    await push(connectedUserRef, newUser);
    return newUser as ConnectedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteConnectedUser = async (email: string) => {
  try {
    const userUid = getAuth().currentUser?.email;
    const connectedUserRef = ref(db, `users/${userUid}/connectedUsers?email=${email}`);
    const _query = query(connectedUserRef, orderByChild('email'), equalTo(email));
    await update(connectedUserRef, {
      deleted: true,
    });
    return email;
  } catch (error) {
    throw error;
  }
};
