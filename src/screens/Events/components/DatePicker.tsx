import { Timestamp } from 'firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  isVisible: boolean;
  date: Timestamp | null;
  onChange: any;
  onClose: any;
  onTimePickerOpen: any;
};

const DatePicker = ({ isVisible, date, onChange, onClose, onTimePickerOpen }: Props) => {
  return (
    isVisible && (
      <RNDateTimePicker
        value={date ? new Date((date as Timestamp).seconds) : new Date()}
        minimumDate={new Date()}
        onChange={(e, newDate) => {
          onClose(false);
          if (e.type !== 'set') {
            return false;
          }
          onChange(newDate);
          onTimePickerOpen(true);
        }}
      />
    )
  );
};

export default DatePicker;
