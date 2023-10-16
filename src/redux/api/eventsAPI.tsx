import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  update,
} from 'firebase/database';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';
import { handleApiError } from '../utils';
import { EventDetails } from '../types/eventsTypes';
import { ApiResponse } from '../types';

export const createEvent = async (
  newEventData: EventDetails
): Promise<ApiResponse> => {
  try {
    const eventsRef = ref(db, 'events/');
    const response = push(eventsRef, newEventData);
    if (!response || !response.key) {
      return {
        error: new Error('Error: add event'),
        data: null,
      };
    }
    const key = response.key;
    const currentEventRef = ref(db, 'events/' + key);
    update(currentEventRef, {
      key: key,
    });
    newEventData.key = key;
    return { error: null, data: newEventData };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateEvent = async (
  eventKey: string,
  changeEventData: EventDetails
): Promise<ApiResponse> => {
  try {
    const eventRef = ref(db, 'events/' + eventKey);
    update(eventRef, changeEventData);
    return { error: null, data: changeEventData };
  } catch (error) {
    return handleApiError(error);
  }
};

export const loadActiveEvents = async (): Promise<ApiResponse> => {
  try {
    const userUID = getAuth().currentUser?.uid;
    if (!userUID) {
      throw new Error('User UID not found.');
    }

    const eventsQuery = query(
      ref(db, 'events'),
      orderByChild('userUid'),
      equalTo(userUID + '-deleted-false')
    );

    const eventsSnapshot = await get(eventsQuery);

    if (!eventsSnapshot.exists()) {
      return { error: new Error('Unable to load events'), data: null };
    }

    let events = eventsSnapshot.val();
    for (let key in events) {
      events[key].key = key;
    }

    return { error: null, data: events };
  } catch (error) {
    return handleApiError(error);
  }
};

export const filterUpcomingEvents = (events: EventDetails[]) => {
  return Object.values(events).filter((event) => {
    return event.executionTime >= Date.now();
  });
};
