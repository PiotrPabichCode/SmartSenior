import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@rneui/themed';
import CustomDropdown from '@components/CustomDropdown';
import CustomToast from '@src/components/CustomToast';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icons from '@src/components/Icons';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { genders, roles } from '@src/redux/auth/auth.constants';
import { t } from '@src/localization/Localization';
import { logout, updateUserData } from '@src/redux/auth/auth.actions';
import { navigate } from '@src/navigation/navigationUtils';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate, dateToEpoch } from '@src/utils/utils';
import { User, Roles, Genders } from '@src/models';

const FirstLoginWizard = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.auth.status);
  const user: User | null = useAppSelector(state => state.auth.user);
  const FirstLoginSchema = Yup.object().shape({
    firstName: Yup.string().min(1).required(),
    lastName: Yup.string().min(1).required(),
    birthDate: Yup.mixed<Timestamp>().required(),
    gender: Yup.string().oneOf(Object.values(Genders)).required(),
    role: Yup.string().oneOf(Object.values(Roles)).required(),
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  if (status === 'pending' || !user) {
    return <CustomActivityIndicator />;
  }

  if (Object.values(user).findIndex(val => !val) >= 0) {
    navigate('BottomBar', {
      screen: 'Home',
    });
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={() => dispatch(logout())}>
        <Text style={styles.logoutTitle}>{t('firstLoginWizard.button.title.logout')}</Text>
        <Icons name="logout-wizard" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.view}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              birthDate: null,
              gender: Genders.MALE,
              role: Roles.SENIOR,
            }}
            onSubmit={async values => {
              FirstLoginSchema.validate(values)
                .then(async () => {
                  try {
                    await dispatch(updateUserData({ uid: user.uid, values: values })).unwrap();
                    CustomToast('success', t('success.saveChanges'));
                    navigate('BottomBar', {
                      screen: 'Home',
                    });
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
                <Button
                  onPress={() => setShowDatePicker(true)}
                  title={
                    values.birthDate
                      ? t('firstLoginWizard.button.title.birthDate', {
                          birthDate: convertTimestampToDate(values.birthDate, 'DD-MM-YYYY'),
                        })
                      : t('firstLoginWizard.button.title.birthDateEmpty')
                  }
                />
                {showDatePicker && (
                  <RNDateTimePicker
                    value={new Date()}
                    maximumDate={new Date()}
                    onChange={(e, newDate) => {
                      setShowDatePicker(false);
                      if (e.type !== 'set') {
                        return false;
                      }
                      if (newDate) {
                        setFieldValue('birthDate', Timestamp.fromMillis(dateToEpoch(newDate)));
                      }
                    }}
                  />
                )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
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
  logout: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 25,
    gap: 10,
    margin: 5,
    borderWidth: 1,
    elevation: 5,
    backgroundColor: 'darkblue',
  },
  logoutTitle: {
    color: 'white',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
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

export default FirstLoginWizard;
