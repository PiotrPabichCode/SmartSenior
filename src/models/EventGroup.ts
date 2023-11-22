import { Timestamp } from 'firebase/firestore';
import { Frequency } from './Frequency';
import { Notifications } from './Notifications';

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
}

export type EventGroups = EventGroup[];
