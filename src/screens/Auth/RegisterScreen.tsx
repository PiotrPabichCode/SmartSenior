import WelcomeSvg from '../../assets/welcome-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { SignUpProps } from '../../navigation/types';
import { registerUser } from '../../firebase/auth';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Podany e-mail jest nieprawidłowy').required(),
  password: Yup.string()
    .min(6, 'Hasło powinno mieć co najmniej 6 znaków')
    .max(30, 'Hasło może mieć maksymalnie 30 znaków')
    .required(),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Hasła muszą być takie same')
    .required(),
});

const RegisterScreen = ({ navigation }: SignUpProps) => {
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ email: '', password: '', repeatPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              console.log(values);
              const response = await registerUser(values);
              console.log(response);
              if (response) {
                navigation.navigate('BottomBar', {
                  screen: 'Home',
                });
              }
            }}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <>
                <View>
                  <Input
                    style={styles.inputField}
                    underlineColorAndroid='transparent'
                    leftIcon={<Icon name='email' size={30} color='black' />}
                    placeholder='Adres e-mail'
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name='lock' size={30} color='black' />}
                    secureTextEntry={true}
                    placeholder='Hasło'
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name='lock' size={30} color='black' />}
                    secureTextEntry={true}
                    placeholder='Powtórz hasło'
                    onChangeText={handleChange('repeatPassword')}
                    value={values.repeatPassword}
                  />
                  {touched.repeatPassword && errors.repeatPassword && (
                    <Text style={styles.errorText}>
                      {errors.repeatPassword}
                    </Text>
                  )}
                </View>

                <Button
                  title={'Zarejestruj się'}
                  buttonStyle={styles.buttonSignUpStyle}
                  containerStyle={styles.buttonContainerStyle}
                  titleStyle={styles.buttonSignUpTitleStyle}
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
          <Text style={styles.textLinks}>
            Masz już konto?{' '}
            <Text
              style={styles.textRegister}
              onPress={() => navigation.navigate('SignIn')}>
              Zaloguj się
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

// if (response.user) {
//   // await createProfile(response);
//   navigation.navigate('BottomBar', {
//     screen: 'Home',
//   });
// }

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  viewStyle: {
    flexGrow: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainerStyle: {
    marginTop: 5,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  buttonSignUpStyle: {
    backgroundColor: 'black',
  },
  buttonSignUpTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  textLinks: {
    margin: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  textRegister: {
    color: 'blue',
  },
});

export default RegisterScreen;
