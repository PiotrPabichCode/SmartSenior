import { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

import type { PropsWithChildren } from 'react';
import { CheckBox } from '@rneui/themed';
import { renderIcon } from '@src/components/Icons';

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

  useEffect(() => {
    typeof value === 'boolean' && setChecked(value);
    typeof value === 'string' && setInput(value);
  }, [value]);

  switch (type) {
    case 'input':
      return (
        <View style={styles.viewStyle}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.rightPanel}>
            <TextInput
              placeholder={placeholder}
              value={input}
              underlineColorAndroid="transparent"
              onChangeText={setInput}
              keyboardType={keyboard || 'default'}
            />
            {renderIcon({ name: 'edit' })}
          </View>
        </View>
      );
    case 'checkbox':
      return (
        <View style={styles.viewStyle}>
          <Text style={styles.title}>{title}</Text>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} checkedColor="blue" />
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
    backgroundColor: 'lightblue',
    borderRadius: 20,
  },
  title: {
    fontWeight: '500',
    flex: 3,
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
