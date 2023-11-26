import { View, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import Icons from '@src/components/Icons';
import CustomToast from '@src/components/CustomToast';
import { changePassword } from '@src/redux/auth/auth.api';
import Toast from 'react-native-toast-message';

type Props = {
  visible: boolean;
  onClose: any;
};

const PasswordModal = ({ visible, onClose }: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
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
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Input
            placeholder={t('account.placeholder.currentPassword')}
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            labelStyle={{ alignSelf: 'center', fontSize: 20 }}
            containerStyle={{ minWidth: '95%' }}
            inputStyle={{ marginHorizontal: 10 }}
            label={t('account.title.currentPassword')}
            onChangeText={value => setCurrentPassword(value)}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            rightIcon={
              <Icons
                name={showCurrentPassword ? 'show-toggle' : 'hide-toggle'}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            }
          />
          <Input
            placeholder={t('account.placeholder.newPassword')}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            labelStyle={{ alignSelf: 'center', fontSize: 20 }}
            containerStyle={{ minWidth: '95%' }}
            inputStyle={{ marginHorizontal: 10 }}
            label={t('account.title.newPassword')}
            onChangeText={value => setNewPassword(value)}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            rightIcon={
              <Icons
                name={showNewPassword ? 'show-toggle' : 'hide-toggle'}
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            }
          />
          <Input
            placeholder={t('account.placeholder.repeatNewPassword')}
            secureTextEntry={!showRepeatNewPassword}
            value={repeatNewPassword}
            labelStyle={{ alignSelf: 'center', fontSize: 20 }}
            containerStyle={{ minWidth: '95%' }}
            inputStyle={{ marginHorizontal: 10 }}
            label={t('account.title.repeatNewPassword')}
            onChangeText={value => setRepeatNewPassword(value)}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            rightIcon={
              <Icons
                name={showRepeatNewPassword ? 'show-toggle' : 'hide-toggle'}
                onPress={() => setShowRepeatNewPassword(!showRepeatNewPassword)}
              />
            }
          />
          <Button
            title={t('account.changePassword')}
            containerStyle={{ borderRadius: 25, marginBottom: 15 }}
            buttonStyle={{ padding: 15, backgroundColor: 'green' }}
            onPress={async () => {
              await handlePasswordChange();
            }}
          />
          <Button
            title={t('account.back')}
            containerStyle={{ borderRadius: 25 }}
            buttonStyle={{ padding: 15, backgroundColor: 'black' }}
            onPress={() => {
              onClose(false);
            }}
          />
        </View>
      </ScrollView>
      <Toast />
    </Modal>
  );
};

export default PasswordModal;
