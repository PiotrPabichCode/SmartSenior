import { Input } from '@rneui/themed';
import { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { NameInputProps } from './types';
import { StyleSheet } from 'react-native';

const NameInput = ({ onChange, value, fieldName }: NameInputProps) => {
  return (
    <Input
      placeholder={t('tags.namePlaceholder')}
      value={value}
      onChangeText={value => onChange(fieldName, value)}
      inputStyle={styles.input}
      leftIcon={renderIcon({
        name: 'tags-account',
        size: 24,
        style: styles.icon,
      })}
    />
  );
};

export default NameInput;

const styles = StyleSheet.create({
  input: {
    alignSelf: 'flex-end',
  },
  icon: {
    marginTop: 10,
  },
});
