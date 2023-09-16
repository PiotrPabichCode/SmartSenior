import { FIREBASE_AUTH } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const registerUser = async (authData: any) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password
    );

    if (response.user) {
      return response.user;
    }
  } catch (error) {
    throw error;
  }
};

export const authUser = async (authData: any) => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      authData.email,
      authData.password
    );

    if (response.user) {
      return response.user;
    }
  } catch (error) {
    throw error;
  }
};
