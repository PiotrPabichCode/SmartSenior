import { User } from './User';
import { ChatMessages } from './ChatMessage';

export interface Chat {
  userID: string;
  username: string;
  messages: ChatMessages;
  active: boolean;
}

export type Chats = Chat[];
