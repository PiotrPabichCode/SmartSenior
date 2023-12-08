import { EventsMapperProps } from './types';
import EventItem from './EventItem';
import Title from './Title';
import { FlashList } from '@shopify/flash-list';
import { EventItemProps } from './EventItem/utils';

const EventsMapper = ({ events, visible, type }: EventsMapperProps) => {
  const renderItem = ({ item }: { item: EventItemProps }) => {
    return (
      <EventItem
        groupKey={item.groupKey}
        title={item.title}
        date={item.date}
        active={item.active}
        tags={item.tags}
        completed={item.completed}
      />
    );
  };

  return (
    visible &&
    events.length > 0 && (
      <>
        <Title type={type} />
        <FlashList
          renderItem={renderItem}
          data={events}
          scrollEnabled={false}
          estimatedItemSize={78}
          onLoad={e => {
            console.log(e);
          }}
        />
      </>
    )
  );
};

export default EventsMapper;
