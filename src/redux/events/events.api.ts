import { db } from 'firebaseConfig';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Event, Events } from '@src/models';
import { getUserID } from '../selectors';
import store from '../store';

export const createEvent = async (newEventData: Event) => {
  try {
    const userID = getUserID(store.getState());
    const _collection = collection(db, 'events', userID!);
    const response = await addDoc(_collection, newEventData);
    if (!response || !response.id) {
      throw new Error('Unable to add new event.');
    }
    const key = response.id;
    const currentEventRef = doc(db, response.path);
    await updateDoc(currentEventRef, {
      key: `${userID}/${key}`,
    });
    newEventData.key = key;
    return newEventData;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventKey: string, data: Partial<Event>) => {
  try {
    const ref = doc(db, 'events', eventKey);
    await updateDoc(ref, data);
    return {
      key: eventKey,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (key: string) => {
  try {
    const ref = doc(db, 'events', key);
    await updateDoc(ref, {
      deleted: true,
    });
    return key;
  } catch (error) {
    throw error;
  }
};

export const fetchEventsByID = async (uid: string): Promise<Events> => {
  try {
    const _collection = collection(db, `events`);
    const _q = query(
      _collection,
      where('deleted', '==', false),
      where('date', '>=', Timestamp.now()),
      where('userUid', '==', uid),
    );
    const snapshot = await getDocs(_q);
    const events = snapshot.docs.map(doc => doc.data());
    return events as Events;
  } catch (error) {
    throw error;
  }
};
