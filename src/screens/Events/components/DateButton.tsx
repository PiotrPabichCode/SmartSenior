import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';

type Props = {
  date: Timestamp | null;
  onPress: any;
};

const DateButton = ({ date, onPress }: Props) => {
  return (
    <Button
      size="lg"
      onPress={() => onPress(true)}
      buttonStyle={{ backgroundColor: 'green' }}
      containerStyle={{ minWidth: '90%', borderRadius: 25 }}
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
