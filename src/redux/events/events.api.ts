import { db } from 'firebaseConfig';
import { authUserID } from '@src/utils/utils';
import { EventDetails, Events } from './events.types';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { eventsCollection } from '../firebase/collections';

export const createEvent = async (newEventData: EventDetails) => {
  try {
    const response = await addDoc(eventsCollection, newEventData);
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

export const updateEvent = async (eventKey: string, data: Partial<EventDetails>) => {
  try {
    const ref = doc(db, 'events/' + eventKey);
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
    const ref = doc(db, `events/${key}`);
    await updateDoc(ref, {
      deleted: true,
    });
    return key;
  } catch (error) {
    throw error;
  }
};

export const fetchActiveEvents = async () => {
  try {
    if (!authUserID) {
      throw new Error('User UID not found.');
    }

    const eventsQuery = query(eventsCollection, where('deleted', '==', false));

    const snapshot = await getDocs(eventsQuery);

    if (snapshot.empty) {
      throw new Error('User does not have active events.');
    }

    const events = snapshot.docs.map(doc => doc.data());
    return events;
  } catch (error) {
    throw error;
  }
};

export const filterUpcomingEvents = (events: Events) => {
  return Object.values(events).filter(event => {
    return event.executionTime.seconds >= Date.now();
  });
};
