import { renderDayValue } from '@src/utils/utils';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

export interface Day {
  value: number;
  active: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export type Days = Day[];

const DayField = ({ value, active, disabled, onPress }: Day) => {
  const title = renderDayValue(value, false)[0];
  return (
    <Button
      title={title}
      buttonStyle={[styles.button, active ? styles.dayActive : styles.dayInactive]}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default DayField;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    borderWidth: 1.3,
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
