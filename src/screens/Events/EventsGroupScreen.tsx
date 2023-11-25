import { StyleSheet, Text } from 'react-native';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/types';
import { selectEventGroups } from '@src/redux/events/events.slice';
import { selectTheme } from '@src/redux/auth/auth.slice';
import NoEvents from './NoEvents';
import { EventsScreenProps } from '@src/navigation/types';
import EventsGroupItem from './EventsGroupItem';
import { t } from '@src/localization/Localization';
import { useEffect, useState } from 'react';
import { EventGroups } from '@src/models';

const EventsGroupScreen = ({ route }: EventsScreenProps) => {
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
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

  const mapEventGroups = outputEvents.map((e, index) => {
    return <EventsGroupItem key={index} groupKey={e.key} />;
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('eventGroups.title')}</Text>
      {eventGroups.length > 0 ? mapEventGroups : <NoEvents />}
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default EventsGroupScreen;
