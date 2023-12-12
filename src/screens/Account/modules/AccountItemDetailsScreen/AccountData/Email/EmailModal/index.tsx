import { View, Modal, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectEmail } from '@src/redux/auth/auth.slice';
import CustomToast from '@src/components/CustomToast';
import { changeEmail } from '@src/redux/auth/auth.api';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { EmailModalProps } from './types';
import FormInput from './FormInput';
import EmailChangeButton from './EmailChangeButton';
import { BackButton } from '../../components';

const EmailModal = ({ visible, onClose }: EmailModalProps) => {
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

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
