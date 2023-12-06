import { Note, Notes } from '@src/models';
import { selectUserID } from '../auth/auth.slice';
import { store } from '../common';
import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';

const getNotesCollection = (): CollectionReference => {
  const uid = selectUserID(store.getState());
  if (!uid) {
    throw new Error('User uid is not defined');
  }
  return collection(db, 'notes', uid, 'notes');
};

const getDocumentRef = (key: string) => {
  const _collection = getNotesCollection();
  return doc(_collection, key);
};

export const addNote = async (note: Note) => {
  try {
    const _collection = getNotesCollection();

    const response = await addDoc(_collection, note);
    const docRef = doc(db, response.path);
    await updateDoc(docRef, {
      key: response.id,
    });
    return {
      ...note,
      key: response.id,
    } as Note;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (key: string, data: Partial<Note>) => {
  try {
    const _collection = getNotesCollection();
    const _doc = doc(_collection, key);
    await updateDoc(_doc, data);
    return {
      key: key,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (key: string) => {
  try {
    const _doc = getDocumentRef(key);
    await deleteDoc(_doc);
    return key;
  } catch (error) {
    throw error;
  }
};

export const loadNotes = async (): Promise<Notes> => {
  try {
    const _collection = getNotesCollection();
    const q = query(_collection, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error(`No existing data`);
    }

    return snapshot.docs.map(doc => doc.data()) as Notes;
  } catch (error) {
    throw error;
  }
};
