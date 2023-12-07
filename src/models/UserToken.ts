import { ExpoPushToken } from 'expo-notifications';

export interface UserToken {
  expoPushToken: ExpoPushToken;
  user: string;
}
