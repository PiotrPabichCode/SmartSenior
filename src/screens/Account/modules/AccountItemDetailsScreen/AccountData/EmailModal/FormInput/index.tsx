import { Input } from '@rneui/themed';
import { FormInputProps } from './types';
import { StyleSheet } from 'react-native';

const FormInput = ({ label, onChange, placeholder, value }: FormInputProps) => {
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

const styles = StyleSheet.create({
  label: {
    alignSelf: 'center',
    fontSize: 20,
  },
  container: {
    minWidth: '95%',
  },
  input: {
    marginLeft: 20,
  },
});
