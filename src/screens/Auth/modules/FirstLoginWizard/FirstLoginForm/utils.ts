import { Genders, Roles } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import * as Yup from 'yup';

export const FirstLoginSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required(),
  lastName: Yup.string().min(1).required(),
  birthDate: Yup.mixed<Timestamp>().required(),
  gender: Yup.string().oneOf(Object.values(Genders)).required(),
  role: Yup.string().oneOf(Object.values(Roles)).required(),
});
