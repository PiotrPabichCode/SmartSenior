import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { Note } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { store } from '@src/redux/common';
import { addNote } from '@src/redux/notes/notes.actions';
import { Timestamp } from 'firebase/firestore';
import { initialValues } from './types';

export const handlePress = async (
  note: Partial<Note>,
  onReset: (values: Partial<Note>) => void,
) => {
  try {
    const newNote = { ...note, createdAt: Timestamp.now(), updatedAt: Timestamp.now() } as Note;
    await store.dispatch(addNote(newNote)).unwrap();
    onReset(initialValues);
    CustomToast('success', t('message.success.addNote'));
    goBack();
  } catch (error) {
    console.log(error);
  }
};
