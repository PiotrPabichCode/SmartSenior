import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventItem from '@src/screens/Events/EventItem';
import { Divider } from '@rneui/themed';
import { useAppSelector } from '@src/redux/store';
import { EventDetails } from '@src/redux/types/eventsTypes';

const EventsScreen = () => {
  const events = useAppSelector((state) => state.events.events);

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Wydarzenia</Text>
          <Divider style={styles.dividerStyle} />

          {events.length > 0 &&
            events.map((event: EventDetails, index: number) => {
              return (
                <EventItem
                  key={index}
                  title={event.title}
                  time={event.executionTime}
                  days={event.days}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    padding: 10,
    gap: 15,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
  },
  dividerStyle: {
    backgroundColor: '#000000',
    width: 270,
    height: 1,
  },
});

export default EventsScreen;
