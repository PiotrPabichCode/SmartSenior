import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';

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
      disabledStyle={{ backgroundColor: 'green' }}
      disabledTitleStyle={{ color: 'white' }}
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
