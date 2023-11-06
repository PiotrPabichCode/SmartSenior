import { EventDetails } from '../events/events.types';

export type AuthCredentials = {
  email: string;
  password: string;
};

export type User = {
  email: string | null;
  uid: string | null;
};

export type UserDetails = {
  firstName: string;
  lastName: string;
  birthDate: null | string;
  gender: string;
  email: string | null | undefined;
  role: string;
};

export type ConnectedUser = {
  id: string;
  userDetails: UserDetails;
  events: EventDetails[];
  deleted: boolean;
};

export type ConnectedUsers = ConnectedUser[];
