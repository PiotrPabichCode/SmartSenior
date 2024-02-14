import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type NoteDescriptionProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const NoteDescription = ({ value, onChange }: NoteDescriptionProps) => {
  return (
    <Input
      label={t('noteDescription')}
      placeholder={t('noteDescriptionPlaceholder')}
      value={value}
      onChangeText={e => {
        onChange(e);
      }}
      containerStyle={styles.description}
      multiline
    />
  );
};

export default NoteDescription;

const styles = StyleSheet.create({
  description: {
    flexGrow: 1,
  },
});
