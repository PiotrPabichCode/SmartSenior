import { ScrollView, Text, View } from 'react-native';
import DatePicker from '@src/components/DatePicker';
import CustomDropdown from '@src/components/CustomDropdown';
import { genders, roles } from '@src/redux/auth/auth.constants';
import { t } from '@src/localization/Localization';
import { Formik } from 'formik';
import { FirstLoginFormProps } from './types';
import { Roles } from '@src/models';
import { FirstLoginSchema } from './utils';
import { updateUserData } from '@src/redux/auth/auth.actions';
import { navigate } from '@src/navigation/navigationUtils';
import CustomToast from '@src/components/CustomToast';
import { useAppDispatch } from '@src/redux/types';
import { Input } from '@rneui/themed';
import DateButton from '@src/components/DateButton';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import SaveChangesButton from './SaveChangesButton';

const FirstLoginForm = ({ user }: FirstLoginFormProps) => {
  const dispatch = useAppDispatch();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <ScrollView
      contentContainerStyle={styles.view}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.innerContainer}>
        <Formik
          initialValues={{
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            birthDate: user?.birthDate ?? null,
            gender: user?.gender ?? null,
            phoneNumber: user?.phoneNumber ?? '',
            role: user?.role ?? Roles.SENIOR,
          }}
          validationSchema={FirstLoginSchema}
          onSubmit={async values => {
            try {
              await dispatch(updateUserData({ uid: user?.uid!, values: values })).unwrap();
              navigate('BottomBar', {
                screen: 'Home',
              });
              CustomToast('success', t('success.saveChanges'));
            } catch (error) {
              CustomToast('error', t('error.unknown'));
            }
          }}>
          {({ values, handleChange, handleSubmit, handleBlur, setFieldValue, touched, errors }) => (
            <>
              <Text style={styles.title}>{t('firstLoginWizard.title')}</Text>
              <Input
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                placeholder={t('firstLoginWizard.button.title.firstName')}
                errorMessage={touched.firstName ? errors.firstName : ''}
              />
              <Input
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                placeholder={t('firstLoginWizard.button.title.lastName')}
                errorMessage={touched.lastName ? errors.lastName : ''}
              />
              <Input
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                placeholder={t('firstLoginWizard.button.title.phoneNumber')}
                errorMessage={touched.phoneNumber ? errors.phoneNumber : ''}
              />
              <DateButton
                date={values.birthDate}
                onPress={setShowDatePicker}
                onBlur={handleBlur('birthDate')}
                styles={styles.dateButton}
                isError={touched.birthDate && errors.birthDate ? true : false}
                label={'firstLoginWizard.button.title.birthDate'}
                labelEmpty={'firstLoginWizard.button.title.birthDateEmpty'}
              />
              <DatePicker
                date={values.birthDate}
                fieldName={'birthDate'}
                isVisible={showDatePicker}
                onChange={setFieldValue}
                onClose={setShowDatePicker}
              />
              <CustomDropdown
                data={genders}
                placeholder={t('firstLoginWizard.button.placeholder.gender')}
                value={values.gender}
                handleChange={(e: any) => setFieldValue('gender', e.value)}
              />
              <CustomDropdown
                data={roles.filter(role => role.value !== Roles.ADMIN)}
                placeholder={t('firstLoginWizard.button.placeholder.role')}
                value={values.role}
                handleChange={(e: any) => setFieldValue('role', e.value)}
              />
              <SaveChangesButton onSubmit={handleSubmit} />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default FirstLoginForm;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 25,
    gap: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  dateButton: {
    backgroundColor: '#260a0b',
  },
  submit: {
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 25,
    color: 'white',
    alignSelf: 'stretch',
    paddingHorizontal: 40,
    fontSize: 16,
  },
});
