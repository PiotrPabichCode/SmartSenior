import moment from 'moment-timezone';
import isEqual from 'lodash.isequal';
import { t } from '@src/localization/Localization';
import tinycolor from 'tinycolor2';
import { store } from '@src/redux/common';
import { DAYS, days } from '@src/redux/events/events.constants';
import { Platform, ColorValue } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { selectConnectedUserById, selectTags, selectUser } from '@src/redux/auth/auth.slice';
import { Genders, Images, Tags } from '@src/models';
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const IS_ANDROID = Platform.OS === 'android';
export const buildApiRequest = (baseUrl: string, params: any) => {
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

export function pickColorBasedOnRGB(bgColor: string, lightColor: string, darkColor: string) {
  const color = tinycolor(bgColor);
  const isDark = color.isDark();
  return isDark ? lightColor : darkColor;
}

export const createUsername = (userID: string) => {
  const user = selectUser(store.getState());
  if (user?.uid === userID) {
    return user.firstName!;
  }
  const connectedUser = selectConnectedUserById(store.getState(), userID);
  return connectedUser?.user.firstName ? connectedUser.user.firstName : 'user';
};

export const renderGender = (gender: string | null) => {
  switch (gender) {
    case Genders.FEMALE:
      return t('genders.female');
    case Genders.MALE:
      return t('genders.male');
    default:
      return t('genders.unknown');
  }
};

export const createUserLabel = (firstName: string | null, lastName: string | null) => {
  if (!firstName || !lastName) {
    return 'UU';
  }
  const label = `${firstName[0]}${lastName[0]}`;
  return label.toUpperCase();
};

export const getUserAge = (timestamp: Timestamp) => {
  return moment().diff(timestamp.toDate(), 'years');
};
