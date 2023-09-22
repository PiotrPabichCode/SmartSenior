import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventItem from '../components/EventItem';
import { Divider } from '@rneui/themed';
import { EventsProps } from '../navigation/types';
import SpeedDialMenu from '../navigation/SpeedDialMenu';

const EventsScreen = ({ navigation }: EventsProps) => {
  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Wydarzenia</Text>
        <Divider style={styles.dividerStyle} />
        <EventItem
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
        />
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    height: '100%',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
