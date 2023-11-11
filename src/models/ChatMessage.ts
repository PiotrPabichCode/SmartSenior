import { Timestamp } from 'firebase/firestore';
import { IMessage } from 'react-native-gifted-chat';

export interface ChatMessage {
  _id: string;
  createdAt: Timestamp;
  text: string;
  user: IMessage['user'];
  fromUserID: string;
  toUserID: string;
  read: boolean;
}

export type ChatMessages = ChatMessage[];
