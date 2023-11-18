import { Timestamp } from 'firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  isVisible: boolean;
  date: Timestamp | null;
  minimumDate?: Timestamp | null;
  maximumDate?: Timestamp | null;
  fieldName: string;
  onChange: any;
  onClose: any;
};

const DatePicker = ({
  isVisible,
  date,
  minimumDate,
  maximumDate,
  fieldName,
  onChange,
  onClose,
}: Props) => {
  return (
    isVisible && (
      <RNDateTimePicker
        value={date ? date.toDate() : new Date()}
        minimumDate={minimumDate ? minimumDate.toDate() : undefined}
        maximumDate={maximumDate ? maximumDate.toDate() : undefined}
        onChange={(e, newDate) => {
          onClose(false);
          if (e.type !== 'set' || !newDate) {
            return false;
          }
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          onChange(fieldName, Timestamp.fromDate(newDate));
        }}
      />
    )
  );
};

export default DatePicker;
