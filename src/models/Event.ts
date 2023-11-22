import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { Tags } from './Tag';
import { Images } from './Image';
import { Frequency } from './Frequency';
import { Notifications } from './Notifications';
import { Days } from '@src/screens/Events/DayField';

export interface Event {
  key: string;
  groupKey: string;
  title: string;
  tags: Tags;
  images: Images;
  days?: Days;
  frequency: Frequency;
  description: string;
  date: Timestamp;
  notifications: Notifications;
  priority: number;
  updatedAt: Timestamp;
  userUid: string;
  active: boolean;
  deleted: boolean;
}

export type FirebaseEvent = Omit<Event, 'frequency' | 'tags' | 'images'> & {
  frequency?: Frequency;
  tags: Array<string>;
  images: Array<string>;
};

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
