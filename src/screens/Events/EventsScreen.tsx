import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventItem from '@src/screens/Events/EventItem';
import { useAppSelector } from '@src/redux/store';
import { EventDetails } from '@src/redux/types/eventsTypes';
import { translate } from '@src/localization/Localization';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { Theme } from '@src/redux/types';
import Colors from '@src/constants/Colors';

const EventsScreen = () => {
  const events: EventDetails[] = useAppSelector(state => state.events.events);
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{translate('eventsScreen.title')}</Text>
      {Object.values(events).map((event, index) => {
        return <EventItem key={index} eventKey={event.key} />;
      })}
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
