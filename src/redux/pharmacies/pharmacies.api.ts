import { Pharmacy } from '@src/models';
import * as firebase from './pharmacies.firebase';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';

export const addPharmacy = async (pharmacy: Pharmacy): Promise<Pharmacy> => {
  try {
    const _collection = firebase.getPharmaciesCollection();

    const response = await addDoc(_collection, pharmacy);
    if (!response.id) {
      throw new Error('Unable to add pharmacy');
    }
    const docRef = doc(db, response.path);
    await updateDoc(docRef, {
      key: response.id,
    });
    return {
      ...pharmacy,
      key: response.id,
    };
  } catch (error) {
    throw error;
  }
};

export const deletePharmacy = async (key: string): Promise<string> => {
  try {
    const _doc = firebase.getPharmaciesDoc(key);
    await deleteDoc(_doc);
    return key;
  } catch (error) {
    throw error;
  }
};

export const loadPharmacies = async (): Promise<Pharmacy[]> => {
  try {
    const _collection = firebase.getPharmaciesCollection();
    const snapshot = await getDocs(_collection);
    if (snapshot.empty) {
      throw new Error(`No existing data`);
    }

    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw error;
  }
};
