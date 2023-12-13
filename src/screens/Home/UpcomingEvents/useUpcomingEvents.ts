import { EventGroups } from '@src/models';
import { useEffect, useState } from 'react';
import { UpcomingEventItems } from '../types';
import { createTags } from '@src/redux/events/events.api';
import { Timestamp } from 'firebase/firestore';

export const useUpcomingEvents = (eventGroups: EventGroups) => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventItems>([]);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const prepareUpcomingEvents = (eventGroups: EventGroups) => {
      const upcomingEvents: UpcomingEventItems = [];
      eventGroups = eventGroups.filter(e => e.active);
      for (const group of eventGroups) {
        let i = 0;
        const tags = createTags(group.tags);
        const dates = group.dates.filter(d => d.toMillis() >= Timestamp.now().toMillis());
        for (const date of dates) {
          if (i === 4) {
            break;
          }
          if (group.completedEvents.findIndex(e => e.isEqual(date)) !== -1) {
            continue;
          }
          upcomingEvents.push({
            date: date,
            title: group.title,
            groupKey: group.key,
            tags: tags,
          });
          i++;
        }
      }
      setUpcomingEvents(
        upcomingEvents.sort((a, b) => {
          if (a.date && b.date) {
            return a.date.toMillis() - b.date.toMillis();
          }
          return 0;
        }),
      );
      setIsReady(true);
      console.log(upcomingEvents);
    };

    prepareUpcomingEvents(eventGroups);
  }, [eventGroups]);

  return { upcomingEvents, isReady };
};
