import { useLocalStorage } from '@src/hooks/useLocalStorage';
import * as Notifications from 'expo-notifications';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export const NOTIFICATIONS_LOCAL_STORAGE = '@notifications';

export interface NotificationProps {
  id: string;
  title: string;
  body: string;
  data: any;
  displayBefore: number;
  datetimeNotification: Timestamp;
}

export interface NotificationStorageProps {
  [id: string]: {
    data: NotificationProps;
    notificationId: string;
  };
}

export async function saveNotification(notification: NotificationProps): Promise<void> {
  try {
    const displayBefore = notification.displayBefore * 60;
    const now = Timestamp.now().seconds;
    const notificationDatetime = notification.datetimeNotification.seconds;

    const seconds = Math.abs(Math.ceil(now - notificationDatetime - displayBefore));
    const notificationId = await scheduleNotification(notification, seconds);

    const storage = useLocalStorage(NOTIFICATIONS_LOCAL_STORAGE);

    const data = await storage.getItem();
    const oldNotifications = data ? (JSON.parse(data) as NotificationStorageProps) : {};

    const newNotification = {
      [notification.id]: {
        data: notification,
        notificationId,
      },
    };
    await storage.setItem(
      JSON.stringify({
        ...newNotification,
        ...oldNotifications,
      }),
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function scheduleNotification(
  notification: NotificationProps,
  timeout: number,
): Promise<string> {
  try {
    return Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        data: {
          data: notification.data,
        },
      },
      trigger: timeout,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
