import { Input } from '@rneui/themed';
import { AccountDataInputProps } from './types';
import { StyleSheet } from 'react-native';

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
      labelStyle={styles.label}
      containerStyle={styles.container}
      inputStyle={styles.input}
      label={label}
      leftIcon={{ type: 'font-awesome', name: 'comment' }}
      errorMessage={errorMessage}
      onChangeText={value => onChange(fieldName, value)}
    />
  );
};

export default AccountDataInput;

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
