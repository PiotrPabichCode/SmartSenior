import { Timestamp } from 'firebase/firestore';

export enum DAYS {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

type DaysType = {
  value: DAYS;
  active: boolean;
  disabled?: boolean;
};

export const days: DaysType[] = [
  {
    value: DAYS.MONDAY,
    active: false,
  },
  {
    value: DAYS.TUESDAY,
    active: false,
  },
  {
    value: DAYS.WEDNESDAY,
    active: false,
  },
  {
    value: DAYS.THURSDAY,
    active: false,
  },
  {
    value: DAYS.FRIDAY,
    active: false,
  },
  {
    value: DAYS.SATURDAY,
    active: false,
  },
  {
    value: DAYS.SUNDAY,
    active: false,
  },
];

export enum RecurringValues {
  EVERYDAY = 0,
  EVERY_2_DAYS,
  EVERY_WEEK,
  EVERY_MONTH,
  EVERY_3_MONTHS,
  EVERY_6_MONTHS,
  EVERY_YEAR,
}

function createDate(startDate: Timestamp, unit: 'day' | 'week' | 'month', interval: number) {
  let newDate = startDate.toDate();
  if (unit === 'day') {
    newDate.setDate(newDate.getDate() + interval);
  } else if (unit === 'week') {
    newDate.setDate(newDate.getDate() + interval * 7);
  } else if (unit === 'month') {
    newDate.setMonth(newDate.getMonth() + interval);
  }
  return newDate.getTime();
}

function isNewTimestampSmaller(
  startDate: Timestamp,
  unit: 'day' | 'week' | 'month',
  interval: number,
  endDate: Timestamp,
): boolean {
  const timestamp = createDate(startDate, unit, interval);
  const endTimestamp = endDate.toDate().getTime();
  return timestamp <= endTimestamp;
}

export const getReccuringTimes = (startDate: Timestamp, endDate: Timestamp) => {
  return recurringTimes.filter(r => isNewTimestampSmaller(startDate, r.unit, r.interval, endDate));
};

export const filterPossibleDays = (
  startDate: Timestamp,
  endDate: Timestamp,
  daysOfWeek: Array<number> | null,
) => {
  const currentDate = startDate.toDate();
  const possibleDays: Array<number> = [];
  for (let i = 0; i < 7; i++) {
    if (currentDate.getDate() <= endDate.toDate().getDate()) {
      possibleDays.push(currentDate.getDay());
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days.map(d => ({
    ...d,
    disabled: !possibleDays.includes(d.value),
    active:
      d.value === startDate.toDate().getDay() ||
      (daysOfWeek && daysOfWeek.includes(d.value) && possibleDays.includes(d.value))
        ? true
        : false,
  }));
};

type RecurringValuesType = {
  unit: 'day' | 'week' | 'month';
  interval: number;
  label: string;
  value: RecurringValues;
  multiLang: boolean;
};

export const recurringTimes: RecurringValuesType[] = [
  {
    unit: 'day',
    interval: 1,
    label: 'recurringTimes.day',
    value: RecurringValues.EVERYDAY,
    multiLang: true,
  },
  {
    unit: 'day',
    interval: 2,
    label: 'recurringTimes.2days',
    value: RecurringValues.EVERY_2_DAYS,
    multiLang: true,
  },
  {
    unit: 'week',
    interval: 1,
    label: 'recurringTimes.week',
    value: RecurringValues.EVERY_WEEK,
    multiLang: true,
  },
  {
    unit: 'month',
    interval: 1,
    label: 'recurringTimes.month',
    value: RecurringValues.EVERY_MONTH,
    multiLang: true,
  },
  {
    unit: 'month',
    interval: 3,
    label: 'recurringTimes.3months',
    value: RecurringValues.EVERY_3_MONTHS,
    multiLang: true,
  },
  {
    unit: 'month',
    interval: 16,
    label: 'recurringTimes.6months',
    value: RecurringValues.EVERY_6_MONTHS,
    multiLang: true,
  },
  {
    unit: 'month',
    interval: 12,
    label: 'recurringTimes.year',
    value: RecurringValues.EVERY_YEAR,
    multiLang: true,
  },
];

export const durationTimes = [
  { label: 'durationTimes.week', value: 7, multiLang: true },
  { label: 'durationTimes.month', value: 31, multiLang: true },
  { label: 'durationTimes.6months', value: 30 * 3, multiLang: true },
  { label: 'durationTimes.any', value: -1, multiLang: true },
];

export const recurringTypes = [
  { label: 'recurringTypes.specificDays', value: 'specificDays', multiLang: true },
  { label: 'recurringTypes.custom', value: 'custom', multiLang: true },
];

export const priorities = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '300', value: 300 },
  { label: '500', value: 500 },
  { label: '1000', value: 1000 },
];

export const times = [
  {
    label: 'timeValues.min',
    values: {
      min: 5,
    },
    value: 5,
    multiLang: true,
  },
  {
    label: 'timeValues.min',
    values: {
      min: 15,
    },
    value: 15,
    multiLang: true,
  },
  {
    label: 'timeValues.min',
    values: {
      min: 30,
    },
    value: 30,
    multiLang: true,
  },
  {
    label: 'timeValues.hour',
    values: {
      hour: 1,
    },
    value: 60,
    multiLang: true,
  },
  {
    label: 'timeValues.hour',
    values: {
      hour: 3,
    },
    value: 3 * 60,
    multiLang: true,
  },
];
