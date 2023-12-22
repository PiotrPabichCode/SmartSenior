import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { Note } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { store } from '@src/redux/common';
import { updateNote } from '@src/redux/notes/notes.actions';
import { getUpdatedFields } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

export const onSubmit = async (
  storeNote: Note,
  note: Note,
  onSuccess: Dispatch<SetStateAction<Note>>,
) => {
  try {
    const updatedNote = { ...note, updatedAt: Timestamp.now() };
    const updatedValues = getUpdatedFields(storeNote, updatedNote);
    await store.dispatch(updateNote({ key: storeNote.key, data: updatedValues })).unwrap();
    onSuccess(updatedNote);
    CustomToast('success', t('message.success.updateNote'));
    goBack();
  } catch (error) {
    console.log(error);
  }
};
