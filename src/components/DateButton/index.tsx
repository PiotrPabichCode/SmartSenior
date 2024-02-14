import { Timestamp } from 'firebase/firestore';
import { Button } from '@src/components/shared';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type DateButtonProps = {
  date: Timestamp | null;
  onPress: (_: boolean) => void;
  onBlur?: (e: any) => void;
  isError?: boolean;
  labelEmpty: string;
  label: string;
  styles?: StyleProp<ViewStyle>;
};

const DateButton = ({
  date,
  onPress,
  onBlur,
  isError,
  label,
  labelEmpty,
  styles,
}: DateButtonProps) => {
  return (
    <Button
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
    backgroundColor: 'green',
  },
});
