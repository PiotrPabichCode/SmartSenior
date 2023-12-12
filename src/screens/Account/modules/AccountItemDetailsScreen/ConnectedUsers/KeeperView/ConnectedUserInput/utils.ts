import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { addConnectedUser } from '@src/redux/auth/auth.actions';
import { addChat } from '@src/redux/chats/chats.actions';
import { store } from '@src/redux/common';
import { batch } from 'react-redux';

export const handleAddUser = async (email: string) => {
  try {
    batch(async () => {
      const connectedUser = await store.dispatch(addConnectedUser(email)).unwrap();
      await store.dispatch(addChat(connectedUser.user)).unwrap();
    });
    CustomToast('success', t('connectedUsers.message.success.add'));
  } catch (e) {
    console.log(e);
    CustomToast('error', t('connectedUsers.message.error.add'));
  }
};
