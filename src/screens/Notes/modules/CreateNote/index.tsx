import { useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { addNote } from '@src/redux/notes/notes.actions';
import { Note } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import { selectNotesStatus } from '@src/redux/notes/notes.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { goBack } from '@src/navigation/navigationUtils';
import CustomToast from '@src/components/CustomToast';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import isEqual from 'lodash.isequal';
import { useNavigation } from '@react-navigation/native';

const CreateNote = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const status = useAppSelector(state => selectNotesStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const initialValues = {
    title: '',
    description: '',
    key: '',
  };
  const [note, setNote] = useState<Partial<Note>>(initialValues);

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  const handlePress = async () => {
    try {
      const newNote = { ...note, createdAt: Timestamp.now(), updatedAt: Timestamp.now() } as Note;
      await dispatch(addNote(newNote)).unwrap();
      setNote(initialValues);
      CustomToast('success', t('message.success.addNote'));
      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Input
        numberOfLines={1}
        label={t('noteTitle')}
        placeholder={t('noteTitlePlaceholder')}
        textAlign="center"
        value={note.title}
        onChangeText={e => {
          setNote({ ...note, title: e });
        }}
        maxLength={50}
        labelStyle={{ textAlign: 'center', fontSize: 24 }}
        multiline
      />

      <Input
        label={t('noteDescription')}
        placeholder={t('noteDescriptionPlaceholder')}
        value={note.description}
        onChangeText={e => {
          setNote({ ...note, description: e });
        }}
        containerStyle={{ flexGrow: 1 }}
        labelStyle={{
          textAlign: 'center',
          fontSize: 24,
        }}
        multiline
      />
      <Button
        size="lg"
        title={t('createNoteButton')}
        buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
        containerStyle={{ minWidth: '95%', borderRadius: 25 }}
        onPress={() => handlePress()}
      />
      <DiscardChangesAlert navigation={navigation} isUpdate={!isEqual(note, initialValues)} />
    </CustomScrollContainer>
  );
};

export default CreateNote;
