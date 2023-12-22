import { EventGroup, FirebaseEvent } from '@src/models';
import { collection, doc } from 'firebase/firestore';
import { converter, db } from 'firebaseConfig';

export const eventGroupsCollection = () =>
  collection(db, 'eventGroups').withConverter(converter<EventGroup>());

export const eventGroupsDoc = (key: string) =>
  doc(db, 'eventGroups', key).withConverter(converter<EventGroup>());

export const eventDoc = (groupKey: string, key: string) => {
  const _eventGroupsDoc = eventGroupsDoc(groupKey);
  return doc(_eventGroupsDoc, 'events', key).withConverter(converter<FirebaseEvent>());
};

export const completedEventsCollection = (key: string) => {
  const _collection = eventGroupsCollection();
  return collection(_collection, key, 'completedEvents').withConverter(converter<FirebaseEvent>());
};

export const deletedEventsCollection = (key: string) => {
  const _collection = eventGroupsCollection();
  return collection(_collection, key, 'deletedEvents').withConverter(converter<FirebaseEvent>());
};
