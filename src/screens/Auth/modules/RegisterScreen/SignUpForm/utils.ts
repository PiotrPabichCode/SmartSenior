import { t } from '@src/localization/Localization';
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => t('login.yup.email'))
    .required(() => t('yup.required')),
  password: Yup.string()
    .min(6, () => t('login.yup.passwordLengthMin'))
    .required(() => t('yup.required')),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], () => t('login.yup.repeatPassword'))
    .required(() => t('yup.required')),
});
