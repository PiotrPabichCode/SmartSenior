import { t } from '@src/localization/Localization';
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => t('register.yup.email'))
    .required(() => t('yup.required')),
  password: Yup.string()
    .min(6, () => t('register.yup.passwordLengthMin'))
    .required(() => t('yup.required')),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], () => t('register.yup.repeatPassword'))
    .required(() => t('yup.required')),
});
