import { db } from 'firebaseConfig';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { eventsCollection } from '../firebase/collections';
import { getAuth } from 'firebase/auth';
import { Event, Events } from '@src/models';

export const createEvent = async (newEventData: Event) => {
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

export const updateEvent = async (eventKey: string, data: Partial<Event>) => {
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

export const fetchActiveEvents = async (): Promise<Events> => {
  try {
    const userID = getAuth().currentUser?.uid;
    if (!userID) {
      throw new Error('User UID not found.');
    }

    const eventsQuery = query(eventsCollection, where('deleted', '==', false));

    const snapshot = await getDocs(eventsQuery);

    if (snapshot.empty) {
      throw new Error('User does not have active events.');
    }

    const events = snapshot.docs.map(doc => doc.data());
    return events as Events;
  } catch (error) {
    throw error;
  }
};

export const filterUpcomingEvents = (events: Events) => {
  return Object.values(events).filter(event => {
    return event.date!.seconds >= Date.now();
  });
};
