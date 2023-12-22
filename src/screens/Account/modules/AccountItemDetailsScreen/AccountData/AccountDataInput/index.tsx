import { Input } from '@rneui/themed';
import { AccountDataInputProps } from './types';
import { Icons } from '@src/components';

const AccountDataInput = ({
  label,
  placeholder,
  fieldName,
  value,
  onChange,
  iconName,
  errorMessage,
}: AccountDataInputProps) => {
  return (
    <Input
      placeholder={placeholder || ''}
      value={value || ''}
      label={label}
      leftIcon={<Icons name={iconName} />}
      errorMessage={errorMessage}
      onChangeText={value => onChange(fieldName, value)}
    />
  );
};

export default AccountDataInput;
