import { Input } from '@rneui/themed';
import { FormInputProps } from './types';
import { useStyles } from './styles';

const FormInput = ({ label, onChange, placeholder, value }: FormInputProps) => {
  const styles = useStyles();
  return (
    <Input
      placeholder={placeholder}
      value={value}
      labelStyle={styles.label}
      containerStyle={styles.container}
      inputStyle={styles.input}
      label={label}
      leftIcon={{ type: 'font-awesome', name: 'comment' }}
      onChangeText={value => onChange(value)}
    />
  );
};

export default FormInput;
