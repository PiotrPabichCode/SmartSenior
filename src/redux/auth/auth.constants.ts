import { Genders, Roles } from '@src/models';

export const SIGN_UP_SUCCESS_MESSAGE = 'Pomyślnie utworzono konto!';

export const genders = [
  { label: 'genders.woman', value: Genders.FEMALE, multiLang: true },
  { label: 'genders.man', value: Genders.MALE, multiLang: true },
];

export const roles = [
  { label: 'roles.admin', value: Roles.ADMIN, multiLang: true },
  { label: 'roles.senior', value: Roles.SENIOR, multiLang: true },
  { label: 'roles.keeper', value: Roles.KEEPER, multiLang: true },
];
