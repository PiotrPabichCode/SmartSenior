import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import EmailModal from './EmailModal';

type Props = {
  email: string | null;
};

const Email = ({ email }: Props) => {
  const [emailChange, setEmailChange] = useState<boolean>(false);
  return (
    <>
      <Button
        title={t('account.title.email', {
          email: email,
        })}
        titleProps={{ allowFontScaling: true }}
        icon={{ type: 'entypo', name: 'email', color: 'white' }}
        buttonStyle={styles.emailButton}
        onPress={() => setEmailChange(true)}
      />
      <EmailModal visible={emailChange} onClose={setEmailChange} />
    </>
  );
};

export default Email;

const styles = StyleSheet.create({
  emailButton: {
    padding: 15,
    backgroundColor: '#502419',
    gap: 10,
  },
});
