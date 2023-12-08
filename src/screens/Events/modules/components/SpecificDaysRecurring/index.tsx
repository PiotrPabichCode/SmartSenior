import { Timestamp } from 'firebase/firestore';
import DayFieldsRenderer from './DayFieldsRenderer';
import { filterPossibleDays } from '@src/redux/events/events.constants';

type Props = {
  isRecurring: boolean;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  daysOfWeek: Array<number> | null;
  type: 'custom' | 'specificDays' | null;
  onChange: any;
};

const SpecificDaysRecurring = ({
  isRecurring,
  startDate,
  endDate,
  daysOfWeek,
  type,
  onChange,
}: Props) => {
  return (
    isRecurring &&
    startDate &&
    endDate &&
    type === 'specificDays' && (
      <DayFieldsRenderer
        days={filterPossibleDays(startDate, endDate, daysOfWeek)}
        startDate={startDate || Timestamp.now()}
        setFieldValue={onChange}
      />
    )
  );
};

export default SpecificDaysRecurring;
