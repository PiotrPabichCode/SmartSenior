import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { handlePress } from '../utils';
import { Note } from '@src/models';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@src/components/shared';

type Props = {
  note: Partial<Note>;
  onChange: Dispatch<SetStateAction<Partial<Note>>>;
};

const CreateButton = ({ note, onChange }: Props) => {
  const backgroundColor = useThemeColors().customBtnBackground;
  return (
    <Button
      title={t('createNoteButton')}
      buttonStyle={{ backgroundColor }}
      onPress={() => handlePress(note, onChange)}
    />
  );
};

export default CreateButton;
