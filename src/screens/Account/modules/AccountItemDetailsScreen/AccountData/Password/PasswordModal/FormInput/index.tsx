import { useState } from 'react';
import { Input } from '@rneui/themed';
import Icons from '@src/components/Icons';
import { FormInputProps } from './types';

const FormInput = ({ label, placeholder, onChange, value }: FormInputProps) => {
  const [textVisible, setTextVisible] = useState(false);
  return (
    <Input
      placeholder={placeholder}
      secureTextEntry={!textVisible}
      value={value}
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
