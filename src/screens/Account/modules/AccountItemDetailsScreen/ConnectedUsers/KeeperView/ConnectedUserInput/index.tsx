import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Icons } from '@src/components';
import { handleAddUser } from './utils';
import { t } from '@src/localization/Localization';
import { Input } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';

const ConnectedUserInput = () => {
  const [email, setEmail] = useState<string>('');
  const styles = useStyles();
  return (
    <Input
      rightIcon={<Icons name="add" style={styles.icon} onPress={() => handleAddUser(email)} />}
      placeholder={t('connectedUsers.placeholder')}
      value={email}
      onChangeText={setEmail}
      keyboardType={'email-address'}
    />
  );
};

export default ConnectedUserInput;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    icon: {
      backgroundColor: theme.customBtnBackground,
      padding: 5,
      borderRadius: 25,
    },
  });
