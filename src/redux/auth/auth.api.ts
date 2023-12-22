import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from 'firebaseConfig';
import * as firebase from './auth.firebase';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  User,
  ConnectedUser,
  ConnectedUsers,
  AuthCredentials,
  Genders,
  Roles,
  Users,
  Tags,
  Tag,
  Theme,
} from '@src/models';
import { User as FirebaseUser } from 'firebase/auth';
import { fetchEventGroupsByID } from '../events/events.api';
import { store } from '../common';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import CustomToast from '@src/components/CustomToast';
import { Alert } from 'react-native';
import { t } from '@src/localization/Localization';
import { UserLocation } from './auth.constants';
import { FirebaseError } from 'firebase/app';
import { useLocalStorage } from '@src/hooks/useLocalStorage';

const selectUserID = (state: any) => state.auth.user?.uid;
const selectEmail = (state: any) => state.auth.user?.email;
const selectUserConnectedUsersIds = (state: any) => state.auth.user?.connectedUsersIds;

const getUserTemplate = (uid: string, email: string | null): User => {
  const emptyUser: User = {
    uid: uid,
    email: email,
    birthDate: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    gender: Genders.MALE,
    role: Roles.SENIOR,
    connectedUsersIds: [],
    tags: [],
  };
  return emptyUser;
};

export const signIn = async (authData: AuthCredentials): Promise<User> => {
  try {
    const response = await signInWithEmailAndPassword(auth, authData.email, authData.password);
    const user: FirebaseUser = response.user;
    if (!user) {
      throw new Error('User not found');
    }
    const res = await loadUserDoc(user);
    return res;
  } catch (error) {
    throw error;
  }
};

export const signInWithOAuthGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    console.log(provider);
    const response = await signInWithPopup(auth, provider);
    const user: FirebaseUser = response.user;
    if (!user) {
      throw new Error('User not found');
    }
    const res = await loadUserDoc(user);
    return res;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (authData: AuthCredentials): Promise<User> => {
  try {
    const response = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
    const user = response.user;
    if (!user) {
      throw new Error('Unable to create new account');
    }
    const emptyUser = getUserTemplate(user.uid, user.email);
    const userDoc = firebase.userDoc(user.uid);
    await setDoc(userDoc, {
      ...emptyUser,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      deleted: false,
    });
    return emptyUser;
  } catch (error) {
    throw error;
  }
};

export const changeTheme = async (theme?: Theme): Promise<Theme> => {
  try {
    const storage = useLocalStorage('THEME_KEY');
    if (!theme) {
      const savedTheme = (await storage.getItem()) ?? 'light';
      return savedTheme;
    }
    await storage.setItem(theme);

    return theme;
  } catch (error) {
    throw error;
  }
};

export const loadUserDoc = async (user: FirebaseUser): Promise<User> => {
  try {
    const userDoc = firebase.userDoc(user.uid);
    const snapshot = await getDoc(userDoc);
    if (!snapshot.exists()) {
      const emptyUser = getUserTemplate(user.uid, user.email);
      await setDoc(userDoc, {
        ...emptyUser,
        deleted: false,
      });
      return emptyUser;
    }
    const _user = snapshot.data();
    delete _user.deleted;

    const tagsCollection = firebase.tagsCollection(user.uid);
    const tagsSnapshot = await getDocs(tagsCollection);

    const tags = tagsSnapshot.docs.map(doc => doc.data());
    return {
      ..._user,
      tags: tags,
    };
  } catch (error) {
    throw error;
  }
};

