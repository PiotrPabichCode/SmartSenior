import { EventGroup } from '@src/models';
import { createTags } from '@src/redux/events/events.api';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { EventItems } from './types';

export const usePrepareEvents = (eventsGroup: EventGroup) => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItems>([]);
  const [completedEvents, setCompletedEvents] = useState<EventItems>([]);
  const [delayedEvents, setDelayedEvents] = useState<EventItems>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const prepareEventItems = (eventsGroup: EventGroup) => {
      const tags = createTags(eventsGroup.tags);
      const now = Timestamp.now().toMillis();
      const completedEvents = [];
      const delayedEvents = [];
      const upcomingEvents = [];
      for (const date of eventsGroup.dates) {
        const event = {
          groupKey: eventsGroup.key,
          date: date,
          title: eventsGroup.title,
          tags: tags,
          active: eventsGroup.active,
          completed: eventsGroup.completedEvents.findIndex(d => d.isEqual(date)) !== -1,
        };
        if (event.completed) {
          completedEvents.push(event);
        } else if (event.date.toMillis() < now) {
          delayedEvents.push(event);
        } else {
          upcomingEvents.push(event);
        }
      }
      setCompletedEvents(completedEvents);
      setDelayedEvents(delayedEvents);
      setUpcomingEvents(upcomingEvents);
      setIsReady(true);
    };

    prepareEventItems(eventsGroup);
  }, [eventsGroup]);

  return { completedEvents, delayedEvents, upcomingEvents, isReady };
};
