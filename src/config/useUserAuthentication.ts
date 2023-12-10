import { loadConnectedUsers, verifyUser } from '@src/redux/auth/auth.actions';
import { logout } from '@src/redux/auth/auth.slice';
import { loadChats } from '@src/redux/chats/chats.actions';
import { clearChats } from '@src/redux/chats/chats.slice';
import { store } from '@src/redux/common';
import { loadEventGroups } from '@src/redux/events/events.actions';
import { clearEvents } from '@src/redux/events/events.slice';
import { loadMedicines } from '@src/redux/medicines/medicines.actions';
import { clearMedicines } from '@src/redux/medicines/medicines.slice';
import { loadNotes } from '@src/redux/notes/notes.actions';
import { clearNotes } from '@src/redux/notes/notes.slice';
import { loadPharmacies } from '@src/redux/pharmacies/pharmacies.actions';
import { clearPharmacies } from '@src/redux/pharmacies/pharmacies.slice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { useEffect, useState } from 'react';
import { batch } from 'react-redux';

export const useUserAuthentication = () => {
  const [userReady, setUserReady] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      await store.dispatch(verifyUser(user));
      batch(async () => {
        if (user) {
          await store.dispatch(loadEventGroups(user.uid));
          await store.dispatch(loadConnectedUsers(user.uid));
          await store.dispatch(loadChats());
          await store.dispatch(loadMedicines());
          await store.dispatch(loadPharmacies());
          await store.dispatch(loadNotes());
          setUserReady(true);
        } else {
          store.dispatch(logout());
          store.dispatch(clearEvents());
          store.dispatch(clearChats());
          store.dispatch(clearMedicines());
          store.dispatch(clearPharmacies());
          store.dispatch(clearNotes());
          setUserReady(false);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return userReady;
};
