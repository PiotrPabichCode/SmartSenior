import { CollectionReference, DocumentReference, collection, doc } from 'firebase/firestore';
import { selectUserID } from '../auth/auth.slice';
import { store } from '../common';
import { Pharmacy } from '@src/models';
import { converter, db } from 'firebaseConfig';

export const getPharmaciesCollection = (): CollectionReference<Pharmacy, Pharmacy> => {
  const uid = selectUserID(store.getState());
  if (!uid) {
    throw new Error('User uid is not defined');
  }
  return collection(db, 'pharmacies', uid, 'pharmacies').withConverter(converter<Pharmacy>());
};

export const getPharmaciesDoc = (key: string): DocumentReference<Pharmacy, Pharmacy> => {
  const _collection = getPharmaciesCollection();
  return doc(_collection, key);
};
