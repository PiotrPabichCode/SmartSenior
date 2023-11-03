export enum DAYS {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
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

export const cyclicValues = [
  { label: 'cyclicValues.everyday', value: 1, multiLang: true },
  { label: 'cyclicValues.2days', value: 2, multiLang: true },
  { label: 'cyclicValues.week', value: 7, multiLang: true },
  { label: 'cyclicValues.month', value: 30, multiLang: true },
  { label: 'cyclicValues.any', value: -1, multiLang: true },
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
