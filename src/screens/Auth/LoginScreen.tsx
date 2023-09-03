import { StyleSheet, Text, TextInput, View } from 'react-native';
import WelcomeSvg from '../../assets/welcome-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { SignInProps } from '../../navigation/types';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authUser } from '../../firebase/auth';
import CustomToast, { SHORT_MESSAGE } from '../../custom/CustomToast';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Podany e-mail jest nieprawidłowy')
    .required('To pole jest wymagane'),
  password: Yup.string()
    .min(6, 'Hasło powinno mieć co najmniej 6 znaków')
    .max(30, 'Hasło może mieć maksymalnie 30 znaków')
    .required('To pole jest wymagane'),
});

const LoginScreen = ({ navigation }: SignInProps) => {
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg width={250} height={220} />
        <Text style={styles.headerText}>Witaj z powrotem!</Text>
        <Button
          title={'Zaloguj się za pomocą Google'}
          buttonStyle={styles.buttonAuthGoogleStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonAuthGoogleTitleStyle}
        />
        <View
          style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>Lub</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              const user = await authUser(values);
              navigation.navigate('BottomBar', {
                screen: 'Home',
              });
            } catch (e) {
              CustomToast('Nie udało się zalogować', {
                type: 'error',
                duration: SHORT_MESSAGE,
              });
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
              <Button
                title={'Zaloguj się'}
                buttonStyle={styles.buttonSignInStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonSignInTitleStyle}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
        <Text style={styles.textLinks}>
          Nie masz konta?{' '}
          <Text
            style={styles.textRegister}
            onPress={() => navigation.navigate('SignUp')}>
            Zarejestruj się
          </Text>
        </Text>
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
  viewStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainerStyle: {
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: 'blue',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  buttonAuthGoogleStyle: {
    backgroundColor: 'blue',
  },
  buttonAuthGoogleTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  buttonSignInStyle: {
    backgroundColor: 'black',
  },
  buttonSignInTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
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

export default LoginScreen;
