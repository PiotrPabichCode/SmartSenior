import { t } from '@src/localization/Localization';
import { phoneRegExp } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import * as Yup from 'yup';

export const FirstLoginSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1)
    .required(() => t('yup.required')),
  lastName: Yup.string()
    .min(1)
    .required(() => t('yup.required')),
  birthDate: Yup.mixed<Timestamp>().required(() => t('yup.required')),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, { message: () => t('message.error.invalidPhoneNumber') })
    .required(() => t('yup.required')),
});
