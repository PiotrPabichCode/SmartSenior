import { Timestamp } from 'firebase/firestore';

export interface Note {
  key: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Notes = Note[];
