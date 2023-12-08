import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { useStyles } from './styles';

const FirstLoginForm = ({ user }: FirstLoginFormProps) => {
  const dispatch = useAppDispatch();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const styles = useStyles();

  return (
    <ScrollView
      contentContainerStyle={styles.view}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.innerContainer}>
        <Formik
          initialValues={{
            firstName: user?.firstName ? user.firstName : '',
            lastName: user?.lastName ? user.lastName : '',
            birthDate: user?.birthDate ? user.birthDate : null,
            gender: user?.gender ? user.gender : null,
            phoneNumber: user?.phoneNumber ? user.phoneNumber : '',
            role: Roles.SENIOR,
          }}
          onSubmit={async values => {
            FirstLoginSchema.validate(values)
              .then(async () => {
                try {
                  await dispatch(updateUserData({ uid: user?.uid!, values: values })).unwrap();
                  navigate('BottomBar', {
                    screen: 'Home',
                  });
                  CustomToast('success', t('success.saveChanges'));
                } catch (error) {
                  CustomToast('error', t('error.unknown'));
                }
              })
              .catch(error => {
                console.log(error);
                CustomToast('error', t('error.missingData'));
              });
          }}>
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <>
              <Text style={styles.title}>{t('firstLoginWizard.title')}</Text>
              <Input
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                placeholder={t('firstLoginWizard.button.title.firstName')}
              />
              <Input
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                placeholder={t('firstLoginWizard.button.title.lastName')}
              />
              <Input
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                placeholder={t('firstLoginWizard.button.title.phoneNumber')}
              />
              <DateButton
                date={values.birthDate}
                onPress={setShowDatePicker}
                styles={{ backgroundColor: 'blue' }}
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
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text style={styles.submit}>{t('firstLoginWizard.button.submit')}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default FirstLoginForm;
