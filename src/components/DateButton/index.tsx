import { Timestamp } from 'firebase/firestore';
import { Button } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  date: Timestamp | null;
  onPress: any;
  onBlur?: any;
  isError?: boolean;
  labelEmpty: string;
  label: string;
  styles?: any;
};

const DateButton = ({ date, onPress, onBlur, isError, label, labelEmpty, styles }: Props) => {
  return (
    <Button
      size="lg"
      onPress={() => onPress(true)}
      onBlur={onBlur}
      buttonStyle={[_styles.button, styles]}
      titleStyle={isError && { color: 'red' }}
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

const _styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: 'green',
  },
});
