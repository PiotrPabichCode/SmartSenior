import { Button } from '@rneui/themed';
import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

export interface Day {
  shortTitle: string;
  title?: string;
  value: number;
  active: any;
  onPress?: () => void;
}

const DayField = ({ shortTitle, active, onPress }: Day) => {
  return (
    <Button
      title={shortTitle}
      buttonStyle={[
        styles.button,
        active ? styles.dayActive : styles.dayInactive,
      ]}
      titleStyle={styles.title}
      containerStyle={styles.container}
      type='outline'
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  button: {
    alignContent: 'center',
    borderRadius: 25,
    borderColor: 'rgba(78, 116, 289, 1)',
    borderWidth: 1.3,
    textAlign: 'center',
  },
  dayActive: {
    backgroundColor: 'lightgreen',
  },
  dayInactive: {
    backgroundColor: 'transparent',
  },
  container: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});

export default DayField;
