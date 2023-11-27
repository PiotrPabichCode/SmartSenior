import { EventGroup, Notifications } from '@src/models';
import { NotificationProps, saveNotification } from './Notifications';
import { Timestamp } from 'firebase/firestore';

const createNotificationFromEventsGroup = (
  group: EventGroup,
  date: Timestamp,
): NotificationProps => {
  return {
    id: group.key,
    title: group.title,
    body: group.description ?? '',
    data: {
      groupKey: group.key,
      date: date,
    },
    displayBefore: group.notifications.timeBefore ?? 0,
    datetimeNotification: date,
  };
};

export async function setupEventsGroupNotification(
  group: EventGroup,
  date: Timestamp,
): Promise<string> {
  try {
    const notification = createNotificationFromEventsGroup(group, date);
    return await saveNotification(notification);
  } catch (error) {
    throw error;
  }
}
