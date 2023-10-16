import { translate } from '@src/localization/Localization';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';

export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAIL = 'GET_USER_DETAILS_FAIL';

export const LOGOUT = 'LOGOUT';

export const ERROR_MESSAGE = 'Coś poszło nie tak. Spróbuj ponownie';

export const SIGN_UP_SUCCESS_MESSAGE = 'Pomyślnie utworzono konto!';

export const GenderEnum = {
  WOMEN: 'Female',
  MEN: 'Male',
};

export const genders = [
  { label: translate('genders.woman'), value: GenderEnum.WOMEN },
  { label: translate('genders.man'), value: GenderEnum.MEN },
];
