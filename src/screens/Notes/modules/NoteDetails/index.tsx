import { useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { updateNote } from '@src/redux/notes/notes.actions';
import { Note } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import { selectNoteByKey, selectNotesStatus } from '@src/redux/notes/notes.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { goBack } from '@src/navigation/navigationUtils';
import CustomToast from '@src/components/CustomToast';
import { NoteDetailsProps } from '@src/navigation/types';
import isEqual from 'lodash.isequal';
import { getUpdatedFields } from '@src/utils/utils';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { useStyles } from './styles';

const NoteDetails = ({ navigation, route }: NoteDetailsProps) => {
  const dispatch = useAppDispatch();
  const { key } = route.params;
  const storeNote = useAppSelector(state => selectNoteByKey(state, key));

  if (!storeNote) {
    goBack();
    return null;
  }

  const styles = useStyles();
  const status = useAppSelector(state => selectNotesStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const [note, setNote] = useState<Note>(storeNote);

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  const handlePress = async () => {
    try {
      const updatedNote = { ...note, updatedAt: Timestamp.now() };
      const updatedValues = getUpdatedFields(storeNote, updatedNote);
      await dispatch(updateNote({ key: note.key, data: updatedValues })).unwrap();
      CustomToast('success', t('message.success.updateNote'));
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
        labelStyle={styles.title}
        multiline
      />

      <Input
        label={t('noteDescription')}
        placeholder={t('noteDescriptionPlaceholder')}
        value={note.description}
        onChangeText={e => {
          setNote({ ...note, description: e });
        }}
        containerStyle={styles.descriptionContainer}
        labelStyle={styles.descriptionLabel}
        multiline
      />
      {!isEqual(storeNote, note) && (
        <>
          <Button
            size="lg"
            title={t('updateNoteButton')}
            buttonStyle={styles.updateButton}
            containerStyle={styles.updateButtonContainer}
            onPress={() => handlePress()}
          />
          <DiscardChangesAlert navigation={navigation} isUpdate={true} />
        </>
      )}
    </CustomScrollContainer>
  );
};

export default NoteDetails;
