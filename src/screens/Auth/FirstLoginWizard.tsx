import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, db } from '../../../firebaseConfig';
import { get, getDatabase, ref } from 'firebase/database';
import { FirstLoginWizardProps } from '../../navigation/types';
import { User, onAuthStateChanged } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@rneui/themed';
import CustomDropdown from '../../components/CustomDropdown';
import CustomToast from '../../custom/CustomToast';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const FirstLoginSchema = Yup.object().shape({
  firstName: Yup.string().min(1),
  lastName: Yup.string().min(1),
  birthDay: Yup.date(),
  gender: Yup.number().min(1),
});

const FirstLoginWizard = ({ navigation }: FirstLoginWizardProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      const checkIfExistsUserData = (user: User | null) => {
        const userRef = ref(db, 'users/' + user?.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log('User data exists');
              navigation.navigate('BottomBar', {
                screen: 'Home',
              });
            }
            console.log('User data doesnt exists');
          })
          .catch((e) => {
            console.log('Error', e);
          });
      };
      checkIfExistsUserData(user);
    });
  });

  const genders = [
    { label: 'Kobieta', value: 1 },
    { label: 'Mężczyzna', value: 2 },
  ];

  return (
    <View style={styles.view}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          birthDate: 0,
          gender: 0,
        }}
        // validationSchema={FirstLoginSchema}
        onSubmit={async (values) => {
          try {
            console.log(values);
            CustomToast('error', 'Nie podano wszystkich danych');
          } catch (e) {
            console.log('Coś poszło nie tak');
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
                values.birthDate > 0
                  ? values.birthDate.toLocaleString()
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
                  console.log(newDate);
                  setFieldValue('birthDate', newDate);
                }}
              />
            )}
            <CustomDropdown
              data={genders}
              placeholder='Wybierz płeć'
              value={values.gender}
              handleChange={handleChange('gender')}
            />
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={styles.submit}>Zatwierdź zmiany</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 25,
    gap: 20,
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
