import { Event } from '@src/models';
import { NotificationProps } from './Notifications';

const createNotificationFromEvent = (event: Event): NotificationProps => {
  return {
    id: event.key,
    title: event.title,
    body: event.description,
    data: event.createdAt,
    displayBefore: event.notifications.timeBefore,
    datetimeNotification: event.date!,
  };
};

export async function addEventNotification(event: Event): Promise<void> {
  try {
    const notification = createNotificationFromEvent(event);
  } catch (error) {}
}
