import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventItem from '../components/EventItem';
import { Divider } from '@rneui/themed';
import { EventsProps } from '../navigation/types';
import SpeedDialMenu from '../navigation/SpeedDialMenu';

import type { PropsWithChildren } from 'react';
import { loadUserActiveEvents } from '../firebase/queries';

export type EventProp = PropsWithChildren<{
  title: string;
  description: string;
  executionTime: number;
  date: number;
  isCyclic: boolean;
  cyclicTime: number;
  isNotification: boolean;
  notificationTime: number;
  priority: number;
  updatedAt: number;
  createdAt: number;
  userUid: string;
  days: object;
}>;

const EventsScreen = ({ navigation }: EventsProps) => {
  const [events, setEvents] = useState<EventProp[]>([]);
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData: any = await loadUserActiveEvents();
        setEvents(eventsData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  console.log(events[0]);

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Wydarzenia</Text>
          <Divider style={styles.dividerStyle} />

          {events.length > 0 &&
            events.map((event: EventProp, index: number) => {
              return (
                <EventItem
                  key={index}
                  title={event.title}
                  time={
                    new Date(event.executionTime).toLocaleDateString() +
                    ' ' +
                    new Date(event.executionTime).toLocaleTimeString()
                  }
                  days={event.days}
                />
              );
            })}
        </View>
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
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
