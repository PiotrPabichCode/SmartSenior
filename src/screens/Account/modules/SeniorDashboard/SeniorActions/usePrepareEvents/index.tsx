import { EventGroups } from '@src/models';
import { useEffect, useState } from 'react';
import { UserEvents } from '../types';
import { Timestamp } from 'firebase/firestore';
import { createTags } from '@src/redux/events/events.api';

export const usePrepareEvents = (eventGroups: EventGroups, onLoad: any) => {
  const [events, setEvents] = useState<UserEvents>([]);

  useEffect(() => {
    const prepareEvents = (eventGroups: EventGroups) => {
      const events: UserEvents = [];
      eventGroups = eventGroups.filter(e => e.active);
      const now = Timestamp.now().toMillis();
      for (const group of eventGroups) {
        let i = 0;
        const tags = createTags(group.tags);
        const dates = group.dates.filter(d => d.toMillis() >= now);
        for (const date of dates) {
          if (group.completedEvents.findIndex(e => e.isEqual(date)) !== -1) {
            continue;
          }
          events.push({
            date: date,
            title: group.title,
            groupKey: group.key,
            tags: tags,
          });
          i++;
        }
      }
      setEvents(
        events.sort((a, b) => {
          if (a.date && b.date) {
            return a.date.toMillis() - b.date.toMillis();
          }
          return 0;
        }),
      );
      onLoad(false);
    };

    prepareEvents(eventGroups);
  }, []);

  return { events, setEvents };
};
