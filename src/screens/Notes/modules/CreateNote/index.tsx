import { useState } from 'react';
import { Button } from '@rneui/themed';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { Note } from '@src/models';
import { selectNotesStatus } from '@src/redux/notes/notes.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import isEqual from 'lodash.isequal';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { initialValues } from './types';
import { handlePress } from './utils';
import { NoteDescription, NoteTitle } from '../components';

const CreateNote = () => {
  const navigation = useNavigation();
  const status = useAppSelector(state => selectNotesStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const [note, setNote] = useState<Partial<Note>>(initialValues);

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
      <Button
        size="lg"
        title={t('createNoteButton')}
        buttonStyle={styles.button}
        onPress={() => handlePress(note, setNote)}
      />
      <DiscardChangesAlert navigation={navigation} isUpdate={!isEqual(note, initialValues)} />
    </CustomScrollContainer>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  button: { backgroundColor: 'rgba(127, 220, 103, 1)' },
});
