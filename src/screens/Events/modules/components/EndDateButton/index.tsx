import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  isRecurring: boolean;
  onPress: any;
  endDate: Timestamp | null;
};

const EndDateButton = ({ isRecurring, onPress, endDate }: Props) => {
  return (
    isRecurring && (
      <Button
        size="lg"
        onPress={() => onPress(true)}
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

const styles = StyleSheet.create({});
