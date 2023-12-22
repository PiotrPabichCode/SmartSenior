import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { deleteNote } from '@src/redux/notes/notes.actions';
import { Alert } from 'react-native';

export const deleteNoteAlert = (key: string, title: string, dispatch: any) => {
  return Alert.alert(title, t('noteDeleteAlertQuestion'), [
    {
      text: t('no'),
      style: 'cancel',
      onPress: () => {},
    },
    {
      text: t('yes'),
      style: 'destructive',
      onPress: async () => {
        try {
          await dispatch(deleteNote(key)).unwrap();
          CustomToast('success', t('message.success.deleteNote'));
        } catch (error) {
          console.log(error);
          CustomToast('error', t('message.error.deleteNote'));
        }
      },
    },
  ]);
};
