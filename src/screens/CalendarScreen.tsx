import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment'; // Import moment.js

const CalendarScreen = () => {
  const today = moment().format('YYYY-MM-DD');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
      <Agenda
        minDate={today}
        selected={today}
        items={{
          today: [
            { name: 'Cycling', height: 50, day: today },
            { name: 'Walking', height: 50, day: today },
            { name: 'Running', height: 50, day: today },
          ],
          '2023-07-25': [{ name: 'Writing', height: 50, day: '2023-07-25' }],
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        renderEmptyData={() => <View />}
        pastScrollRange={0}
        futureScrollRange={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
});

export default CalendarScreen;
