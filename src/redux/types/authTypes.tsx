export type AuthCredentials = {
  email: string;
  password: string;
};

export type UserDetails = {
  firstName: string;
  lastName: string;
  birthDate: null | string;
  gender: string;
  email: string | null | undefined;
};
