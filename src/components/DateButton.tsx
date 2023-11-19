import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';

type Props = {
  date: Timestamp | null;
  onPress: any;
  labelEmpty: string;
  label: string;
  styles?: any;
};

const DateButton = ({ date, onPress, label, labelEmpty, styles }: Props) => {
  return (
    <Button
      size="lg"
      onPress={() => onPress(true)}
      buttonStyle={{ backgroundColor: 'green', ...styles }}
      containerStyle={{ minWidth: '90%', borderRadius: 25 }}
      title={
        date
          ? t(label, {
              date: convertTimestampToDate(date, 'DD-MM-YYYY'),
            })
          : t(labelEmpty)
      }
    />
  );
};

export default DateButton;
