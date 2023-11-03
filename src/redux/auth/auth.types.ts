import { ROLES } from '@src/constants/Constants';
import { EventDetails } from '../events/events.types';

export type AuthCredentials = {
  email: string;
  password: string;
};

export type User = {
  email: string | null | undefined;
  uid: string | null | undefined;
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
  userDetails: UserDetails;
  events: EventDetails[];
};
