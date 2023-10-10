export const EVENT_CREATION_SUCCESS = 'EVENT_CREATION_SUCCESS';
export const EVENT_CREATION_FAIL = 'EVENT_CREATION_FAIL';

export const LOAD_ACTIVE_EVENTS_SUCCESS = 'LOAD_ACTIVE_EVENTS_SUCCESS';
export const LOAD_ACTIVE_EVENTS_FAIL = 'LOAD_ACTIVE_EVENTS_FAIL';

export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

export const CLEAR_EVENTS = 'CLEAR_EVENTS';

export const days = [
  { shortTitle: 'p', title: 'pon.', value: 1, active: false },
  { shortTitle: 'w', title: 'wt.', value: 2, active: false },
  { shortTitle: 'ś', title: 'śr.', value: 3, active: false },
  { shortTitle: 'c', title: 'czw.', value: 4, active: false },
  { shortTitle: 'p', title: 'pt.', value: 5, active: false },
  { shortTitle: 's', title: 'sob.', value: 6, active: false },
  { shortTitle: 'n', title: 'niedz.', value: 7, active: false },
];

export const cyclicValues = [
  { label: 'Codziennie', value: 1 },
  { label: 'Co 2 dni', value: 2 },
  { label: 'Co tydzień', value: 7 },
  { label: 'Co miesiąc - tego samego dnia', value: 30 },
  { label: 'Wpisz wartość: (liczba = ilość dni)', value: -1 },
];

export const priorities = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '300', value: 300 },
  { label: '500', value: 500 },
  { label: '1000', value: 1000 },
];

export const times = [
  { label: '5 minut', value: 5 },
  { label: '15 minut', value: 15 },
  { label: '30 minut', value: 30 },
  { label: '1h', value: 60 },
  { label: '3h', value: 60 * 3 },
];
