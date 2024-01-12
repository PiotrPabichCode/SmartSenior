import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, type QueryDocumentSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  APP_FIREBASE_API_KEY,
  APP_FIREBASE_AUTH_DOMAIN,
  APP_FIREBASE_PROJECT_ID,
  APP_FIREBASE_STORAGE_BUCKET,
  APP_FIREBASE_MESSAGING_SENDER_ID,
  APP_FIREBASE_APP_ID,
  APP_FIREBASE_MEASUREMENT_ID,
  APP_FIREBASE_DATABASE_URL,
  // @ts-ignore
} from '@env';

const firebaseConfig = {
  apiKey: APP_FIREBASE_API_KEY,
  authDomain: APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: APP_FIREBASE_DATABASE_URL,
  projectId: APP_FIREBASE_PROJECT_ID,
  storageBucket: APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: APP_FIREBASE_APP_ID,
  measurementId: APP_FIREBASE_MEASUREMENT_ID,
};

export function getFirebase() {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  return { app, firestore, storage, auth };
}

export function converter<T>() {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
  };
}

export const { firestore: db, storage, auth } = getFirebase();
