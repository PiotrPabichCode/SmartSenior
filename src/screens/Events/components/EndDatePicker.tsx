import { Timestamp } from 'firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  isVisible: boolean;
  date: Timestamp | null;
  endDate: Timestamp | null;
  onChange: any;
  onClose: any;
};

const EndDatePicker = ({ isVisible, date, endDate, onChange, onClose }: Props) => {
  const getStartingEndDate = (date: Timestamp) => {
    const newDate = date.toDate();
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  return (
    isVisible &&
    date && (
      <RNDateTimePicker
        value={endDate ? endDate.toDate() : date.toDate()}
        minimumDate={getStartingEndDate(date)}
        onChange={(e, newDate) => {
          onClose(false);
          if (e.type !== 'set' || !newDate) {
            return false;
          }
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          if (date && date.toDate().getTime() >= newDate.getTime()) {
            newDate.setDate(newDate.getDate() + 1);
          }

          onChange('frequency.startDate', date);
          onChange('frequency.endDate', Timestamp.fromDate(newDate));
        }}
      />
    )
  );
};

export default EndDatePicker;
