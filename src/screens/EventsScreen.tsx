import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventItem from '../components/EventItem';
import { Divider } from '@rneui/themed';
import { EventsProps } from '../navigation/types';
import SpeedDialMenu from '../navigation/SpeedDialMenu';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import CustomToast from '../custom/CustomToast';

import type { PropsWithChildren } from 'react';

type EventProp = PropsWithChildren<{
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
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const loadUserEvents = async () => {
      try {
        const eventsQuery = query(
          ref(db, 'events'),
          orderByChild('userUid'),
          equalTo(getAuth().currentUser?.uid!! + '-deleted-false')
        );

        const eventsSnapshot = await get(eventsQuery);
        const eventsValues = eventsSnapshot.val();
        setEvents(Object.values(eventsValues));
      } catch (e) {
        console.log(e);
        CustomToast('error', 'Nie udało się załadować wydarzeń');
      }
    };
    loadUserEvents();
  }, []);
  // console.log(events);
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
                  key={'event' + index}
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

          {/* <EventItem
            title='Pomiar ciśnienia'
            time='Godzina 17:00'
            days='Codziennie'
          />
          <EventItem
            title='Zadzwonić do wnuczka'
            time='Godzina 10:00'
            days='pwścpsn'
          />
          <EventItem
            title='Wzięcie leków porannych'
            time='Godzina 08:00'
            days='Codziennie'
          /> */}
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
