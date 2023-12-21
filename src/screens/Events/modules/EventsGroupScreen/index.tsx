import { StyleSheet } from 'react-native';
import { CustomScrollContainer } from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { selectEventGroups } from '@src/redux/events/events.slice';
import NoEvents from './NoEvents';
import { EventsScreenProps } from '@src/navigation/types';
import { t } from '@src/localization/Localization';
import { useEffect, useState } from 'react';
import { EventGroups } from '@src/models';
import EventsGroupsMapper from './EventsGroupsMapper';
import { Text } from '@rneui/themed';

const EventsGroupScreen = ({ route }: EventsScreenProps) => {
  const styles = useStyles();
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const [filteredData, setFilteredData] = useState<EventGroups | null>(null);
  const outputEvents = filteredData ? filteredData : eventGroups;

  useEffect(() => {
    if (route?.params?.filteredData) {
      setFilteredData(route.params.filteredData);
    }
    if (route?.params?.filterConditions) {
      console.log('Filter conditions', route.params.filterConditions);
    }
  }, [route.params]);

  return (
    <CustomScrollContainer>
      <Text style={styles.title}>{t('eventGroups.title')}</Text>
      {eventGroups.length > 0 ? <EventsGroupsMapper eventsGroups={outputEvents} /> : <NoEvents />}
    </CustomScrollContainer>
  );
};

export default EventsGroupScreen;

const useStyles = () =>
  StyleSheet.create({
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      padding: 10,
    },
  });
