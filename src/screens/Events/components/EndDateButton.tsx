import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';

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
        containerStyle={{ minWidth: '90%', borderRadius: 25 }}
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
