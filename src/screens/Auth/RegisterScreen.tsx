import WelcomeSvg from '@assets/register-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { StyleSheet, Text, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import CustomToast from '@src/components/CustomToast';
import { useAppDispatch } from '@redux/store';
import { signUpAction } from '@src/redux/actions/authActions';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email(translate('login.yup.email')).required(translate('yup.required')),
  password: Yup.string()
    .min(6, translate('login.yup.passwordLengthMin'))
    .max(30, translate('login.yup.passwordLengthMax'))
    .required(translate('yup.required')),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], translate('login.yup.repeatPassword'))
    .required(translate('yup.required')),
});

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg width={230} height={170} />
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>{translate('register.welcome')}</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={async values => {
              try {
                dispatch(signUpAction(values));
              } catch (e) {
                CustomToast('error', translate('register.message.error.signUp'));
              }
            }}>
            {({ values, handleChange, handleSubmit }) => (
              <>
                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    underlineColorAndroid="transparent"
                    leftIcon={<Icon name="email" size={30} color="black" />}
                    placeholder={translate('register.button.placeholder.email')}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  <ErrorMessage className="errorText" component={Text} name="email" />
                </View>

                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name="lock" size={30} color="black" />}
                    secureTextEntry={true}
                    placeholder={translate('register.button.placeholder.password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  <ErrorMessage className="errorText" component={Text} name="password" />
                </View>
                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name="lock" size={30} color="black" />}
                    secureTextEntry={true}
                    placeholder={translate('register.button.placeholder.repeatPassword')}
                    onChangeText={handleChange('repeatPassword')}
                    value={values.repeatPassword}
                  />
                  <ErrorMessage className="errorText" component={Text} name="repeatPassword" />
                </View>

                <Button
                  title={translate('register.button.submit')}
                  buttonStyle={styles.buttonSignUpStyle}
                  containerStyle={styles.buttonContainerStyle}
                  titleStyle={styles.buttonSignUpTitleStyle}
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
          <Text style={styles.textLinks}>
            {translate('register.question')}
            <Text style={styles.textRegister} onPress={() => navigate('SignIn')}>
              {translate('register.signIn')}
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
    marginTop: 50,
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
