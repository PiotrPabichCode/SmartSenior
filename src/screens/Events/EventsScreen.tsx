import { StyleSheet, Text } from 'react-native';
import EventItem from '@src/screens/Events/EventItem';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/types';
import { selectEventGroups, selectEvents } from '@src/redux/events/events.slice';
import { selectTheme } from '@src/redux/auth/auth.slice';
import NoEvents from './NoEvents';
import { Events } from '@src/models';
import { useEffect, useState } from 'react';
import { EventsScreenProps } from '@src/navigation/types';
import EventGroupItem from './EventGroupItem';

const EventsScreen = ({ route }: EventsScreenProps) => {
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  console.log(eventGroups);
  // const [filteredData, setFilteredData] = useState<Events | null>(null);
  // const outputEvents = filteredData ? filteredData : events;

  // useEffect(() => {
  //   if (route?.params?.filteredData) {
  //     setFilteredData(route.params.filteredData);
  //   }
  //   if (route?.params?.filterConditions) {
  //     console.log('Filter conditions', route.params.filterConditions);
  //   }
  // }, [route.params]);

  // const mapEvents = outputEvents.map((event, index) => {
  //   return <EventItem key={index} eventKey={event.key} />;
  // });

  const mapEventGroups = eventGroups.map((e, index) => {
    return <EventGroupItem key={index} groupKey={e.key} />;
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>Grupy wydarzeń</Text>
      {mapEventGroups}
      {/* {events.length === 0 ? <NoEvents /> : mapEvents} */}
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

export default EventsScreen;
