import { Input } from '@rneui/themed';
import { AccountDataInputProps } from './types';
import { useStyles } from './styles';

const AccountDataInput = ({
  label,
  placeholder,
  fieldName,
  value,
  onChange,
  errorMessage,
}: AccountDataInputProps) => {
  const styles = useStyles();
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
