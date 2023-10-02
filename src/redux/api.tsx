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
    console.log(response.user);

    if (response.user) {
      return { error: null, data: response.user };
    }
  } catch (error) {
    return handleApiError(error);
  }
  return { error: new Error('User not found'), data: null };
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
  } catch (error) {
    return handleApiError(error);
  }

  return { error: new Error('Something went wrong'), data: null };
};

export const logout = async () => {
  try {
    const response = await FIREBASE_AUTH.signOut();
    return { error: null, data: response };
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkIfUserDataExists = async (): Promise<ApiResponse> => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, 'users/' + userUid);
    const response = await get(userRef);
    if (response.exists()) {
      return { error: null, data: response.val() };
    }
    return { error: null, data: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const setFirstLoginWizardData = async (
  values: any
): Promise<ApiResponse> => {
  try {
    const userUid = getAuth().currentUser?.uid;
    const userRef = ref(db, 'users/' + userUid);
    await set(userRef, values);
    return { error: null, data: values };
  } catch (error) {
    return handleApiError(error);
  }
};
