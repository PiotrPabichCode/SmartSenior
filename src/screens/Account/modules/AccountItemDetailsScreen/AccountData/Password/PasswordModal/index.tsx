import { View, Modal, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { t } from '@src/localization/Localization';
import CustomToast from '@src/components/CustomToast';
import { changePassword } from '@src/redux/auth/auth.api';
import Toast from 'react-native-toast-message';
import FormInput from './FormInput';
import { PasswordModalProps } from './types';
import { BackButton } from '../../components';
import ChangePasswordButton from './ChangePasswordButton';

const PasswordModal = ({ visible, onClose }: PasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const MIN_LENGTH = 6;

  const handlePasswordChange = async () => {
    try {
      if (!currentPassword || !newPassword || !repeatNewPassword) {
        return CustomToast('error', t('message.error.missingData'));
      }
      if (newPassword !== repeatNewPassword) {
        return CustomToast('error', t('message.error.repeatPassword'));
      }
      if (currentPassword === newPassword) {
        return CustomToast('error', t('message.error.duplicatePassword'));
      }
      if (newPassword.length < MIN_LENGTH) {
        return CustomToast('error', t('message.error.passwordMinLength'));
      }
      await changePassword(currentPassword, newPassword);
      onClose(false);
      CustomToast('success', t('message.success.updatePassword'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <FormInput
            label={t('account.title.currentPassword')}
            placeholder={t('account.placeholder.currentPassword')}
            onChange={setCurrentPassword}
            value={currentPassword}
          />
          <FormInput
            label={t('account.title.newPassword')}
            placeholder={t('account.placeholder.newPassword')}
            onChange={setNewPassword}
            value={newPassword}
          />
          <FormInput
            label={t('account.title.repeatNewPassword')}
            placeholder={t('account.placeholder.repeatNewPassword')}
            onChange={setRepeatNewPassword}
            value={repeatNewPassword}
          />
          <ChangePasswordButton
            title={t('account.changePassword')}
            onPress={handlePasswordChange}
          />
          <BackButton onClose={onClose} />
        </View>
      </ScrollView>
      <Toast />
    </Modal>
  );
};

export default PasswordModal;

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
