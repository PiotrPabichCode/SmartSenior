import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Switch } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { renderLocalDateWithTime } from '@src/utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import { EventDetails } from '@src/redux/types/eventsTypes';

type EventItemProps = PropsWithChildren<{
  eventKey: string;
  event: EventDetails;
}>;

type DayProps = PropsWithChildren<{
  active: boolean;
  shortTitle: string;
  title: string;
  value: number;
}>;

const EventItem = ({ eventKey, event }: EventItemProps) => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  function generateDayTags() {
    return Object.values(event.days).map((day: DayProps, index) => {
      return (
        <Text
          style={day.active ? styles.activeDay : styles.inactiveDay}
          key={index}>
          {day.shortTitle}
        </Text>
      );
    });
  }

  return (
    <>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.viewStyle}
        onPress={() =>
          navigate('EventItem', {
            eventKey: eventKey,
            event: event,
          })
        }>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.viewDetails}>
          <Text style={styles.time} numberOfLines={1}>
            {renderLocalDateWithTime(event.executionTime)}
          </Text>
          <View style={styles.viewRightPanel}>
            <Text style={styles.days}>{generateDayTags()}</Text>
            <Switch
              value={event.active}
              onValueChange={(value) => setChecked(value)}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 18,
    fontWeight: '400',
    width: 190,
  },
  viewRightPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  days: {
    fontSize: 18,
    fontWeight: '500',
  },
  activeDay: {
    color: 'blue',
  },
  inactiveDay: {
    color: 'red',
  },
  viewDetails: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default EventItem;
