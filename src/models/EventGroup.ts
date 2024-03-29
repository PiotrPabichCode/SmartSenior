import { Timestamp } from 'firebase/firestore';
import { Frequency } from './Frequency';
import { Notifications } from './Notifications';
import { Tags } from './Tag';
import { Images } from './Image';

export interface EventGroup {
  key: string;
  userID: string;
  active: boolean;
  deleted: boolean;
  numOfEvents: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title: string;
  description: string | null;
  notifications: Notifications;
  priority: number;
  frequency: Frequency;
  tags: Array<string>;
  images: Array<string>;
  dates: Array<Timestamp>;
  completedEvents: Array<Timestamp>;
  deletedEvents: Array<Timestamp>;
}

export type EventGroups = EventGroup[];

export type FirebaseEventsGroup = Omit<EventGroup, 'tags' | 'images'> & {
  tags: Tags;
  images: Images;
};
