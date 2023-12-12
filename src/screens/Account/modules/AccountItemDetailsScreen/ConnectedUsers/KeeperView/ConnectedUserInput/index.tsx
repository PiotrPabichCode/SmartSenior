import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Icons } from '@src/components';
import { handleAddUser } from './utils';
import { t } from '@src/localization/Localization';
import { Input } from '@rneui/themed';

const ConnectedUserInput = () => {
  const [email, setEmail] = useState<string>('');
  return (
    <Input
      rightIcon={
        <Icons name="add" color="white" style={styles.icon} onPress={() => handleAddUser(email)} />
      }
      placeholder={t('connectedUsers.placeholder')}
      value={email}
      onChangeText={setEmail}
      keyboardType={'email-address'}
    />
  );
};

export default ConnectedUserInput;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 25,
  },
});
