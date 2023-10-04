import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';
import CustomToast from '@src/components/CustomToast';

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
