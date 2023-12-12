import { Input } from '@rneui/themed';
import { FormInputProps } from './types';

const FormInput = ({ label, onChange, placeholder, value }: FormInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      label={label}
      leftIcon={{ type: 'font-awesome', name: 'comment' }}
      onChangeText={value => onChange(value)}
    />
  );
};

export default FormInput;
