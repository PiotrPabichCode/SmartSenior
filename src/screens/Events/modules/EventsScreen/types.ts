import { Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';

export interface EventItem {
  groupKey: string;
  date: Timestamp;
  title: string;
  tags: Tags;
  active: boolean;
  completed?: boolean;
}

export type EventItems = EventItem[];
