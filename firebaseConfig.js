import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDdvdVbItPTuuQiETum3WmV5K_mHraVFno',
  authDomain: 'smartsenior-6dd25.firebaseapp.com',
  databaseURL: 'https://smartsenior-6dd25-default-rtdb.firebaseio.com',
  projectId: 'smartsenior-6dd25',
  storageBucket: 'smartsenior-6dd25.appspot.com',
  messagingSenderId: '515080154204',
  appId: '1:515080154204:web:ab7ca056154ca042f7ca99',
  measurementId: 'G-8QFXX2QMHJ',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const DATABASE = getFirestore();
export const STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
