import { Timestamp } from 'firebase/firestore';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type DateButtonProps = {
  date: Timestamp | null;
  onPress?: (_: boolean) => void;
  disabled?: boolean;
};

const DateButton = ({ date, onPress, disabled }: DateButtonProps) => {
  return (
    <Button
      onPress={() => {
        onPress && onPress(true);
      }}
      disabled={disabled}
      disabledStyle={styles.disabled}
      buttonStyle={styles.button}
      title={
        date
          ? t('createEvent.button.title.date', {
              date: convertTimestampToDate(date, 'DD-MM-YYYY HH:mm'),
            })
          : t('createEvent.button.title.emptyDate')
      }
    />
  );
};

export default DateButton;

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: 'green',
  },
});
