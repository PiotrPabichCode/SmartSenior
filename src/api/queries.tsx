import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
} from 'firebase/database';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';
import CustomToast from '@custom/CustomToast';
import { events } from './events';

export const loadUserActiveEvents = async () => {
  try {
    const userUid = getAuth().currentUser?.uid;

    if (!userUid) {
      throw new Error('User UID not found.');
    }

    const eventsQuery = query(
      ref(db, 'events'),
      orderByChild('userUid'),
      equalTo(userUid + '-deleted-false')
    );

    const eventsSnapshot = await get(eventsQuery);

    if (!eventsSnapshot.exists()) {
      return [];
    }

    const eventsValues = eventsSnapshot.val();
    return Object.values(eventsValues);
  } catch (e) {
    console.error(e);
    CustomToast('error', 'Nie udało się załadować wydarzeń');
    throw e;
  }
};

export const generateEvents = () => {
  try {
    const eventsRef = ref(db, 'events/');
    const eventsData = events; // Assuming events is an array of event objects
    const now = new Date();

    eventsData.forEach((event, index) => {
      const userUid = getAuth().currentUser?.uid + '-deleted-false';
      const createdAt = now.getTime();
      const updatedAt = now.getTime();
      const executionTime = now.getTime() + index * 0.5 * 86400000;

      const modifiedEvent = {
        ...event,
        userUid,
        createdAt,
        updatedAt,
        executionTime,
      };
      // console.log(modifiedEvent);

      push(eventsRef, modifiedEvent);
    });

    CustomToast('success', 'Dodano testowe wydarzenia');
  } catch (e) {
    console.error(e);
  }
};
