import { t } from '@src/localization/Localization';
import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const UpdateAccountSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1)
    .required(() => t('yup.required')),
  lastName: Yup.string()
    .min(1)
    .required(() => t('yup.required')),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, { message: () => t('message.error.invalidPhoneNumber') })
    .required(() => t('yup.required')),
});
