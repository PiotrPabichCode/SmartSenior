import { Timestamp } from 'firebase/firestore';

export interface NotesCardProps {
  noteKey: string;
  title: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  description: string;
  extended: boolean;
}
