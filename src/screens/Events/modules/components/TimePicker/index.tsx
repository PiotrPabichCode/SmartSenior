import { Timestamp } from 'firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { createDatetimeTimezone } from '@src/utils/utils';

type Props = {
  isVisible: boolean;
  newDate: Date | undefined;
  date: Timestamp | null;
  endDate: Timestamp | null;
  onChange: any;
  onClose: any;
};

const TimePicker = ({ isVisible, newDate, date, endDate, onChange, onClose }: Props) => {
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
