import { StyleSheet, Text, View } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { ScrollView } from 'react-native';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomToast from '@src/components/CustomToast';
import { signInAction } from '@src/redux/actions/authActions';
import { useAppDispatch } from '@redux/store';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(translate('login.yup.email'))
    .required(translate('yup.required')),
  password: Yup.string()
    .min(6, translate('login.yup.passwordLengthMin'))
    .max(30, translate('login.yup.passwordLengthMax'))
    .required(translate('yup.required')),
});

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg width={250} height={220} />
        <Text style={styles.headerText}>{translate('login.welcomeBack')}</Text>
        <Button
          title={translate('login.google')}
          buttonStyle={styles.buttonAuthGoogleStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonAuthGoogleTitleStyle}
        />
        <View
          style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>
              {translate('login.or')}
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              dispatch(signInAction(values));
            } catch (e) {
              CustomToast('error', translate('login.message.error.signIn'));
            }
          }}>
          {({ values, handleChange, handleSubmit }) => (
            <>
              <View style={styles.inputField}>
                <Input
                  style={styles.inputField}
                  underlineColorAndroid='transparent'
                  leftIcon={<Icon name='email' size={30} color='black' />}
                  placeholder={translate('login.button.placeholder.email')}
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
                  placeholder={translate('login.button.placeholder.password')}
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
                title={translate('login.button.submit')}
                buttonStyle={styles.buttonSignInStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonSignInTitleStyle}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
        <Text style={styles.textLinks}>
          {translate('login.question')}
          <Text style={styles.textRegister} onPress={() => navigate('SignUp')}>
            {translate('login.signUp')}
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
    marginTop: 50,
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
