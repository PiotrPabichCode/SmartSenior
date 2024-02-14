import { Input } from '@rneui/themed';
import { Icons } from '@src/components';

type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (_: string) => void;
};

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
