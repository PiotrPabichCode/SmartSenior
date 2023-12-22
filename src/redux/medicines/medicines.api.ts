import { Medicine } from '@src/models';
import * as firebase from './medicines.firebase';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { Linking } from 'react-native';

export const addMedicine = async (medicine: Medicine): Promise<Medicine> => {
  try {
    const _collection = firebase.getMedicinesCollection();

    const response = await addDoc(_collection, medicine);
    if (!response.id) {
      throw new Error('Unable to add medicine');
    }
    const docRef = doc(db, response.path);
    await updateDoc(docRef, {
      key: response.id,
    });
    return {
      ...medicine,
      key: response.id,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteMedicine = async (key: string): Promise<string> => {
  try {
    const _doc = firebase.getMedicinesDoc(key);
    await deleteDoc(_doc);
    return key;
  } catch (error) {
    throw error;
  }
};

export const loadMedicines = async (): Promise<Medicine[]> => {
  try {
    const _collection = firebase.getMedicinesCollection();
    const snapshot = await getDocs(_collection);
    if (snapshot.empty) {
      throw new Error(`No existing data`);
    }

    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw error;
  }
};

export const downloadMedicineFile = async (url: string): Promise<void> => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    throw error;
  }
};
