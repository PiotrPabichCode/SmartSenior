import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Switch } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { renderLocalDateWithTime } from '@src/utils/utils';

type EventItemProps = PropsWithChildren<{
  title: string;
  time: number;
  days: object;
}>;

type DayProps = PropsWithChildren<{
  active: boolean;
  shortTitle: string;
  title: string;
  value: number;
}>;

const EventItem = ({ title, time, days }: EventItemProps) => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  function generateDayTags() {
    return Object.values(days).map((day: DayProps, index) => {
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
    <View style={styles.viewStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewDetails}>
        <Text style={styles.time} numberOfLines={1}>
          {renderLocalDateWithTime(time)}
        </Text>
        <View style={styles.viewRightPanel}>
          <Text style={styles.days}>{generateDayTags()}</Text>
          <Switch
            value={checked}
            onValueChange={(value) => setChecked(value)}
          />
        </View>
      </View>
      <Divider style={styles.dividerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: 'black',
  },
  viewDetails: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dividerStyle: {
    backgroundColor: '#000000',
    height: 1,
    width: 350,
  },
});

export default EventItem;
