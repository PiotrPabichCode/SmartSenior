import { Input } from '@rneui/themed';
import { FormInputProps } from './types';
import { Icons } from '@src/components';

const FormInput = ({ label, onChange, placeholder, value }: FormInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      label={label}
      leftIcon={<Icons name="email" />}
      onChangeText={value => onChange(value)}
    />
  );
};

export default FormInput;
