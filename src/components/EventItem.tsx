import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Switch } from '@rneui/themed';

import type { PropsWithChildren } from 'react';

type EventItemProps = PropsWithChildren<{
  title: string;
  time: string;
  days: string;
}>;

const EventItem = ({ title, time, days }: EventItemProps) => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewDetails}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.viewRightPanel}>
          <Text style={styles.days}>{days}</Text>
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
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 20,
    fontWeight: '400',
    width: 150,
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
  viewDetails: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dividerStyle: {
    backgroundColor: '#000000',
    width: 400,
    height: 1,
  },
});

export default EventItem;
