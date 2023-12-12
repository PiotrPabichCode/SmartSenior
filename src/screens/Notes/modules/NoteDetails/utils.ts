import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { Note } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { store } from '@src/redux/common';
import { updateNote } from '@src/redux/notes/notes.actions';
import { selectNoteByKey } from '@src/redux/notes/notes.slice';
import { getUpdatedFields } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';

export const onSubmit = async (key: string, onSuccess: (note: Note) => void) => {
  try {
    const storeNote = selectNoteByKey(store.getState(), key)!;
    const updatedNote = { ...storeNote, updatedAt: Timestamp.now() };
    const updatedValues = getUpdatedFields(storeNote, updatedNote);
    await store.dispatch(updateNote({ key: key, data: updatedValues })).unwrap();
    onSuccess(updatedNote);
    CustomToast('success', t('message.success.updateNote'));
    goBack();
  } catch (error) {
    console.log(error);
  }
};
