import { Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';

export interface EventItemProps {
  groupKey: string;
  title: string;
  date: Timestamp;
  tags: Tags;
  active: boolean;
  completed?: boolean;
}
