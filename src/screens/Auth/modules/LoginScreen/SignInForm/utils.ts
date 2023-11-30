import { t } from '@src/localization/Localization';
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => t('login.yup.email'))
    .required(() => t('yup.required')),
  password: Yup.string()
    .min(6, () => t('login.yup.passwordLengthMin'))
    .max(30, () => t('login.yup.passwordLengthMax'))
    .required(() => t('yup.required')),
});
