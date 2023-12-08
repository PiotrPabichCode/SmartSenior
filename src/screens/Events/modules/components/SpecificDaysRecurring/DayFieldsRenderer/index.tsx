import { View, StyleSheet, Text, Alert } from 'react-native';
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
  const handleDeleteDate = () => {
    Alert.alert(t('alertEventDeleteDateTitle'), t('alertEventDeleteDateQuestion'), [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: () => {
          setFieldValue('date', null);
          setFieldValue('frequency', {
            recurring: false,
            endDate: null,
            type: null,
            daysOfWeek: [],
            interval: 1,
            unit: 'day',
          });
          setFieldValue(
            'days',
            days.map(d => ({
              ...d,
              active: false,
            })),
          );
        },
      },
    ]);
  };

  const toggleDay = (day: Day) => {
    if (day.value === startDate.toDate().getDay()) {
      handleDeleteDate();
      return;
    }

    const updatedDays = days.map(d => ({
      ...d,
      active: d.value === day.value ? !d.active : d.active,
    }));
    setFieldValue('days', updatedDays);
    const activeDays = updatedDays.filter(day => day.active);
    setFieldValue(
      'frequency.daysOfWeek',
      activeDays.map(day => day.value),
    );
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
              disabled={day.disabled}
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
