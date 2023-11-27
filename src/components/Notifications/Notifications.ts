import * as Notifications from 'expo-notifications';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

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

export async function cancelNotification(notificationId: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.log(error);
  }
}

export async function saveNotification(notification: NotificationProps): Promise<string> {
  try {
    const displayBefore = notification.displayBefore * 60;
    const now = Timestamp.now().seconds;
    const notificationDatetime = notification.datetimeNotification.seconds;

    const seconds = Math.abs(Math.ceil(now - notificationDatetime - displayBefore));
    const notificationId = await scheduleNotification(notification, seconds);
    const date = moment().add({ seconds: seconds });
    console.log(`Notification will trigger in ${date}`);
    return notificationId;
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
