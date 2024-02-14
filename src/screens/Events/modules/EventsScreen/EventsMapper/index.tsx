import EventItem from './EventItem';
import Title from './Title';
import { EventItemProps } from './EventItem/utils';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { EventItems } from '../types';

type EventsMapperProps = {
  events: EventItems;
  visible: boolean;
  type: 'completed' | 'delayed' | 'upcoming';
};

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
        <ScrollView horizontal contentContainerStyle={styles.container}>
          <FlatList
            renderItem={renderItem}
            data={events}
            initialNumToRender={50}
            scrollEventThrottle={16}
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </>
    )
  );
};

export default EventsMapper;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
