import { View, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectEmail } from '@src/redux/auth/auth.slice';
import CustomToast from '@src/components/CustomToast';
import { changeEmail } from '@src/redux/auth/auth.api';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { useStyles } from './styles';
import { EmailModalProps } from './types';
import FormInput from './FormInput';
import BackButton from './BackButton';
import EmailChangeButton from './EmailChangeButton';

const EmailModal = ({ visible, onClose }: EmailModalProps) => {
  const styles = useStyles();
  const email = useAppSelector(state => selectEmail(state));
  const [newEmail, setNewEmail] = useState<string>('');

  const handleEmailChange = async () => {
    const valid = await Yup.string().email().isValid(newEmail);
    if (!valid) {
      return CustomToast('error', t('message.error.invalidEmail'));
    }
    if (email === newEmail) {
      return CustomToast('error', t('message.error.duplicateEmail'));
    }
    onClose(false);
    changeEmail(newEmail);
    CustomToast('success', t('message.success.updateEmail'));
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <FormInput
            placeholder={t('account.placeholder.emailChange')}
            value={newEmail}
            label={t('account.placeholder.emailChange')}
            onChange={setNewEmail}
          />
          <EmailChangeButton onPress={handleEmailChange} />
          <BackButton onClose={onClose} />
        </View>
      </ScrollView>
      <Toast />
    </Modal>
  );
};

export default EmailModal;
