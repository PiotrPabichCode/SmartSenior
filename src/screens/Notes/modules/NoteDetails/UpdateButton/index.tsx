import { t } from '@src/localization/Localization';
import { onSubmit } from '../utils';
import useThemeColors from '@src/config/useThemeColors';
import { Dispatch, SetStateAction } from 'react';
import { Note } from '@src/models';
import { Button } from '@src/components/shared';

type UpdateButtonProps = {
  storeNote: Note;
  note: Note;
  onSuccess: Dispatch<SetStateAction<Note>>;
};

const UpdateButton = ({ storeNote, note, onSuccess }: UpdateButtonProps) => {
  const backgroundColor = useThemeColors().customBtnBackground;
  return (
    <Button
      title={t('updateNoteButton')}
      buttonStyle={{ backgroundColor }}
      onPress={() => onSubmit(storeNote, note, onSuccess)}
    />
  );
};

export default UpdateButton;
