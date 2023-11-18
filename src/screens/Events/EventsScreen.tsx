import { StyleSheet, Text } from 'react-native';
import EventItem from '@src/screens/Events/EventItem';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/types';
import { selectEvents } from '@src/redux/events/events.slice';
import { selectTheme } from '@src/redux/auth/auth.slice';
import NoEvents from './NoEvents';
import { Events } from '@src/models';

const EventsScreen = () => {
  const events = useAppSelector(state => selectEvents(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  const mapEvents = events.map((event, index) => {
    return <EventItem key={index} eventKey={event.key} />;
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('eventsScreen.title')}</Text>
      {events.length === 0 ? <NoEvents /> : mapEvents}
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
