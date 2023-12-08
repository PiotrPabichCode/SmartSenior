import { EventItems } from '..';

export interface EventsMapperProps {
  events: EventItems;
  visible: boolean;
  type: 'completed' | 'delayed' | 'upcoming';
}
