import { Event } from '@src/models';
import { getEventForGroupAndDate } from '@src/redux/events/events.api';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const usePrepareEvent = (groupKey: string, date: Timestamp) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({});
  useEffect(() => {
    const prepareEvent = async () => {
      try {
        if (groupKey && date) {
          const _event = await getEventForGroupAndDate(groupKey, date);
          setEvent(_event);
          setIsReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    prepareEvent();
  }, [groupKey, date]);

  useEffect(() => {
    if (event) {
      setInitialValues({
        title: event.title,
        tags: event.tags,
        images: event.images,
        description: event.description,
        date: event.date,
        days: event.days,
        frequency: event.frequency,
        notifications: event.notifications,
        priority: event.priority,
        deleted: event.deleted,
        completed: event.completed,
        userUid: event.userUid,
      });
    }
  }, [event]);

  return { event, isReady, initialValues, setInitialValues };
};
