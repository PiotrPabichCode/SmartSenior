import { Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';

export interface UserEvent {
  date: Timestamp;
  title: string;
  tags: Tags;
  groupKey: string;
}

export type UserEvents = UserEvent[];
