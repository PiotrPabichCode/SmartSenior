import { View, StyleSheet, Text } from 'react-native';
import DayField, { Day } from './DayField';
import { t } from '@src/localization/Localization';
import { renderDayValue } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';

interface DaysProps {
  days: Day[];
  startDate: Timestamp;
  setFieldValue: any;
}

const DayFieldsRenderer = ({ days, startDate, setFieldValue }: DaysProps) => {
  const renderDaysLabel = () => {
    const activeDays = days.filter(day => day.active);
    return (
      activeDays.length > 0 && (
        <Text style={styles.label}>
          {t('dayFields.repeat') +
            activeDays.map(day => renderDayValue(day.value, false)).join(', ')}
        </Text>
      )
    );
  };

  const toggleDay = (day: Day) => {
    if (day.value === startDate.toDate().getDay()) {
      setFieldValue('date', null);
      setFieldValue(
        'days',
        days.map(d => ({
          ...d,
          active: false,
        })),
      );
      return;
    }

    const updatedDays = days.map(d => ({
      ...d,
      active: d.value === day.value ? !d.active : d.active,
    }));
    setFieldValue('days', updatedDays);
  };

  return (
    <View>
      {renderDaysLabel()}
      <View style={styles.view}>
        {days.map((day, index) => {
          return (
            <DayField
              key={index + 'day'}
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
