import { Timestamp } from 'firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { createDatetimeTimezone } from '@src/utils/utils';
import { SetFieldValueType } from '@src/models';

type TimePickerProps = {
  isVisible: boolean;
  newDate: Date | undefined;
  date: Timestamp | null;
  endDate: Timestamp | null;
  onChange: SetFieldValueType;
  onClose: (_: boolean) => void;
};

const TimePicker = ({ isVisible, newDate, date, endDate, onChange, onClose }: TimePickerProps) => {
  return (
    isVisible && (
      <RNDateTimePicker
        value={date ? new Date(date.seconds) : new Date()}
        mode="time"
        onChange={(e, newTime) => {
          onClose(false);
          if (e.type !== 'set') {
            return false;
          }
          const datetime = createDatetimeTimezone(newDate, newTime);
          if (!datetime) {
            return false;
          }
          onChange('date', Timestamp.fromMillis(datetime.getTime()));
          if (endDate && Timestamp.fromMillis(datetime.getTime()) >= endDate) {
            onChange('frequency.endDate', null);
          }
        }}
      />
    )
  );
};

export default TimePicker;
