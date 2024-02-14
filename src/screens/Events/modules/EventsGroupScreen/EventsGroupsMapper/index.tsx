import { EventGroups } from '@src/models';
import EventsGroupItem from './EventsGroupItem';

type EventsGroupsMapperProps = {
  eventsGroups: EventGroups;
};

const EventsGroupsMapper = ({ eventsGroups }: EventsGroupsMapperProps) => {
  return eventsGroups.map((e, index) => {
    return <EventsGroupItem key={index} groupKey={e.key} />;
  });
};

export default EventsGroupsMapper;
