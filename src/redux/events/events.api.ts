import { equalTo, get, orderByChild, push, query, ref, update, onValue } from 'firebase/database';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';
import { EventDetails } from './events.types';
import { useAppSelector } from '../store';

export const createEvent = async (newEventData: EventDetails) => {
  try {
    const eventsRef = ref(db, 'events/');
    const response = await push(eventsRef, newEventData);
    if (!response || !response.key) {
      throw new Error('Unable to add new event.');
    }
    const key = response.key;
    const currentEventRef = ref(db, 'events/' + key);
    update(currentEventRef, {
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
    const eventRef = ref(db, 'events/' + eventKey);
    await update(eventRef, data);
    return {
      key: eventKey,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchActiveEvents = async () => {
  try {
    const userUID = getAuth().currentUser?.uid;
    if (!userUID) {
      throw new Error('User UID not found.');
    }

    const eventsQuery = query(
      ref(db, 'events'),
      orderByChild('userUid'),
      equalTo(userUID + '-deleted-false'),
    );

    const eventsSnapshot = await get(eventsQuery);

    if (!eventsSnapshot.exists()) {
      throw new Error('User does not have active events.');
    }

    let events = eventsSnapshot.val();
    for (let key in events) {
      events[key].key = key;
    }

    return events;
  } catch (error) {
    throw error;
  }
};

export const filterUpcomingEvents = (events: EventDetails[]) => {
  return Object.values(events).filter(event => {
    return event.executionTime >= Date.now();
  });
};
