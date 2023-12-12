import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const NoteTitle = ({ value, onChange }: Props) => {
  return (
    <Input
      numberOfLines={1}
      label={t('noteTitle')}
      placeholder={t('noteTitlePlaceholder')}
      textAlign="center"
      value={value}
      onChangeText={e => {
        onChange(e);
      }}
      maxLength={50}
      multiline
    />
  );
};

export default NoteTitle;
