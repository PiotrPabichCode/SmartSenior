import { translate } from '@src/localization/Localization';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';

export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAIL = 'GET_USER_DETAILS_FAIL';

export const CHANGE_ROLE = 'CHANGE_ROLE';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_THEME = 'CHANGE_THEME';

export const GET_CONNECTED_USERS_SUCCESS = 'GET_CONNECTED_USERS_SUCCESS';
export const GET_CONNECTED_USERS_FAIL = 'GET_CONNECTED_USERS_FAIL';

export const ADD_CONNECTED_USER_SUCCESS = 'ADD_CONNECTED_USER_SUCCESS';
export const ADD_CONNECTED_USER_FAIL = 'ADD_CONNECTED_USER_FAIL';

export const DELETE_CONNECTED_USER_SUCCESS = 'DELETE_CONNECTED_USER_SUCCESS';
export const DELETE_CONNECTED_USER_FAIL = 'DELETE_CONNECTED_USER_FAIL';

export const LOGOUT = 'LOGOUT';

export const ERROR_MESSAGE = 'Coś poszło nie tak. Spróbuj ponownie';

export const SIGN_UP_SUCCESS_MESSAGE = 'Pomyślnie utworzono konto!';

export const GenderEnum = {
  WOMEN: 'Female',
  MEN: 'Male',
};

export const RolesEnum = {
  ADMIN: 'Admin',
  SENIOR: 'Senior',
  KEEPER: 'Keeper',
};

export const genders = [
  { label: 'genders.woman', value: GenderEnum.WOMEN, multiLang: true },
  { label: 'genders.man', value: GenderEnum.MEN, multiLang: true },
];

export const roles = [
  { label: 'roles.admin', value: RolesEnum.ADMIN, multiLang: true },
  { label: 'roles.senior', value: RolesEnum.SENIOR, multiLang: true },
  { label: 'roles.keeper', value: RolesEnum.KEEPER, multiLang: true },
];
