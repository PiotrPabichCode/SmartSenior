import { t } from '@src/localization/Localization';
import { deleteNote } from '@src/redux/notes/notes.actions';
import { useAppDispatch } from '@src/redux/types';
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
      onPress: () => {
        dispatch(deleteNote(key));
      },
    },
  ]);
};
