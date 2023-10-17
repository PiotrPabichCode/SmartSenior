import { translate } from '@src/localization/Localization';

export const EVENT_CREATION_SUCCESS = 'EVENT_CREATION_SUCCESS';
export const EVENT_CREATION_FAIL = 'EVENT_CREATION_FAIL';

export const LOAD_ACTIVE_EVENTS_SUCCESS = 'LOAD_ACTIVE_EVENTS_SUCCESS';
export const LOAD_ACTIVE_EVENTS_FAIL = 'LOAD_ACTIVE_EVENTS_FAIL';

export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

export const CLEAR_EVENTS = 'CLEAR_EVENTS';

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
  { label: translate('cyclicValues.everyday'), value: 1 },
  { label: translate('cyclicValues.2days'), value: 2 },
  { label: translate('cyclicValues.week'), value: 7 },
  { label: translate('cyclicValues.month'), value: 30 },
  { label: translate('cyclicValues.any'), value: -1 },
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
    label: translate('timeValues.min', {
      min: 5,
    }),
    value: 5,
  },
  {
    label: translate('timeValues.min', {
      min: 15,
    }),
    value: 15,
  },
  {
    label: translate('timeValues.min', {
      min: 30,
    }),
    value: 30,
  },
  {
    label: translate('timeValues.hour', {
      hour: 1,
    }),
    value: 60,
  },
  {
    label: translate('timeValues.hour', {
      hour: 3,
    }),
    value: 60 * 3,
  },
];
