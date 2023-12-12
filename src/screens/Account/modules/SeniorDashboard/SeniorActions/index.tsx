import { View, StyleSheet } from 'react-native';
import { ConnectedUser } from '@src/models';
import { t } from '@src/localization/Localization';
import EventsMapper from './EventsMapper';
import { useState } from 'react';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { usePrepareEvents } from './usePrepareEvents';
import { useAppSelector } from '@src/redux/types';
import { selectEventsStatus } from '@src/redux/events/events.slice';
import { Text } from '@rneui/themed';
import Colors from '@src/constants/Colors';
import SeniorLocationButton from './SeniorLocationButton';

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const eventGroups = user.eventGroups;
  const status = useAppSelector(state => selectEventsStatus(state));
  const [isLoading, setIsLoading] = useState(true);
  const { events, setEvents } = usePrepareEvents(eventGroups, setIsLoading);

  if (isLoading || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      <Text h3>{t('seniorDashboard.availableActions')}</Text>
      <SeniorLocationButton user={user} />
      <EventsMapper events={events} onEvent={setEvents} user={user} onLoad={setIsLoading} />
    </View>
  );
};

export default SeniorActions;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    width: '95%',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
    gap: 10,
  },
});
