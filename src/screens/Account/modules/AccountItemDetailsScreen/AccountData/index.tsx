import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import { t } from '@src/localization/Localization';
import { Formik } from 'formik';
import { getUpdatedFields } from '@src/utils/utils';
import CustomToast from '@src/components/CustomToast';
import { updateUserData } from '@src/redux/auth/auth.actions';
import { goBack } from '@src/navigation/navigationUtils';
import FormikObserver from '@src/utils/FormikObserver';
import { UpdateAccountSchema } from './utils';
import AccountDataInput from './AccountDataInput';
import Email from './Email';
import Password from './Password';
import BirthDate from './BirthDate';
import ChangeDataButton from './ChangeDataButton';

const AccountData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => selectUser(state));
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
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
              iconName="person"
              onChange={setFieldValue}
              errorMessage={errors.firstName}
            />
            <AccountDataInput
              label={t('account.title.lastName')}
              placeholder={t('account.placeholder.lastName')}
              fieldName={'lastName'}
              value={values.lastName}
              iconName="person"
              onChange={setFieldValue}
              errorMessage={errors.lastName}
            />
            <AccountDataInput
              label={t('account.title.phoneNumber')}
              placeholder={t('account.placeholder.phoneNumber')}
              fieldName={'phoneNumber'}
              value={values.phoneNumber}
              iconName="phone"
              onChange={setFieldValue}
              errorMessage={errors.phoneNumber}
            />
            <View style={styles.buttons}>
              <Password />
              <Email email={user.email} />
              <BirthDate onChange={setFieldValue} birthDate={values.birthDate} />
              <ChangeDataButton visible={isUpdate} onSubmit={handleSubmit} />
            </View>
            <FormikObserver
              onChange={data => {
                const changedFields = getUpdatedFields(data.initialValues, data.values);
                if (Object.keys(changedFields).length > 0) {
                  setIsUpdate(true);
                } else {
                  setIsUpdate(false);
                }
              }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AccountData;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  buttons: {
    gap: 15,
    marginTop: 10,
  },
});
