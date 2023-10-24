import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, db } from 'firebaseConfig';
import { handleApiError } from '../utils';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { ApiResponse } from '../types';
import { AuthCredentials, UserDetails } from '../types/authTypes';
import { useAppSelector } from '../store';
import { useAuthStore } from '../actions/eventsActions';

export const signIn = async (authData: AuthCredentials): Promise<ApiResponse> => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password,
    );
    if (response.user) {
      return { error: null, data: response.user };
    }
    return { error: new Error('User not found'), data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const signUp = async (authData: AuthCredentials): Promise<ApiResponse> => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password,
    );

    if (response.user) {
      return { error: null, data: response.user };
    }
    return { error: new Error('Something went wrong'), data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const logout = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkIfUserDataExists = async (): Promise<ApiResponse> => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, 'users/' + userUid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return { error: null, data: snapshot.val() };
    }
    return { error: new Error('User data not found'), data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const setUserDetails = async (values: any): Promise<ApiResponse> => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, 'users/' + userUid);
    await set(userRef, values);
    return { error: null, data: values };
  } catch (error) {
    return handleApiError(error);
  }
};

const findUserByEmail = async (email: string): Promise<ApiResponse> => {
  try {
    const userRef = ref(db, `users`);
    const _query = query(userRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(_query);
    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const data = snapshot.val();
      return { error: null, data: data[key] };
    }
    return { error: new Error('User not found'), data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const loadConnectedUsers = async (): Promise<ApiResponse> => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, `users/${userUid}/connectedUsers`);
    const _query = query(userRef, orderByChild('deleted'), equalTo(false));
    const snapshot = await get(_query);
    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      return { error: null, data: users };
    }
    return { error: new Error('Unable to fetch connected users'), data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const addConnectedUser = async (email: string): Promise<ApiResponse> => {
  try {
    if (getAuth().currentUser?.email !== email) {
      const userUid = getAuth().currentUser?.uid;
      const connectedUserRef = ref(db, `users/${userUid}/connectedUsers`);
      const _query = query(connectedUserRef, orderByChild('email'), equalTo(email));
      let snapshot = await get(_query);
      if (snapshot.exists()) {
        return { error: Error('User already added'), data: null };
      }

      const newUser = await findUserByEmail(email);
      const { error, data } = newUser;
      if (error) {
        return { error: error, data: [] };
      }

      data.deleted = false;
      await push(connectedUserRef, data);
      return { error: null, data: data };
    } else {
      return { error: Error('You cannot add yourself'), data: [] };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteConnectedUser = async (email: string): Promise<ApiResponse> => {
  try {
    const userUid = getAuth().currentUser?.email;
    const connectedUserRef = ref(db, `users/${userUid}/connectedUsers?email=${email}`);
    const _query = query(connectedUserRef, orderByChild('email'), equalTo(email));
    const newUserData = await update(connectedUserRef, {
      deleted: true,
    });
    const connectedUsers: UserDetails[] = useAppSelector(state => state.auth.connectedUsers);
    const updatedUsers = connectedUsers.map(user => {
      if (user.email === email) {
        return newUserData;
      }
      return user;
    });
    return { error: null, data: updatedUsers };
  } catch (error) {
    return handleApiError(error);
  }
};
