import { Button } from '@rneui/themed';
import { renderDayValue } from '@src/utils/utils';
import { StyleSheet } from 'react-native';

export interface Day {
  value: number;
  active: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export type Days = Day[];

const DayField = ({ value, active, disabled, onPress }: Day) => {
  return (
    <Button
      title={renderDayValue(value, false)}
      buttonStyle={[styles.button, active ? styles.dayActive : styles.dayInactive]}
      disabled={disabled}
      titleStyle={styles.title}
      containerStyle={styles.container}
      type="outline"
      onPress={onPress}
    />
  );
};

export default DayField;

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontWeight: '800',
  },
  button: {
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
  },
});
