import { ChatMessages } from './ChatMessage';
import { ChatUsers } from './ChatUser';

export interface Chat {
  key: string;
  users: ChatUsers;
  messages: ChatMessages;
  active: boolean;
}

export type Chats = Chat[];
