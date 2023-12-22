import { CollectionReference, DocumentReference, collection, doc } from 'firebase/firestore';
import { selectUserID } from '../auth/auth.slice';
import { store } from '../common';
import { Medicine } from '@src/models';
import { converter, db } from 'firebaseConfig';

export const getMedicinesCollection = (): CollectionReference<Medicine, Medicine> => {
  const uid = selectUserID(store.getState());
  if (!uid) {
    throw new Error('User uid is not defined');
  }
  return collection(db, 'medicines', uid, 'medicines').withConverter(converter<Medicine>());
};

export const getMedicinesDoc = (key: string): DocumentReference<Medicine, Medicine> => {
  const _collection = getMedicinesCollection();
  return doc(_collection, key);
};
