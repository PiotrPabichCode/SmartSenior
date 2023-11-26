import { View, Text } from 'react-native';
import { useState } from 'react';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import { AccountDataInput, EmailModal, PasswordModal } from './components';
import { t } from '@src/localization/Localization';
import { Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateButton from '@src/components/DateButton';
import { Timestamp } from 'firebase/firestore';
import DatePicker from '@src/components/DatePicker';
import { getUpdatedFields } from '@src/utils/utils';
import CustomToast from '@src/components/CustomToast';
import { updateUserData } from '@src/redux/auth/auth.actions';
import { goBack } from '@src/navigation/navigationUtils';

const AccountData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => selectUser(state));
  const [showDate, setShowDate] = useState<boolean>(false);
  const [emailChange, setEmailChange] = useState<boolean>(false);
  const [passwordChange, setPasswordChange] = useState<boolean>(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  if (!user) {
    return null;
  }
  return (
    <View style={{ gap: 5 }}>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          birthDate: user.birthDate,
        }}
        onSubmit={async values => {
          try {
            const updatedValues = getUpdatedFields(user, values);
            if (updatedValues.phoneNumber) {
              const schema = Yup.string().matches(phoneRegExp, 'Invalid phone number');
              const valid = await schema.isValid(updatedValues.phoneNumber);
              if (!valid) {
                return CustomToast('error', 'Podano nieprawidłowy numer telefonu');
              }
            }
            await dispatch(updateUserData({ uid: user?.uid, values: updatedValues })).unwrap();
            console.log(updatedValues);
            CustomToast('success', 'Zaaktulizowano dane osobowe');
            goBack();
          } catch (error) {
            console.log(error);
            CustomToast('error', 'Nie udało się zaaktulizować danych');
          }
        }}>
        {({ values, setFieldValue, handleSubmit }) => (
          <>
            <AccountDataInput
              label={t('account.title.firstName')}
              placeholder={t('account.placeholder.firstName')}
              fieldName={'firstName'}
              value={values.firstName}
              onChange={setFieldValue}
            />
            <AccountDataInput
              label={t('account.title.lastName')}
              placeholder={t('account.placeholder.lastName')}
              fieldName={'lastName'}
              value={values.lastName}
              onChange={setFieldValue}
            />
            <AccountDataInput
              label={'Numer telefonu'}
              placeholder={'Podaj numer telefonu'}
              fieldName={'phoneNumber'}
              value={values.phoneNumber}
              onChange={setFieldValue}
            />
            <View style={{ gap: 15, marginTop: 10 }}>
              <Button
                title={t('account.title.passwordChange')}
                titleProps={{ allowFontScaling: true }}
                icon={{ type: 'font-awesome5', name: 'lock', color: 'white' }}
                containerStyle={{ borderRadius: 25 }}
                buttonStyle={{ padding: 15, backgroundColor: '#502419', gap: 10 }}
                onPress={() => setPasswordChange(true)}
              />
              <PasswordModal visible={passwordChange} onClose={setPasswordChange} />
              <Button
                title={t('account.title.email', {
                  email: user.email,
                })}
                titleProps={{ allowFontScaling: true }}
                icon={{ type: 'entypo', name: 'email', color: 'white' }}
                containerStyle={{ borderRadius: 25 }}
                buttonStyle={{ padding: 15, backgroundColor: '#502419', gap: 10 }}
                onPress={() => setEmailChange(true)}
              />
              <EmailModal visible={emailChange} onClose={setEmailChange} />
              <DateButton
                date={values.birthDate}
                onPress={setShowDate}
                styles={{ backgroundColor: 'blue' }}
                label={'account.title.birthDate'}
                labelEmpty={'account.placeholder.birthDate'}
              />
              <DatePicker
                date={values.birthDate}
                fieldName={'birthDate'}
                isVisible={showDate}
                onChange={setFieldValue}
                onClose={setShowDate}
              />
              <Button
                title={t('account.changeData')}
                containerStyle={{ borderRadius: 25 }}
                buttonStyle={{ padding: 15, backgroundColor: 'green' }}
                onPress={() => handleSubmit()}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AccountData;
