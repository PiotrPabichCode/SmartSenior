import { Events } from './Event';
import { User } from './User';

export interface ConnectedUser {
  user: User;
  events: Events;
}

export type ConnectedUsers = ConnectedUser[];
