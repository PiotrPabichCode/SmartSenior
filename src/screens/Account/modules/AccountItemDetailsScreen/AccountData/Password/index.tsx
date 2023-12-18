import { t } from '@src/localization/Localization';
import PasswordModal from './PasswordModal';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import { Icons } from '@src/components';

const Password = () => {
  const [passwordChange, setPasswordChange] = useState<boolean>(false);
  return (
    <>
      <Button
        title={t('account.title.passwordChange')}
        titleProps={{ allowFontScaling: true }}
        icon={<Icons name="lock" />}
        buttonStyle={styles.button}
        onPress={() => setPasswordChange(true)}
      />
      <PasswordModal visible={passwordChange} onClose={setPasswordChange} />
    </>
  );
};

export default Password;

const styles = StyleSheet.create({
  button: { padding: 15, backgroundColor: '#502419', gap: 10 },
});
