import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { EventsGroupScreenProps } from '@src/navigation/types';
import { useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey } from '@src/redux/events/events.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { CustomScrollContainer, CustomActivityIndicator } from '@src/components';
import { Text } from '@rneui/themed';
import EventsMapper from './EventsMapper';
import { usePrepareEvents } from './usePrepareEvents';
import DelayedEventsCheckbox from './DelayedEventsCheckbox';
import CompletedEventsCheckbox from './CompletedEventsCheckbox';

const EventsScreen = ({ route }: EventsGroupScreenProps) => {
  const { groupKey } = route.params;
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));

  const [showDelayedEvents, setShowDelayedEvents] = useState<boolean>(false);
  const [showCompletedEvents, setShowCompletedEvents] = useState<boolean>(false);

  if (!eventsGroup) {
    goBack();
    return null;
  }

  const { upcomingEvents, completedEvents, delayedEvents, isReady } = usePrepareEvents(eventsGroup);

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer>
      <Text h2 numberOfLines={1} adjustsFontSizeToFit>
        {eventsGroup.title}
      </Text>
      <View style={styles.checkboxContainer}>
        <DelayedEventsCheckbox checked={showDelayedEvents} onChange={setShowDelayedEvents} />
        <CompletedEventsCheckbox checked={showCompletedEvents} onChange={setShowCompletedEvents} />
      </View>
      <EventsMapper visible={showDelayedEvents} events={delayedEvents} type="delayed" />
      <EventsMapper visible={showCompletedEvents} events={completedEvents} type="completed" />
      <EventsMapper visible={true} events={upcomingEvents} type="upcoming" />
    </CustomScrollContainer>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsContainer: {
    minWidth: '100%',
    backgroundColor: 'yellow',
  },
});
