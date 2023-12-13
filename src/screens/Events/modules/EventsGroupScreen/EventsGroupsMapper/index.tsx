import { EventGroups } from '@src/models';
import EventsGroupItem from './EventsGroupItem';

type Props = {
  eventsGroups: EventGroups;
};

const EventsGroupsMapper = ({ eventsGroups }: Props) => {
  return eventsGroups.map((e, index) => {
    return <EventsGroupItem key={index} groupKey={e.key} />;
  });
};

export default EventsGroupsMapper;
