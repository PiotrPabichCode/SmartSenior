import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ConnectedUser } from '@src/models';
import { t } from '@src/localization/Localization';
import { getSeniorLocation } from '@src/redux/auth/auth.api';
import EventsMapper from './EventsMapper';
import { useState } from 'react';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { usePrepareEvents } from './usePrepareEvents';
import { useAppSelector } from '@src/redux/types';
import { selectEventsStatus } from '@src/redux/events/events.slice';

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const eventGroups = user.eventGroups;
  const status = useAppSelector(state => selectEventsStatus(state));
  const [isLoading, setIsLoading] = useState(true);
  const { events, setEvents } = usePrepareEvents(eventGroups, setIsLoading);

  if (isLoading || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          getSeniorLocation(user.user.uid);
        }}>
        <Text style={styles.actionText} numberOfLines={1}>
          {t('seniorDashboard.localization')}
        </Text>
      </TouchableOpacity>
      <EventsMapper events={events} setEvents={setEvents} user={user} onLoad={setIsLoading} />
    </View>
  );
};

export default SeniorActions;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  actionContainer: {
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    padding: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
