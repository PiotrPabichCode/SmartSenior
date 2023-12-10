import { useState } from 'react';
import { Input } from '@rneui/themed';
import Icons from '@src/components/Icons';
import { FormInputProps } from './types';
import { StyleSheet } from 'react-native';

const FormInput = ({ label, placeholder, onChange, value }: FormInputProps) => {
  const [textVisible, setTextVisible] = useState(false);
  return (
    <Input
      placeholder={placeholder}
      secureTextEntry={!textVisible}
      value={value}
      labelStyle={styles.label}
      containerStyle={styles.container}
      inputStyle={styles.input}
      label={label}
      onChangeText={value => onChange(value)}
      leftIcon={{ type: 'font-awesome', name: 'lock' }}
      rightIcon={
        <Icons
          name={textVisible ? 'show-toggle' : 'hide-toggle'}
          onPress={() => setTextVisible(!textVisible)}
        />
      }
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
    marginHorizontal: 10,
  },
});
