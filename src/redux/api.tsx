import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FIREBASE_AUTH, db } from '../../firebaseConfig';
import { handleApiError } from './utils';
import { get, ref, set } from 'firebase/database';

export type ApiResponse = {
  error: null | Error;
  data: any;
};

export const signIn = async (authData: any): Promise<ApiResponse> => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password
    );
    if (response.user) {
      return { error: null, data: response.user };
    }
    return { error: new Error('User not found'), data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const signUp = async (authData: any): Promise<ApiResponse> => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password
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
