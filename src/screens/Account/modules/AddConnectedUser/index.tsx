import { View, StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import { useState } from 'react';
import { goBack } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { Input, Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { onSubmit } from './utils';

const AddConnectedUser = () => {
  const [email, setEmail] = useState('');

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text h4>{t('addConnectedUser.title')}</Text>
        <Input
          placeholder={t('account.placeholder.email')}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View style={styles.buttonsContainer}>
          <Button color={'green'} onPress={onSubmit(email)} title={t('addConnectedUser.add')} />
          <Button color={'red'} onPress={() => goBack()} title={t('addConnectedUser.exit')} />
        </View>
      </View>
    </View>
  );
};

export default AddConnectedUser;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    innerContainer: {
      backgroundColor: theme.cardBackground,
      padding: 20,
      borderRadius: 25,
      elevation: 5,
      width: '90%',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 10,
    },
  });
