import WelcomeSvg from '../../assets/register-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { SignUpProps } from '../../navigation/types';
import { registerUser } from '../../firebase/auth';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import CustomToast from '../../custom/CustomToast';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Podany e-mail jest nieprawidłowy')
    .required('To pole jest wymagane'),
  password: Yup.string()
    .min(6, 'Hasło powinno mieć co najmniej 6 znaków')
    .max(30, 'Hasło może mieć maksymalnie 30 znaków')
    .required('To pole jest wymagane'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Hasła muszą być takie same')
    .required('To pole jest wymagane'),
});

const RegisterScreen = ({ navigation }: SignUpProps) => {
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg width={230} height={170} />
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>
            Cieszymy się, że zdecydowałeś się dołączyć do nas!
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              try {
                const user = await registerUser(values);
                navigation.navigate('FirstLoginWizard');
              } catch (e) {
                CustomToast('error', 'Nie udało się zarejestrować');
              }
            }}>
            {({ values, handleChange, handleSubmit }) => (
              <>
                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    underlineColorAndroid='transparent'
                    leftIcon={<Icon name='email' size={30} color='black' />}
                    placeholder='Adres e-mail'
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  <ErrorMessage
                    className='errorText'
                    component={Text}
                    name='email'
                  />
                </View>

                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name='lock' size={30} color='black' />}
                    secureTextEntry={true}
                    placeholder='Hasło'
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  <ErrorMessage
                    className='errorText'
                    component={Text}
                    name='password'
                  />
                </View>
                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name='lock' size={30} color='black' />}
                    secureTextEntry={true}
                    placeholder='Powtórz hasło'
                    onChangeText={handleChange('repeatPassword')}
                    value={values.repeatPassword}
                  />
                  <ErrorMessage
                    className='errorText'
                    component={Text}
                    name='repeatPassword'
                  />
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

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    padding: 8,
    margin: 8,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
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
    marginHorizontal: 10,
  },
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
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
