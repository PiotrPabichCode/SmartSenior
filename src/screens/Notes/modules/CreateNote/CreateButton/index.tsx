import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { handlePress } from '../utils';
import { Note } from '@src/models';
import { Button } from '@src/components/shared';

type CreateButtonProps = {
  note: Partial<Note>;
  onChange: (note: Partial<Note>) => void;
};

const CreateButton = ({ note, onChange }: CreateButtonProps) => {
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
