import { CollectionReference, DocumentReference, collection, doc } from 'firebase/firestore';
import { selectUserID } from '../auth/auth.slice';
import { store } from '../common';
import { Note } from '@src/models';
import { converter, db } from 'firebaseConfig';

export const getNotesCollection = (): CollectionReference<Note, Note> => {
  const uid = selectUserID(store.getState());
  if (!uid) {
    throw new Error('User uid is not defined');
  }
  return collection(db, 'notes', uid, 'notes').withConverter(converter<Note>());
};

export const getNotesDoc = (key: string): DocumentReference<Note, Note> => {
  const _collection = getNotesCollection();
  return doc(_collection, key);
};
