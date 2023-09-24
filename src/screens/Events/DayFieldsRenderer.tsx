import React, { useReducer } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DayField, { Day } from './DayField';

interface DaysProps {
  days: Day[];
  startDate: number;
  setFieldValue: any;
}

const DayFieldsRenderer = ({ days, startDate, setFieldValue }: DaysProps) => {
  const renderDaysLabel = () => {
    const activeDays = days.filter((day) => day.active);
    return (
      activeDays.length > 0 && (
        <Text style={styles.label}>
          {'Powtarzaj co: ' +
            activeDays
              .map((day) => (day.active ? `${day.title}` : ''))
              .join(', ')}
        </Text>
      )
    );
  };

  const [_, update] = useReducer((x) => x + 1, 0);

  const toggleDay = (day: any) => {
    const date = new Date(startDate);
    day.active = !day.active;
    console.log('DAY', day);
    console.log('DateDAY', date.getDay());
    if (date.getDay() === day.value) {
      days = days.map((day) => ({ ...day, active: false }));
      setFieldValue('date', 0);
    }
    setFieldValue('days', days);
    update();
  };

  return (
    <View>
      {renderDaysLabel()}
      <View style={styles.view}>
        {days.map((day: any, key: any) => {
          return (
            <DayField
              key={key + 'day'}
              shortTitle={day.shortTitle}
              value={day.value}
              active={day.active}
              onPress={() => toggleDay(day)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  label: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
    marginLeft: 20,
  },
});

export default DayFieldsRenderer;
