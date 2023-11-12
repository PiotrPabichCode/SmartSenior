import { StyleSheet, Text } from 'react-native';
import EventItem from '@src/screens/Events/EventItem';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { Theme } from '@src/models';
import { useAppSelector } from '@src/redux/types';
import { selectEvents } from '@src/redux/events/events.slice';
import { selectTheme } from '@src/redux/auth/auth.slice';
import NoEvents from './NoEvents';

const EventsScreen = () => {
  const events = useAppSelector(state => selectEvents(state));
  const theme: Theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  const mapEvents = Object.entries(events).map(([key], index) => {
    return <EventItem key={index} eventKey={key} />;
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
