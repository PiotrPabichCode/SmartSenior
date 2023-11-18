export enum DAYS {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export const days = [
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

export const recurringTimes = [
  { label: 'recurringTimes.day', value: RecurringValues.EVERYDAY, multiLang: true },
  { label: 'recurringTimes.2days', value: RecurringValues.EVERY_2_DAYS, multiLang: true },
  { label: 'recurringTimes.week', value: RecurringValues.EVERY_WEEK, multiLang: true },
  { label: 'recurringTimes.month', value: RecurringValues.EVERY_MONTH, multiLang: true },
  { label: 'recurringTimes.3months', value: RecurringValues.EVERY_3_MONTHS, multiLang: true },
  { label: 'recurringTimes.6months', value: RecurringValues.EVERY_6_MONTHS, multiLang: true },
  { label: 'recurringTimes.year', value: RecurringValues.EVERY_YEAR, multiLang: true },
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
