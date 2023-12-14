import { useState } from 'react';
import {
  CustomScrollContainer,
  CustomActivityIndicator,
  DiscardChangesAlert,
} from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { Note } from '@src/models';
import { selectNotesStatus } from '@src/redux/notes/notes.slice';
import isEqual from 'lodash.isequal';
import { useNavigation } from '@react-navigation/native';
import { initialValues } from './types';
import { NoteDescription, NoteTitle } from '../components';
import CreateButton from './CreateButton';

const CreateNote = () => {
  const navigation = useNavigation();
  const status = useAppSelector(state => selectNotesStatus(state));
  const [note, setNote] = useState<Partial<Note>>(initialValues);

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
      <CreateButton note={note} onChange={setNote} />
      <DiscardChangesAlert navigation={navigation} isUpdate={!isEqual(note, initialValues)} />
    </CustomScrollContainer>
  );
};

export default CreateNote;
