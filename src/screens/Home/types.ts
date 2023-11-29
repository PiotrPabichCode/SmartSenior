import { Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';

interface UpcomingEventItem {
  groupKey: string;
  title: string;
  date: Timestamp;
  tags: Tags;
}

export type UpcomingEventItems = UpcomingEventItem[];
