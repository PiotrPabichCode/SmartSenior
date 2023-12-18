import { View, TextInput } from 'react-native';
import { Button } from '@src/components/shared';
import { useState } from 'react';
import { goBack } from '@src/navigation/navigationUtils';
import { addConnectedUser } from '@src/redux/auth/auth.actions';
import { t } from '@src/localization/Localization';
import CustomToast from '@src/components/CustomToast';
import { addChat } from '@src/redux/chats/chats.actions';
import * as Yup from 'yup';
import { useAppDispatch } from '@src/redux/types';
import { Text } from '@rneui/themed';

const AddConnectedUser = () => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = () => async () => {
    try {
      const valid = await Yup.string().email().isValid(email);
      if (!valid) {
        return CustomToast('error', t('message.error.invalidEmail'));
      }
      const user = await dispatch(addConnectedUser(email)).unwrap();
      await dispatch(addChat(user.user)).unwrap();
      goBack();
      CustomToast('success', t('message.success.addConnectedUser'));
    } catch (error) {
      CustomToast('error', t('message.error.addConnectedUser'));
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 25,
          elevation: 5,
          width: '90%',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 24, fontWeight: '500' }}>{t('addConnectedUser.title')}</Text>
        <TextInput
          style={{
            fontSize: 24,
            fontWeight: '500',
            marginBottom: 16,
            paddingBottom: 16,
            width: '100%',
            textAlign: 'center',
          }}
          placeholder={t('account.placeholder.email')}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid={'brown'}
        />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button color={'green'} onPress={onSubmit()} title={t('addConnectedUser.add')} />
          <Button color={'red'} onPress={() => goBack()} title={t('addConnectedUser.exit')} />
        </View>
      </View>
    </View>
  );
};

export default AddConnectedUser;
