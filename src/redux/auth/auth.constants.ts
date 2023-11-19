import { Genders, Roles } from '@src/models';
import { Timestamp } from 'firebase/firestore';

export const SIGN_UP_SUCCESS_MESSAGE = 'Pomyślnie utworzono konto!';

export const genders = [
  { label: 'genders.female', value: Genders.FEMALE, multiLang: true },
  { label: 'genders.male', value: Genders.MALE, multiLang: true },
];

export const roles = [
  { label: 'roles.admin', value: Roles.ADMIN, multiLang: true },
  { label: 'roles.senior', value: Roles.SENIOR, multiLang: true },
  { label: 'roles.keeper', value: Roles.KEEPER, multiLang: true },
];

export type UserLocation = {
  latitude: number;
  longitude: number;
  timestamp: Timestamp;
};
