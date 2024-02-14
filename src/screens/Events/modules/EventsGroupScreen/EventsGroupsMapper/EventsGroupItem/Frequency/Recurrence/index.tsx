import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { Frequency } from '@src/models';
import { recurringTimes } from '@src/redux/events/events.constants';
import { renderDayValue } from '@src/utils/utils';
import { StyleSheet } from 'react-native';

type RecurrenceProps = {
  type: Frequency['type'];
  daysOfWeek: Frequency['daysOfWeek'];
  interval: Frequency['interval'];
  unit: Frequency['unit'];
};

const Recurrence = ({ type, daysOfWeek, interval, unit }: RecurrenceProps) => {
  const styles = useStyles();
  if (type === 'specificDays' && daysOfWeek) {
    const days = [1, 2, 3, 4, 5, 6, 0];
    const selectedDays = daysOfWeek;
    const out: React.JSX.Element[] = [];
    days.map((day, index) => {
      if (index === 0) {
        out.push(
          <Text key={'recurring title'} style={{ fontSize: 16, fontWeight: 'bold' }}>
            {t('eventGroups.recurringSpecificDays')}
          </Text>,
        );
      }
      out.push(
        <Text
          key={index}
          style={[
            { letterSpacing: 2 },
            selectedDays.find(d => d === day) ? styles.activeDay : styles.inactiveDay,
          ]}>
          {`${renderDayValue(day, true)}`}
        </Text>,
      );
    });
    return out;
  }
  const label = recurringTimes.find(r => r.interval === interval && r.unit === unit)?.label!;
  return t('eventGroups.recurringCustom', {
    label: t(label),
  });
};

export default Recurrence;

const useStyles = (colors = useThemeColors()) =>
  StyleSheet.create({
    activeDay: {
      color: colors.lightblue,
    },
    inactiveDay: {
      color: colors.grey0,
    },
  });
