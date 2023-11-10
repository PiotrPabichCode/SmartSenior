import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export interface Event {
  key: string;
  title: string;
  description: string;
  date: Timestamp | null;
  isCyclic: boolean;
  cyclicTime: number;
  isNotification: boolean;
  notificationTime: number;
  priority: number;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  userUid: string;
  days: object;
  active: boolean;
  deleted: boolean;
}

export type Events = Event[];

export const EventConverter: FirestoreDataConverter<Event> = {
  toFirestore(event) {
    return { ...event };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return { ...data } as Event;
  },
};
