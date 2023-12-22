import { Note } from '@src/models';
import * as firebase from './notes.firebase';
import { addDoc, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';

export const addNote = async (note: Note): Promise<Note> => {
  try {
    const _collection = firebase.getNotesCollection();

    const response = await addDoc(_collection, note);
    if (!response.id) {
      throw new Error('Unable to add note');
    }
    const docRef = doc(db, response.path);
    await updateDoc(docRef, {
      key: response.id,
    });
    return {
      ...note,
      key: response.id,
    };
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (key: string, data: Partial<Note>) => {
  try {
    const _doc = firebase.getNotesDoc(key);
    await updateDoc(_doc, data);
    return {
      key: key,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (key: string): Promise<string> => {
  try {
    const _doc = firebase.getNotesDoc(key);
    await deleteDoc(_doc);
    return key;
  } catch (error) {
    throw error;
  }
};

export const loadNotes = async (): Promise<Note[]> => {
  try {
    const _collection = firebase.getNotesCollection();
    const q = query(_collection, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error(`No existing data`);
    }

    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw error;
  }
};
