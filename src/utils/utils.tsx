import moment from 'moment-timezone';
import isEqual from 'lodash.isequal';
import Localization, { t } from '@src/localization/Localization';
import Calendar from '@src/components/Calendar/Calendar';
import { useAppSelector } from '@src/redux/store';
import { DAYS } from '@src/redux/events/events.constants';
import { Platform } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { User } from '@src/models';

export const IS_ANDROID = Platform.OS === 'android';
export const buildRequest = (baseUrl: string, params: any) => {
  const entries = Object.entries(params).filter(([key, value]) => String(value).trim() !== '');
  return baseUrl + entries.map(([key, value]) => `${key}=${value}`).join('&');
};

export const renderLocalDateWithTime = (timestamp: Timestamp) => {
  const date = moment.tz(timestamp, 'Europe/Warsaw');
  return date.format('YYYY-MM-DD HH:mm');
};

export const convertTimestampToDate = (timestamp: Timestamp, format?: string) => {
  const date = timestamp.toDate();
  return moment(date).format(format);
};

export const renderLocalDate = (timestamp: Timestamp) => {
  const date = moment.tz(timestamp, 'Europe/Warsaw');
  return date.format('YYYY-MM-DD');
};

export const dateToEpoch = (date: Date) => {
  const time = date.getTime();
  return time - (time % 86400000);
};

export const createDatetimeTimezone = (dateValue?: Date, timeValue?: Date) => {
  if (!dateValue || !timeValue) {
    return false;
  }
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth() + 1;
  const day = dateValue.getDate();
  const hours = timeValue.getHours();
  const minutes = timeValue.getMinutes();
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}`);
};

export function getUpdatedFields<T>(oldValue: T, newValue: Partial<T>): Partial<T> {
  const updatedFields: Partial<T> = {};

  for (const key in newValue) {
    if (!isEqual(oldValue[key], newValue[key])) {
      updatedFields[key] = newValue[key];
    }
  }

  return updatedFields;
}

export const changeUserLanguage = (language: string) => {
  try {
    Localization.changeLanguage(language);
    Calendar.changeLanguage(language);
  } catch (error) {
    console.log(error);
  }
};

export const createUserLabel = () => {
  const user: User | null = useAppSelector(state => state.auth.user);
  if (!user) {
    return 'UU';
  }
  const label = `${user.firstName![0]}${user.lastName![0]}`;
  return label.toUpperCase();
};

export const renderDayValue = (value: number, shortTitle: boolean) => {
  const type = shortTitle ? 'shortTitle' : 'title';
  const base = `dayValues.${type}`;
  switch (value) {
    case DAYS.MONDAY:
      return t(`${base}.monday`);
    case DAYS.TUESDAY:
      return t(`${base}.tuesday`);
    case DAYS.WEDNESDAY:
      return t(`${base}.wednesday`);
    case DAYS.THURSDAY:
      return t(`${base}.thursday`);
    case DAYS.FRIDAY:
      return t(`${base}.friday`);
    case DAYS.SATURDAY:
      return t(`${base}.saturday`);
    case DAYS.SUNDAY:
      return t(`${base}.sunday`);
  }
};
