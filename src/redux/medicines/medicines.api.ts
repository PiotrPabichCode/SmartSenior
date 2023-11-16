import { Medicine, Medicines } from '@src/models';
import { selectUserID } from '../auth/auth.slice';
import { store } from '../common';
import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';

const getMedicinesCollection = (): CollectionReference => {
  const uid = selectUserID(store.getState());
  if (!uid) {
    throw new Error('User uid is not defined');
  }
  return collection(db, 'medicines', uid, 'medicines');
};

const getDocumentRef = (key: string) => {
  const _collection = getMedicinesCollection();
  return doc(_collection, key);
};

export const addMedicine = async (medicine: Medicine) => {
  try {
    const _collection = getMedicinesCollection();

    const response = await addDoc(_collection, medicine);
    const docRef = doc(db, response.path);
    await updateDoc(docRef, {
      key: response.id,
    });
    return {
      ...medicine,
      key: response.id,
    } as Medicine;
  } catch (error) {
    throw error;
  }
};

export const deleteMedicine = async (key: string) => {
  try {
    const _doc = getDocumentRef(key);
    await deleteDoc(_doc);
    return key;
  } catch (error) {
    throw error;
  }
};

export const loadMedicines = async (): Promise<Medicines> => {
  try {
    const _collection = getMedicinesCollection();
    const snapshot = await getDocs(_collection);
    if (snapshot.empty) {
      throw new Error(`No existing data`);
    }

    return snapshot.docs.map(doc => doc.data()) as Medicines;
  } catch (error) {
    throw error;
  }
};
