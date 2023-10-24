import { useEffect, useState, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import type { PropsWithChildren } from 'react';
import { CheckBox } from '@rneui/themed';
import { renderIcon } from '@src/components/Icons';
import Colors from '@src/constants/Colors';

type AccountItemDetailsProps = PropsWithChildren<{
  type?: string;
  keyboard?: string;
  title: string;
  placeholder?: string;
  value?: string | number;
  valueType?: string;
}>;

const AccountItemDetails = ({
  type,
  keyboard,
  title,
  placeholder,
  value,
}: AccountItemDetailsProps) => {
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    typeof value === 'boolean' && setChecked(value);
    typeof value === 'string' && setInput(value);
  }, [value]);

  switch (type) {
    case 'input':
      return (
        <TouchableOpacity style={styles.viewStyle} onPress={() => inputRef.current?.focus()}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.rightPanel}>
            <TextInput
              ref={inputRef}
              pointerEvents="none"
              cursorColor={'black'}
              placeholder={placeholder}
              value={input}
              style={styles.title}
              underlineColorAndroid="transparent"
              onChangeText={setInput}
              keyboardType={keyboard || 'default'}
            />
            {renderIcon({ name: 'edit' })}
          </View>
        </TouchableOpacity>
      );
    case 'checkbox':
      return (
        <View style={styles.viewStyle}>
          <Text style={styles.title}>{title}</Text>
          <CheckBox
            checked={checked}
            style={{ backgroundColor: 'white' }}
            onPress={() => setChecked(!checked)}
            checkedColor="blue"
          />
        </View>
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontWeight: '500',
    flex: 3,
    color: 'black',
  },
  icon: {
    backgroundColor: 'white',
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 4,
  },
  checkbox: {
    backgroundColor: 'black',
  },
});

export default AccountItemDetails;
