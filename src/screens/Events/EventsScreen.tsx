import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { EventsGroupScreenProps } from '@src/navigation/types';
import { useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey } from '@src/redux/events/events.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { Text } from '@rneui/themed';
import { EventGroup, Frequency, Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import NewEventItem from './NewEventItem';
import { createTags } from '@src/redux/events/events.api';

interface EventItem {
  groupKey: string;
  date: Timestamp;
  title: string;
  tags: Tags;
  active: boolean;
  completed?: boolean;
}

type EventItems = EventItem[];

const EventsScreen = ({ route, navigation }: EventsGroupScreenProps) => {
  const { groupKey } = route.params;
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));
  const [eventItems, setEventItems] = useState<EventItems>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const theme = useAppSelector(state => selectTheme(state));
  const styles = Colors[theme];

  if (!eventsGroup) {
    goBack();
    return null;
  }

  useEffect(() => {
    const prepareEventItems = (eventsGroup: EventGroup) => {
      const eventItems: EventItems = [];
      const tags = createTags(eventsGroup.tags);
      for (const date of eventsGroup.dates) {
        eventItems.push({
          groupKey: eventsGroup.key,
          date: date,
          title: eventsGroup.title,
          tags: tags,
          active: eventsGroup.active,
          completed: eventsGroup.completedEvents.findIndex(d => d.isEqual(date)) !== -1,
        });
      }
      setEventItems(eventItems);
      setIsReady(true);
    };

    prepareEventItems(eventsGroup);
  }, [eventsGroup]);

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  const mapEventItems = eventItems.map((e, index) => {
    return (
      <NewEventItem
        key={index}
        groupKey={e.groupKey}
        title={e.title}
        date={e.date}
        active={e.active}
        tags={e.tags}
        completed={e.completed}
      />
    );
  });

  return (
    <CustomScrollContainer theme={styles}>
      <Text h2 numberOfLines={1} adjustsFontSizeToFit>
        {eventsGroup.title}
      </Text>
      {mapEventItems}
    </CustomScrollContainer>
  );
};

export default EventsScreen;
