import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { Genders, Roles } from '@src/models';

export interface User {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: Timestamp | null;
  gender: Genders | null;
  role: Roles;
  connectedUsersIds: Array<string>;
}

export type Users = User[];

export const UserConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return { ...data } as User;
  },
};
