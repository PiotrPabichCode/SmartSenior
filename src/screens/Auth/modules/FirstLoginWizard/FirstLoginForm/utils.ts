import { t } from '@src/localization/Localization';
import { Genders, Roles } from '@src/models';
import { phoneRegExp } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import * as Yup from 'yup';

export const FirstLoginSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required(),
  lastName: Yup.string().min(1).required(),
  birthDate: Yup.mixed<Timestamp>().required(),
  gender: Yup.string().oneOf(Object.values(Genders)).required(),
  role: Yup.string().oneOf(Object.values(Roles)).required(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, { message: () => t('message.error.invalidPhoneNumber') })
    .required(() => t('yup.required')),
});
