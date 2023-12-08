import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { EventsGroupScreenProps } from '@src/navigation/types';
import { useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey, selectEventsStatus } from '@src/redux/events/events.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { CheckBox, Switch, Text } from '@rneui/themed';
import { EventGroup, Frequency, Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { createTags } from '@src/redux/events/events.api';
import { t } from '@src/localization/Localization';
import EventsMapper from './EventsMapper';

interface EventItem {
  groupKey: string;
  date: Timestamp;
  title: string;
  tags: Tags;
  active: boolean;
  completed?: boolean;
}

export type EventItems = EventItem[];

const EventsScreen = ({ route, navigation }: EventsGroupScreenProps) => {
  const { groupKey } = route.params;
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));
  const status = useAppSelector(state => selectEventsStatus(state));
  const [upcomingEvents, setUpcomingEvents] = useState<EventItems>([]);
  const [completedEvents, setCompletedEvents] = useState<EventItems>([]);
  const [delayedEvents, setDelayedEvents] = useState<EventItems>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const theme = useAppSelector(state => selectTheme(state));
  const styles = Colors[theme];

  const [showDelayedEvents, setShowDelayedEvents] = useState<boolean>(false);
  const [showCompletedEvents, setShowCompletedEvents] = useState<boolean>(false);

  if (!eventsGroup) {
    goBack();
    return null;
  }

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

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={styles}>
      <Text h2 numberOfLines={1} adjustsFontSizeToFit>
        {eventsGroup.title}
      </Text>
      <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        <CheckBox
          checked={showDelayedEvents}
          title={t('eventGroups.delayedEventsTitle')}
          onPress={() => setShowDelayedEvents(!showDelayedEvents)}
          textStyle={{ fontSize: 11 }}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <CheckBox
          checked={showCompletedEvents}
          title={t('eventGroups.completedEventsTitle')}
          onPress={() => setShowCompletedEvents(!showCompletedEvents)}
          textStyle={{ fontSize: 11 }}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
      </View>
      <View
        style={{
          flexGrow: 1,
          maxHeight: '95%',
          minHeight: 2,
          minWidth: '100%',
        }}>
        <View style={{ flex: 1 }}>
          <EventsMapper visible={showDelayedEvents} events={delayedEvents} type="delayed" />
          <EventsMapper visible={showCompletedEvents} events={completedEvents} type="completed" />
          <EventsMapper visible={true} events={upcomingEvents} type="upcoming" />
        </View>
      </View>
    </CustomScrollContainer>
  );
};

export default EventsScreen;
