import { Timestamp } from 'firebase/firestore';
import DayFieldsRenderer from './DayFieldsRenderer';
import { filterPossibleDays } from '@src/redux/events/events.constants';
import { useEffect, useState } from 'react';
import { Day } from './DayFieldsRenderer/DayField';
import { SetFieldValueType } from '@src/models';

type SpecificDaysRecurringProps = {
  isRecurring: boolean;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  daysOfWeek: Array<number> | null;
  type: 'custom' | 'specificDays' | null;
  onChange: SetFieldValueType;
};

const SpecificDaysRecurring = ({
  isRecurring,
  startDate,
  endDate,
  daysOfWeek,
  type,
  onChange,
}: SpecificDaysRecurringProps) => {
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
