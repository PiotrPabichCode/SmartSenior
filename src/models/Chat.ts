import { ChatUsers } from './ChatUser';

export interface Chat {
  key: string;
  users: ChatUsers;
  active: boolean;
}

export type Chats = Chat[];
