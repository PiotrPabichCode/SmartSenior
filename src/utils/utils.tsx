import moment from 'moment-timezone';
import isEqual from 'lodash.isequal';
import Localization, { translate } from '@src/localization/Localization';
import Calendar from '@src/components/Calendar/Calendar';
import { store, useAppSelector } from '@src/redux/store';
import { DAYS } from '@src/redux/constants/eventsConstants';

export const buildRequest = (baseUrl: string, params: any) => {
  const entries = Object.entries(params).filter(
    ([key, value]) => String(value).trim() !== ''
  );
  return baseUrl + entries.map(([key, value]) => `${key}=${value}`).join('&');
};

export const renderLocalDateWithTime = (timestamp: number) => {
  const date = moment.tz(timestamp, 'Europe/Warsaw');
  return date.format('YYYY-MM-DD HH:mm');
};

export const renderLocalDate = (timestamp: number) => {
  const date = moment.tz(timestamp, 'Europe/Warsaw');
  return date.format('YYYY-MM-DD');
};

export const createDatetimeTimezone = (dateValue?: Date, timeValue?: Date) => {
  if (!dateValue || !timeValue) {
    return false;
  }
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth();
  const day = dateValue.getDate();
  const hours = timeValue.getHours();
  const minutes = timeValue.getMinutes();
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}`);
};

export function getUpdatedFields<T>(
  oldValue: T,
  newValue: Partial<T>
): Partial<T> {
  const updatedFields: Partial<T> = {};

  for (const key in newValue) {
    if (!isEqual(oldValue[key], newValue[key])) {
      updatedFields[key] = newValue[key];
    }
  }

  return updatedFields;
}

export const changeLanguage = (language: string) => {
  try {
    Localization.changeLanguage(language);
    Calendar.changeLanguage(language);
  } catch (error) {
    console.log(error);
  }
};

export const createUserLabel = () => {
  const userDetails = useAppSelector((state) => state.auth.userDetails);
  const label = `${userDetails.firstName[0]}${userDetails.lastName[0]}`;
  return label.toUpperCase();
};

export const renderDayValue = (value: number, shortTitle: boolean) => {
  const type = shortTitle ? 'shortTitle' : 'title';
  const base = `dayValues.${type}`;
  switch (value) {
    case DAYS.MONDAY:
      return translate(`${base}.monday`);
    case DAYS.TUESDAY:
      return translate(`${base}.tuesday`);
    case DAYS.WEDNESDAY:
      return translate(`${base}.wednesday`);
    case DAYS.THURSDAY:
      return translate(`${base}.thursday`);
    case DAYS.FRIDAY:
      return translate(`${base}.friday`);
    case DAYS.SATURDAY:
      return translate(`${base}.saturday`);
    case DAYS.SUNDAY:
      return translate(`${base}.sunday`);
  }
};
