import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const registerUser = async (registrationData: any) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      registrationData.email,
      registrationData.password
    );

    if (response.user) {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
