import { Timestamp } from 'firebase/firestore';
import DayFieldsRenderer from './DayFieldsRenderer';
import { filterPossibleDays } from '@src/redux/events/events.constants';
import { useEffect, useState } from 'react';
import { Day } from './DayFieldsRenderer/DayField';

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
  const [days, setDays] = useState([] as Day[]);

  useEffect(() => {
    if (startDate && endDate && daysOfWeek) {
      setDays(filterPossibleDays(startDate, endDate, daysOfWeek));
    }
  }, [startDate, endDate, daysOfWeek]);
  return (
    isRecurring &&
    startDate &&
    endDate &&
    type === 'specificDays' && (
      <DayFieldsRenderer
        days={days}
        startDate={startDate || Timestamp.now()}
        setFieldValue={onChange}
      />
    )
  );
};

export default SpecificDaysRecurring;
