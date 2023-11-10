import { StyleSheet, Text } from 'react-native';
import EventItem from '@src/screens/Events/EventItem';
import { useAppSelector } from '@src/redux/store';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { Events, Theme } from '@src/models';

const EventsScreen = () => {
  const events: Events = useAppSelector(state => state.events.events);
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('eventsScreen.title')}</Text>
      {Object.entries(events).map(([key], index) => {
        return <EventItem key={index} eventKey={key} />;
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
