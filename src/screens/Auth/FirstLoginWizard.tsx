import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, db } from '../../../firebaseConfig';
import { get, ref, set } from 'firebase/database';
import { FirstLoginWizardProps } from '../../navigation/types';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@rneui/themed';
import CustomDropdown from '../../components/CustomDropdown';
import CustomToast from '../../custom/CustomToast';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icons from '../../custom/Icons';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

const GenderEnum = {
  WOMEN: 'Female',
  MEN: 'Male',
};

const genders = [
  { label: 'Kobieta', value: GenderEnum.WOMEN },
  { label: 'Mężczyzna', value: GenderEnum.MEN },
];

const FirstLoginSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required(),
  lastName: Yup.string().min(1).required(),
  birthDate: Yup.date().max(new Date()).required(),
  gender: Yup.string().oneOf(Object.values(GenderEnum)).required(),
});

const FirstLoginWizard = ({ navigation }: FirstLoginWizardProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(true);

  useEffect(() => {
    // Check if user exists
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      const checkIfExistsUserData = (user: User | null) => {
        const userRef = ref(db, 'users/' + user?.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              navigation.navigate('BottomBar', {
                screen: 'Home',
              });
              const unsubscribe = navigation.addListener('focus', () => {
                setConnecting(false);
                unsubscribe();
              });
            }
          })
          .catch((e) => {
            console.error('Error', e);
          })
          .finally(() => {
            setConnecting(false);
            navigation.setOptions({
              headerShown: true,
            });
          });
      };
      checkIfExistsUserData(user);
    });
  }, [connecting, navigation]);

  /*
    Show ActivityIndicator when user connection is loading
  */
  if (connecting) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => FIREBASE_AUTH.signOut()}>
        <Text style={styles.logoutTitle}>Wyloguj się</Text>
        <Icons name='logout-wizard' />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.view}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'>
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              birthDate: null,
              gender: '',
              email: getAuth().currentUser?.email,
            }}
            onSubmit={async (values) => {
              try {
                console.log(values);
                FirstLoginSchema.validate(values)
                  .then(() => {
                    const user = getAuth().currentUser;
                    const userRef = ref(db, 'users/' + user?.uid);
                    set(userRef, values);
                    navigation.navigate('BottomBar', {
                      screen: 'Home',
                    });
                    CustomToast('success', 'Zapisano zmiany');
                  })
                  .catch((errors) => {
                    console.log(errors);
                    CustomToast('error', 'Nie podano wszystkich danych');
                  });
              } catch (e) {
                console.log('Coś poszło nie tak');
                CustomToast('error', 'Coś poszło nie tak');
              }
            }}>
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <>
                <Text style={styles.title}>Wypełnij dane osobowe</Text>
                <Input
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  placeholder='Podaj imię'
                />
                <Input
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  placeholder='Podaj nazwisko'
                />
                <Button
                  onPress={() => setShowDatePicker(true)}
                  title={
                    values.birthDate
                      ? 'Data urodzenia: ' + values.birthDate
                      : 'Wybierz datę urodzenia'
                  }
                />
                {showDatePicker && (
                  <RNDateTimePicker
                    value={new Date()}
                    maximumDate={new Date()}
                    onChange={(e, newDate) => {
                      setShowDatePicker(false);
                      if (e.type === 'dismissed') {
                        return;
                      }
                      setFieldValue(
                        'birthDate',
                        moment(newDate).format('DD-MM-YYYY')
                      );
                    }}
                  />
                )}
                <CustomDropdown
                  fieldName='gender'
                  valueName='value'
                  data={genders}
                  placeholder='Wybierz płeć'
                  value={values.gender}
                  handleChange={(e: any) => setFieldValue('gender', e.value)}
                />
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <Text style={styles.submit}>Zatwierdź zmiany</Text>
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
