import { t } from '@src/localization/Localization';
import * as Yup from 'yup';

export const TagSchema = Yup.object().shape({
  name: Yup.string().required(() => t('yup.required')),
  color: Yup.string().required(() => t('yup.required')),
});
