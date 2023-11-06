import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export type EventDetails = {
  key: string;
  title: string;
  description: string;
  executionTime: Timestamp;
  date: Timestamp;
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
};

export type Events = EventDetails[];

export const EventConverter: FirestoreDataConverter<EventDetails> = {
  toFirestore(event) {
    return { ...event };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return { ...data } as EventDetails;
  },
};
