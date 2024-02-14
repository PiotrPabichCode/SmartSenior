import { Input } from '@rneui/themed';
import { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';

type NameInputProps = {
  value: string;
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
};

const NameInput = ({ onChange, value, fieldName }: NameInputProps) => {
  return (
    <Input
      placeholder={t('tags.namePlaceholder')}
      value={value}
      onChangeText={value => onChange(fieldName, value)}
      leftIcon={renderIcon({
        name: 'tags-account',
        size: 24,
      })}
    />
  );
};

export default NameInput;
