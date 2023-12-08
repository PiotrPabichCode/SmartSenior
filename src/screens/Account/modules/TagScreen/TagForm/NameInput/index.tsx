import { Input } from '@rneui/themed';
import { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { NameInputProps } from './types';
import { useStyles } from './styles';

const NameInput = ({ onChange, value, fieldName }: NameInputProps) => {
  const styles = useStyles();
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
