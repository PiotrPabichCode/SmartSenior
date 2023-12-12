import { Input } from '@rneui/themed';
import { AccountDataInputProps } from './types';

const AccountDataInput = ({
  label,
  placeholder,
  fieldName,
  value,
  onChange,
  errorMessage,
}: AccountDataInputProps) => {
  return (
    <Input
      placeholder={placeholder || ''}
      value={value || ''}
      label={label}
      leftIcon={{ type: 'font-awesome', name: 'comment' }}
      errorMessage={errorMessage}
      onChangeText={value => onChange(fieldName, value)}
    />
  );
};

export default AccountDataInput;
