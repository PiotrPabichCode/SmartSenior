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
