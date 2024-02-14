import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type EndDateButtonProps = {
  isRecurring: boolean;
  onPress: (_: boolean) => void;
  endDate: Timestamp | null;
};

const EndDateButton = ({ isRecurring, onPress, endDate }: EndDateButtonProps) => {
  return (
    isRecurring && (
      <Button
        onPress={() => onPress(true)}
        buttonStyle={styles.button}
        title={
          endDate
            ? t('createEvent.button.title.endDate', {
                endDate: convertTimestampToDate(endDate, 'DD-MM-YYYY'),
              })
            : t('createEvent.button.title.endDateEmpty')
        }
      />
    )
  );
};

export default EndDateButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
  },
});
