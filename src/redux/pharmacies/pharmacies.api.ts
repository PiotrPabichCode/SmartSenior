import { Medicine, Medicines, Pharmacies, Pharmacy } from '@src/models';
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

const getPharmaciesCollection = (): CollectionReference => {
  const uid = selectUserID(store.getState());
  if (!uid) {
    throw new Error('User uid is not defined');
  }
  return collection(db, 'pharmacies', uid, 'pharmacies');
};

const getDocumentRef = (key: string) => {
  const _collection = getPharmaciesCollection();
  return doc(_collection, key);
};

export const addPharmacy = async (pharmacy: Pharmacy) => {
  try {
    const _collection = getPharmaciesCollection();

    const response = await addDoc(_collection, pharmacy);
    const docRef = doc(db, response.path);
    await updateDoc(docRef, {
      key: response.id,
    });
    return {
      ...pharmacy,
      key: response.id,
    } as Pharmacy;
  } catch (error) {
    throw error;
  }
};

export const deletePharmacy = async (key: string) => {
  try {
    const _doc = getDocumentRef(key);
    await deleteDoc(_doc);
    return key;
  } catch (error) {
    throw error;
  }
};

export const loadPharmacies = async (): Promise<Pharmacies> => {
  try {
    const _collection = getPharmaciesCollection();
    const snapshot = await getDocs(_collection);
    if (snapshot.empty) {
      throw new Error(`No existing data`);
    }

    return snapshot.docs.map(doc => doc.data()) as Pharmacies;
  } catch (error) {
    throw error;
  }
};