export const addUserTag = async (tag: Tag) => {
  try {
    const userID = selectUserID(store.getState())!;
    const tagsCollection = firebase.tagsCollection(userID);
    const response = await addDoc(tagsCollection, tag);
    if (!response.id) {
      throw new Error('Unable to add tag');
    }
    await updateDoc(doc(db, response.path), {
      id: response.id,
    });
    return {
      ...tag,
      id: response.id,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserTag = async (tag: Tag) => {
  try {
    const userID = selectUserID(store.getState())!;
    const _doc = firebase.tagDoc(userID, tag.id);
    await updateDoc(_doc, tag);
    return tag;
  } catch (error) {
    throw error;
  }
};

export const deleteUserTag = async (id: string) => {
  try {
    const userID = selectUserID(store.getState())!;
    await deleteDoc(doc(db, 'users', userID, id));
    return id;
  } catch (error) {
    throw error;
  }
};

export const loadUserTags = async (): Promise<Tags> => {
  try {
    const userID = selectUserID(store.getState())!;
    const tagsCollection = firebase.tagsCollection(userID);
    const snapshot = await getDocs(tagsCollection);
    if (snapshot.empty) {
      throw new Error('No available tags');
    }
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (
  uid: string,
  values: Partial<User>,
): Promise<Partial<User>> => {
  try {
    const userDoc = firebase.userDoc(uid);
    await updateDoc(userDoc, values);
    return values;
  } catch (error) {
    throw error;
  }
};

export const changeEmail = (email: string) => {
  try {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error('User not verified');
    }
    if (email === user.email) {
      throw new Error('Email is the same');
    }
    updateEmail(user, email);
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = getAuth().currentUser;
    if (!user || !user.email) {
      throw new Error('User not verified');
    }
    await reauthenticateWithCredential(
      user,
      EmailAuthProvider.credential(user.email, currentPassword),
    );
    await updatePassword(user, newPassword);
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const code = firebaseError.code;
    if (code === 'auth/wrong-password') {
      CustomToast('error', t('firebaseMessage.error.auth/wrong-password'));
    }
    if (code === 'auth/too-many-requests') {
      CustomToast('error', t('firebaseMessage.error.auth/too-many-requests'));
    }
    throw error;
  }
};

export const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const validateUserData = (user: User | null) => {
  if (!user) {
    return false;
  }
  return Object.values(user).findIndex(val => !val) === -1;
};

const loadUserByEmail = async (email: string): Promise<User> => {
  try {
    const _collection = firebase.usersCollection();
    const _query = query(
      _collection,
      where('deleted', '==', false),
      where('email', '==', email),
      limit(1),
    );
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('User does not exists');
    }
    const data = snapshot.docs[0].data();
    delete data.deleted;
    return data;
  } catch (error) {
    throw error;
  }
};

export const loadConnectedUsers = async () => {
  try {
    const connectedUsersIds = selectUserConnectedUsersIds(store.getState());
    const _collection = firebase.usersCollection();

    const _query = query(
      _collection,
      where('deleted', `==`, false),
      where('uid', 'in', connectedUsersIds),
    );
    const snapshot = await getDocs(_query);
    const users: Users = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      delete data.deleted;
      users.push(data);
    });

    const connectedUsers: ConnectedUsers = await Promise.all(
      users.map(async user => {
        try {
          const eventGroups = await fetchEventGroupsByID(user.uid);
          return {
            user: user,
            eventGroups: eventGroups,
            deleted: false,
          };
        } catch (error) {
          return {
            user: user,
            eventGroups: [],
            deleted: false,
          };
        }
      }),
    );

    return connectedUsers;
  } catch (error) {
    throw error;
  }
};

export const addConnectedUser = async (email: string) => {
  try {
    const userEmail = selectEmail(store.getState());

    if (userEmail === email) {
      throw new Error('You cannot add yourself');
    }

    const newUser = await loadUserByEmail(email);
    const newUserID = newUser.uid;

    const connectedUsersIds = selectUserConnectedUsersIds(store.getState())!;
    if (connectedUsersIds.includes(newUserID)) {
      throw new Error('User already added');
    }

    const userID = selectUserID(store.getState());
    const _doc = firebase.userDoc(userID);

    const batch = writeBatch(db);

    batch.update(_doc, {
      connectedUsersIds: [...connectedUsersIds, newUserID],
    });

    const newUserDoc = firebase.userDoc(newUserID);
    batch.update(newUserDoc, {
      connectedUsersIds: [...newUser.connectedUsersIds, userID],
    });

    await batch.commit();

    const connectedUser: ConnectedUser = {
      user: newUser,
      eventGroups: await fetchEventGroupsByID(newUserID),
    };

    return connectedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteConnectedUser = async (email: string) => {
  try {
    const userID = selectUserID(store.getState());
    const _collection = collection(db, `users/${userID}/connectedUsers`);
    const _query = query(_collection, where('email', '==', email), limit(1));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      throw new Error('User does not exists');
    }
    const doc = snapshot.docs[0].ref;
    await updateDoc(doc, {
      deleted: true,
    });
    return email;
  } catch (error) {
    throw error;
  }
};

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }: any) => {
  if (error) {
    console.log(error);
    return;
  }

  const newLocation: UserLocation = {
    latitude: locations[0].coords.latitude,
    longitude: locations[0].coords.longitude,
    timestamp: Timestamp.fromMillis(locations[0].timestamp),
  };
  const seniorID = selectUserID(store.getState());
  updateSeniorLocation(seniorID, newLocation);
});

export const setupLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 1000 * 60 * 15, // Time between each location update in milliseconds
    distanceInterval: 100, // Minimum distance between each location update in meters
    pausesUpdatesAutomatically: false, // Continue tracking when app is in background
  });
};

export const updateSeniorLocation = (seniorID: string, newLocation: UserLocation) => {
  const _collection = firebase.locationsCollection(seniorID);
  addDoc(_collection, newLocation);
  console.log('New location', newLocation);
};

export const getSeniorLocation = async (seniorID: string) => {
  const _collection = firebase.locationsCollection(seniorID);
  const q = query(_collection, orderBy('timestamp', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    CustomToast('error', t('message.error.locationNotAvailable'));
    return;
  }
  const location = snapshot.docs[0].data() as UserLocation;
  const { latitude, longitude } = location;
  const locations = await Location.reverseGeocodeAsync({
    latitude: latitude,
    longitude: longitude,
  });
  const item = locations[0];
  const address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

  Alert.alert(
    t('locationAlertTitle'),
    t('locationAlertQuestion', {
      address: address,
    }),
    [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: () => {
          const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          Linking.openURL(url);
        },
      },
    ],
  );
};
