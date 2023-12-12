import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { StyleSheet } from 'react-native';

type Props = {
  date: Timestamp | null;
  onPress?: any;
  disabled?: boolean;
};

const DateButton = ({ date, onPress, disabled }: Props) => {
  return (
    <Button
      size="lg"
      onPress={() => {
        onPress && onPress(true);
      }}
      disabled={disabled}
      disabledStyle={styles.disabled}
      disabledTitleStyle={styles.disabledTitle}
      buttonStyle={styles.button}
      containerStyle={styles.container}
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
  disabledTitle: {
    color: 'white',
  },
  button: {
    backgroundColor: 'green',
  },
  container: {
    minWidth: '90%',
  },
});
