import { FIREBASE_AUTH } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const registerUser = async (registrationData: any) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      registrationData.email,
      registrationData.password
    );

    if (response.user) {
      return response.user;
    }
  } catch (error) {
    throw error;
  }
};

export const authUser = async (registrationData: any) => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      registrationData.email,
      registrationData.password
    );

    if (response.user) {
      return response.user;
    }
  } catch (error) {
    throw error;
  }
};
