import { EventGroup } from '@src/models';
import { createDays, createImages, createTags } from '@src/redux/events/events.api';
import { RecurringValues, recurringTimes } from '@src/redux/events/events.constants';
import { useEffect, useState } from 'react';

export const usePrepareEventsGroup = (eventsGroup: EventGroup) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [isReady, setIsReady] = useState(false);
  const [recurringValue, setRecurringValue] = useState<RecurringValues | null>(null);
  useEffect(() => {
    if (eventsGroup) {
      setInitialValues({
        title: eventsGroup.title,
        tags: createTags(eventsGroup.tags),
        images: createImages(eventsGroup.images),
        description: eventsGroup.description,
        date: eventsGroup.dates[0],
        days: createDays(eventsGroup.frequency.daysOfWeek),
        frequency: eventsGroup.frequency,
        notifications: eventsGroup.notifications,
        priority: eventsGroup.priority,
        deleted: eventsGroup.deleted,
        updatedAt: eventsGroup.updatedAt,
        userUid: eventsGroup.userID,
      });
      const interval = eventsGroup.frequency.interval;
      const unit = eventsGroup.frequency.unit;
      const matchedValue = recurringTimes.find(
        r => r.interval === interval && r.unit === unit,
      )?.value;
      if (matchedValue) {
        setRecurringValue(matchedValue);
      }
      setIsReady(true);
    }
  }, [eventsGroup]);

  return { initialValues, setInitialValues, isReady, recurringValue, setRecurringValue };
};
