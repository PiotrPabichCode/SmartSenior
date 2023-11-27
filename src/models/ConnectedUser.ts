import { EventGroups } from './EventGroup';
import { User } from './User';

export interface ConnectedUser {
  user: User;
  eventGroups: EventGroups;
}

export type ConnectedUsers = ConnectedUser[];
