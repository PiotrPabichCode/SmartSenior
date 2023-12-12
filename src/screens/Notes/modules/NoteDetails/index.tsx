import { useState } from 'react';
import { Button } from '@rneui/themed';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { Note } from '@src/models';
import { selectNoteByKey, selectNotesStatus } from '@src/redux/notes/notes.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { goBack } from '@src/navigation/navigationUtils';
import { NoteDetailsProps } from '@src/navigation/types';
import isEqual from 'lodash.isequal';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { NoteDescription, NoteTitle } from '../components';
import { onSubmit } from './utils';

const NoteDetails = ({ navigation, route }: NoteDetailsProps) => {
  const { key } = route.params;
  const storeNote = useAppSelector(state => selectNoteByKey(state, key));

  if (!storeNote) {
    goBack();
    return null;
  }

  const status = useAppSelector(state => selectNotesStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const [note, setNote] = useState<Note>(storeNote);

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={currentTheme}>
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
          <Button size="lg" title={t('updateNoteButton')} onPress={() => onSubmit(key, setNote)} />
          <DiscardChangesAlert navigation={navigation} isUpdate={true} />
        </>
      )}
    </CustomScrollContainer>
  );
};

export default NoteDetails;
