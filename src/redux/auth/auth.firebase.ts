import { Tag, User } from '@src/models';
import { collection, doc } from 'firebase/firestore';
import { converter, db } from 'firebaseConfig';
import { UserLocation } from './auth.constants';

export const usersCollection = () => collection(db, 'users').withConverter(converter<User>());

export const userDoc = (userID: string) => {
  const _collection = usersCollection();
  return doc(_collection, userID);
};

export const tagsCollection = (userID: string) => {
  const _doc = userDoc(userID);
  return collection(_doc, 'tags').withConverter(converter<Tag>());
};

export const tagDoc = (userID: string, id: string) => {
  const _collection = tagsCollection(userID);
  return doc(_collection, id);
};

export const locationsCollection = (userID: string) => {
  const _doc = userDoc(userID);
  return collection(_doc, 'locations').withConverter(converter<UserLocation>());
};
