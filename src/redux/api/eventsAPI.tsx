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
    push(eventsRef, newEventData);
    return { error: null, data: newEventData };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateEvent = async (
  changeEventData: EventDetails
): Promise<ApiResponse> => {
  try {
    const eventRef = ref(db, 'events/');
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

    const eventsValues = eventsSnapshot.val();
    return { error: null, data: Object.values(eventsValues) };
  } catch (error) {
    return handleApiError(error);
  }
};
