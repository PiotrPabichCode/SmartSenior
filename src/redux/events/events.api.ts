import { db } from 'firebaseConfig';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Event, Events } from '@src/models';

export const createEvent = async (newEventData: Event) => {
  try {
    const _collection = collection(db, 'events');
    const response = await addDoc(_collection, newEventData);
    if (!response || !response.id) {
      throw new Error('Unable to add new event.');
    }
    const key = response.id;
    const currentEventRef = doc(db, response.path);
    await updateDoc(currentEventRef, {
      key: key,
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
    const q = query(
      _collection,
      where('deleted', '==', false),
      where('active', '==', true),
      where('userUid', '==', uid),
      orderBy('date', 'asc'),
    );
    const snapshot = await getDocs(q);
    const events = snapshot.docs.map(doc => doc.data());
    return events as Events;
  } catch (error) {
    throw error;
  }
};
