import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { goBack } from '@src/navigation/navigationUtils';
import { addConnectedUser } from '@src/redux/auth/auth.actions';
import { addChat } from '@src/redux/chats/chats.actions';
import { store } from '@src/redux/common';
import * as Yup from 'yup';

export const onSubmit = (email: string) => async () => {
  try {
    const valid = await Yup.string().email().isValid(email);
    if (!valid) {
      return CustomToast('error', t('message.error.invalidEmail'));
    }
    const user = await store.dispatch(addConnectedUser(email)).unwrap();
    await store.dispatch(addChat(user.user)).unwrap();
    goBack();
    CustomToast('success', t('message.success.addConnectedUser'));
  } catch (error) {
    CustomToast('error', t('message.error.addConnectedUser'));
    console.log(error);
  }
};
