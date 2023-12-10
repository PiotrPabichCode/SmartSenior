import { View } from 'react-native';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import { t } from '@src/localization/Localization';
import { Button } from '@rneui/themed';
import { Formik } from 'formik';
import DateButton from '@src/components/DateButton';
import DatePicker from '@src/components/DatePicker';
import { getUpdatedFields } from '@src/utils/utils';
import CustomToast from '@src/components/CustomToast';
import { updateUserData } from '@src/redux/auth/auth.actions';
import { goBack } from '@src/navigation/navigationUtils';
import FormikObserver from '@src/utils/FormikObserver';
import { UpdateAccountSchema } from './utils';
import AccountDataInput from './AccountDataInput';
import EmailModal from './EmailModal';
import PasswordModal from './PasswordModal';

const AccountData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => selectUser(state));
  const [showDate, setShowDate] = useState<boolean>(false);
  const [emailChange, setEmailChange] = useState<boolean>(false);
  const [passwordChange, setPasswordChange] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
        validationSchema={UpdateAccountSchema}
        onSubmit={async values => {
          try {
            const updatedValues = getUpdatedFields(user, values);
            await dispatch(updateUserData({ uid: user?.uid, values: updatedValues })).unwrap();
            CustomToast('success', t('message.success.updateAccountData'));
            goBack();
          } catch (error) {
            console.log(error);
            CustomToast('error', t('message.error.updateAccountData'));
          }
        }}>
        {({ values, setFieldValue, handleSubmit, errors }) => (
          <>
            <AccountDataInput
              label={t('account.title.firstName')}
              placeholder={t('account.placeholder.firstName')}
              fieldName={'firstName'}
              value={values.firstName}
              onChange={setFieldValue}
              errorMessage={errors.firstName}
            />
            <AccountDataInput
              label={t('account.title.lastName')}
              placeholder={t('account.placeholder.lastName')}
              fieldName={'lastName'}
              value={values.lastName}
              onChange={setFieldValue}
              errorMessage={errors.lastName}
            />
            <AccountDataInput
              label={t('account.title.phoneNumber')}
              placeholder={t('account.placeholder.phoneNumber')}
              fieldName={'phoneNumber'}
              value={values.phoneNumber}
              onChange={setFieldValue}
              errorMessage={errors.phoneNumber}
            />
            <View style={{ gap: 15, marginTop: 10 }}>
              <Button
                title={t('account.title.passwordChange')}
                titleProps={{ allowFontScaling: true }}
                icon={{ type: 'font-awesome5', name: 'lock', color: 'white' }}
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
              {isUpdate && (
                <Button
                  title={t('account.changeData')}
                  buttonStyle={{ padding: 15, backgroundColor: 'green' }}
                  onPress={() => handleSubmit()}
                />
              )}
              <FormikObserver
                onChange={(data: any) => {
                  const changedFields = getUpdatedFields(data.initialValues, data.values);
                  if (Object.keys(changedFields).length > 0) {
                    setIsUpdate(true);
                  } else {
                    setIsUpdate(false);
                  }
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AccountData;
