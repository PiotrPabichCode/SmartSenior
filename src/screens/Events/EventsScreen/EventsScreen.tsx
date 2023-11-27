import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { EventsGroupScreenProps } from '@src/navigation/types';
import { useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey } from '@src/redux/events/events.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { CheckBox, Switch, Text } from '@rneui/themed';
import { EventGroup, Frequency, Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { createTags } from '@src/redux/events/events.api';
import { CompletedEvents, DelayedEvents, UpcomingEvents } from './components';
import { t } from '@src/localization/Localization';

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
      const completedEvents = eventItems.filter(e => e.completed);
      setCompletedEvents(completedEvents);
      const delayedEvents = eventItems.filter(e => e.date.toMillis() < Timestamp.now().toMillis());
      setDelayedEvents(delayedEvents);
      const upcomingEvents = eventItems.filter(
        e => e.date.toMillis() >= Timestamp.now().toMillis() && !e.completed,
      );
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
      <DelayedEvents visible={showDelayedEvents} events={delayedEvents} />
      <CompletedEvents visible={showCompletedEvents} events={completedEvents} />
      <UpcomingEvents visible={true} events={upcomingEvents} />
    </CustomScrollContainer>
  );
};

export default EventsScreen;
