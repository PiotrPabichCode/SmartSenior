import { t } from '@src/localization/Localization';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import EmailModal from './EmailModal';
import { Button } from '@src/components/shared';
import { Icons } from '@src/components';

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
        titleProps={{ numberOfLines: 1 }}
        icon={<Icons name="email" />}
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
    backgroundColor: '#502419',
    gap: 10,
  },
});
