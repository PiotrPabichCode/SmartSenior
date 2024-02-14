import { Timestamp } from 'firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type DatePickerProps = {
  isVisible: boolean;
  date: Timestamp | null;
  onChange: (_: Date | undefined) => void;
  onClose: (_: boolean) => void;
  onTimePickerOpen: (_: boolean) => void;
};

const DatePicker = ({ isVisible, date, onChange, onClose, onTimePickerOpen }: DatePickerProps) => {
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
