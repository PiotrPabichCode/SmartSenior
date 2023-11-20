import { View, Modal } from 'react-native';
import { useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectEmail } from '@src/redux/auth/auth.slice';
import CustomToast from '@src/components/CustomToast';
import { changeEmail } from '@src/redux/auth/auth.api';
import * as Yup from 'yup';

type Props = {
  visible: boolean;
  onClose: any;
};

const EmailModal = ({ visible, onClose }: Props) => {
  const email = useAppSelector(state => selectEmail(state));
  const [newEmail, setNewEmail] = useState<string>('');

  const handleEmailChange = async () => {
    const valid = await Yup.string().email().isValid(newEmail);
    if (!valid) {
      return CustomToast('error', t('message.error.invalidEmail'));
    }
    if (email === newEmail) {
      return CustomToast('error', 'Podany adres email już istnieje');
    }
    onClose(false);
    changeEmail(newEmail);
    CustomToast('success', 'Prośba o zmianę adresu e-mail została wysłana');
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Input
            placeholder={t('account.placeholder.emailChange')}
            value={newEmail}
            labelStyle={{ alignSelf: 'center', fontSize: 20 }}
            containerStyle={{ minWidth: '95%' }}
            inputStyle={{ marginLeft: 20 }}
            label={t('account.placeholder.emailChange')}
            leftIcon={{ type: 'font-awesome', name: 'comment' }}
            onChangeText={value => setNewEmail(value)}
          />
          <Button
            title={t('account.title.emailChange')}
            containerStyle={{ borderRadius: 25, marginBottom: 15 }}
            buttonStyle={{ padding: 15, backgroundColor: 'green' }}
            onPress={async () => {
              await handleEmailChange();
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
      </View>
    </Modal>
  );
};

export default EmailModal;
