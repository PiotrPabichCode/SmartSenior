import { useState } from 'react';
import {
  CustomScrollContainer,
  CustomActivityIndicator,
  DiscardChangesAlert,
} from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { Note } from '@src/models';
import { selectNoteByKey, selectNotesStatus } from '@src/redux/notes/notes.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { NoteDetailsProps } from '@src/navigation/types';
import isEqual from 'lodash.isequal';
import { NoteDescription, NoteTitle } from '../components';
import UpdateButton from './UpdateButton';

const NoteDetails = ({ navigation, route }: NoteDetailsProps) => {
  const { key } = route.params;
  const storeNote = useAppSelector(state => selectNoteByKey(state, key));

  if (!storeNote) {
    goBack();
    return null;
  }

  const status = useAppSelector(state => selectNotesStatus(state));
  const [note, setNote] = useState<Note>(storeNote);

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer>
      <NoteTitle
        value={note.title}
        onChange={(newValue: string) => {
          setNote({ ...note, title: newValue });
        }}
      />

      <NoteDescription
        value={note.description}
        onChange={(newValue: string) => {
          setNote({ ...note, description: newValue });
        }}
      />
      {!isEqual(storeNote, note) && (
        <>
          <UpdateButton storeNote={storeNote} note={note} onSuccess={setNote} />
          <DiscardChangesAlert navigation={navigation} isUpdate={true} />
        </>
      )}
    </CustomScrollContainer>
  );
};

export default NoteDetails;
