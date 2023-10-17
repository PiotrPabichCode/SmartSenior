import { useReducer } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DayField, { Day } from './DayField';
import { translate } from '@src/localization/Localization';
import { renderDayValue } from '@src/utils/utils';

interface DaysProps {
  days: Day[];
  startDate: any;
  setFieldValue: any;
}

const DayFieldsRenderer = ({ days, startDate, setFieldValue }: DaysProps) => {
  const renderDaysLabel = () => {
    const activeDays = days.filter((day) => day.active);
    return (
      activeDays.length > 0 && (
        <Text style={styles.label}>
          {translate('dayFields.repeat') +
            activeDays
              .map((day) =>
                day.active ? renderDayValue(day.value, false) : ''
              )
              .join(', ')}
        </Text>
      )
    );
  };

  const [_, update] = useReducer((x) => x + 1, 0);

  const toggleDay = (day: any) => {
    const date = new Date(startDate);
    day.active = !day.active;
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
